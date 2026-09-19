'use client';
import { useEffect } from 'react';
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4';
export default function JoinGroupPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = WHATSAPP_GROUP_URL;
    }, 400);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '460px', width: '100%', backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '36px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>�S</div>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', color: '#f3f4f6' }}>Opening WhatsApp Group...</h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '28px', lineHeight: '1.5' }}>Live Masterclass announcements aur Zoom link ke liye aapko official WhatsApp group me redirect kiya ja raha hai.</p>
        <a href={WHATSAPP_GROUP_URL} style={{ display: 'inline-block', width: '100%', boxSizing: 'border-box', padding: '14px 20px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 'bold', fontSize: '16px', borderRadius: '10px', textDecoration: 'none' }}>Join Official WhatsApp Group ↑</a>
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '18px' }}>Agar WhatsApp automatically open na ho, toh upar diye gaye button par click karein.</p>
      </div>
    </div>
  );
}
