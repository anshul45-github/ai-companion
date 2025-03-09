"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

import { MAX_FREE_COUNTS } from "@/constants";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
    apiLimitCount: number;
}

export const FreeCounter = ({ apiLimitCount }: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    </div>
                    <Button className="w-full" variant={"premium"}>
                        Upgrade
                        <Zap className="size-4 mr-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}