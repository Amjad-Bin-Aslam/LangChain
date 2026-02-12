import dotenv, { config } from "dotenv"
import { ChatOpenAI } from "@langchain/openai"

dotenv.config();

async function runChat() {
    const llm = new ChatOpenAI({
        model: 'nvidia/nemotron-3-nano-30b-a3b:free',
        apiKey: process.env.API_KEY,
        configuration: {
            baseURL: 'https://openrouter.ai/api/v1'
        }
    })
    
    const res = await llm.invoke("Hello, what is the capital of Pakistan?")
    console.log(res.content)
}

runChat();