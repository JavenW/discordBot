module.exports = {
    name: 'preteam',
    aliases: ['presetteam'],
    description: 'preset the player in role queue',
    cooldown: 0,
    guildOnly: true,
    args: true,
    usage: '[]kick [xxx]',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap) {
        if(args[1] && (args[1]==='jg' || args[1]==='mid' || args[1]==='top' || args[1]==='adc' || args[1]==='sup') && (args[2] === "A" || args[2] === "B")){
            let presetUser = message.mentions.users.first();
            let author   = message.author;
            if(userMap.has(presetUser) && userMap.has(author)) {
                let pos = queue.indexOf(presetUser);
                queue.splice(pos,1);
                if(author != presetUser){
                    coin = userMap.get(author)-4;
                }else{
                    coin = userMap.get(author)-3;
                }
                if(coin<0){
                    return message.reply("Not enougn coins");
                }

                if(args[1] === 'top'){
                    if(roleMap.get(presetUser) == 0){
                        return message.reply("Already been top!");
                    }
                    if(role[1] != 0){
                        return message.reply("Top is full");
                    } else if(role[0] != 0) {
                        role[1] = presetUser;
                        roleMap.set(presetUser, 0);
                    } else {
                        role[0] = presetUser;
                        roleMap.set(presetUser, 0);
                    }
                } else if(args[1] === 'jg'){
                    if(roleMap.get(presetUser) == 1){
                        return message.reply("Already been jg!");
                    }
                    if(role[3] != 0){
                        return message.reply("Jungle is full");
                    } else if(role[2] != 0) {
                        role[3] = presetUser;
                        roleMap.set(presetUser, 1);
                    } else {
                        role[2] = presetUser;
                        roleMap.set(presetUser, 1);
                    }
                } else if(args[1] === 'mid'){
                    if(roleMap.get(presetUser) == 2){
                        return message.reply("Already been mid!");
                    }
                    if(role[5] != 0){
                        return message.reply("Mid is full");
                    } else if(role[4] != 0) {
                        role[5] = presetUser;
                        roleMap.set(presetUser, 2);
                    } else {
                        role[4] = presetUser;
                        roleMap.set(presetUser, 2);
                    }
                } else if(args[1] === 'adc'){
                    if(roleMap.get(presetUser) == 3){
                        return message.reply("Already been adc!");
                    }
                    if(role[7] != 0){
                        return message.reply("Adc is full");
                    } else if(role[6] != 0) {
                        role[7] = presetUser;
                        roleMap.set(presetUser, 3);
                    } else {
                        role[6] = presetUser;
                        roleMap.set(presetUser, 3);
                    }
                }else if(args[1] === 'sup'){
                    if(roleMap.get(presetUser) == 4){
                        return message.reply("Already been sup!");
                    }
                    if(role[9] != 0){
                        return message.reply("Sup is full");
                    } else if(role[8] != 0) {
                        role[9] = presetUser;
                        roleMap.set(presetUser, 4);
                    } else {
                        role[8] = presetUser;
                        roleMap.set(presetUser, 4);
                    }
                } else {
                    return message.reply("Wrong position input!");
                }
                userMap.set(author, coin);

                if(args[2] === "A"){
                    teamA.push(presetUser);
                } else {
                    teamB.push(presetUser);
                }


                return message.reply("Preset @"+ message.guild.member(presetUser).nickname +" into team " + args[2] + " as a " + args[1]);
            }else {
                return message.channel.send("User or author not in the Queue");
            }
                        
        }else{
            return message.channel.send("Wrong inputs");
        }

    },
};