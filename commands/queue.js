module.exports = {
    name: 'queue',
    aliases: ['lane'],
    description: 'check the queue',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '[]kick [xxx]',
    execute(message, args, queue, teamA, teamB) {
        message.channel.send("Current Queue:");
        if(queue.length != 0){
            let count = 0;
            let queueList = queue.map(user => {
                let rMember = message.guild.member(user);
                count++;
                return count + ". " + rMember.nickname;
            })
            message.channel.send(queueList);
        }
        

        message.channel.send("Team A preset:");
        if(teamA.length!=0){
            let aCount = 0;
            let que1List = teamA.map(user => {
                let rMember = message.guild.member(user);
                // return '*${user.username}';
                aCount++;
                return aCount + ". " + rMember.nickname;
            })
            message.channel.send(que1List);
        }

        message.channel.send("Team B preset:");
        if(teamB.length!=0){
            let bCount = 0;
            let que2List = teamB.map(user => {
                let rMember = message.guild.member(user);
                // return '*${user.username}';
                bCount++;
                return bCount + ". " + rMember.nickname;
            })
            message.channel.send(que2List);
        }

    },
};