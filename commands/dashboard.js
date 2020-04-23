module.exports = {
    name: 'dashboard',
    aliases: ['board'],
    description: 'check the queue',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap) {
        message.channel.send("Current statistics:");
        if(userMap.size != 0){
            let count = 0;
            let outStr = "";
            userMap.forEach(function(coin, user) {
                let rMember = message.guild.member(user);
                count++;
                outStr += count + ". " + rMember.nickname + " -- " + coin + '\n';
            })
            message.channel.send(outStr);
           
        }

    },
};