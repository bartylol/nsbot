const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Character = require('../../models/Character.js');
const Race = require('../../models/Race.js');
const Class = require('../../models/Class.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-character')
    .setDescription('Create a new character.')
    .addStringOption(option => option.setName('name').setDescription('Enter character name').setRequired(true))
    .addStringOption(option => option.setName('race').setDescription('Enter character race').setRequired(true))
    .addStringOption(option => option.setName('class').setDescription('Enter character class').setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const raceName = interaction.options.getString('race');
    const className = interaction.options.getString('class');

    const race = await Race.findOne({ where: { name: raceName } });
    const cls = await Class.findOne({ where: { name: className } });

    if (!race || !cls) {
      return interaction.reply('Invalid race or class.');
    }

    const character = await Character.create({
      name,
      userId: interaction.user.id,
      raceId: race.id,
      classId: cls.id
    });

    const embed = new MessageEmbed()
      .setTitle('Character Created')
      .setDescription(`A new character named ${name} has been created.`)
      .addField('Race', race.name, true)
      .addField('Class', cls.name, true);

    return interaction.reply({ embeds: [embed] });
  }
};
