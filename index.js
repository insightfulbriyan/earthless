const { time, error } = require('console');
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
    client.user.setActivity(CONFIG.BOT_STATUS_STATUS, {
        type: CONFIG.BOT_STATUS_TYPE,
        url: CONFIG.BOT_STATUS_URL
     });
});


var gtn_rndn = 0;
var game = false;
var tries = 0;
var start_channel = 0;

client.on('message', message => {
    
    if (!message.guild){
        return
    }

    else if (message.author == CONFIG.BOT_ID){
        return
    }
/*
    else if (message.author.bot.valueOf()){
        return
    }*/
    //HELP
    else if (message.content.startsWith('=help')){
        var cmd = message.content.split(' ')[1]
        if(cmd == 'fun'){
            const help_fun = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle('Help')
                .setDescription('All commands')
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: 'Kill',value: 'usage: `=kill {your victim}` \ndescription: Funny command!' },
                    { name: 'Revive', value: 'usage `=revive {target}` \ndescription: Revives someone from dead.' },
                    { name: 'Eat',value: 'usage: `=eat ` \ndescription: Gives you food!' },
                    { name: 'Guess the number',value: 'usage: `=gtn` \ndescription:  Plays easy guess the number game with you.'},
                    { name: '8ball', value: 'usage: `=8b {question}` \ndescription: Plays 8ball with you.'}
                )
                .setTimestamp();
            message.channel.send(help_fun)
        }
        else if (cmd == 'moderation' || cmd == 'mod'){
            const help_mod = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle('Help')
                .setDescription('All commands')
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: 'Create role' ,value: 'usage: `=role create --[name] --[color hex code] --[position from bottom]` \ndescription: Creates a role with choosen name and color'},
                    { name: 'Give role' ,value: 'usage: `=role give {user mention} --{role ID}` \ndescription: Gives member specified role.'},
                    { name: 'Delete role' ,value: 'usage: `=role delete --{role ID}` \ndescription: Deletes a role from server.'},
                    { name: 'Mute user' ,value: 'usage: `=mute {member mention}` \ndescription: Mutes user for 5 minutes.'},
                    { name: 'Lockdown' ,value: 'usage: `=lock` \ndescription: Mutes the whole server until you undo it.'},
                    { name: 'Unlockdown' ,value: 'usage: `=unlock` \ndescription: Unmutes the whole server after it was muted.'}
                )
                .setTimestamp();
            message.channel.send(help_mod)
        }
        else if (cmd == 'utilities' || cmd == 'util'){
            const help_info = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle('Help')
                .setDescription('All commands')
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: 'Secret language' ,value: 'usage: `=code` \ndescription: Tells you all the secret codes'},
                    { name: 'Ping command', value: 'usage: `=ping`   \ndescription: checks ping from discord to bot' },
                    { name: 'Timer', value: 'usage: `=remind {time in minutes} --[reminder]`   \ndescription: reminds you in n minutes  *n can be float*'},
                    { name: 'Server information' ,value: 'usage: `=serverinfo` \ndescription: Tells you basic server information.'},
                    { name: 'Get ID' ,value: 'usage: `=getid {channel/user/role}` \ndescription: Sends you ID of the object you mentioned.'}

                )
                .setTimestamp();
            message.channel.send(help_info)
        }
        else {
            const help_cat = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle('Help')
                .setDescription('All commands')
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: 'How to use', value : '{} = required, \n[] = optional \n\n\n'},
                    { name: 'Fun', value: 'usage: `=help fun`' },
                    { name: 'Utilities', value: 'usage: `=help util`' },
                    { name: 'Moderation', value: 'usage: `=help mod`' }
                )
                .addField('** **', `[Github link](https://github.com/Akaj-lab/earthless/tree/v1-test)`)
                .setTimestamp();
            message.channel.send(help_cat);
        }

    }
    

    //PING
    else if (message.content === '=ping') {  
        message.reply(`pong :ping_pong:! Ping is ${Date.now() - message.createdTimestamp}ms.`);
    }




    //REMIND
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




    //KILL
    else if (message.content.startsWith('=kill')){
        const random_str = ['crimes against humanity', 'stealing my money', 'bringing pizza to party', 'being dumb', 'being a good person', 'helping mum with chores', 'not eating for 48 hours straight', 'for for for for', 'not washing their teeth', 'compleating their homework', 'peeing on the floor', 'allowing their parents to visit their room', 'killing someone else', 'being a jerk', 'crying like a little baby', 'eating all the food', 'studying right before test', 'bean', 'getting a F', 'using the command', 'changing F to A on test', 'lying']; 
        message_str = message.content.split('=kill ')[1];
        const killer = ['Banana', 'Your mum', 'YagPdb', 'I', 'You', 'Burglars', 'Donald Trump', 'The US government', 'Chinese government', 'Kim Jong Un', 'Somebody', 'Drunk driver', 'Maths', 'String theory', 'Teacher', 'Unknown murderer', ':alien: UFO', 'A book', 'Pencil', 'Knife', 'Heat', 'Water', 'Spy', 'Your brother', 'Teethbrush', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'LD50 = 0mg/kg of your bodyweight']
        const rndn = between(0, 10);
        if (message.content.includes('@everyone')){
            message.channel.send(`**${killer[between(0, 26)]}** killed ${message.author} for trying to ping everyone. You won't trick me, you little bean.`);
            return;
        }
        if (rndn == 1){
            message.channel.send('Victim was too strong to be killed. :confused:');
            return;
        }
        message.channel.send(`**${killer[between(0, 26)]}** killed **${message_str}** for **${random_str[between(0, 21)]}**`);
    }



    //NAME
    else if (message.content == '=name'){
        message.channel.send(`authotr <@${message.author}>`);
    }



    //EAT
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



    //APPLE
    else if (message.content.includes('apple')){
        message.react('🍎');

    }

    //SERVERINFO
    else if (message.content.startsWith('=serverinfo')){
        var members = message.guild.memberCount;
        var roles = message.guild.roles.highest.position
        var serve_age = Date.now() - message.guild.createdTimestamp;
        var server_age_days = parseInt(serve_age / 86400000);
        var embed_mem = new Discord.MessageEmbed()
            .setColor(CONFIG.DEF_EMB_COL)
            .setTitle('Member count')
            .addFields(
                { name: 'All members:', value: `${members}` },
                { name: 'Number of roles',value: `${roles}`},
                { name: 'Server age', value: server_age_days + ' days'}
            )
            .setTimestamp();
        message.channel.send(embed_mem);

    }


    //TEST NEW USER
    else if (message.content.startsWith('=test')){
        client.emit("guildMemberAdd", message.member);
    }


    //GUESS THE NUMBER
    else if (message.content.startsWith('=gtn')){
        message.channel.send('Your number is **between 1 and 10000**. Try to guess it!');
        gtn_rndn = between(1, 10000);
        console.log(gtn_rndn);
        game = true
        tries = 0;
        start_channel = message.channel.id.valueOf();
        
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


    //SAY
    else if (message.content.startsWith('=say') && message.channel.id.valueOf() == CONFIG.SAY_FROM_ID){
        const send_channel = client.channels.cache.find(channel => channel.id === CONFIG.SAY_TO_ID)
        message.channel.send('Your message has been sent!')
        send_channel.send(message.content.split('=say ')[1])
    }




    //ARE YOU
    else if (message.content.startsWith('Are you') || message.content.startsWith('are you')){
        var rndny = between(1, CONFIG.ARE_U_PROB);
        if (rndny == CONFIG.ARE_U_RNDN){
            message.channel.send('Yes!')
        }
        else {
            message.channel.send('no u')
        }
    }


    //NO YOU
    else if (message.content.startsWith ('no u') || message.content.startsWith('No u')){
        message.channel.send('**no YOU**');
    }



    //AUTO PUBLISH
    else if (message.channel.id.toString() == CONFIG.PUB_1_RSS || message.channel.id.toString() == CONFIG.PUB_2_APOD || message.channel.id.toString() == CONFIG.PUP_3_YT) {
        message.crosspost();
    }


    //SECRET LANGUAGE
    else if (message.content.startsWith('=code')){
        const code_embed = new Discord.MessageEmbed()
            .setColor(CONFIG.DEF_EMB_COL)
            .addFields(
                { name: 'Secret code', value: '10 = :) \n29 = No \n41 = yay \n44 = hmm \n45 = bruh \n55 = yes \n56 = lol \n59 = lmao \n71 = xd \n90 = :('}
            )
            .setTimestamp();
        message.channel.send(code_embed);
    }


    //8 BALL
    else if (message.content.startsWith('=8b')){
        var answer_rnd = ['Yes!', 'No', 'Certainly', 'No way!', between(0, 100) + '% yes', between(0, 100) + '% no', 'No idea, google it', 'DATABASE_ERROR', 'I don\'t have access to data', 'i DON\'T THINK SO']
        var rndn_8b = between(0, 9)
        console.log(rndn_8b)
        if (message.content.toString().length > CONFIG.BB_TLDR && between(0, CONFIG.BB_TLDR_PROB) > CONFIG.BB_TLDR_PROB_VALUE){
            message.channel.send('TL:DR')
        }
        else if (rndn_8b == 9){
            message.channel.send(answer_rnd[9])
            setTimeout(() => {(auth).send('sry caps'); }, CONFIG.BB_CAPS);
        }
        else{
            message.channel.send(answer_rnd[rndn_8b]);
        }
        
        
    }


    //MUTE 
    else if (message.content.startsWith('=mute') && message.member.hasPermission('KICK_MEMBERS')){
        message.mentions.members.first().roles.add(CONFIG.MUTE_ID)
        setTimeout(() => {message.mentions.members.first().roles.remove(CONFIG.MUTE_ID); }, CONFIG.MUTE_TIME)
        message.channel.send('**' + message.mentions.members.first().displayName.toString() + '** has been muted for 5 minutes.')
    }


    //GET ID
    else if (message.content.startsWith('=getid')){
        var zhingid = message.content.split(' ')[1];
        const special_characters = ['#', '@&', '@!']
        const word = ['channel', 'role', 'user']
        var messaage = zhingid.split('<')[1].split('>')[0];
        let if_count = 0;
        for(let i of special_characters){
            if(messaage.includes(i)){
                message.channel.send(`ID of mentioned ${word[special_characters.indexOf(i)]} is **${messaage.split(i)[1]}**`);
                if_count++;
            }
        }
        if(if_count != 1){
            message.channel.send(`ID of mentioned user is **${messaage}**`);
        }
    }


    //POLL
    else if (message.content.startsWith('POLL')){
        let poll = message.content.split('\n')
        let emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿']     
        let pollength = poll.length
        console.log(poll)
        if (pollength > 21){
            message.channel.send('your poll has to many options')
        }
        else{
            console.log('abd')
            let i = 1;
            while (i < pollength) {
                message.react(emojis[i-1])
                    .catch(error)
                i++
            }

        }
        /*
        for (let i of poll){
            
            console.log(i)
        }*/
    }

    //PRESENCE
    else if(message.content.startsWith("=presence")){
        client.user.setActivity(CONFIG.BOT_STATUS_STATUS, {
            type: CONFIG.BOT_STATUS_TYPE,
            url: CONFIG.BOT_STATUS_URL
        });
    }




    //ROLE
    else if (message.content.startsWith('=role')){
        if (!message.member.hasPermission('MANAGE_ROLES')){
            message.channel.send('**You don\'t have permission to manage roles!**')
        }
        else{
            var comd = message.content.split(' ')[1]
            //CREATE
            if (comd == 'create'){
                var role_name = message.content.split('--')[1]
                var role_color = message.content.split('--')[2]
                var role_pos = message.content.split('--')[3]
                message.guild.roles.create({
                    data: {
                        name: role_name,
                        color: role_color,
                        position: role_pos,
                    },
                });
                message.channel.send('**Created role: **' + role_name)
                console.log(`role created ${role_name}`)
            }
            //GIVE
            else if (comd == 'give'){
                var role2give = message.content.split('--')[1]
                console.log(role2give)
                message.mentions.members.first().roles.add(role2give)


            }
            //DELETE
            else if (comd == 'delete'){
                var role2delete = message.content.split('--')[1]
                message.guild.roles.resolve(role2delete).delete();
            }
            
        }
    }




    //LOCKDOWN ON
    else if (message.content.startsWith('=lock')){
        if (!message.member.hasPermission('MANAGE_ROLES')){
            message.channel.send('**You don\'t have permission to lock server!**')
        }
        else {
            message.guild.roles.resolve(CONFIG.LOCK_ROLE_ID).setPermissions(['READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'])
            message.channel.send('**All channels have been locked!**')
        }
    }




    //LOCKDOWN ON
    else if (message.content.startsWith('=unlock')){
        if (!message.member.hasPermission('MANAGE_ROLES')){
            message.channel.send('**You don\'t have permission to lock server!**')
        }
        else {
            message.guild.roles.resolve(CONFIG.LOCK_ROLE_ID).setPermissions(['READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'CREATE_INSTANT_INVITE', 'CHANGE_NICKNAME', 'CONNECT', 'USE_EXTERNAL_EMOJIS']);
            message.channel.send('**All channels are now unlocked!**')
        }
    }




    //YAGPDB
    else if (message.author == '204255221017214977'){
        if (message.channel.id.valueOf() == '724598114471903328'){
            const rndn = between(1, 7)
            const dou = ['Never!', 'I\'m sure you do hehe', 'I do not, you?']
            const message_for_yag = ['Oh, that\'s dumb!', message.content.toString() + 'blah blah blah', 'Stupid bot', 'RIDICULUS!', 'Arghh, come on!', '-topic', 'Are you sure?', 'I ban <@!204255221017214977>']
            console.log(rndn)
            if (rndn == 2){
                if (message.content.startsWith('Do you')){
                    message.channel.send(dou[between(0, 2)])
                }
                else {
                    message.channel.send(message_for_yag[between(0, 7)])
                }
            }
        }
    }




    //HELLO IT'S ME
    else if (message.content.includes('744623798703226955')){
        message.channel.send('Hello, it\'s me, Earthless discord bot! :smile:')
    }




    //REVIVE
    else if (message.content.startsWith('=revive')){
        if (message.content.split('=revive ')[1] == 'me'){
            message.channel.send('You were revived.')
        }
        else {
            message.channel.send('**' + message.content.split('=revive ')[1] + '** was revived.');
        }
        
    }




    //HELLO
    else if ((message.content.startsWith('hi') || message.content.startsWith('Hi') || message.content.startsWith('Hello') || message.content.startsWith('hello')) && message.channel == ('724598114471903328')){
        var rndn = between(0, 5)
        console.log(rndn)
        if (rndn == 1){
            message.channel.send(`Hello ${message.author}!`)
        }
    }




    //TOPICS
    /*else if (message.content == '=topic'){
        var rndn = between(0, 26)
        const topic = ['What do you think, where does a black hole lead?', 'Do you believe in god, why oy why not?', 'Which is your all time favourite quote and why?', ' Which is the best discovery by humans?', 'Which is your all time favourite scientist?', 'Which is your favourite astronomical object?', 'Define what is life?', 'Which is better astronomy or astrology?', 'Can you share the best photo you took of nature?', 'Do you like school? Why or why not?', 'Which is the hardest math equation that you have solved?', 'Which is your favourite star in the night sky?', 'What was the moment where you felt most motivated?', 'How will humans as a species go extinct?', 'If you could teach everyone in the world one concept, what concept would have the biggest positive impact on humanity?', 'Which is your favourite space exploration mission?', 'Which planet do you think in our solar system has most chances of life existing on it?', 'What do you believe in: luck or hard work?', 'Are mathematicians the smartest people on Earth? Why or why not?', 'What is the best path to find truth; science, math, art, philosophy, or something else?', 'What do you think your future self will remember about you now?', 'Would a government run with algorithms, A.I., and statistics be better or worse than the government we have now?', 'What scientific breakthrough would have the biggest effect on humanity?', 'Has the invention of the atomic bomb made the world a more peaceful place?', 'If emotions are the product of biochemical reactions, then in the future we will be theoretically able to control them. If we could control emotions through technology, should we?', 'Is there a limit to what humans can create through technology and science?']
        message.channel.send(topic[rndn])
        console.log(rndn)
    }*/

    //SHUTDOWN
    else if ((message.author == CONFIG.NEONIE_ID || message.author == CONFIG.NASA_ID) && message.content.startsWith('=sd')){
        message.channel.send('Shutting down...');
        console.log(t)

    }




    
    //BUMP TIMER
    for (let embed of message.embeds) {
        if (embed.title == 'DISBOARD: The Public Server List') {
            console.log('title');
            if (embed.description.includes('Bump done')) {
                message.channel.send('I\'ll remind you in 2 hours')

                setTimeout(() => {message.channel.send('It\'s <@&759772228962353182>! Go to <#724598114882945183> and type `!d bump`');}, 7200000);
            }
        }
    }

});



//WELCOME
client.on("guildMemberAdd", member => {
    const welcome = `**Hello <@${member.id}>, welcome to Earthless!** \nCheck out the <#757190077020504085> and other info channels. If you want to **partner**, DM one of our @Partnership Managers (<@!714099174353797131>, <@!525126007330570259>). If you need any **help**, ping one of out moderators in chat or send them a DM. Please keep sciecne topics in **dedicated channels** and other topics in <#724598114471903328>. \n**Thank you for joining!**`
    member.createDM();
    member.send(welcome);

});


/*
client.on('guildMemberUpdate', (oldMember, newMember) => {
    const bad_words = ['anal', 'anus', 'arse', 'ass', 'ballsack', 'balls' , 'bastard', 'bitch', 'biatch', 'bloody', 'blowjob', 'blow job', 'bollock', 'bollok', 'boner', 'boob', 'bugger', 'bum', 'butt', 'buttplug', 'clitoris', 'cock', 'coon', 'crap', 'cunt', 'damn', 'dick', 'dildo', 'dyke', 'fag', 'feck', 'fellate', 'fellatio', 'felching', 'fuck', 'f u c k', 'fudgepacker', 'fudge packer', 'flange', 'Goddamn', 'God damn', 'hell', 'homo', 'jerk', 'jizz', 'knobend', 'knob end', 'labia', 'lmao', 'lmfao', 'muff', 'nigger', 'nigga', 'omg', 'penis', 'piss', 'poop', 'prick', 'pube', 'pussy', 'queer', 'scrotum', 'sex', 'shit', 's hit', 'sh1t', 'slut', 'smegma', 'spunk', 'tit', 'tosser', 'turd', 'twat', 'vagina', 'wank', 'whore', 'wtf']
    const alphabet = ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'y', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    var old_name = oldMember;
    var user_name = newMember.displayName
    console.log(user_name)
    let letter_count = 0;
    let bad_word_count = 0;
    for (let i of alphabet){
        if(user_name.includes(i)){
            letter_count = letter_count + 1;
            console.log(i)
        }
    }
    for (let i of bad_words){
        if(user_name.includes(i)){
            bad_word_count = bad_word_count + 1;
            console.log(i)
        }
    }

    if (bad_word_count > CONFIG.NICK_BAR_WRD_MAX || letter_count < CONFIG.NICK_ASCII_MIN){
        newMember.setNickname(CONFIG.MOD_NICK_NICK);
    }
    else {
        console.log('nickname changed');
    }

})*/


client.login(CONFIG.BOT_TOKEN);