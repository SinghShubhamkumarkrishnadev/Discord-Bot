
---

# **StackUp HelpDesk Discord Bot**

This Discord bot serves as a virtual helpdesk for users of StackUp, providing assistance through common FAQs and fallback options to the StackUp Help Centre. The bot can respond to user queries, search for relevant information, and integrate large language models (LLMs) like Google Gemini for more comprehensive responses when needed.

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Bot Commands](#bot-commands)
6. [API Integration](#api-integration)
7. [Environment Variables](#environment-variables)

## **Introduction**
The StackUp HelpDesk Discord Bot is designed to assist users by answering commonly asked questions about StackUp challenges and events. It helps users by fetching relevant FAQ answers and, when possible, connects them to the StackUp Help Centre. The bot also leverages AI through the Gemini API to generate responses when the FAQ doesn't have an answer. This project is especially useful for developers participating in StackUp challenges or events and allows for quick access to support.

## **Features**
- **FAQ Querying**: The bot provides answers to predefined FAQs from StackUp's Help Centre.
- **AI-Powered Responses**: If a question isn't covered in the FAQs, the bot uses Google’s Gemini API to generate a helpful response.
- **Help Centre Redirection**: If the bot can't answer a question, it directs users to the StackUp Help Centre for further assistance.
- **Slash Command Support**: The bot supports both traditional prefix-based commands and modern slash commands for enhanced user experience.
  
## **Setup Instructions**

### **Prerequisites**
- Node.js (v14 or above)
- Discord Developer Account
- Zendesk api Token
- Zendesk subdomain
- Access to Google Gemini API


## Must Watch Demo Video 
<a href="https://youtu.be/lOwMWzFHDWg?feature=shared">
    <img src="https://github.com/SinghShubhamkumarkrishnadev/Bounty-Llama-Chatbot-with-Sentiment-Analysis-Integration/blob/main/videos.png" width="400" height="300" alt="Watch the video">
</a>
  
### **Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SinghShubhamkumarkrishnadev/Discord-Bot.git
   cd Discord-Bot
   ```

2. **Install Dependencies**
   ```bash
   npm install -y
   ```
   ```bash
   npm install dotenv discord.js axios 
   ```

3. **Create `.env` File**
   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   DISCORD_TOKEN=your_discord_bot_token
   GEMINI_API_KEY=your_gemini_api_key
   ZENDESK_SUBDOMAIN=stackuphelpcentre  
   ZENDESK_API_TOKEN=your_zendesk_api_token
   ```
4. **Adding GUILD_ID**
   ```
   const guildId = 'YOUR-GUILD-ID';  // Guild ID where the command should be registered
   ``` 

4. **Run the Bot**
   After setting up the `.env` file, you can run the bot:

   ```bash
   node index.js
   ```

## **Usage**

After the bot is running, you can interact with it in your Discord server using the `!ask` command or the `/ask` slash command.

### **Example Usage**:
- **User**: `!ask How do I submit my project?`
- **Bot**: `You can submit your project through the official StackUp challenge portal under 'Submit Project'.`

- **User**: `/ask How do I submit my project?`
- **Bot**: `You can submit your project through the official StackUp challenge portal under 'Submit Project'.`

If the question is not found in the FAQ, the bot will either attempt to fetch a response using the Gemini API or redirect the user to the StackUp Help Centre.

## **Bot Commands**

### **Prefix Command**
- **`!ask [your query]`**: Asks the bot a question, and it will try to fetch a relevant answer from the FAQ or the Gemini API.

### **Slash Command**
- **`/ask [query]`**: The same functionality as the prefix command but uses the modern slash command interface in Discord.

## **API Integration**

### **Google Gemini API**
The bot uses Google Gemini to generate responses when the question doesn't match any known FAQ entry. To use this API, ensure you have a valid `GEMINI_API_KEY`.

### **Zendesk API**
If you have access to the StackUp Zendesk Help Centre API, you can integrate it into the bot. This allows the bot to fetch articles directly from the help centre. If you don’t have API access, the bot will still function using static FAQs and Gemini fallback.

## **Environment Variables**

- **DISCORD_TOKEN**: Your Discord bot token. Get this from the [Discord Developer Portal](https://discord.com/developers/applications).
- **GEMINI_API_KEY**: API key for Google Gemini, used for LLM responses.
- **ZENDESK_SUBDOMAIN**: Subdomain of the StackUp Help Centre, in case Zendesk API access is granted.
- **ZENDESK_API_TOKEN**: API token for accessing Zendesk articles.
