const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gmodserverinfo")
        .setDescription("get a gmod server's status from its ip")
        .addStringOption(option =>
            option
            .setName("ip:port")
            .setDescription("ip and port of server")
            .setRequired(true)),
    async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
        queryGameServerInfo(interaction.options.getString("ip:port")).then(response => {
            //console.log(response)
            infoEmbed.setTitle("Information for server "+response.name)
            infoEmbed.setColor("DARK_RED")
            plys = response.players
            infoEmbed.addFields(
                {name: "Game:",value:response.game},
                {name:"Map:",value:response.map},
                {name:"Player Count: ",value:response.players},
            )
            
        })
        .catch(e => {
            console.error(e)
        })
        await interaction.reply({embeds: [infoEmbed]})
    }
};