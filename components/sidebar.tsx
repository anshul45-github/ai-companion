"use client";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/dashboard',
        color: 'text-violet-500'
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        href: '/dashboard',
        color: 'text-pink-700'
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        href: '/dashboard',
        color: 'text-orange-700'
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/dashboard',
        color: 'text-emerald-500'
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: '/dashboard',
        color: 'text-green-700'
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/dashboard',
    }
]

const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-12 h-12">
                        <Image fill alt="logo" src={"/logo.png"} />
                    </div>
                    <h1 className={cn("text-2xl font-semibold", montserrat.className)}>
                        Genius
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route, index) => (
                        <Link key={index} href={route.href} className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                            <route.icon className={(cn("h-5 w-5 mr-3", route.color))} />
                            {route.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;