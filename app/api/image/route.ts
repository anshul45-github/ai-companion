import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if(!userId)
            return new NextResponse("Unauthorized", { status: 401 });

        if(!prompt)
            return new NextResponse("Prompt is required", { status: 400 });

        if(!amount)
            return new NextResponse("Amount is required", { status: 400 });

        if(!resolution)
            return new NextResponse("Resolution is required", { status: 400 });

        const freeTrial = await checkApiLimit();
        
        if(!freeTrial)
            return new NextResponse("Free trial has expired", { status: 403 });

        const intAmount = parseInt(amount, 10);

        const size = parseInt(resolution.split("x")[0], 10);

        const seeds = Array.from({ length: intAmount }, () => Math.floor(Math.random() * 1000000));

        const urls = seeds.map(seed => `https://pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${size}&height=${size}&seed=${seed}&nologo=true`);

        await increaseApiLimit();

        return NextResponse.json(urls);
    }
    catch(error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}