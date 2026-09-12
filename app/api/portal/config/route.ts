import { NextRequest, NextResponse } from 'next/server';
import { getPortalConfig, updatePortalConfig, createOrGetSetupToken } from '@/lib/portalAuth';

export async function GET(req: NextRequest) {
  try {
    const config = getPortalConfig();
    return NextResponse.json({
      success: true,
      config
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // Action 1: Create or get access token for a student
    if (action === 'create_access') {
      const { email, name } = body;
      if (!email) {
        return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
      }
      const { token, user } = createOrGetSetupToken(email, name);
      return NextResponse.json({
        success: true,
        token,
        setupUrl: `https://www.abrarnadir.com/portal/setup?token=${token}`,
        user
      });
    }

    // Action 2: Update recording link or details (Admin)
    if (action === 'update_recording') {
      const { recordingVideoUrl, recordingTitle, sessionDate, nextSessionDate } = body;
      const updated = updatePortalConfig({
        ...(recordingVideoUrl && { recordingVideoUrl }),
        ...(recordingTitle && { recordingTitle }),
        ...(sessionDate && { sessionDate }),
        ...(nextSessionDate && { nextSessionDate })
      });
      return NextResponse.json({ success: true, config: updated });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
