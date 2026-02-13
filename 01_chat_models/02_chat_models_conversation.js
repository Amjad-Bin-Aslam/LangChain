import { SystemMessage, HumanMessage, humanInTheLoopMiddleware } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

// Load env
dotenv.config();

// create a AI Model
const llm = new ChatOpenAI({
    model: 'nvidia/nemotron-3-nano-30b-a3b:free',
    apiKey: process.env.API_KEY,
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1'
    }
})


// set Human message and system message
const message = [
    new SystemMessage("You are an AI assistan!"),
    new HumanMessage("What is the capital Of USA?")
]

// invoke the model
async function runChat() {
    const response = await llm.invoke(message)
    console.log(response.content)
}


runChat();