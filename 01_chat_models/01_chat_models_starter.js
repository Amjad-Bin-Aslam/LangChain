import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

// load env file
dotenv.config();

//  create a function that create and invoke and the AI Model
const runChat = async () => {
    const llm = new ChatOpenAI({
        model: 'nvidia/nemotron-3-nano-30b-a3b:free',
        apiKey: process.env.API_KEY,
        configuration: {
            baseURL: 'https://openrouter.ai/api/v1'
        }
    })
    const res = await llm.invoke("What is the capital of pakistan>")

    console.log(res.content)

}

// execute the function
runChat();