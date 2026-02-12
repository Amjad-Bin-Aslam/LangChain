import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';

dotenv.config();

async function runChat() {
    const llm = new ChatOpenAI({
        model: 'nvidia/nemotron-3-nano-30b-a3b:free',
        apiKey: process.env.API_KEY,
        configuration: {
            baseURL: 'https://openrouter.ai/api/v1', // required for OpenRouter
        },
        temperature: 0.7,
    });

    const res = await llm.invoke("What is the capital of Pakistan?");

    console.log(res.content);
}

runChat().catch(console.error);
