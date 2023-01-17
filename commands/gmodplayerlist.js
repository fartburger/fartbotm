const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const {SlashCommandBuilder,EmbedBuilder, Constants} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gmodplayerlist")
        .setDescription("get a gmod server's player list from its ip")
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
            .setTitle("Players on "+response.name)
            .setColor("Blurple")
            .addFields({name:"Player List: ",value: `\`\`\`${response.players}\`\`\``})
            await interaction.reply({embeds: [infoEmbed]})
        })
        .catch(e => {
            console.error(e)
        })

    }
};