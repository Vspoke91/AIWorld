const LOGOS_PATH = "/img/logos/";

const tags = {
    free: {
        text: 'Free',
        color: 'rgb(1, 71, 11)'
    },
    paid: {
        text: 'Paid',
        color: 'rgb(141, 3, 3)'
    }
}

export const categories = {
    chat: {
        text: 'Chat',
        color: 'rgb(1, 71, 11)'
    },
    login: {
        text: 'Login equired',
        color: 'rgb(141, 3, 3)'
    },
    discord: {
        text: 'Discord',
        color: 'rgb(141, 3, 3)'
    },
    graphics: {
        text: 'Images & Graphics',
        color: 'rgb(141, 3, 3)'
    },
}

const items = [
    {
        title: "ChatGPT",
        webLink: "https://chat.openai.com/",
        logo: LOGOS_PATH+"ChatGPT.svg",
        description: "ChatGPT is an AI-powered chatbot that can hold conversations with users on a wide range of topics.",
        category: [categories.chat.text,  categories.login.text],
        tagType: tags.free,
    },
    {
        title: "BlueWillow",
        webLink: "https://www.bluewillow.ai/",
        logo: LOGOS_PATH+"BlueWillow.png",
        description: "AI-powered tool that can generate a wide variety of graphics based on user input.",
        category: [categories.graphics.text, categories.login.text, categories.discord.text],
        tagType: tags.free
    },
    {
        title: "Midjourney",
        webLink: "https://www.midjourney.com/",
        logo: LOGOS_PATH+"Midjourney.png",
        description: "Midjourney is a technology that uses artificial intelligence to generate images from natural language descriptions, which are called 'prompts'.",
        category: [categories.graphics.text, categories.login.text, categories.discord.text],
        tagType: tags.free
    },
    {
        title: "DeepAI",
        webLink: "https://deepai.org/",
        logo: LOGOS_PATH+"DeepAI.png",
        description: "AI Chat is an AI chatbot that writes text. You can use it to write stories, messages, or programming code. You can use the AI chatbot as a virtual tutor in almost any subject.",
        category: [categories.chat.text, categories.graphics.text],
        tagType: tags.free
    },
    {
        title: "Hotpot",
        webLink: "https://hotpot.ai/",
        logo: LOGOS_PATH+"Hotpot.png",
        description: "Hotpot helps you create amazing graphics, pictures, and writing.",
        category: [categories.graphics.text],
        tagType: tags.free
    },
]
export default items;