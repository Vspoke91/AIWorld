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
        category: ['Chat','Searching'],
        tagType: tags.free,
    },
    {
        title: "BlueWillow",
        webLink: "https://www.bluewillow.ai/",
        logo: LOGOS_PATH+"BlueWillow.png",
        description: "AI-powered tool that can generate a wide variety of graphics based on user input.",
        category: ['Images', 'Art', 'Graphics'],
        tagType: tags.free
    },
]
export default items;