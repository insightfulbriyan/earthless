const Discord = require('discord.js');
const modules = require('./modules/index.js');
const CONFIG = require('./config.json');
const client = new Discord.Client();

modules.login(client, CONFIG);

client.on('message', message => {
    if(message.content.startsWith('=tresting')){
        modules.testing(message);
    }
    if(message.content.startsWith('=emind')){
        modules.remind(message);
    }
})