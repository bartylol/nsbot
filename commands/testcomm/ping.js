const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
		   option.setName('input')
			.setDescription('Pong!~')
			.setRequired(true));

const execute = async interaction => {
	await interaction.reply(`Pong!~`);
        };
module.exports = {
	data,
	execute
};
