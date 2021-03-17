var remind = function(message){
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

module.exports = remind