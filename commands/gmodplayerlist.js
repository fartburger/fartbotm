const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gmodplayerlist")
        .setDescription("get a gmod server's player list from its ip")
        .addStringOption(option =>
            option
            .setName("ip:port")
            .setDescription("ip and port of server")
            .setRequired(true)),
    async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
        queryGameServerInfo(interaction.options.getString("ip:port")).then(response => {
            //console.log(response)
            infoEmbed.setTitle("Players on "+response.name)
            infoEmbed.setColor("DARK_RED")
            infoEmbed.addFields(
                {name:"Player List: ",value: `\`\`\`${response.players}\`\`\``}
            )
        })
        .catch(e => {
            console.error(e)
        })
        await interaction.reply({embeds: [infoEmbed]})
    }
};