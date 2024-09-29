To enhance your README, I'll focus on improving clarity, structure, and adding more detailed explanations where necessary. Here’s the enhanced version:

---

# **StackUp HelpDesk Discord Bot**  
![Bot Image](https://github.com/SinghShubhamkumarkrishnadev/Bounty-Llama-Chatbot-with-Sentiment-Analysis-Integration/blob/main/videos.png)

This bot serves as a **virtual helpdesk** for StackUp users, providing quick and efficient responses to common FAQs about StackUp challenges and events. It integrates AI-powered responses for complex queries, ensuring that users always have the support they need.

## **Table of Contents**  
1. [Introduction](#introduction)  
2. [Features](#features)  
3. [Prerequisites](#prerequisites)  
4. [Setup Instructions](#setup-instructions)  
5. [Usage](#usage)  
6. [Bot Commands](#bot-commands)  
7. [API Integration](#api-integration)  
8. [Environment Variables](#environment-variables)  

---

## **Introduction**  
The **StackUp HelpDesk Discord Bot** is designed to assist users by answering frequently asked questions (FAQs) related to StackUp events. By utilizing AI-powered responses through the **Google Gemini API**, the bot can respond intelligently to queries, even when they fall outside of predefined FAQs. The bot can also search for relevant articles from the **StackUp Zendesk Help Centre** if connected via API.

This project is especially useful for developers participating in StackUp events, providing quick access to information about deadlines, submissions, and general participation rules.

---

## **Features**  
- **FAQ Querying**: The bot instantly responds to commonly asked questions about StackUp events.
- **AI-Powered Responses**: If a query is not covered by the FAQ, the bot uses **Google’s Gemini API** to generate a meaningful response.
- **Zendesk Integration**: When configured, the bot can fetch relevant articles from the StackUp **Zendesk Help Centre**.
- **Fallback Support**: For unhandled queries, the bot provides users with links to relevant resources or articles from the Zendesk knowledge base.
- **Command Support**: It supports both prefix-based commands (e.g., `!ask`) and modern Discord **slash commands** (e.g., `/ask`).

---

## **Prerequisites**
Before setting up the bot, make sure you have the following:
- [Node.js](https://nodejs.org/) (v14 or later)
- A [Discord Developer Account](https://discord.com/developers/applications) and a bot token.
- Zendesk API token (optional for Zendesk article search).
- Access to the **Google Gemini API** for AI-powered responses.

---

---

## **Demo Video**  
For a step-by-step guide on setting up and using the bot, watch the [demo video](https://youtu.be/lOwMWzFHDWg?feature=shared).

<a href="https://youtu.be/lOwMWzFHDWg?feature=shared">
    <img src="https://github.com/SinghShubhamkumarkrishnadev/Bounty-Llama-Chatbot-with-Sentiment-Analysis-Integration/blob/main/videos.png" width="400" height="300" alt="Watch the demo video">
</a>

---

## **Setup Instructions**

### **Step 1: Clone the Repository**
Clone the bot's repository to your local machine:
```bash
git clone https://github.com/SinghShubhamkumarkrishnadev/Discord-Bot.git
cd Discord-Bot
```

### **Step 2: Install Dependencies**
Run the following command to install necessary dependencies:
```bash
npm install
npm install dotenv discord.js axios
```

### **Step 3: Create a `.env` File**
Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DISCORD_TOKEN=your_discord_bot_token
GEMINI_API_KEY=your_gemini_api_key
ZENDESK_SUBDOMAIN=stackuphelpcentre  # Example: stackuphelpcentre.zendesk.com
ZENDESK_API_TOKEN=your_zendesk_api_token
```

### **Step 4: Configure Slash Commands (Optional)**
If you want to use slash commands, set your **guild ID** in the code:
```js
const guildId = 'YOUR-GUILD-ID';  // Replace with your actual Discord server (guild) ID
```

### **Step 5: Run the Bot**
After configuring the environment variables, start the bot by running:
```bash
node index.js
```

---

## **Usage**

Once the bot is online, you can interact with it via traditional **prefix commands** or **slash commands** in Discord. 

- **Example (Prefix Command)**:
  ```bash
  !ask How do I submit my project?
  ```
  **Response**: `You can submit your project through the official StackUp challenge portal under 'Submit Project'.`

- **Example (Slash Command)**:
  ```bash
  /ask How do I submit my project?
  ```
  **Response**: `You can submit your project through the official StackUp challenge portal under 'Submit Project'.`

If the bot cannot find an answer in its FAQ, it will either fetch articles from Zendesk (if integrated) or use the Gemini API to generate a response.

---

## **Bot Commands**

### **Prefix-Based Commands**
- **`!ask [your query]`**: Asks the bot a question, and it will search for a relevant answer from the FAQ or the Gemini API.

### **Slash Commands**
- **`/ask [query]`**: Provides the same functionality as the prefix command but utilizes Discord’s slash command interface for a more modern user experience.

---

## **API Integration**

### **Google Gemini API**  
The bot integrates with Google’s **Gemini API** to generate natural language responses when a question doesn't match any predefined FAQ entry. You will need to set up your **GEMINI_API_KEY** for this integration.

### **Zendesk API (Optional)**  
To enhance the bot’s capabilities, you can integrate it with the **Zendesk Help Centre API**. This allows the bot to fetch and suggest relevant help articles directly from StackUp's Zendesk portal. If you don’t have API access, the bot will still function using the static FAQ and Gemini fallback options.

---

## **Environment Variables**

To configure the bot, use the following environment variables in your `.env` file:

- **DISCORD_TOKEN**: Your Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications).
- **GEMINI_API_KEY**: API key for Google’s Gemini API, which is used to generate responses when the FAQ doesn’t have an answer.
- **ZENDESK_SUBDOMAIN**: The subdomain of the StackUp Help Centre (e.g., `stackuphelpcentre`).
- **ZENDESK_API_TOKEN**: API token for accessing Zendesk articles (if using Zendesk integration).

---
