import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({capacity:100,remaining:null,message:"Seats availability payment verification ke baad confirm hoti hai."},{headers:{"Cache-Control":"no-store"}})}
