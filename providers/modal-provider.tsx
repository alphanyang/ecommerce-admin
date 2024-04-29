"use client";

//global import
import { useState, useEffect  } from "react";
//local import
import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
    //preventing hydration errors
    //desync between client and server can throw hydration errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) { //server side
        return null;
    }

    return(
        <>
            <StoreModal />
        </>
    )
}