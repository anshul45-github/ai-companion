"use client";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

import { Music } from "lucide-react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { formSchema } from "./constants";

import { useProModal } from "@/hooks/use-pro-modal";

import toast from "react-hot-toast";

const MusicPage = () => {
    const proModal = useProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
        },
    })

    const isLoading = form.formState.isSubmitting;

    const router = useRouter();
    const [trackUrl, setTrackUrl] = useState<string | undefined>("");

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setTrackUrl(undefined);

            const response = await axios.post("/api/music", values);

            setTrackUrl(response.data);

            form.reset();
        }
        catch(error) {
            if(axios.isAxiosError(error) && error.response?.status === 403)
                proModal.onOpen();
            else
                toast.error("An error occurred. Please try again later.");
        }
        finally {
            router.refresh();
        }
    }

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <Heading title="Music Generation" description="Turn your prompt into music." icon={Music} iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Piano solo" {...field} />
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
                    {!trackUrl && !isLoading && (
                        <Empty label="No music generated." src="/empty_music.png" />
                    )}
                    {trackUrl && (
                        <div>
                        <audio controls className="w-full mt-8">
                            <source src={trackUrl} />
                        </audio>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MusicPage;