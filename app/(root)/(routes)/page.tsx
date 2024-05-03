"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/user-dash-store-modal";


const SetupPage = () => {
  //review global store in modal components admin
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]); //dependency array
  
  return null;
  }

export default SetupPage;

