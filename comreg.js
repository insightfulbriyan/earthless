const { SlashCommandBuilder } = require('@discordjs/builders');
const CONFIG = require("./config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const commands = [/*
    //HELP
    new SlashCommandBuilder()
        .setName("help")
        .setDescription("Replies with help")
        .addSubcommand("")
        .addSubcommand("fun")
        .addSubcommand("mod")
        .addSubcommand("util"),*/
    //ping
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Tests if bot works"),
    //name
    new SlashCommandBuilder()
        .setName("name")
        .setDescription("abc"),
    //remind
    new SlashCommandBuilder()
        .setName("remind")
        .setDescription("Reminds you after given amount of time")
        .addNumberOption(option => option.setName("time").setRequired(true).setDescription("In how many minutes should i send you a message"))
        .addStringOption(option => option.setName("reason").setRequired(false).setDescription("What should i remind you on")),
    //eat
    new SlashCommandBuilder()
        .setName("eat")
        .setDescription("Gives you food when you're hungry"),
    //kill
    new SlashCommandBuilder()
        .setName("kill")
        .setDescription("Kills a person")
        .addStringOption(option => option.setName("victim").setRequired(true).setDescription("Who you wanna kill")),
    //serverinfo
    new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Tells you quick info on the server"),
    //say
    new SlashCommandBuilder()
        .setName("say")
        .setDescription("Says a nice thing to moderators")
        .addStringOption(option => option.setName("text").setRequired(true).setDescription("What you wanna say to moderators")),
    //code
    new SlashCommandBuilder()
        .setName("code")
        .setDescription("Tells you the server internal code"),
    //8b
    new SlashCommandBuilder()
        .setName("8b")
        .setDescription("Plays 8 ball with you")
        .addStringOption(option => option.setName("text").setRequired(true).setDescription("Your 8b question")),
    //mute
    new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mutes a user")
        .addUserOption(option => option.setName("user").setRequired(true).setDescription("User you wanna mute")),
    //getid
    new SlashCommandBuilder()
        .setName("getid")
        .setDescription("Tells you id")
        .addStringOption(option => option.setName("mentionable").setRequired(true).setDescription("What you wanna get id of")),
    //chance
    new SlashCommandBuilder()
        .setName("chance")
        .setDescription("Gives you very accurate chance of given event happening"),
    //role
    new SlashCommandBuilder()
        .setName("role")
        .setDescription("Role manager")
        .addSubcommand(sc => sc
            .setName("create")
            .setDescription("Creates a role for you")
            .addStringOption(option => option.setName("name").setRequired(true).setDescription("What shall be the name of the role"))
            .addStringOption(option => option.setName("color").setRequired(false).setDescription("What color shall the role appear"))
            .addIntegerOption(option => option.setName("int").setRequired(false).setDescription("Where on the list should the role appear")))
        .addSubcommand(sc => sc
            .setName("give")
            .setDescription("Member gets a role")
            .addUserOption(option => option.setName("member").setRequired(true).setDescription("Who so you wanna give the role"))
            .addRoleOption(option => option.setName("role").setRequired(true).setDescription("What role do you wanna give")))
        .addSubcommand(sc => sc
            .setName("delete")
            .setDescription("Deleted a role")
            .addRoleOption(option => option.setName("role").setRequired(true).setDescription("Which role are you about to delete"))),
    //lock
    new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks the server"),
    //unlcok
    new SlashCommandBuilder()
        .setName("unlcok")
        .setDescription("Unlocks the server"),
    //revive
    new SlashCommandBuilder()
        .setName("revive")
        .setDescription("Revives deceased person")
        .addStringOption(option => option.setName("dead").setRequired(true).setDescription("Who do you want to revive")),
    //mass
    new SlashCommandBuilder()
        .setName("mass")
        .setDescription("Banns a lot of people")
        .addStringOption(option => option.setName("ids").setRequired(true).setDescription("IDs of bad people")),
    //raidban
    new SlashCommandBuilder()
        .setName("raidban")
        .setDescription("Banns everyone who joined in last 5 minutes")
].map(command => {
    try { return command.toJSON() }
    catch (err) {
        console.log(command);
    }
});

const rest = new REST({ version: "9" }).setToken(CONFIG.BOT_TOKEN);
(async function () {
    try {
        console.log("Started refreshing application (/) commands.");

        console.log(commands);
        await rest.put(
            Routes.applicationGuildCommands('744623798703226955', '724598113553088543'),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
