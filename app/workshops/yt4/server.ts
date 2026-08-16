import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit to handle base64 image uploads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Simple in-memory storage for seat offsets and registrations
const registrationDb: any[] = [];
const dateSeatOffsets: Record<string, number> = {};

// Helper to calculate a deterministic but stable registration count for any date
function getStableCapacityForDate(dateStr: string) {
  // Use characters of date string to seed a number between 68 and 83
  let sum = 0;
  for (let i = 0; i < dateStr.length; i++) {
    sum += dateStr.charCodeAt(i);
  }
  const baseReserved = 68 + (sum % 16); // 68 to 83
  
  // Add in-memory registrations for this date
  const offset = dateSeatOffsets[dateStr] || 0;
  const reserved = Math.min(100, baseReserved + offset);
  
  return {
    capacity: 100,
    reserved,
    remaining: 100 - reserved
  };
}

// 1. GET /api/workshop-capacity
app.get("/api/workshop-capacity", (req, res) => {
  const dateParam = req.query.date as string;
  if (!dateParam) {
    return res.status(400).json({ error: "Date parameter is required (format: YYYY-MM-DD)" });
  }
  
  const capacityData = getStableCapacityForDate(dateParam);
  return res.json(capacityData);
});

// 2. POST /api/lead (Cart Recovery / Lead capture on Next button click)
app.post("/api/lead", async (req, res) => {
  try {
    const { fullName, whatsappNumber, email, batchDate, tag } = req.body;

    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ error: "Apna poora naam enter karein." });
    }
    if (!whatsappNumber || whatsappNumber.trim().length < 7) {
      return res.status(400).json({ error: "Valid WhatsApp number enter karein." });
    }

    const formattedPhone = whatsappNumber.startsWith("+") 
      ? whatsappNumber 
      : `+92${whatsappNumber.replace(/^0+/, "")}`;

    const leadRecord = {
      fullName,
      whatsappNumber: formattedPhone,
      email: email || undefined,
      batchDate,
      tag: tag || "workshop cart recovery",
      timestamp: new Date().toISOString()
    };

    console.log("[Lead Capture] Saved cart recovery lead:", leadRecord);

    // Push to GHL if token is present
    const ghlToken = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;

    let ghlStatus = "Saved Locally";

    if (ghlWebhookUrl) {
      try {
        await fetch(ghlWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: fullName,
            phone: formattedPhone,
            email: email || undefined,
            tags: ["workshop cart recovery", "workshop"],
            batch_date: batchDate
          })
        });
        ghlStatus = "Pushed via Webhook";
      } catch (err) {
        console.error("[Lead Capture] Webhook error:", err);
      }
    }

    if (ghlToken) {
      try {
        const payload = {
          firstName: fullName,
          phone: formattedPhone,
          email: email || undefined,
          locationId: locationId || undefined,
          tags: ["workshop cart recovery", "workshop"]
        };

        const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlToken}`,
            "Version": "2021-04-15",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          ghlStatus = "Success GHL API";
          console.log("[GHL Integration] Lead added to GHL successfully");
        } else {
          console.error("[GHL Integration] Lead failed:", await response.text());
        }
      } catch (err) {
        console.error("[GHL Integration] Error adding lead to GHL:", err);
      }
    }

    return res.status(200).json({ success: true, message: "Lead captured successfully", ghlStatus });
  } catch (err: any) {
    console.error("[Lead Error]", err);
    return res.status(500).json({ error: "Lead capture failed" });
  }
});

// 3. POST /api/register
app.post("/api/register", async (req, res) => {
  try {
    const data = req.body;
    
    // Server-side validation
    if (!data.fullName || data.fullName.trim().length < 2) {
      return res.status(400).json({ error: "Apna poora naam enter karein (kam se kam 2 characters)." });
    }
    if (!data.whatsappNumber || data.whatsappNumber.trim().length < 7) {
      return res.status(400).json({ error: "Valid WhatsApp number enter karein." });
    }
    if (!data.paymentMethod) {
      return res.status(400).json({ error: "Payment method select karein." });
    }
    if (!data.transactionId || data.transactionId.trim().length < 3) {
      return res.status(400).json({ error: "Valid Transaction ID / Reference Number enter karein." });
    }
    if (!data.paymentScreenshot) {
      return res.status(400).json({ error: "Payment screenshot attach karna zaroori hai." });
    }
    if (!data.batchDate) {
      return res.status(400).json({ error: "Batch date missing hai." });
    }

    // Save in-memory
    registrationDb.push({
      ...data,
      id: `REG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      serverTimestamp: new Date().toISOString()
    });

    // Increment seat offset for this date
    dateSeatOffsets[data.batchDate] = (dateSeatOffsets[data.batchDate] || 0) + 1;

    // Check if GoHighLevel is configured
    const ghlToken = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    let ghlStatus = "Not Configured";
    let ghlResponse = null;

    if (ghlToken) {
      console.log("[GHL Integration] Attempting contact creation in GoHighLevel...");
      
      // Map custom fields based on configured keys in env
      const customFields: any[] = [];
      
      const fieldMappings: Record<string, string | undefined> = {
        [process.env.GHL_BATCH_DATE_FIELD_KEY || "batch_date"]: data.batchDate,
        [process.env.GHL_TRANSACTION_ID_FIELD_KEY || "transaction_id"]: data.transactionId,
        [process.env.GHL_PAYMENT_METHOD_FIELD_KEY || "payment_method"]: data.paymentMethod,
        [process.env.GHL_OFFER_VERSION_FIELD_KEY || "offer_version"]: "YEB-V1",
        // Because a raw base64 string is too big for a text custom field, in real life you'd upload this to an S3 or Cloudinary bucker.
        // We'll pass a placeholder or the first 200 chars, or if they have a storage solution we'd use it.
        [process.env.GHL_PAYMENT_PROOF_FIELD_KEY || "payment_proof"]: data.paymentScreenshot.substring(0, 100) + "...[Screenshot Base64]"
      };

      Object.entries(fieldMappings).forEach(([key, value]) => {
        if (key && value) {
          customFields.push({ id: key, value });
        }
      });

      // Construct payload for GHL v2 Contacts API
      const payload: any = {
        firstName: data.fullName,
        phone: data.whatsappNumber.startsWith("+") ? data.whatsappNumber : `+92${data.whatsappNumber.replace(/^0+/, "")}`,
        email: data.email || undefined,
        locationId: locationId || undefined,
        tags: ["YEB-Payment-Submitted"],
        customFields: customFields
      };

      try {
        const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlToken}`,
            "Version": "2021-04-15",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          ghlResponse = await response.json();
          ghlStatus = "Success";
          console.log("[GHL Integration] Contact created successfully!", ghlResponse);
        } else {
          const errText = await response.text();
          ghlStatus = `Failed (HTTP ${response.status})`;
          console.error("[GHL Integration] Failed to create contact in GHL:", errText);
        }
      } catch (err: any) {
        ghlStatus = `Error: ${err.message}`;
        console.error("[GHL Integration] Network error during GHL request:", err);
      }
    } else {
      console.log("[GHL Integration] GHL token not set. Submission saved to in-memory DB.", {
        fullName: data.fullName,
        whatsappNumber: data.whatsappNumber,
        batchDate: data.batchDate,
        transactionId: data.transactionId
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment proof submitted successfully.",
      registration: {
        fullName: data.fullName,
        whatsappNumber: data.whatsappNumber,
        batchDate: data.batchDate,
        batchDisplayDate: data.batchDisplayDate,
        transactionId: data.transactionId
      },
      integration: {
        ghlStatus,
        ghlResponse
      }
    });
  } catch (error: any) {
    console.error("[Server Error]", error);
    return res.status(500).json({ error: "Sumbission process mein koi error pesh aya hai. Baraye meharbani dobara try karein." });
  }
});

// Vite & Static assets routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
