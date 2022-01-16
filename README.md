# Earthless

**Earthless** is Discord bot, that's specifically created for Earthless discord server. [Invite.](https://discord.gg/9gD293WjHs)

## Installing
To start using the bot:
1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone reportesory
3. Run `npm install` in the folder you just installed.
4. Do to [Discord's developer portal](https://discord.com/developers/applications) and create a bot, with administrator permissions. 
4. Go in [`config.json`](./config.json) and change token from `idiot` to you bot's token.
5. Now you can go through every variable and set it's value.

VARIABLE | DEFAULT VALUE | EXPLANATION
--- | --- | ---
`BOT_ID` | 744623798703226955 | Id of bot
`DEF_EMB_COL` | #0051ff | Default embed color
`EMB_THUMB_URI` | https://cdn.discordapp.com/attachments/724598114471903328/744475859536052285/tesrresressuper.jpg | Default embed image URI
`MAX_GTN ` | 10000  | Max number in guess the number
`SAY_FROM_ID` | 805868678075645993 | Id of channel from which `=say` command works
`SAY_TO_ID` | 724598114471903328 | Id of channel to which `=say` sends message
`ARE_U_PROB ` | 20  | Probability of bot saying `No you`, after a user says are you?
`ARE_U_RNDN ` | 1  | Random number that's smaller than ARE_U_PROB, that tigers the response
`PUB_1_RSS` | 724598114111062051 | Id of 1st channel that's automatically published
`PUB_2_APOD` | 22323423 | 2nd channel
`PUP_3_YT` | 724598114111062053 | 3rd channel
`BB_TLDR_MIN_LEN ` | 45  | 8b shortest message to respond with TL:DR
`BB_TLDR_PROB ` | 20  | TL:DR probability
`BB_TLDR_PROB_VALUE ` | 15  | TL:DR trigger value
`BB_CAPS ` | 1821  | Timeout of apology for capitals
`AI_ID ` |  811647480537546822 | AI chatbot channel
`MUTE_ID` | 741219805679452183 | ID od mute role
`MUTE_TIME ` | 300000  | Time to end mute on member
`NICK_BAR_WRD_MAX ` | 0  | Max. nr. of bad words in a nickname
`NICK_ASCII_MIN ` | 5  | Min. nr. of ASCII letters in a 
`MOD_NICK_NICK` | moderated nickname | Nickname to give a member that doesn't follow the rules
`BOT_STATUS_URL` | https://github.com/Akaj-lab/earthless | URL of this repository, link in embeds **DON'T CHANGE, LET PEOPLE KNOW WHERE YOU GOT THE CODE**
`BOT_STATUS_TYPE` | PLAYING | Bot's activity while online [More option](https://discord.js.org/#/docs/main/stable/typedef/ActivityType)
`BOT_STATUS_STATUS` | =help | Bot's status
`LOCK_ROLE_ID` | 724598113817591884 | Role to remove send message permissions on lockdown
`url` | http://api.brainshop.ai/get?bid=154913&key=T0nZutKJGJSeQZAU&uid=[uid]&msg=[msg] | URL of brainshop chatbot
`bid` | 154913 | Bot ID of brainshop chatbot
`key` | T0nZutKJGJSeQZAU | API key
`uid` | chatbot | User ID of brainshop chatbot
`MASS_BAN_PERMISSIONS` | BAN_MEMBERS | Permission user needs to mass ban people
`MASS_BAN_REASON` | Because | Reason for mas ban **FUTURE**


7. Then run `node comreg.js` to register slash commands.
8. To run the bot, execute `node index.js`.
