module.exports = {
    name: 'preset',
    aliases: ['prejoin'],
    description: 'preset the team!',
    cooldown: 0,
    guildOnly: true,
    args: true,
    usage: '',
    execute(message, args, queue, teamA, teamB) {
        if(args[1] && !args[1].isNaN && (args[1]==1 || args[1]==2)){
            let presetUser = message.mentions.users.first();
            if(queue.includes(presetUser)) {
                let pos = queue.indexOf(presetUser);
                queue.splice(pos,1);
            }else if(teamA.includes(presetUser)) {
                let pos = teamA.indexOf(presetUser);
                teamA.splice(pos,1);
            }else if(teamB.includes(presetUser)) {
                let pos = teamB.indexOf(presetUser);
                teamB.splice(pos,1);
            } else {
                return message.channel.send("User not in the Queue");
            }
            if(args[1]==1){
                teamA.push(presetUser);
                message.channel.send("Preset @"+ message.guild.member(presetUser).nickname +" into Team A");
            } else{
                teamB.push(presetUser);
                message.channel.send("Preset @"+ message.guild.member(presetUser).nickname +" into Team B");
            }
            
        }else{
            return message.channel.send("Wrong inputs");
        }

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