import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

import axios from "axios";

import { NextResponse } from "next/server";

const getTrackUrl = async (taskId: string) => {
    try {
        let status = "composing";
        let trackUrl = "";
        let attempts = 0;
        const maxAttempts = 10;

        while (status !== "composed" && attempts < maxAttempts) {
            const response = await axios.get(`https://public-api.beatoven.ai/api/v1/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.BEATOVEN_AI_API_KEY}`
                }
            });

            status = response.data.status;
            console.log(`Attempt ${attempts + 1}: Track status is ${status}`);

            if (status === "composed") {
                trackUrl = response.data.meta.track_url;
                break;
            }

            await new Promise((resolve) => setTimeout(resolve, 10000));
            attempts++;
        }

        if(!trackUrl) {
            console.log("Track composition timed out or failed.");
            return "";
        }

        return trackUrl;
    } catch (error) {
        console.log("[GET_TRACK_URL_ERROR]", error);
        return "";
    }
};

const composeTrack = async (trackId: string) => {
    try {
        const response = await axios.post(`https://public-api.beatoven.ai/api/v1/tracks/compose/${trackId}`,
            { format: "mp3", looping: "false" },
            {
                headers: {
                    Authorization: `Bearer ${process.env.BEATOVEN_AI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data.task_id;
    }
    catch(error) {
        console.log("[COMPOSE_TRACK_ERROR]", error);
        return null;
    }
}; 

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if(!prompt)
            return new NextResponse("Prompt is required", { status: 400 });

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        
        if(!freeTrial && !isPro)
            return new NextResponse("Free trial has expired", { status: 403 });
        try {
            const response = await axios.post('https://public-api.beatoven.ai/api/v1/tracks',
                { prompt: { text: prompt } },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.BEATOVEN_AI_API_KEY}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            const taskId = await composeTrack(response.data.tracks);
            const trackUrl = await getTrackUrl(taskId);

            if(!isPro)
                await increaseApiLimit();
            
            return new NextResponse(trackUrl, { status: 200 });
        }
        catch(error) {
            console.log("[BEATOVEN_ERROR]", error);
            return new NextResponse("Internal error", { status: 500 });
        }
    }
    catch(error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}