import dotenv from "dotenv"
import { HumanMessage, AIMessage, SystemMessage } from "langchain"
import { ChatOpenAI } from "@langchain/openai"
import readline from "readline"

dotenv.config();

// create a model
const model = new ChatOpenAI({
    model: 'nvidia/nemotron-3-nano-30b-a3b:free',
    apiKey: process.env.API_KEY,
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1'
    }
})

//  chat hiistory array to save the previous chat
const chatHistory = [];

// system message for setting the AI behavior
const systemMessage = new SystemMessage("You are a helpful AI assistant. Remember the context from previous chat");

// function to send message and save history
async function chat(userInput) {
    try {

        const userMessage = new HumanMessage(userInput);
        // save user message to chat history array
        chatHistory.push(userMessage);

        // save system message to chatHistory array
        const messages = [systemMessage, ...chatHistory];

        // AI response 
        const response = await model.invoke(messages)

        // save AI response to chat history
        const aiResponse = new AIMessage(response.content)
        chatHistory.push(aiResponse)

        console.log(`\nAssistant: ${response.content}\n`)

        // show chat history
        console.log("------Chat History------")
        chatHistory.forEach((msg, index) => {
            const role = msg._getType() === 'human' ? "You" : 'Assistant'
            console.log(`${index + 1}. ${role}: ${msg.content}`);
        });
        console.log("--------------")

        return response.content;


    } catch (error) {
        console.error("Error: ", error)
    }
}


// start interactive chat with readline
async function startInteractiveChat() {
    const input_And_Output = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    // welcome message and insturction to exit the chat
    console.log("Chat started. Type 'exit' to quit\n");

    // recursive function that ask questin again and agian
    const askQuestion = () => {
        input_And_Output.question("You: ", async (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log("Goodbye!")
                input_And_Output.close();
                return;
            }

            if (input.trim()) {
                await chat(input) 
            }

            askQuestion();
        });
    };

    askQuestion();

};

startInteractiveChat();
