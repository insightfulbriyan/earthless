const login = function(client, CONFIG){
    client.on('ready', () => {
        console.log('I am weady!');
        client.user.setActivity(CONFIG.BOT_STATUS_STATUS, {
            type: CONFIG.BOT_STATUS_TYPE,
            url: CONFIG.BOT_STATUS_URL
        });
});
    client.login(CONFIG.BOT_TOKEN);
}

module.exports = login