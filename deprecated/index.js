// HoofByte/bartylol -  Aug 1st, 2023
// the bot - nightstorm 3

// header
const fs = require('node:fs');
const path = require('node:path');
const sequelize = require('./database.js');
const Character = require('./models/Character.js');
const Race = require('./models/Race.js');
const Class = require('./models/Class.js');
const Ability = require('./models/Ability.js');
const Quest = require('./models/Quest.js');
const QuestProgress = require('./models/QuestProgress.js');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token, guildId, clientId } = require('./config.json');

sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.log('Error: ' + err));

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ] 
});

// setting up subdirectory for commands then ensuring those commands are put into relevant subsubdirectories.
// some error handling.

client.commands = new Collection();


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
    	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
    
    if ('data' in command && 'execute' in command) { 
    client.commands.set(command.data.name, command);
} else {
    console.log('[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.');
     }
}
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

        try {
        await command.execute(interaction);
        } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

});  


/*const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                        commands.push(command.data.toJSON());
                } else {
                        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
        }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
        try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: commands },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
        }
*/

// when the code is clean you will be logged in. 

client.once(Events.ClientReady, c => {
    console.log('Ready and Logged in.');
});

client.login(token);
