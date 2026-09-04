import https from "node:https";
import fs from "node:fs";

const GHL_TOKEN = "pit-4259cd3b-222c-4b57-8f88-400949576d75";
const LOCATION_ID = "6MzIr7iWX12OyaxfufLw";

function ghlGet(path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: "services.leadconnectorhq.com",
      path,
      method: "GET",
      headers: {
        Authorization: "Bearer " + GHL_TOKEN,
        Version: "2021-07-28",
        "Content-Type": "application/json"
      }
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  console.log("=== STARTING FULL CONTACT AUDIT ===");
  let allContacts = [];
  let nextPageUrl = "/contacts/?locationId=" + LOCATION_ID + "&limit=100";
  let page = 1;

  while (nextPageUrl && page <= 25) {
    console.log("Fetching page " + page + "...");
    try {
      const res = await ghlGet(nextPageUrl);
      const contacts = res.contacts || [];
      if (contacts.length === 0) break;
      allContacts.push(...contacts);
      console.log("Fetched " + contacts.length + " contacts (Total so far: " + allContacts.length + ")");
      if (res.meta && res.meta.nextPageUrl) {
        const urlObj = new URL(res.meta.nextPageUrl);
        nextPageUrl = urlObj.pathname + urlObj.search;
      } else {
        nextPageUrl = null;
      }
      page++;
    } catch (err) {
      console.error("Error fetching page:", err.message);
      break;
    }
  }

  console.log("\nDONE FETCHING! Total contacts fetched: " + allContacts.length);

  let paidContacts = [];
  let unpaidWorkshop = [];
  let customPackageLeads = [];
  let testOrSpam = [];
  let otherLeads = [];

  for (const c of allContacts) {
    const tags = c.tags || [];
    const isPaid = tags.some(t => 
      t.includes("paid") || 
      t.includes("full payment") || 
      t.includes("payment:confirmed") ||
      t.includes("portal-active") ||
      t.includes("workshop:seat-confirmed")
    );
    const isTest = tags.some(t => t.includes("test")) || (c.contactName && c.contactName.toLowerCase().includes("test"));
    const isCustom = tags.some(t => t.includes("custom-package") || t.includes("custom-price"));
    const isWorkshop = tags.some(t => t.includes("workshop") || t.includes("yt-workshop"));

    if (isTest) {
      testOrSpam.push(c);
    } else if (isPaid) {
      paidContacts.push(c);
    } else if (isCustom) {
      customPackageLeads.push(c);
    } else if (isWorkshop) {
      unpaidWorkshop.push(c);
    } else {
      otherLeads.push(c);
    }
  }

  const summary = {
    totalContacts: allContacts.length,
    paidStudentsCount: paidContacts.length,
    unpaidWorkshopLeadsCount: unpaidWorkshop.length,
    customPackageLeadsCount: customPackageLeads.length,
    testOrSpamCount: testOrSpam.length,
    otherLeadsCount: otherLeads.length
  };

  console.log("\n=== AUDIT SUMMARY ===");
  console.log(JSON.stringify(summary, null, 2));

  fs.writeFileSync("c:/abrarnadir.com/scripts/contacts_audit.json", JSON.stringify({
    summary,
    samplePaid: paidContacts.slice(0, 10).map(c => ({ id: c.id, name: c.contactName, phone: c.phone, tags: c.tags })),
    sampleUnpaid: unpaidWorkshop.slice(0, 10).map(c => ({ id: c.id, name: c.contactName, phone: c.phone, tags: c.tags }))
  }, null, 2));

  console.log("Saved audit to c:/abrarnadir.com/scripts/contacts_audit.json");
}

main().catch(console.error);
