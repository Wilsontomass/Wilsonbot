const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
    var generalChannel = client.channels.cache.get("channel_id") // Replace with known channel ID
    generalChannel.send("Hello, I am alive! My name is wilsonbot and i am super cool. Created by Tomass")

    client.user.setActivity(".help", {type: "LISTENING"})
})

// Server status code
const request = require("request-promise");
const config = {
    commands: {
        help: {
            command: ".help",
            reply: "Here are my commands:"
        },
        hi: {
            command: ".hi",
            reply: "Hi!!!!!!"
        },
        whobest: {
            command: ".who is the best"
        },
        wilson: {
            command: ".wilson",
            secret: true
        },
        clear: {
            command: ".clear",
            secret: true
        }
    },
};

for (key in config.commands) {
    command = config.commands[key];
    if (command.hasOwnProperty("secret") && command["secret"]) {
        continue;
    }
    config.commands.help.reply = config.commands.help.reply.concat("\n", command.command);
}

// IMPORTANT: You need to run "npm install request" (without quotes) in your terminal before executing this script

client.on('message', message => {
    if (message.author == client.user) {
        return
    }
    for (var key in config.commands) {
        if (config.commands.hasOwnProperty(key)) {
            if (message.content === config.commands[key].command) {
                if (config.commands[key].hasOwnProperty("reply")) {
                    message.reply(config.commands[key].reply);
                }
                if (config.commands[key].hasOwnProperty("react")) {
                    message.react(config.commands[key].react);
                }
            }
        }
    }
    if (message.content === config.commands.clear.command) {
        clear(message.channel)
    }
    else if (message.content === config.commands.whobest.command) {
        react_wholesome(message)
    }
    else if (message.content === config.commands.wilson.command) {
        react_wilson(message)
    }
});

async function react_wholesome(message) {
    try {
		await message.react("🇾");
		await message.react("🇴");
		await message.react("🇺");
        await message.react("💖");
        await message.react("🇦");
		await message.react("🇷");
		await message.react("🇪");
	} catch (error) {
		console.error('One of the emojis failed to react.');
        console.log(error)
	}
}

async function react_wilson(message) {
    try {
		await message.react("🇼");
		await message.react("🇮");
		await message.react("🇱");
        await message.react("🇸");
		await message.react("🇴");
		await message.react("🇳");
	} catch (error) {
		console.error('One of the emojis failed to react.');
        console.log(error)
	}
}

async function clear(channel) {
    const fetched = await channel.messages.fetch({limit: 99});
    channel.bulkDelete(fetched);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

bot_secret_token = "paste token here"

client.login(bot_secret_token)
