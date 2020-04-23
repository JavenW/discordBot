module.exports = {
    name: 'team',
    aliases: [''],
    description: 'split the #queue!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {
        let que1 = teamA.concat();
        let que2 = teamB.concat();
        let copyQue = queue.concat();
        while(que1.length < Math.floor((queue.length+teamA.length+teamB.length)/2)) {
            let ranNum = Math.floor(Math.random() * 100);
            que1.push(copyQue[ranNum%copyQue.length])
            copyQue.splice(ranNum%copyQue.length,1);
        }
        while(copyQue.length!=0){
            que2.push(copyQue.shift());
        }

        while(currA.length){
            currA.shift();
        }
        while(currB.length){
            currB.shift();
        }


        if(que1.length!=0){
            let aCount = 0;
            let que1List = que1.map(user => {
                currA.push(user);
                let rMember = message.guild.member(user);
                aCount++;
                return '\n' + '\t' + aCount + ". " + ((rMember.nickname)?rMember.nickname:user.username);
            })
            message.channel.send("Team A:" + que1List);
        }


        if(que2.length!=0){
            let bCount = 0;
            let que2List = que2.map(user => {
                currB.push(user);
                let rMember = message.guild.member(user);
                bCount++;
                return '\n' + '\t' + bCount + ". " + ((rMember.nickname)?rMember.nickname:user.username);
            })
            message.channel.send("Team B:" + que2List);
        }
    },
};