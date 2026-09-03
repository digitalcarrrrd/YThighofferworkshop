export interface GhlContactData {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  companyName?: string;
  customFields?: Array<{ id?: string; key?: string; field_value?: unknown; value?: unknown }>;
}

export interface GhlOpportunityData {
  contactId: string;
  name: string;
  pipelineId?: string;
  pipelineStageId?: string;
  status?: string;
  monetaryValue?: number;
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
    this.pipelineId = process.env.GHL_PIPELINE_ID || "CZYMTQUzq7a6faEIKdtZ";
    this.pipelineStageId = process.env.GHL_PIPELINE_STAGE_ID || "e6ed9068-7d5e-49ff-ba46-5b9072545fd1";
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
    if (this.isTestMode) {
      tags.push("test-lead");
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.lastName ? `${data.firstName} ${data.lastName}` : data.firstName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      locationId: this.locationId,
      tags: tags,
      customFields: data.customFields,
    };

    try {
      const response = await fetch(`${this.baseUrl}/contacts/upsert`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`GHL Upsert Failed: ${response.status} ${response.statusText}`);
        throw new Error("GHL API request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("GHL Client Error: upsertContact failed", error);
      return null;
    }
  }

  async addNote(contactId: string, noteBody: string) {
    if (!this.isConfigured || !contactId) return null;

    try {
      const response = await fetch(`${this.baseUrl}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ body: noteBody }),
      });
      return await response.json();
    } catch (error) {
      console.warn("GHL addNote warning:", error);
      return null;
    }
  }

  async sendEmail(contactId: string, toEmail: string, subject: string, htmlContent: string) {
    if (!this.isConfigured || !contactId || !toEmail) return null;

    try {
      const response = await fetch(`${this.baseUrl}/conversations/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          type: "Email",
          contactId,
          emailTo: toEmail,
          subject,
          html: htmlContent,
        }),
      });
      return await response.json();
    } catch (error) {
      console.warn("GHL sendEmail warning:", error);
      return null;
    }
  }

  async sendWhatsApp(contactId: string, message: string, templateName?: string) {
    if (!this.isConfigured || !contactId) return null;

    try {
      const payload: Record<string, unknown> = {
        type: "WhatsApp",
        contactId,
        message,
      };

      if (templateName) {
        payload.template = {
          name: templateName,
          language: { code: "en_US" },
        };
      }

      const response = await fetch(`${this.baseUrl}/conversations/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      console.warn("GHL sendWhatsApp warning:", error);
      return null;
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

    const payload: Record<string, unknown> = {
      pipelineId: pipelineId,
      locationId: this.locationId,
      name: data.name,
      pipelineStageId: pipelineStageId,
      status: data.status || "open",
      contactId: data.contactId,
    };

    if (data.monetaryValue !== undefined) {
      payload.monetaryValue = data.monetaryValue;
    }

    try {
      const response = await fetch(`${this.baseUrl}/opportunities/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`GHL Opportunity Creation Failed: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("GHL Client Error: createOpportunity failed", error);
      return null;
    }
  }

  async uploadMedia(base64Data: string, filename: string): Promise<string | null> {
    if (!this.isConfigured || !base64Data) return null;

    try {
      const cleanB64 = base64Data.replace(/^data:[^;]+;base64,/, "");
      const mimeMatch = base64Data.match(/^data:(image\/[a-zA-Z+]+|application\/pdf);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const buffer = Buffer.from(cleanB64, "base64");
      
      const formData = new FormData();
      formData.append("file", new Blob([buffer], { type: mimeType }), filename);

      const response = await fetch(`${this.baseUrl}/medias/upload-file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
        },
        body: formData,
      });

      if (!response.ok) {
        console.warn(`GHL Media Upload failed: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      return data?.url || null;
    } catch (err) {
      console.warn("GHL uploadMedia error:", err);
      return null;
    }
  }

  async updateOpportunityStage(opportunityId: string, pipelineStageId: string) {
    if (!this.isConfigured || !opportunityId) {
      console.warn("GHL client not configured or missing opportunityId.");
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/opportunities/${opportunityId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ pipelineStageId }),
      });

      if (!response.ok) {
        console.error(`GHL Opportunity Update Failed: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("GHL Client Error: updateOpportunityStage failed", error);
      return null;
    }
  }
}

export const ghlClient = new GhlClient();
