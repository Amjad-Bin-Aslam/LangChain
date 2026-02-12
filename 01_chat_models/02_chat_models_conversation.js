import { SystemMessage, HumanMessage } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
    model: 'nvidia/nemotron-3-nano-30b-a3b:free',
    apiKey: process.env.API_KEY,
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1'
    }
})

const message = [
    new SystemMessage("Your are an expert in social media content strategy"),
    new HumanMessage("Give a short tip to create engaging posts on instagram")
]

llm.invoke(message)
    .then(result => {
        console.log(result.content)
    })
    .catch(error => {
        console.error(error)
    })