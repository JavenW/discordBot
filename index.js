const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();


let queue = [];
let teamA = [];
let teamB = [];
let userMap = new Map();
let currA = [];
let currB = [];
let role  = [0,0,0,0,0,0,0,0,0,0];
let roleMap = new Map();



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // args is a list containing command(not later) and arguments
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;


    // make sure the command could be working in DM or guild only.
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
    
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

	// if (command === 'info') {
    //     if (!args.length) {
    //         return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    //     }
    //     else if (args[0] === 'foo') {
    //         return message.channel.send('bar');
    //     }
    
    //     message.channel.send(`First argument: ${args}`);
    // } else if (command === 'kick') {
    //     // grab the "first" mentioned user from the message
	//     // this will return a `User` object, just like `message.author`
    //     const taggedUser = message.mentions.users.first();
    //     if (!message.mentions.users.size) {
    //         return message.reply('you need to tag a user in order to kick them!');
    //     }
    //     message.channel.send(`You wanted to kick: ${taggedUser.username}`);       
    // }
});


// login to Discord with your app's token
client.login(token);
