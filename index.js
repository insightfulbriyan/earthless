const { time } = require('console');
const { S_IFCHR } = require('constants');
const Discord = require('discord.js');
const TOKEN = require('./config.json');

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    );
}
  
const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});

const embed_test = new Discord.MessageEmbed()
    .setColor('#0051ff')
    .setTitle('Help')
    .setDescription('All commands')
    .setThumbnail('https://cdn.discordapp.com/attachments/724598114471903328/744475859536052285/tesrresressuper.jpg')
    .addFields(
        { name: 'Help command', value: 'usage: `=help`   \n description: This menu' },
        { name: 'Ping command', value: 'usage: `=ping`   \n description: checks ping from discord to bot' },
        { name: 'Timer', value: 'usage: `=remind <time in minutes> <reminder (optional)>`   \n description: reminds you in n minutes  *n can be float*'},
        { name: 'Kill',value: 'usage: `=kill <target>` \n description: Funny command!' }
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
        var message_content = message.content.split(' ');
        var remind_time = message_content[1] * 60000; 
        var reminder = message_content.splice(3);
        var remind_message = ' ';
        reminder.array.forEach(element => {
            remind_message = remind_message + ' ' + element;
        });
        console.log(remind_message);
        if (remind_time == '60000'){
            message.channel.send(`I'll remind you in ${message.content.split(' ')[1]} minute.`);
            setTimeout(() => {(auth).send('Your timer is over. :timer: ' + remind_message); }, remind_time);
            
        }
        else{
            message.channel.send(`I'll remind you in ${message.content.split(' ')[1]} minutes.`);
            setTimeout(() => {(auth).send('Your timer is over. :timer: ' + remind_message); }, remind_time);
            
        }
    }


    if (message.content.startsWith('=kill')){
        const random_str = ['crimes against humanity', 'stealing my money', 'bringing pizza to party', 'being dumb', 'being a good person', 'helping mum with chores', 'not eating for 48 hours straight', 'for for for for', 'not washing their teeth', 'compleating their homework', 'peeing on the floor', 'allowing their parents to visit their room', 'killing someone else', 'being a jerk', 'crying like a little baby', 'eating all the food', 'studying right before test', 'bean', 'getting a F', 'using the command', 'changing F to A on test', 'lying']; 
        message_str = message.content.split('=kill ')[1];
        const killer = ['Banana', 'Your mum', 'YagPdb', 'I', 'You', 'Burglars', 'Donald Trump', 'The US government', 'Chinese government', 'Kim Jong Un', 'Somebody', 'Drunk driver', 'Maths', 'String theory', ':gnomed: Gnome', 'Unknown murderer', ':alien: UFO', 'A book', 'Pencil', 'Knife', 'Heat', 'Water', 'Spy', 'Your brother', 'Teethbrush', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'LD50 = 0mg/kg of your bodyweight']
        if (message.mentions.everyone){
            message.channel.send(`**${killer[between(0, 26)]}** killed ${message.author} for trying to ping everyone. You won't trick me, you little bean.`);
            return;
        }
        
        message.channel.send(`**${killer[between(0, 26)]}** killed **${message_str}** for **${random_str[between(0, 21)]}**`);
    }
    if (message.content == '=name'){
        message.channel.send('authotr <@' + message.author + '>');
    }
});

client.login(proces.env.TOKEN);
