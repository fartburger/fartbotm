const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("slash command test"),
    async execute(interaction) {
        await interaction.reply(`tested by <@!${interaction.user.id}>`)
    }
};