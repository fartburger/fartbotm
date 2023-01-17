const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')
var serverresponse = {}
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
        queryGameServerInfo(interaction.options.getString("ip")).then(response => {
            //console.log(response)
            serverresponse=response;  
        })
        .catch(e => {
            console.error(e)
        })
        const infoEmbed = new EmbedBuilder()
        .setTitle(`Information for ${serverresponse.name}`)
        .setColor("Blurple")
        .addFields(
            {name: "Game: ",value:serverresponse.game,inline:true},
            {name:"Map: ",value:serverresponse.map,inline:true},
            {name:"Player Count: ",value:serverresponse.players,inline:true}
        )
        await interaction.reply({embeds: [infoEmbed]})
    }
};