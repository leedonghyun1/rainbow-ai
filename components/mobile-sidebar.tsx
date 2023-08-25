"use client";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";

import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

interface MobileSideBar{
  apiLimitCount: number;
  isPro:boolean;
}

const MobileSidebar = ({apiLimitCount, isPro=false}:MobileSideBar) => {
const [isMounted, setIsMounted] = useState(false);

useEffect(()=>{
  setIsMounted(true)
},[])

if(!isMounted){
  return null;
}
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left"  className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
