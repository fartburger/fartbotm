const {SlashCommandBuilder} = require('discord.js')
var geoip = require("geoip-lite");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ipinfo")
        .setDescription("get info about an ip address")
        .addStringOption(option =>
            option
            .setName("ip")
            .setDescription("ip to get info about")
            .setRequired(true)),
    async execute(interaction) {
        var geo2 = geoip.lookup(interaction.options.getString("ip"));
        var lat2 = geo2.ll[0];
        var long2 = geo2.ll[1];

        if(geo2.city.length===0|geo2.region.length===0) {
            await interaction.reply('Invalid ip address.')
            return;
        } 
        
        await interaction.reply(`\`\`\`Info for ${args[1]}:
city: ${geo2.city}
region: ${geo2.region}
country: ${geo2.country}
timezone: ${geo2.timezone}
latitude/longitude: ${lat2}, ${long2}\`\`\``)
    }
};