"use client";
import { useEffect,useState } from "react";
export function useCountdown(target:Date|null){const [total,setTotal]=useState(0);useEffect(()=>{const tick=()=>setTotal(Math.max(0,(target?.getTime()||0)-Date.now()));tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[target?.getTime()]);const s=Math.floor(total/1000);return{hours:String(Math.floor(s/3600)).padStart(2,"0"),minutes:String(Math.floor(s%3600/60)).padStart(2,"0"),seconds:String(s%60).padStart(2,"0"),total}}
