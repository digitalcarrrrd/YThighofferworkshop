export interface GhlContactData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags?: string[];
  customFields?: Array<{ id: string; key?: string; value: string | string[] }>;
}

export interface GhlOpportunityData {
  contactId: string;
  name: string;
  pipelineId?: string;
  pipelineStageId?: string;
  status?: string;
}

export class GhlClient {
  private readonly baseUrl = "https://services.leadconnectorhq.com";
  private readonly locationId: string;
  private readonly token: string;
  private readonly isTestMode: boolean;
  private readonly pipelineId: string;
  private readonly pipelineStageId: string;

  constructor() {
    this.locationId = process.env.GHL_LOCATION_ID || "";
    this.token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "";
    this.isTestMode = process.env.GHL_TEST_MODE === "true";
    this.pipelineId = process.env.GHL_PIPELINE_ID || "";
    this.pipelineStageId = process.env.GHL_PIPELINE_STAGE_ID || "";
  }

  get isConfigured(): boolean {
    return Boolean(this.locationId && this.token);
  }

  async upsertContact(data: GhlContactData) {
    if (!this.isConfigured) {
      console.warn("GHL client is not configured. Missing environment variables.");
      return null;
    }

    const tags = data.tags || [];
    
    // Test mode safety: Avoid triggering real workflows or bulk messages
    if (this.isTestMode) {
      tags.push("test-lead");
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.lastName ? `${data.firstName} ${data.lastName}` : data.firstName,
      email: data.email,
      phone: data.phone,
      locationId: this.locationId,
      tags: tags,
      customFields: data.customFields,
      // If in test mode, set Do Not Disturb for all channels
      ...(this.isTestMode && {
        dnd: true,
        dndSettings: {
          Call: { status: "active", message: "Test mode" },
          Email: { status: "active", message: "Test mode" },
          SMS: { status: "active", message: "Test mode" },
          WhatsApp: { status: "active", message: "Test mode" },
          GMB: { status: "active", message: "Test mode" },
          FB: { status: "active", message: "Test mode" }
        }
      })
    };

    try {
      const response = await fetch(`${this.baseUrl}/contacts/upsert`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Version": "2021-07-28",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`GHL Upsert Failed: ${response.status} ${response.statusText}`);
        // We log the error but do not expose it
        throw new Error("GHL API request failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("GHL Client Error: upsertContact failed");
      throw error; // Let the route handler catch and return a safe error
    }
  }

  async createOpportunity(data: GhlOpportunityData) {
    if (!this.isConfigured) {
      console.warn("GHL client is not configured. Missing environment variables.");
      return null;
    }

    const pipelineId = data.pipelineId || this.pipelineId;
    const pipelineStageId = data.pipelineStageId || this.pipelineStageId;

    if (!pipelineId || !pipelineStageId) {
      console.warn("Skipping Opportunity Creation: Missing Pipeline ID or Stage ID");
      return null;
    }

    const payload = {
      pipelineId: pipelineId,
      locationId: this.locationId,
      name: data.name,
      pipelineStageId: pipelineStageId,
      status: data.status || "open",
      contactId: data.contactId,
    };

    try {
      const response = await fetch(`${this.baseUrl}/opportunities/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Version": "2021-07-28",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`GHL Opportunity Creation Failed: ${response.status} ${response.statusText}`);
        throw new Error("GHL API request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("GHL Client Error: createOpportunity failed");
      throw error;
    }
  }
}

export const ghlClient = new GhlClient();
