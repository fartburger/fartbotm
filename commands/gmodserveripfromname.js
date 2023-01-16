const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gmodipfromname")
        .setDescription("get a gmod server's ip from a name")
        .addStringOption(option =>
            option
            .setName("name")
            .setDescription("name of server (doesnt have to be exact)")
            .setRequired(true)),
    async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
        var namefilter = interaction.options.getString("ip")
        queryMasterServer('hl2master.steampowered.com:27011',REGIONS.ALL, {gamedir: "Garrysmod",name_match: [namefilter]},15000)
        .then(servers => {
            infoEmbed.setTitle("Matching Servers"+response.name)
            infoEmbed.setColor("DARK_RED")
            infoEmbed.addFields(
                {name:"Found Servers: ",value: `\`\`\`${servers}\`\`\``}
            )
        })
        .catch(e => {
            console.error(e)
        })
        await interaction.reply({embeds: [infoEmbed]})
    }
};