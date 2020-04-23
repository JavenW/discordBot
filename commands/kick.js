module.exports = {
    name: 'kick',
    aliases: ['remove'],
    description: 'kick the player from queue',
    cooldown: 0,
    guildOnly: true,
    args: true,
    usage: '[]kick [xxx]',
    execute(message, args, queue, teamA, teamB) {
        let kickUser = message.mentions.users.first();
        if(queue.includes(kickUser)) {
            let pos = queue.indexOf(kickUser);
            queue.splice(pos,1);
            message.channel.send("Kick "+ message.guild.member(kickUser).nickname +" successfully");
        }else if(teamA.includes(kickUser)) {
            let pos = teamA.indexOf(kickUser);
            teamA.splice(pos,1);
            message.channel.send("Kick "+ message.guild.member(kickUser).nickname +" successfully");
        }else if(teamB.includes(kickUser)) {
            let pos = teamB.indexOf(kickUser);
            teamB.splice(pos,1);
            message.channel.send("Kick "+ message.guild.member(kickUser).nickname +" successfully");
        }else{
            message.channel.send(args[0] +" is not in the queue")
        }

        let count = 0;
        let queueList = queue.map(user => {
            let rMember = message.guild.member(user);
            count++;
            return count + ". " + rMember.nickname;
        })
        message.channel.send("Current Queue:");
        if(queue.length != 0){
            message.channel.send(queueList);
        }
        

        if(teamA.length!=0){
            let aCount = 0;
            let que1List = teamA.map(user => {
                let rMember = message.guild.member(user);
                aCount++;
                return '\t' + aCount + ". " + ((rMember.nickname)?rMember.nickname:user.username);
            })
            message.channel.send("Team A preset:" + '\n' + que1List);
        }

        if(teamB.length!=0){
            let bCount = 0;
            let que2List = teamB.map(user => {
                let rMember = message.guild.member(user);
                bCount++;
                return '\t' + bCount + ". " + ((rMember.nickname)?rMember.nickname:user.username);
            })
            message.channel.send("Team B preset:" + '\n' + que2List);
        }

    },
};