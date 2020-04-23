// role
// roleMap, 0-top,1-jg,2-mid,3-adc,4-sup
module.exports = {
    name: 'roleteam',
    aliases: [''],
    description: 'split the #queue and set roles!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {
        let que1 = [0,0,0,0,0];
        let que2 = [0,0,0,0,0];
        let copyQue = queue.concat();
        for(let i=0; i<teamA.length; i++){
            que1[roleMap.get(teamA[i])] = teamA[i];
        }
        for(let i=0; i<5; i++){
            if(que1[i]==0){
                if(role[i*2]==0){
                    let ranNum = Math.floor(Math.random() * 100);
                    que1[i] = copyQue[ranNum%copyQue.length];
                    copyQue.splice(ranNum%copyQue.length,1);
                } else if(role[i*2+1]==0) {
                    let ranNum = Math.floor(Math.random() * 100);
                    que1.push(copyQue[ranNum%copyQue.length]);
                    copyQue.splice(ranNum%copyQue.length,1);
                } else {
                    let ranNum = Math.floor(Math.random() * 100)%2;
                    que1[i] = role[i*2+ranNum];
                    copyQue.splice(copyQue.indexOf(role[i*2+ranNum]), 1);
                }
            }
        }
        for(let i=0; i<teamB.length; i++){
            que2[roleMap.get(teamB[i])] = teamB[i];
        }
        

        for(let i=0; i<copyQue.length; i++){
            if(roleMap.has(copyQue[i])){
                que2[roleMap.get(copyQue[i])] = copyQue[i];
                copyQue.splice(i,1);
            }
        }
        for(let i=0; i<5; i++){
            if(que2[i] == 0){
                let ranNum = Math.floor(Math.random() * 100);
                que2[i] = copyQue[ranNum%copyQue.length];
                copyQue.splice(ranNum%copyQue.length,1);
            }
        }

        // for (let key of userMap.keys()) {
        //     userMap.set(key, 10);
        // }

        // currA = que1.concat();
        while(currA.length){
            currA.shift();
        }
        for(let i =0; i<que1.length; i++){
            currA.push(que1[i]);
        }
        // currB = que2.concat();
        while(currB.length){
            currB.shift();
        }
        for(let i =0; i<que2.length; i++){
            currB.push(que2[i]);
        }
        
        let pos = ["top", "jg", "mid", "adc", "sup"];

        message.channel.send("Team A:");
        if(que1.length!=0){
            let aCount = 0;
            let que1List = que1.map(user => {
                let rMember = message.guild.member(user);
                // return '*${user.username}';
                aCount++;
                return aCount + ". " + rMember.nickname + " ---- " + pos[aCount-1];
            })
            message.channel.send(que1List);
        }

        message.channel.send("Team B:");
        if(que2.length!=0){
            let bCount = 0;
            let que2List = que2.map(user => {
                let rMember = message.guild.member(user);
                // return '*${user.username}';
                bCount++;
                return bCount + ". " + rMember.nickname + " ---- " + pos[bCount-1];
            })
            message.channel.send(que2List);
        }
    },
};