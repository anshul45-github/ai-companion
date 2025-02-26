import { auth } from "@clerk/nextjs/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        if(!process.env.GEMINI_API_KEY)
            return new NextResponse("Gemini API key not found", { status: 500 });
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation."
        });

        const { userId } = await auth();
        const body = await req.json();
        const { messages, newMessage } = body;

        if(!userId)
            return new NextResponse("Unauthorized", { status: 401 });

        if(!genAI)
            return new NextResponse("Gemini API key not found", { status: 500 });

        if(!messages)
            return new NextResponse("Messages not provided", { status: 400 });

        const chat = model.startChat({ history: messages });
        const result = await chat.sendMessage(newMessage);

        return NextResponse.json(result.response.text());
    }
    catch(error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}