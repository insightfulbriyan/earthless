const { time } = require('console');
const { S_IFCHR, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');
const Discord = require('discord.js');
const CONFIG = require('./config.json');

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
        { name: 'Help command', value: 'usage: `=help`   \ndescription: This menu' },
        { name: 'Ping command', value: 'usage: `=ping`   \ndescription: checks ping from discord to bot' },
        { name: 'Timer', value: 'usage: `=remind <time in minutes> --<reminder (optional)>`   \ndescription: reminds you in n minutes  *n can be float*'},
        { name: 'Kill',value: 'usage: `=kill <target>` \ndescription: Funny command!' },
        { name: 'Eat',value: 'usage: `=eat ` \ndescription: Gives you food!' },
        { name: 'Guess the number',value: 'usage: `=gtn` \ndescription:  Plays easy guess the number game with you.'}
    )
    .setTimestamp();

var gtn_rndn = 0;
var game = false;
var tries = 0;
var start_channel = 0;

client.on('message', message=> {
    if (!message.guild){
        return
    }
    else if (message.author == '705502539965268018'){
        return
    }

    else if (message.content.startsWith('=help')){
        message.channel.send(embed_test);

    }
    
    else if (message.content === '=ping') {  
        message.reply(`pong :ping_pong:! Ping is ${Date.now() - message.createdTimestamp}ms.`);
    }

    else if (message.content.startsWith('=remind')){
        const auth = message.author;
        var message_content = message.content.split(' ');
        var keyword = message.content.split(' --')
        var remind_time = message_content[1] * 60000;
        if (remind_time == '60000'){
            message.channel.send(`I'll remind you in ${message.content.split(' ')[1]} minute.`);
            setTimeout(() => {(auth).send(`**${keyword[1]}** Your timer is over. :timer: `); }, remind_time);
            
        }
        else{
            message.channel.send(`I'll remind you in ${message.content.split(' ')[1]} minutes.`);
            setTimeout(() => {(auth).send(`**${keyword[1]}** Your timer is over :timer:`); }, remind_time);
            
        }
    }


    else if (message.content.startsWith('=kill')){
        const random_str = ['crimes against humanity', 'stealing my money', 'bringing pizza to party', 'being dumb', 'being a good person', 'helping mum with chores', 'not eating for 48 hours straight', 'for for for for', 'not washing their teeth', 'compleating their homework', 'peeing on the floor', 'allowing their parents to visit their room', 'killing someone else', 'being a jerk', 'crying like a little baby', 'eating all the food', 'studying right before test', 'bean', 'getting a F', 'using the command', 'changing F to A on test', 'lying']; 
        message_str = message.content.split('=kill ')[1];
        const killer = ['Banana', 'Your mum', 'YagPdb', 'I', 'You', 'Burglars', 'Donald Trump', 'The US government', 'Chinese government', 'Kim Jong Un', 'Somebody', 'Drunk driver', 'Maths', 'String theory', 'Teacher', 'Unknown murderer', ':alien: UFO', 'A book', 'Pencil', 'Knife', 'Heat', 'Water', 'Spy', 'Your brother', 'Teethbrush', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'LD50 = 0mg/kg of your bodyweight']
        const rndn = between(0, 4);
        if (message.mentions.everyone){
            message.channel.send(`**${killer[between(0, 26)]}** killed ${message.author} for trying to ping everyone. You won't trick me, you little bean.`);
            return;
        }
        if (rndn == 1){
            message.channel.send('Victim was too strong to be killed. :confused:');
            return;
        }
        message.channel.send(`**${killer[between(0, 26)]}** killed **${message_str}** for **${random_str[between(0, 21)]}**`);
    }
    else if (message.content == '=name'){
        message.channel.send(`authotr <@${message.author}>`);
    }

    else if (message.content.startsWith('=eat')){
        const rndn = between(0, 10);
        const food = [':green_apple:', ':apple:', ':pear:', ':tangerine:', ':lemon:', ':watermelon:', ':grapes:', ':blueberries:', ':strawberry:', ':melon:', ':cherries:', ':peach:', ':mango:', ':pineapple:', ':coconut:', ':kiwi:', ':tomato:', ':eggplant:', ':avocado:', ':olive:',':broccoli:', ':leafy_green:', ':bell_pepper:', ':cucumber:', ':hot_pepper:', ':corn:', ':carrot:', ':garlic:', ':onion:', ':potato:', ':sweet_potato:', ':croissant:', ':bagel:', ':bread:', ':french_bread:', ':flatbread:', ':pretzel:', ':cheese:', ':egg:', ':cooking:', ':butter:', ':pancakes:', ':waffle:', ':bacon:', ':cut_of_meat:', ':poultry_leg:', ':meat_on_bone:', ':hotdog:', ':hamburger:', ':fries:', ':pizza:', ':sandwich:', ':stuffed_flatbread:', ':falafel:', ':taco:', ':burrito:', ':tamale:', ':salad:', ':shallow_pan_of_food:', ':fondue:', ':canned_food:', ':spaghetti:', ':ramen:', ':stew:', ':curry:', ':sushi:', ':bento:', ':dumpling:', ':oyster:', ':fried_shrimp:', ':rice_ball:', ':rice:', ':rice_cracker:', ':fish_cake:', ':fortune_cookie:', ':moon_cake:',  ':oden:', ':dango:', ':shaved_ice:', ':ice_cream:', ':icecream:', ':pie:', ':cupcake:', ':cake:', ':birthday:', ':custard:', ':lollipop:', ':candy:', ':chocolate_bar:', ':popcorn:', ':doughnut:', ':cookie:', ':chestnut:', ':peanuts:', ':honey_pot:']
        console.log(rndn);
        if (rndn == 1){
            message.channel.send('You don\'t get anything to eat :angry:');
            return;
        }
        message.channel.send(`${message.author} here is your food. ${food[between(0, 95)]}`);
    }

    else if (message.content.includes('apple')){
        message.react('🍎');

    }

    else if (message.content.startsWith('=mem')){
        const members = message.guild.memberCount;
        const embed_mem = new Discord.MessageEmbed()
            .setColor('#0051ff')
            .setTitle('Member count')
            .addFields(
                { name: 'All members:', value: `${members}` }
            )
            .setTimestamp();
        message.channel.send(embed_mem);

    }
    else if (message.content.startsWith('=test')){
        client.emit("guildMemberAdd", message.member);
    }

    else if (message.content.startsWith('=gtn')){
        message.channel.send('Your number is **between 1 and 10000**. Try to guess it!');
        gtn_rndn = between(1, 10000);
        console.log(gtn_rndn);
        game = true
        tries = 0;
        start_channel = message.channel.id.valueOf();
        
    }
    else if ((Number(message.content.valueOf() > 10000) || Number(message.content.valueOf() < 1)) && message.channel.id.valueOf() == start_channel){
        message.channel.send('Please enter valid number');
    }
    else if ((Number(message.content.valueOf()) == gtn_rndn && game) && message.channel.id.valueOf() == start_channel){
        tries = tries + 1;
        message.channel.send('**Congratulations, you guessed the right number!** It took you ' + tries + ' tries.');
        gtn_rndn = 0;
        game = false;
    }
    else if ((Number(message.content.valueOf()) > gtn_rndn && game) && message.channel.id.valueOf() == start_channel){
        message.channel.send('Your number is too big.');
        tries = tries + 1;
    }
    else if ((Number(message.content.valueOf()) < gtn_rndn && game) && message.channel.id.valueOf() == start_channel){
        message.channel.send('Your number is too small');
        tries = tries + 1;
    }


    else if (message.content.startsWith('Are you') || message.content.startsWith('are you')){
        var rndny = between(1, 20);
        if (rndny == 1){
            message.channel.send('Yes!')
        }
        else {
            message.channel.send('no u')
        }
    }

    if (message.channel.id.toString() == '724598114111062053' || message.channel.id.toString() == '724598114111062052' || message.channel.id.toString() == '724598114111062051') {
        message.crosspost();
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

});

client.on("guildMemberAdd", member => {
    const welcome = `**Hello <@${member.id}>, welcome to Earthless!** \nCheck out the <#757190077020504085> and other info channels. If you want to **partner**, DM one of our @Partnership Managers (<@714099174353797131>, <@525126007330570259>). If you need any **help**, ping one of out moderators in chat or send them a DM. Please keep sciecne topics in **dedicated channels** and other topics in <#724598114471903328>. \n**Thank you for joining!**`
    member.createDM();
    member.send(welcome);
});


client.login(CONFIG.BOT_TOKEN);
