import { NextResponse } from 'next/server';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4';

export async function GET() {
  return NextResponse.redirect(WHATSAPP_GROUP_URL, 307);
}
