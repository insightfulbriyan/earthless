const Discord = require('discord.js');
const TOKEN = require('./config.json');
var user = '';

const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});

const embed_test = new Discord.MessageEmbed()
    .setColor('#00ffff')
    .setTitle('Help')
    .setDescription('All commands')
    .setThumbnail('https://cdn.discordapp.com/attachments/724598114471903328/744475859536052285/tesrresressuper.jpg')
    .addFields(
        { name: 'Help command', value: 'usage: \u200B `=help`   \n description: This' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field 2', value: 'No other connamds', inline: true },
    )
    .setTimestamp();


client.on('message', message=> {
    if (!message.guild){
        return
    }

    if (message.content.startsWith('=help')){
        message.channel.send(embed_test);

    }
    /*
    if(message.content.startsWith('!d bump')){
        message.channel.send('I\'ll remind you in 2 hours')

        setTimeout(() => {message.reply('Bump timer ended');}, 15000);
    }
    */
    for (let embed of message.embeds) {
        console.log(embed.description);
        if (embed.title == 'DISBOARD: The Public Server List') {
            console.log('title');
            if (embed.description[30] == 'B') {
                message.channel.send('I\'ll remind you in 2 hours')

                setTimeout(() => {message.channel.send('It\'s time to bump again! <@&724598113817591880> <@&' + user + '>');}, 5000);
            }
        }
    }
    if (message.content == '!d bump'){
        user = message.author();
        console.log(user);
    }
    if (message.content === '=ping') {  
        message.reply(`pong :ping_pong:, ping is ${Date.now() - message.createdTimestamp}ms.`);
    }
});
client.login(TOKEN.BOT_TOKEN);