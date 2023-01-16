const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gmodipfromname")
        .setDescription("get a gmod server's ip from a name")
        .addStringOption(option =>
            option
            .setName("ip")
            .setDescription("ip:port of server")
            .setRequired(true)),
    async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
        var namefilter = interaction.options.getString("ip")
        queryMasterServer('hl2master.steampowered.com:27011',REGIONS.ALL, {gamedir: "Garrysmod",name_match: [namefilter]},timeout)
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