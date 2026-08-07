import { NextResponse } from 'next/server';
import { ghlClient } from '@/lib/ghlClient';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone } = data;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    const result = await ghlClient.upsertContact({
      firstName,
      lastName,
      email,
      phone,
      tags: ['payment pending', 'lms-lead'],
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error saving LMS lead:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
