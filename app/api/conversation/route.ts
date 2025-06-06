import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { redis } from "@/lib/cache";
import { checkSubscription } from "@/lib/subscription";

import { auth } from "@clerk/nextjs/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { createHash } from "crypto";

import { NextResponse } from "next/server";

interface ConversationMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

function generateCacheKey(userId: string, messages: ConversationMessage[], newMessage: string) {
  const hash = createHash('sha256');
  hash.update(JSON.stringify({ userId, messages, newMessage }));
  return `conv:${userId}:${hash.digest('hex')}`;
}

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

        const cacheKey = generateCacheKey(userId, messages, newMessage);
        const cachedResponse = await redis.get(cacheKey);

        if (cachedResponse) {
          const headers = new Headers();
          headers.set('X-Cache-Hit', 'true');
          return new NextResponse(String(cachedResponse), { headers });
        }

        const chat = model.startChat({ history: messages });
        const result = await chat.sendMessage(newMessage);
        const responseText = result.response.text();

        await redis.setex(
          cacheKey,
          isPro ? 3600 : 600, // Pro: 1 hour, Free: 10 minutes
          responseText
        );

        if(!cachedResponse && !isPro)
            await increaseApiLimit();

        return NextResponse.json(responseText);
    }
    catch(error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}