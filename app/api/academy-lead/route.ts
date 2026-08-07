import { NextResponse } from 'next/server';
import { ghlClient } from '@/lib/ghlClient';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone } = data;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // 1. Create or Update Contact in GHL
    const contactResult = await ghlClient.upsertContact({
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      email: email,
      phone: phone || '',
      tags: ['academy-lead', 'yt-empire-builder', 'payment pending'],
    });

    if (!contactResult || !contactResult.contact || !contactResult.contact.id) {
      console.warn("Contact creation returned unexpected result:", contactResult);
      return NextResponse.json({ success: true, warning: 'Contact created but no ID returned' });
    }

    const contactId = contactResult.contact.id;

    // 2. Create Opportunity in the LMS pipeline
    // Pipeline: "LMS lunch" (CZYMTQUzq7a6faEIKdtZ)
    // Stage: "Paymnt sent" (a0d09d99-ada7-4f1a-9db7-d2a21631749d)
    const oppResult = await ghlClient.createOpportunity({
      contactId: contactId,
      name: `${name} - YT Empire Builder`,
      pipelineId: 'CZYMTQUzq7a6faEIKdtZ',
      pipelineStageId: 'a0d09d99-ada7-4f1a-9db7-d2a21631749d',
      status: 'open'
    });

    return NextResponse.json({ success: true, contact: contactResult, opportunity: oppResult });

  } catch (error) {
    console.error('Academy Lead Capture Error:', error);
    // Always return a success-like structure for the client to proceed smoothly
    return NextResponse.json({ success: false, error: 'Failed to capture lead properly' }, { status: 500 });
  }
}
