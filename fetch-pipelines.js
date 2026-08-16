const fetch = require('node-fetch'); // Next.js polyfills this globally, but we'll use native fetch if available

async function fetchPipelines() {
  // ---------------------------------------------------------
  // 1. PASTE YOUR GHL TOKEN AND LOCATION ID HERE
  // ---------------------------------------------------------
  const LOCATION_ID = "PASTE_YOUR_LOCATION_ID_HERE";
  const TOKEN = "PASTE_YOUR_GHL_API_TOKEN_HERE";

  if (LOCATION_ID === "PASTE_YOUR_LOCATION_ID_HERE" || TOKEN === "PASTE_YOUR_GHL_API_TOKEN_HERE") {
    console.error("❌ ERROR: Please paste your LOCATION_ID and TOKEN inside fetch-pipelines.js before running it.");
    process.exit(1);
  }

  console.log("Fetching pipelines from GoHighLevel...");

  try {
    const response = await globalThis.fetch(`https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${LOCATION_ID}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Version": "2021-07-28",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`GHL API Request Failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Find Academy LMS
    const academyPipeline = data.pipelines.find((p) => p.name.toLowerCase().includes("academy lms"));

    if (academyPipeline) {
      console.log("\n✅ FOUND YOUR PIPELINE!");
      console.log("=========================================");
      console.log(`GHL_ACADEMY_PIPELINE_ID=${academyPipeline.id}`);
      console.log("=========================================\n");

      console.log("STAGE IDs FOR THIS PIPELINE:");
      academyPipeline.stages.forEach(stage => {
        console.log(`- ${stage.name}: ${stage.id}`);
        if (stage.name.toLowerCase().includes("pending")) {
          console.log(`  👉 Use this one for GHL_ACADEMY_STAGE_ID: ${stage.id}`);
        }
      });
      console.log("\nCopy the Pipeline ID and Stage ID above and paste them into your Vercel Environment Variables!");
    } else {
      console.log("\n❌ Could not find a pipeline named 'Academy LMS'. Here are the pipelines in your account:");
      data.pipelines.forEach(p => {
        console.log(`- ${p.name} (ID: ${p.id})`);
      });
    }

  } catch (error) {
    console.error("Error fetching pipelines:", error);
  }
}

fetchPipelines();
