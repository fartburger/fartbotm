const {SlashCommandBuilder} = require('discord.js')
const fileSystem = require("fs");
var geoip = require("geoip-lite");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("dox")
        .addUserOption(option =>
            option.setName("user")
            .setDescription("person to 'dox'")
            .setRequired(true))
        .setDescription("'dox' a user"),
    async execute(interaction) {
        var data = fileSystem.readFileSync('analytics.json');
        var jdata = JSON.parse(data)
        jdata.doxxes++;
        var sjdata = JSON.stringify(jdata)
        fileSystem.writeFileSync("analytics.json",sjdata)
        var fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
        var geo = geoip.lookup(fakeip);
        console.log(geo===null)
        fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
        geo = geoip.lookup(fakeip);
        do {
            fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
            geo = geoip.lookup(fakeip);
        }
        while(geo===null|geo===undefined|geo.city.length===0) 
        var lat = geo.ll[0];
        var long = geo.ll[1];
        await interaction.reply(`<@!${interaction.options.getUser("user")}'s ip is: ${fakeip}\n\`\`\`city: ${geo.city}\nregion: ${geo.region}\ncountry: ${geo.country}\ntimezone: ${geo.timezone}\n
            latitude/longitude: ${lat}, ${long}\`\`\``)
    }
};