"use client";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

import { Code } from "lucide-react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import ReactMarkdown from "react-markdown";

import { formSchema } from "./constants";

import { useProModal } from "@/hooks/use-pro-modal";

import toast from "react-hot-toast";

interface ConversationMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

const CodePage = () => {
    const proModal = useProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
        },
    })

    const isLoading = form.formState.isSubmitting;

    const router = useRouter();
    const [messages, setMessages] = useState<ConversationMessage[]>([]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ConversationMessage = { role: "user", parts: [{ text: values.prompt }] };

            const response = await axios.post("/api/code", { messages: messages, newMessage: values.prompt });

            const botMessage: ConversationMessage = { role: "model", parts: [{ text: response.data }] };

            setMessages((current) => [...current, userMessage, botMessage]);

            form.reset();
        }
        catch(error) {
            if (axios.isAxiosError(error) && error.response?.status === 403)
                proModal.onOpen();
            else
                toast.error("An error occurred. Please try again later.");
        }
        finally {
            router.refresh();
        }
    }

    console.log(messages);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <Heading title="Code Generation" description="Generate code using descriptive text." icon={Code} iconColor="text-green-700" bgColor="bg-green-700/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Simple toggle button using react hooks." {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started." src="/empty_code.png" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown>
                                    {typeof message.parts[0].text === "string" ? message.parts[0].text || 
                                    "" : "Invalid message"}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage;