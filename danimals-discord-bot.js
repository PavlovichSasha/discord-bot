const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();


client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {




	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();



	if(message.author.bot) return;

	if(command === "purge"){ //removes up to the last 100 messages in the channel including the command

		const purgeAmount = parseInt(args[0], 10);

		if(!purgeAmount || purgeAmount < 2 || purgeAmount > 100){
			return message.reply("Enter a number between 2 and 100");
		}

		const deletedMessages = await message.channel.fetchMessages({limit: purgeAmount});
		message.channel.bulkDelete(deletedMessages)
		.catch(error=> message.reply(`Could not delete messges; ${error}`));
	}

	if(command === "server"){
		return message.channel.send(`Server Name: ${message.guild.name} \nTotal members: ${message.guild.memberCount}`);

	}

	if(command === "vote"){

	let text = args.slice(0).join(" ");
	message.delete();
	if(text)
	{
		message.channel.send(text)
		.then(sentEmbed => {
		sentEmbed.react("👍")
		sentEmbed.react("👎")});
	}
	else
		{
		text = "vote";
		message.channel.send(text)
		.then(sentEmbed => {
		sentEmbed.react("👍")
		sentEmbed.react("👎")});
			}
	}

	if(command === "coinflip"){
        const coin = Math.floor(Math.random() * Math.floor(2));
        if(coin == 0){
            return message.reply('Heads');
        }else return message.reply('Tails');

    }

	if(command === "d20"){

		const roll = Math.floor(Math.random() * 20) + 1;

		return message.reply(roll+ '');
	}

	if(command === "d100"){
		const roll = Math.floor(Math.random() * 100) + 1;
		console.log(roll);
		return message.reply(roll + '');
	}
});

client.login(process.env.TOKEN);
