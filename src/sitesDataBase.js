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

const items = [
    {
        title: "ChatGPT",
        webLink: "https://chat.openai.com/",
        logo: LOGOS_PATH+"ChatGPT.svg",
        description: "ChatGPT is an AI-powered chatbot that can hold conversations with users on a wide range of topics.",
        category: ['Chat', 'Login'],
        tagType: tags.free,
    },
    {
        title: "BlueWillow",
        webLink: "https://www.bluewillow.ai/",
        logo: LOGOS_PATH+"BlueWillow.png",
        description: "AI-powered tool that can generate a wide variety of graphics based on user input.",
        category: ['Images & Graphics', 'Login', 'Discord'],
        tagType: tags.free
    },
    {
        title: "Midjourney",
        webLink: "https://www.midjourney.com/",
        logo: LOGOS_PATH+"Midjourney.png",
        description: "Midjourney is a technology that uses artificial intelligence to generate images from natural language descriptions, which are called 'prompts'.",
        category: ['Images & Graphics', 'Login', 'Discord'],
        tagType: tags.free
    },
    {
        title: "DeepAI",
        webLink: "https://deepai.org/",
        logo: LOGOS_PATH+"DeepAI.png",
        description: "AI Chat is an AI chatbot that writes text. You can use it to write stories, messages, or programming code. You can use the AI chatbot as a virtual tutor in almost any subject.",
        category: ['Chat', 'Images & Graphics', 'No-login'],
        tagType: tags.free
    },
    {
        title: "Hotpot",
        webLink: "https://hotpot.ai/",
        logo: LOGOS_PATH+"Hotpot.png",
        description: "Hotpot helps you create amazing graphics, pictures, and writing.",
        category: ['Images & Graphics', 'No-login'],
        tagType: tags.free
    },
]
export default items;