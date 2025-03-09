import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

import { auth } from "@clerk/nextjs/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        if(!process.env.GEMINI_API_KEY)
            return new NextResponse("Gemini API key not found", { status: 500 });

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const { userId } = await auth();

        const body = await req.json();

        const { messages, newMessage } = body;

        if(!userId)
            return new NextResponse("Unauthorized", { status: 401 });

        if(!genAI)
            return new NextResponse("Gemini API key not found", { status: 500 });

        if(!messages)
            return new NextResponse("Messages not provided", { status: 400 });

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro)
            return new NextResponse("Free trial has expired", { status: 403 });

        const chat = model.startChat({ history: messages });
        
        const result = await chat.sendMessage(newMessage);

        if(!isPro)
            await increaseApiLimit();

        return NextResponse.json(result.response.text());
    }
    catch(error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}