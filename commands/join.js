module.exports = {
    name: 'join',
    aliases: ['attend'],
    description: 'Join the #queue!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap) {
        let addUser = message.author;
        if(queue.includes(addUser) || teamA.includes(addUser) || teamB.includes(addUser)){
            message.reply("You have already in the Queue or preset Team");
        } else {
            queue.push(addUser);
            userMap.set(addUser, 10);
        }
        let count = 0;
        let queueList = queue.map(user => {
            let rMember = message.guild.member(user);
            count++;
            return '\n' + '\t' + count + ". " + ((rMember.nickname)?rMember.nickname:user.username);
        })
        message.channel.send("Current Queue:" + queueList);


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