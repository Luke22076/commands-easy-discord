```md
# discord-easy-commands

A simple command handler for Discord.js bots.

## 📦 Installation

To install the package, run the following command in the terminal:

```sh
npm install discord-easy-commands
```

## 🚀 Usage

### 1️⃣ **Project Structure**

Your project structure might look like this:

```
/my-bot
 ├── /commands
 │   ├── ping.js
 ├── bot.js
```

### 2️⃣ **Create Commands**

Create a file in the `/commands` folder, for example `ping.js`:

#### **`commands/ping.js`**

```js
module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    execute(message, args) {
        message.reply('🏓 Pong!');
    }
};
```

In this file, you're defining the `ping` command. When someone types `!ping` in the chat, the bot will respond with "🏓 Pong!".

### 3️⃣ **Set up the Bot Code**

Create a `bot.js` file (or name it whatever you like) in your main project folder and import `discord-easy-commands`:

#### **`bot.js`**

```js
const { Client, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('discord-easy-commands');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Load commands from the 'commands' folder
const commands = loadCommands('./commands');

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith("!") || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (command) {
        command.execute(message, args);  // Execute the command
    }
});

client.login(process.env.TOKEN);  // Your bot token
```

### 4️⃣ **Start the Bot**

Once you've set up the code, you can start the bot by running the following command in the terminal:

```sh
node bot.js
```

Now, your bot will respond to commands like `!ping` and reply with "🏓 Pong!".

## 🌟 Features

✅ **Automatic Command Loading** – All commands in the specified folder are automatically loaded.  
✅ **Prefix Commands Support** – Commands are triggered using a prefix (e.g., `!`).  
✅ **Easy to configure** – The command handler is simple to integrate and use.  
✅ **Clean Code Structure** – Each command is placed in its own file in the `commands` folder.

## 📂 Directory Structure

- **`/commands`** – This folder contains all your command files.
- **`bot.js`** – This file contains the Discord bot setup and command handler.

---

### **Troubleshooting:**

- **Command not found:** Ensure that the `name` property in your command file is correctly set (e.g., `name: 'ping'`).
- **Bot is not responding:** Make sure the bot is logged in with a valid token, and that the `commands` folder exists and contains correctly named files.

---

## 📝 License

This package is licensed under the **MIT License**.
```

---
