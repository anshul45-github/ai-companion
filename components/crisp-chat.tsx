"use client";

import { useEffect } from "react";

import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure(process.env.NEXT_PUBLIC_CRISP_ID!);
    }, []);

    return null;
}