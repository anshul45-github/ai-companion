import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name: "Anshul Mendiratta",
        title: "Web Developer",
        description: "The code generation feature is a lifesaver! It helps me prototype ideas quickly and efficiently. Highly recommended for developers!"
    },
    {
        name: "Rahul Sharma",
        title: "Startup Founder",
        description: "This AI platform has completely transformed how we generate content. The chatbot is incredibly responsive, and the image generation feature saves us hours of work!"
    },
    {
        name: "Aditi Verma",
        title: "Freelance Designer",
        description: "I was amazed by the AI's ability to create stunning visuals. The image generation tool is a game-changer for my projects!"
    },
    {
        name: "Sneha Kapoor",
        title: "Content Creator",
        description: "The AI music generation tool is incredible! I use it to create background music for my videos, and it never disappoints."
    }
];

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-semibold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}