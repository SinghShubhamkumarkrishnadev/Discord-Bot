// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules from the Discord.js library
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const axios = require('axios');  // For making HTTP requests to external APIs

// Initialize the Discord client with specific intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // Enables bot to receive events related to guilds (servers)
        GatewayIntentBits.GuildMessages,    // Enables bot to receive messages sent in guilds
        GatewayIntentBits.MessageContent    // Enables bot to read the content of messages
    ]
});

// Define command prefix for the bot (e.g., !ask)
const PREFIX = '!';

// FAQ data: A collection of common StackUp FAQs and their answers
const faqs = {
    "Can I resubmit my submission?": "No, you can't resubmit the submission.",
    "Why am I only approved even if I joined before reaching the max. no of participants?": "Approval depends on several factors like verification and compliance.",
    "Which countries are not supported by StackUp?": "Currently, StackUp doesn't support countries under sanctions or with legal restrictions.",
    "What is the deadline for submissions?": "The deadline for submissions can vary per challenge. Please check the challenge page for the latest information.",
    "How can I contact StackUp support?": "You can contact StackUp support via the Help Center: https://stackuphelpcentre.zendesk.com/hc/en-us.",
    "What are the requirements for participating in StackUp events?": "Participation requirements include signing up on StackUp, complying with rules, and meeting eligibility criteria.",
    "Can I participate in multiple StackUp challenges?": "Yes, you can participate in multiple challenges unless specified otherwise.",
    "What happens if I miss the deadline?": "Late submissions are generally not accepted. Please ensure to submit before the deadline.",
    "How do I submit my project?": "You can submit your project through the official StackUp challenge portal under 'Submit Project'.",
    "What programming languages are allowed?": "You can use any programming language unless the challenge specifies otherwise.",
    "What is the maximum team size?": "The maximum team size is typically 4 members, but please verify for each specific challenge.",
    "Where can I find the official rules?": "The official rules can be found on the StackUp event page or the Discord rules section.",
    "How are winners chosen?": "Winners are chosen based on creativity, functionality, and code quality as per the challenge's judging criteria."
};

// Event listener when the bot is ready
client.once('ready', () => {
    console.log('🤖 Bot is online!');
});

// Function to fetch articles from Zendesk based on a query
async function getZendeskArticles(query) {
    // Construct the Zendesk API URL for searching articles
    const url = `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/help_center/articles/search.json?query=${encodeURIComponent(query)}`;
    
    try {
        // Make a GET request to Zendesk API with authorization token
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.ZENDESK_API_TOKEN}` // Use Bearer token for authentication
            }
        });
        // Return the results if found, otherwise return an empty array
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching articles from Zendesk:', error);
        return [];  // Return an empty array if the API call fails
    }
}

// Event listener for message creation (triggers on each new message)
client.on('messageCreate', async (message) => {
    // Ignore messages that don't start with the command prefix or if the author is a bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // Parse the message into command and arguments
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // If the command is "ask", proceed with FAQ lookup or API queries
    if (command === 'ask') {
        const query = args.join(' ');  // Combine the arguments into a single query string
        const faqResponse = getFaqResponse(query);  // Check if the query matches any FAQ

        if (faqResponse) {
            message.channel.send(faqResponse);  // Respond with the FAQ answer if found
        } else {
            // If no FAQ match, fetch articles from Zendesk related to the query
            const articles = await getZendeskArticles(query);
            if (articles.length > 0) {
                // Format the articles into a response string
                const articlesResponse = articles.map(article => `${article.title}: ${article.html_url}`).join('\n');
                message.channel.send(`🤖 Here are some articles that might help:\n${articlesResponse}`);
            } else {
                // If no articles found, fall back to Gemini API for generating a response
                const response = await getGeminiResponse(query);
                message.channel.send(`🤖 ${response}`);
            }
        }
    }
});

// Function to check if the query matches an existing FAQ entry
function getFaqResponse(query) {
    return faqs[query] || null;  // Return the FAQ answer if it exists, otherwise null
}

// Function to fetch a response from the Gemini API using a query
async function getGeminiResponse(query) {
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
    const apiKey = process.env.GEMINI_API_KEY;  // Gemini API key from environment variables
  
    try {
        // Send a POST request to the Gemini API to generate a response based on the query
        const response = await axios.post(`${apiUrl}?key=${apiKey}`, {
            prompt: query,          // The user's query as the prompt
            max_tokens: 150,        // Limit the generated response to 150 tokens
        }, {
            headers: {
                'Content-Type': 'application/json',  // Set request headers
            }
        });
  
        // Return the generated response text
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching from Gemini API: ", error);
        return "🤖 Sorry, I couldn't fetch the response from Gemini at the moment.";  // Fallback error message
    }
}

// Event listener for interactions (e.g., slash commands)
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;  // Only proceed for commands

    const { commandName, options } = interaction;

    // Handle the "ask" slash command
    if (commandName === 'ask') {
        const query = options.getString('query');
        const faqResponse = getFaqResponse(query);

        if (faqResponse) {
            await interaction.reply(faqResponse);  // Reply with FAQ answer if found
        } else {
            // Fetch Zendesk articles if no FAQ match
            const articles = await getZendeskArticles(query);
            if (articles.length > 0) {
                // Send articles response if available
                const articlesResponse = articles.map(article => `${article.title}: ${article.html_url}`).join('\n');
                await interaction.reply(`🤖 Here are some articles that might help:\n${articlesResponse}`);
            } else {
                // Fall back to Gemini API response if no articles found
                const response = await getGeminiResponse(query);
                await interaction.reply(`🤖 ${response}`);
            }
        }
    }
});

// Function to register slash commands in a specific guild
client.once('ready', async () => {
    const guildId = 'YOUR-GUILD-ID';  // Guild ID where the command should be registered
    const guild = client.guilds.cache.get(guildId);

    if (guild) {
        // Register the "ask" command with a required "query" option
        await guild.commands.set([{
            name: 'ask',
            description: 'Ask the bot a question',
            options: [{
                name: 'query',
                type: 3,  // Type 3 represents a string option
                description: 'The question you want to ask',
                required: true,  // The query is mandatory
            }],
        }]);
        console.log('Slash command registered.');
    }
});

// Log in the bot using the token stored in environment variables
client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log('Logged in successfully.');
});
