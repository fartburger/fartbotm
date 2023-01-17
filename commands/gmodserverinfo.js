const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gmodserverinfo")
        .setDescription("get a gmod server's status from its ip")
        .addStringOption(option =>
            option
            .setName("ip")
            .setDescription("ip:port of server")
            .setRequired(true)),
    async execute(interaction) {
        queryGameServerInfo(interaction.options.getString("ip")).then(async response => {
            //console.log(response)
            serverresponse=response;  
            const infoEmbed = new EmbedBuilder()
            .setTitle(`Information for ${response.name}`)
            .setColor("Blurple")
            .addFields(
                {name: "Game: ",value:response.game,inline:true},
                {name:"Map: ",value:response.map,inline:true},
                {name:"Player Count: ",value:response.players,inline:true}
            )
            await interaction.reply({embeds: [infoEmbed]})
        })
        .catch(e => {
            console.error(e)
        })

    }
};