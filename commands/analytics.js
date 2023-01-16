const {SlashCommandBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("analytics")
        .setDescription("command usage statitics"),
    async execute(interaction) {
        var data = fileSystem.readFileSync('analytics.json');
        var jdata = JSON.parse(data)
        console.log(JSON.parse(data))
        await interaction.reply(`\`\`\`fartbot analytics: 
# of users doxxed by fartbot: ${jdata.doxxes} \`\`\``)
    }
};