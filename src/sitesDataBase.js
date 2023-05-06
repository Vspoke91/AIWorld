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
        tittle: "ChatGPT",
        logo: LOGOS_PATH+"ChatGPT.svg",
        description: "ChatGPT is an AI-powered chatbot that can hold conversations with users on a wide range of topics.",
        category: ['Chat','Searching'],
        tagType: tags.free,
    },
    {
        tittle: "BlueWillow",
        logo: LOGOS_PATH+"BlueWillow.png",
        description: "AI-powered tool that can generate a wide variety of graphics based on user input.",
        category: ['Images', 'Art', 'Graphics'],
        tagType: tags.free
    },
]
export default items;