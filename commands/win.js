// role
// roleMap, 0-top,1-jg,2-mid,3-adc,4-sup
module.exports = {
    name: 'win',
    aliases: ['winteam'],
    description: 'split the #queue!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {
        if(args[0] && (args[0]==='A' || args[0]==='B')) {
            if(args[0]==='A'){
                message.channel.send("Congratulation Team A as Winner" + '\n' + "Team B get coins");
                for(i=0;i<currB.length;i++){
                    userMap.set(currB[i], userMap.get(currB[i])+2);
                }
            } else {
                message.channel.send("Congratulation Team B as Winner" + '\n' + "Team A get coins");
                for(i=0;i<currA.length;i++){
                    userMap.set(currA[i], userMap.get(currA[i])+2);
                }
            }

            while(currA.length){
                currA.shift();
            }
            while(currB.length){
                currB.shift();
            }
            role  = [0,0,0,0,0,0,0,0,0,0];
            roleMap.clear();

            while(teamA.length){
                queue.push(teamA.shift());
            }
            while(teamB.length){
                queue.push(teamB.shift());
            }

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
        } else {
            return message.channel.send("Wrong inputs");
        }
    },
};