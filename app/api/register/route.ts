import { NextRequest,NextResponse } from "next/server";
const attempts=new Map<string,{count:number;reset:number}>();
const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(req:NextRequest){
 try{
  const ip=req.headers.get("x-forwarded-for")?.split(",")[0]||"local";const now=Date.now();const hit=attempts.get(ip);if(hit&&hit.reset>now&&hit.count>=5)return NextResponse.json({error:"Zyada attempts. 15 minutes baad dobara try karein."},{status:429});attempts.set(ip,{count:hit&&hit.reset>now?hit.count+1:1,reset:now+900000});
  const f=await req.formData();const fullName=String(f.get("fullName")||"").trim(),phone=String(f.get("phone")||"").trim(),mail=String(f.get("email")||"").trim(),transactionId=String(f.get("transactionId")||"").trim(),batchDate=String(f.get("batchDate")||""),paymentMethod=String(f.get("paymentMethod")||""),proof=f.get("paymentProof");
  if(fullName.length<2||!email.test(mail)||phone.replace(/\D/g,"").length<10||transactionId.length<4||!/^\d{4}-\d{2}-\d{2}$/.test(batchDate)||!["Bank Transfer","Easypaisa","JazzCash"].includes(paymentMethod)||!(proof instanceof File)||proof.size>5_000_000||!["image/jpeg","image/png","image/webp"].includes(proof.type))return NextResponse.json({error:"Form details check karein. Screenshot JPG/PNG/WebP aur 5MB se chhota ho."},{status:400});
  const token=process.env.GHL_PRIVATE_INTEGRATION_TOKEN,locationId=process.env.GHL_LOCATION_ID;
  if(!token||!locationId){if(process.env.NODE_ENV==="development")return NextResponse.json({ok:true,mode:"local-test"});return NextResponse.json({error:"Registration service abhi configure nahi hui. Support se rabta karein."},{status:503})}
  const customFields=[["GHL_BATCH_DATE_FIELD_KEY",batchDate],["GHL_TRANSACTION_ID_FIELD_KEY",transactionId],["GHL_PAYMENT_METHOD_FIELD_KEY",paymentMethod],["GHL_OFFER_VERSION_FIELD_KEY",String(f.get("offerVersion")||"YEB-v1")]].flatMap(([key,val])=>process.env[key]?[{key:process.env[key],field_value:val}]:[]);
  const ghl=await fetch("https://services.leadconnectorhq.com/contacts/",{method:"POST",headers:{Authorization:`Bearer ${token}`,Version:"2021-07-28","Content-Type":"application/json"},body:JSON.stringify({locationId,name:fullName,email:mail,phone,source:"YouTube Workshop Landing Page",tags:["yt-workshop","payment-pending"],customFields})});
  if(!ghl.ok){console.error("GHL error",ghl.status);return NextResponse.json({error:"Registration save nahi hui. Dobara try karein."},{status:502})}
  return NextResponse.json({ok:true});
 }catch{ return NextResponse.json({error:"Server error. Dobara try karein."},{status:500})}
}
