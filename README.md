# AI SaaS Web App - Personal Project

Welcome to my AI-powered SaaS web app! This project is a personal endeavor, built purely out of passion for technology and a desire to explore the capabilities of modern web development and artificial intelligence.

## Overview

This project is a fully functional SaaS (Software as a Service) web application built using **Next.js**, a powerful React framework for server-rendered applications. The app leverages AI to provide four distinct functionalities:

1. **Chatbot**: A conversational AI model that can engage in meaningful and context-aware conversations with users.
2. **Code Generation**: An AI model that assists in generating code snippets, boilerplate code, or even complete functions based on user input.
3. **Image Generation**: A creative AI model that generates images from textual descriptions, enabling users to create visual content effortlessly.
4. **Music Generation**: An AI model that composes music or generates audio clips based on user input.

The app is deployed and accessible online, showcasing my ability to build, deploy, and maintain a modern web application with multiple AI-driven features.

## Key Features

- **AI Integration**: The app integrates with **Gemini API** for chatbot and code generation, **Pollinations AI** for image generation, and **Beatoven API** for music generation, delivering intelligent and dynamic functionality across multiple domains.
- **Responsive Design**: Built with a mobile-first approach, ensuring a seamless experience across all devices.
- **User Authentication**: Secure user authentication implemented using **Clerk**, providing a smooth and reliable login experience.
- **Database**: Utilizes **Prisma** with **MongoDB** as the database provider for storing user data and app-related information.
- **Payment Integration**: Integrated **Stripe** for handling premium membership payments, enabling secure and seamless transactions.
- **Customer Support**: Integrated **Crisp** for real-time customer chat support, ensuring users can get help whenever needed.
- **Deployment**: Deployed on **Vercel** with CI/CD pipelines for automated updates and seamless deployment.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Prisma with MongoDB as the provider
- **Authentication**: Clerk for secure and seamless user authentication
- **AI Integration**: Gemini API (chatbot and code generation), Pollinations AI (image generation), Beatoven API (music generation)
- **Payment Integration**: Stripe for premium membership payments
- **Customer Support**: Crisp for real-time customer chat support
- **Deployment**: Vercel
- **Version Control**: GitHub

## Why This Project?

This project reflects my passion for building innovative and user-friendly web applications. It demonstrates my ability to:

- Work with modern web technologies like Next.js and React.
- Integrate AI capabilities into a web application.
- Design and implement a scalable and maintainable architecture.
- Deploy and manage a live web application.
- Solve real-world problems through technology.

## How to Explore the App

The app is live and accessible at https://ai-companion-ecru.vercel.app. Feel free to explore its features and functionality.

## Installation and Local Setup

If you'd like to run the app locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anshul45-github/ai-companion.git
   cd ai-companion
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a **.env.local** file in the root directory and add the necessary environment variables. For example:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   GEMINI_API_KEY=your_gemini_api_key
   BEATOVEN_AI_API_KEY=your_beatoven_api_key
   DATABASE_URL="your_mongodb_connection_string"
   STRIPE_API_KEY=your_stripe_secret_key
   NEXT_PUBLIC_APP_URL=your_localmachine_development_url
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_CRISP_ID="your_crisp_website_id"
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the app**:
   Visit **your_development_url** in your browser.

## Contributions
As this is a personal project, I am not actively seeking contributions. However, if you have suggestions, feedback, or ideas for improvement, feel free to open an issue on GitHub or reach out to me directly. I appreciate any input that can help make this project better!

## Contact
If you have any questions, would like to discuss this project further, or are interested in collaborating, please don't hesitate to reach out:
- **Email**: anshulmendiratta10d@gmail.com
- **Linkedin**: https://www.linkedin.com/in/anshul-mendiratta-a49b362b0/
