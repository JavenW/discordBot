module.exports = {
    name: 'end',
    aliases: ['stop'],
    description: 'end the game!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {

        const mainChannel = message.guild.channels.cache.find(channel => channel.name === 'LOL摇人专区(等待区)');

        if(currA.length!=0){
            currA.map(user => {
                let rMember = message.guild.member(user);
                if(rMember.voice.channel){
                    rMember.voice.setChannel(mainChannel);
                }
            })
        }


        if(currB.length!=0){
            currB.map(user => {
                let rMember = message.guild.member(user);
                if(rMember.voice.channel){
                    rMember.voice.setChannel(mainChannel);
                }
            })
        } 
    },
};