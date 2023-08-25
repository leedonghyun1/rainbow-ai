"use client";

import { use, useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


export const CrispChat = () =>{
  useEffect(()=>{
    Crisp.configure ("7df40bf2-19ed-43a5-b124-c8d0c1b8b25d");
  },[])
  return null;
}