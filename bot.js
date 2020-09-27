const { time } = require('console');
const { S_IFCHR } = require('constants');
const Discord = require('discord.js');
const TOKEN = require('./config.json');

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
        { name: 'Help command', value: 'usage: `=help`   \n description: This menu' },
        { name: 'Ping command', value: 'usage: `=ping`   \n description: checks ping from discord to bot' },
        { name: 'Timer', value: 'usage: `=remind <time in minutes>`   \n description: reminds you in n minutes  *n can be float*'}
    )
    .setTimestamp();


client.on('message', message=> {
    if (!message.guild){
        return
    }

    if (message.content.startsWith('=help')){
        message.channel.send(embed_test);

    }
    for (let embed of message.embeds) {
        console.log(embed.description);
        if (embed.title == 'DISBOARD: The Public Server List') {
            console.log('title');
            if (embed.description[30] == 'B') {
                message.channel.send('I\'ll remind you in 2 hours')

                setTimeout(() => {message.channel.send('It\'s <@&759772228962353182>! Go to <#724598114882945183> and type `!d bump`');}, 7200000);
            }
        }
    }
    if (message.content === '=ping') {  
        message.reply(`pong :ping_pong:! Ping is ${Date.now() - message.createdTimestamp}ms.`);
    }

    if (message.content.startsWith('=remind')){
        const auth = message.author;
        var remind_time = message.content.split(' ')[1] * 60000;
        if (remind_time == 1){
            message.channel.send(`I'll remind you in ${message.content.split(' ')[1]} minute.`);
            setTimeout(() => {(auth).send('Your timer is over. :timer:'); }, remind_time);
            
        }
        else{
            message.channel.send(`I'll remind you in ${message.content.split(' ')[1]} minutes.`);
            setTimeout(() => {(auth).send('Your timer is over. :timer:'); }, remind_time);
            
        }
    }

    if (message.content == '=name'){
        message.channel.send('authotr <@' + message.author + '>');
    }
});
client.login(TOKEN.BOT_TOKEN);
