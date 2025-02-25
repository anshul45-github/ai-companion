import * as z from "ZOD";

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required."
    })
})