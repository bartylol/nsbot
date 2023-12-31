// HoofByte/bartylol -  Aug 1st, 2023
// the bot - nightstorm 3

const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ] 
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) { 
    client.commands.set(command.data.name, command);
} else {
    console.log('[WARNING] The command at '${filePath}' is missing a required "data" or "execute" property.'); 
     }
}

client.once(Events.ClientReady, c => {
    console.log('Ready and Logged in.');
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});  

client.login(config.token);
