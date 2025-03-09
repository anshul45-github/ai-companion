"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        }
        catch(error) {
            console.log("BILLING_ERROR", error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Button variant={isPro ? "default" : "premium"} onClick={onClick} disabled={loading}>
            {isPro ? "Manage Subscription" : "Subscribe"}
            {!isPro && <Zap className="size-4 mr-2 fill-white" />}
        </Button>
    )
}