const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const CONFIG = require("./config.json");
const exec = require("child_process").exec;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"] });
client.on("ready", () => {
    console.log("I am ready!");
    client.user.setActivity(CONFIG.BOT_STATUS_STATUS, {
        type: CONFIG.BOT_STATUS_TYPE,
        url: CONFIG.BOT_STATUS_URL
    });
});
client.util = require("./util");


var gtn_rndn = 0;
var game = false;
var tries = 0;
var start_channel = 0;

var timeout = [];

client.on("interactionCreate", async interaction => {
    if (!interaction.commandName) return
    //HELP
    if (interaction.commandName == "help") {
        var cmd = interaction.options.getSubcommand()
        if (cmd == "fun") {
            const help_fun = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle("Help")
                .setDescription("All commands")
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: "Kill", value: "usage: `=kill {your victim}` \ndescription: Funny command!" },
                    { name: "Revive", value: "usage `=revive {target}` \ndescription: Revives someone from dead." },
                    { name: "Eat", value: "usage: `=eat ` \ndescription: Gives you food!" },
                    { name: "Guess the number", value: "usage: `=gtn` \ndescription:  Plays easy guess the number game with you." },
                    { name: "8ball", value: "usage: `=8b {question}` \ndescription: Plays 8ball with you." },
                    { name: "Percentage", value: "usage: `=chance {question}` \ndescription:  Tells you the chance of given event happening." }
                )
                .setTimestamp();
            interaction({ embeds: [help_fun] })
        }

        else if (cmd == "moderation" || cmd == "mod") {
            const help_mod = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle("Help")
                .setDescription("All commands")
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: "Create role", value: "usage: `=role create --[name] --[color hex code] --[position from bottom]` \ndescription: Creates a role with choosen name and color" },
                    { name: "Give role", value: "usage: `=role give {user mention} --{role ID}` \ndescription: Gives member specified role." },
                    { name: "Delete role", value: "usage: `=role delete --{role ID}` \ndescription: Deletes a role from server." },
                    { name: "Mute user", value: "usage: `=mute {member mention}` \ndescription: Mutes user for 5 minutes." },
                    { name: "Lockdown", value: "usage: `=lock` \ndescription: Mutes the whole server until you undo it." },
                    { name: "Unlockdown", value: "usage: `=unlock` \ndescription: Unmutes the whole server after it was muted." }
                )
                .setTimestamp();
            interaction.reply({ embeds: [help_mod] })
        }

        else if (cmd == "utilities" || cmd == "util") {
            const help_info = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle("Help")
                .setDescription("All commands")
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: "Secret language", value: "usage: `=code` \ndescription: Tells you all the secret codes" },
                    { name: "Ping command", value: "usage: `=ping`   \ndescription: checks ping from discord to bot" },
                    { name: "Timer", value: "usage: `=remind {time in minutes} --[reminder]`   \ndescription: reminds you in n minutes  *n can be float*" },
                    { name: "Server information", value: "usage: `=serverinfo` \ndescription: Tells you basic server information." },
                    { name: "Get ID", value: "usage: `=getid {channel/user/role}` \ndescription: Sends you ID of the object you mentioned." }

                )
                .setTimestamp();
            interaction.reply({ embeds: [help_info] })
        }

        else {
            const help_cat = new Discord.MessageEmbed()
                .setColor(CONFIG.DEF_EMB_COL)
                .setTitle("Help")
                .setDescription("All commands")
                .setThumbnail(CONFIG.EMB_THUMB_URI)
                .addFields(
                    { name: "How to use", value: "{} = required, \n[] = optional \n\n\n" },
                    { name: "Fun", value: "usage: `=help fun`" },
                    { name: "Utilities", value: "usage: `=help util`" },
                    { name: "Moderation", value: "usage: `=help mod`" }
                )
                .addField("** **", `[Github link](https://github.com/Akaj-lab/earthless)`)
                .setTimestamp();
            interaction.reply({ embeds: [help_cat] });
        }

    }




    //PING
    else if (interaction.commandName === "ping") {
        interaction.reply(`pong :ping_pong:! Ping is ${Date.now() - interaction.createdTimestamp}ms.`);
    }




    //REMIND
    else if (interaction.commandName == "remind") {
        const auth = interaction.user.createDM(true);
        var mins = interaction.options.getNumber("time")
        var remind_time = mins * 60000;
        if (remind_time == "60000") {
            interaction.reply(`I'll remind you in ${mins} minute.`);
            setTimeout(() => { (auth).send(`**${interaction.options.getString("reason")}** Your timer is over. :timer: `); }, remind_time);
        }

        else {
            interaction.reply(`I'll remind you in ${mins} minutes.`);
            setTimeout(() => { (auth).send(`**${interaction.options.getString("reason")}** Your timer is over :timer:`); }, remind_time);
        }
    }




    //KILL
    else if (interaction.commandName == "kill") {
        const random_str = ["crimes against humanity", "stealing my money", "bringing pizza to party", "being dumb", "being a good person", "helping mum with chores", "not eating for 48 hours straight", "for for for for", "not washing their teeth", "compleating their homework", "peeing on the floor", "allowing their parents to visit their room", "killing someone else", "being a jerk", "crying like a little baby", "eating all the food", "studying right before test", "bean", "getting a F", "using the command", "changing F to A on test", "lying"];
        message_str = interaction.options.getString("victim")
        const killer = ["Banana", "Your mum", "YagPdb", "I", "You", "Burglars", "Donald Trump", "The US government", "Chinese government", "Kim Jong Un", "Somebody", "Drunk driver", "Maths", "String theory", "Teacher", "Unknown murderer", ":alien: UFO", "A book", "Pencil", "Knife", "Heat", "Water", "Spy", "Your brother", "Teethbrush", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "LD50 = 0mg/kg of your bodyweight"]
        const rndn = between(0, 10);

        if (message_str.includes("<@&") || message_str.includes("@here") || message_str.includes("@everyone")) {
            interaction.reply(`**${killer[between(0, 26)]}** killed ${message.author} for trying to ping. You won't trick me, you little bean.`);
            return;
        }

        if (rndn == 1) {
            interaction.reply("Victim was too strong to be killed. :confused:");
            return;
        }

        interaction.reply(`**${killer[between(0, 26)]}** killed **${message_str}** for **${random_str[between(0, 21)]}**`);
    }




    //NAME
    else if (interaction.commandName == "name") {
        interaction.reply(`authotr <@${message.author}>`);
    }




    //EAT
    else if (interaction.commandName == "eat") {
        const rndn = between(0, 10);
        const food = [":green_apple:", ":apple:", ":pear:", ":tangerine:", ":lemon:", ":watermelon:", ":grapes:", ":blueberries:", ":strawberry:", ":melon:", ":cherries:", ":peach:", ":mango:", ":pineapple:", ":coconut:", ":kiwi:", ":tomato:", ":eggplant:", ":avocado:", ":olive:", ":broccoli:", ":leafy_green:", ":bell_pepper:", ":cucumber:", ":hot_pepper:", ":corn:", ":carrot:", ":garlic:", ":onion:", ":potato:", ":sweet_potato:", ":croissant:", ":bagel:", ":bread:", ":french_bread:", ":flatbread:", ":pretzel:", ":cheese:", ":egg:", ":cooking:", ":butter:", ":pancakes:", ":waffle:", ":bacon:", ":cut_of_meat:", ":poultry_leg:", ":meat_on_bone:", ":hotdog:", ":hamburger:", ":fries:", ":pizza:", ":sandwich:", ":stuffed_flatbread:", ":falafel:", ":taco:", ":burrito:", ":tamale:", ":salad:", ":shallow_pan_of_food:", ":fondue:", ":canned_food:", ":spaghetti:", ":ramen:", ":stew:", ":curry:", ":sushi:", ":bento:", ":dumpling:", ":oyster:", ":fried_shrimp:", ":rice_ball:", ":rice:", ":rice_cracker:", ":fish_cake:", ":fortune_cookie:", ":moon_cake:", ":oden:", ":dango:", ":shaved_ice:", ":ice_cream:", ":icecream:", ":pie:", ":cupcake:", ":cake:", ":birthday:", ":custard:", ":lollipop:", ":candy:", ":chocolate_bar:", ":popcorn:", ":doughnut:", ":cookie:", ":chestnut:", ":peanuts:", ":honey_pot:"]
        console.log(rndn);

        if (rndn == 1) {
            interaction.reply("You don\'t get anything to eat :angry:");
            return;
        }

        interaction.reply(`${interaction.user} here is your food. ${food[between(0, 95)]}`);
    }


    //!LATER
    /*
        //APPLE
        else if (interaction.commandName.includes("apple") || message.content.includes("orange")) {
            message.react("🍎");
     
        }*/




    //SERVERINFO
    else if (interaction.commandName == "serverinfo") {
        var members = interaction.guild.memberCount;
        var roles = interaction.guild.roles.highest.position
        var serve_age = Date.now() - Date("30.6.2020 10:00");
        var server_age_days = parseInt(serve_age / 86400000);
        var embed_mem = new Discord.MessageEmbed()
            .setColor(CONFIG.DEF_EMB_COL)
            .setTitle("Member count")
            .addFields(
                { name: "All members:", value: `${members}` },
                { name: "Number of roles", value: `${roles}` },
                { name: "Server age", value: server_age_days + " days" }
            )
            .setTimestamp();
        interaction.reply({ embeds: [embed_mem] });
    }




    //!LATER
    /*
        //GUESS THE NUMBER
        else if (interaction.commandName == "gtn") {
            message.channel.send("Your number is **between 1 and 10000**. Try to guess it!");
            gtn_rndn = between(1, 10000);
            console.log(gtn_rndn);
            game = true
            tries = 0;
            start_channel = message.channel.id.valueOf();
     
        }
        else if ((Number(message.content.valueOf()) == gtn_rndn && game) && message.channel.id.valueOf() == start_channel) {
            tries = tries + 1;
            message.channel.send("**Congratulations, you guessed the right number!** It took you ' + tries + ' tries.");
            gtn_rndn = 0;
            game = false;
                        console.log(percentage)
        }
        else if ((Number(message.content.valueOf()) > gtn_rndn && game) && message.channel.id.valueOf() == start_channel) {
            message.channel.send("Your number is too big.");
            tries = tries + 1;
        }
        else if ((Number(message.content.valueOf()) < gtn_rndn && game) && message.channel.id.valueOf() == start_channel) {
            message.channel.send("Your number is too small");
            tries = tries + 1;
        }
    */




    //SAY
    else if (interaction.commandName == "say" && interaction.channel.id.valueOf() == CONFIG.SAY_FROM_ID) {
        interaction.options.getString("text")
        const send_channel = client.channels.cache.find(channel => channel.id === CONFIG.SAY_TO_ID)
        send_channel.send(message.content.split("=say ")[1])
        interaction.reply("Your message has been sent!")
    }




    /*
    //ARE YOU
    else if (message.content.startsWith('Are you') || message.content.startsWith('are you')) {
        var rndny = between(1, CONFIG.ARE_U_PROB);
        if (rndny == CONFIG.ARE_U_RNDN) {
            message.channel.send('Yes!')
        }
        else {
            message.channel.send('no u')
        }
    }




    //NO YOU
    else if (message.content.startsWith('no u') || message.content.startsWith('No u')) {
        message.channel.send('**no YOU**');
    }




    //AUTO PUBLISH
    else if (message.channel.id.toString() == CONFIG.PUB_1_RSS || message.channel.id.toString() == CONFIG.PUB_2_APOD || message.channel.id.toString() == CONFIG.PUP_3_YT || message.channel.id.toString() == '762221693846421514") {
        message.crosspost();
    }*/




    //SECRET LANGUAGE
    else if (interaction.commandName == "code") {
        const code_embed = new Discord.MessageEmbed()
            .setColor(CONFIG.DEF_EMB_COL)
            .addFields(
                { name: "Secret code", value: "10 = :) \n29 = No \n41 = yay \n44 = hmm \n45 = bruh \n55 = yes \n56 = lol \n59 = lmao \n71 = xd \n90 = :(" }
            )
            .setTimestamp();
        interaction.reply({ embeds: [code_embed] });
    }




    //8 BALL
    else if (interaction.commandName == "8b") {
        const text = interaction.options.getString("text")
        var answer_rnd = ["Yes!", "No", "Certainly", "No way!", between(0, 100) + "% yes", between(0, 100) + "% no", "No idea, google it", "DATABASE_ERROR", "I don\'t have access to data", "i DON\'T THINK SO"]
        var rndn_8b = between(0, 9)
        console.log(rndn_8b)

        if (text.length > CONFIG.BB_TLDR && between(0, CONFIG.BB_TLDR_PROB) > CONFIG.BB_TLDR_PROB_VALUE) {
            interaction.reply("TL:DR, i don't have a whole day to reat this")
        }

        else if (rndn_8b == 9) {
            interaction.reply(answer_rnd[9])
            setTimeout(() => { interaction.followUp("sry caps"); }, CONFIG.BB_CAPS);
        }

        else {
            interaction.reply(answer_rnd[rndn_8b]);
        }
    }




    //MUTE 
    else if (interaction.commandName == "mute" && interaction.memberPermissions.has("KICK_MEMBERS")) {
        var member = interaction.guild.members.fetch(interaction.options.getUser("user").id)
        member.roles.add(CONFIG.MUTE_ID)
        setTimeout(() => { member.roles.remove(CONFIG.MUTE_ID) }, CONFIG.MUTE_TIME)
        interaction.reply("**" + member.displayName.toString() + "** has been muted for 5 minutes.")
    }




    //GET ID
    else if (interaction.commandName == "getid") {
        var zhingid = interaction.options.getString("mentionable")
        const special_characters = ["#", "@&", "@!"]
        const word = ["channel", "role", "user"]
        var id = zhingid.split("<")[1].split(">")[0];
        let if_count = 0;

        for (let i of special_characters) {
            if (zhingid.includes(i)) {
                interaction.reply(`ID of mentioned ${word[special_characters.indexOf(i)]} is **${id.split(i)[1]}**`);
                if_count++;
            }
        }

        if (if_count != 1) {
            interaction.reply(`ID of mentioned user is **${id}**`);
        }
    }




    //CHANCE
    else if (interaction.commandName == "chance") {
        var percentage = between(0, 100);
        interaction.reply("There is " + percentage + "% chance of that happening.")
    }


    //!LATER   
    /*
        //POLL
        else if (interaction.commandName.startsWith("POLL")) {
            let poll = message.content.split("\n")
            let emojis = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"]
            let pollength = poll.length
            console.log(poll)
            if (pollength > 21) {
                message.channel.send("your poll has to many options")
            }
     
            else {
                console.log("abd")
                let i = 1;
                while (i < pollength) {
                    message.react(emojis[i - 1])
                        .catch(error)
                    i++
                }
            }
        }
    */



    //ROLE
    else if (interaction.commandName == "role") {
        if (!interaction.memberPermissions.has("MANAGE_ROLES")) {
            interaction.reply("**You don\'t have permission to manage roles!**")
            interaction.followUp({ content: "Please conust a moderator", ephemeral: true })
        }

        else {
            var comd = interaction.options.getSubcommand();
            //CREATE
            if (comd == "create") {
                var role_name = interaction.options.getString("name")
                var role_color = interaction.options.getString("color")
                var role_pos = interaction.options.getInteger("int")
                interaction.guild.roles.create({
                    data: {
                        name: role_name,
                        color: role_color
                    }
                });
                interaction.reply("**Created role: **" + role_name)
                console.log(`role created ${role_name}`)
            }

            //GIVE
            else if (comd == "give") {
                interaction.options.getUser("member").roles.add(interaction.options.getRole("role"))
            }

            //DELETE
            else if (comd == "delete") {
                interaction.options.getRole("role").delete()
            }

        }
    }




    //LOCKDOWN ON
    else if (interaction.commandName == "lock") {
        if (!interaction.memberPermissions.has("MANAGE_ROLES")) {
            interaction.reply("**You don\'t have permission to lock server!**")
            interaction.followUp({ content: "Please conuslt a moderator", ephemeral: true })
        }

        else {
            interaction.guild.roles.resolve(CONFIG.LOCK_ROLE_ID).setPermissions(["READ_MESSAGE_HISTORY", "VIEW_CHANNEL"], "LOCK")
            interaction.reply("**All channels have been locked!**")
        }
    }




    //LOCKDOWN OFF  
    else if (interaction.commandName == "unlock") {
        if (!interaction.memberPermissions.has("MANAGE_ROLES")) {
            interaction.reply("**You don\'t have permission to unlock server!**")
            interaction.followUp({ content: "Please conuslt a moderator", ephemeral: true })
        }

        else {
            interaction.guild.roles.resolve(CONFIG.LOCK_ROLE_ID).setPermissions(["READ_MESSAGE_HISTORY", "VIEW_CHANNEL", "SEND_MESSAGES", "CREATE_INSTANT_INVITE", "CHANGE_NICKNAME", "CONNECT", "USE_EXTERNAL_EMOJIS"], "Unlock");
            interaction.reply("**All channels are now unlocked!**")
        }
    }




    /*
    //HELLO IT'S ME
    else if (message.content.includes('744623798703226955')) {
        message.channel.send('Hello, it\'s me, Earthless discord bot! :smile:')
    }*/




    //REVIVE
    else if (interaction.commandName == "revive") {
        var reviver = interaction.options.gerString("dead")

        if (reviver == "me") {
            interaction.reply("You were revived.")
        }

        else {
            interaction.reply("**" + reviver + "** was revived.");
        }

    }




    /*
    //HELLO
    else if ((message.content.startsWith('hi ') || message.content.startsWith('Hi ') || message.content.startsWith('Hello ') || message.content.startsWith('hello ')) && message.channel == ('724598114471903328')) {
        var rndn = between(0, 5)
        console.log(rndn)
        if (rndn == 1) {
            message.channel.send(`Hello ${message.author}!`)
        }
    }




    //SHUTDOWN
    else if ((message.author == CONFIG.NEONIE_ID || message.author == CONFIG.NASA_ID) && message.content.startsWith('=sd')) {
        message.channel.send('Shutting down...');
        console.log(t)

    }




    //CHATBOT
    else if (message.channel.id.toString() == CONFIG.AI_ID) {
        if (message.author.bot) return;
        client.util.handleTalk(message);
    }*/




    //MASS BAN
    else if (interaction.commandName == "mass" && interaction.memberPermissions.has(CONFIG.MASS_BAN_PERMISSIONS)) {
        list = interaction.options.getString("ids").split(" ");
        for (let user of list) {
            interaction.guild.members.ban(user, { reason: CONFIG.MASS_BAN_REASON })
                .then(console.log(user + " was banned"))
                .catch(err => console.log((err + " Couldn\'t ban.")));
        }
        interaction.reply("Done");
    }




    //RAID BAN
    else if (interaction.commandName.startsWith == "raidban") {
        if (interaction.memberPermissions.has("BAN_MEMBERS")) {
            timeout.forEach(member => { interaction.guild.member(member).ban() })
            interaction.reply(timeout);
        }
    }




    /*
    //BUMP TIMER
    for (let embed of message.embeds) {
        if (embed.title == 'DISBOARD: The Public Server List') {
            console.log('title');
            if (embed.description.includes('Bump done')) {
                message.channel.send('I\'ll remind you in 2 hours')
                setTimeout(() => { message.channel.send('It\'s <@&759772228962353182>! Go to <#724598114882945183> and type `!d bump`'); }, 7200000);
            }
        }
    }*/
});



client.on("guildMemberAdd", member => {
    timeout.push(member.id);

    setTimeout(() => { timeout.splice(timeout.indexOf(member.id), 1) }, 300000);
})



client.login(CONFIG.BOT_TOKEN);
