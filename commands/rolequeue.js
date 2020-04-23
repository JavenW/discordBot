// role
// roleMap, 0-top,1-jg,2-mid,3-adc,4-sup
module.exports = {
    name: 'rolequeue',
    aliases: [''],
    description: 'split the #queue!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {
        console.log("here");
        console.log(currA.length);
        console.log(currB.length);
        let pos = ["top", "jg", "mid", "adc", "sup"];
        message.channel.send("Team A:");
        if(teamA.length!=0){
            let aCount = 0;
            let que1List = teamA.map(user => {
                let rMember = message.guild.member(user);
                // return '*${user.username}';
                aCount++;
                return aCount + ". " + rMember.nickname + " ---- " + pos[roleMap.get(user)];
            })
            message.channel.send(que1List);
        }

        message.channel.send("Team B:");
        if(teamB.length!=0){
            let bCount = 0;
            let que2List = teamB.map(user => {
                let rMember = message.guild.member(user);
                // return '*${user.username}';
                bCount++;
                return bCount + ". " + rMember.nickname + " ---- " + pos[roleMap.get(user)];
            })
            message.channel.send(que2List);
        }

        let messageStr = "Preset Role:" + '\n';
        let rCount = 0;
        roleMap.forEach(function(value, key) {
            let rMember = message.guild.member(key);
            rCount++;
            messageStr += rCount + ". " + rMember.nickname + " ---- " + pos[value];
        })
        message.channel.send(messageStr);
    },
};