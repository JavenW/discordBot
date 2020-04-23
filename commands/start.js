module.exports = {
    name: 'start',
    aliases: ['begin'],
    description: 'start the game!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {

        const channelA = message.guild.channels.cache.find(channel => channel.name === 'LOL内战左边');
        const channelB = message.guild.channels.cache.find(channel => channel.name === 'LOL内战右边');

        if(currA.length!=0){
            currA.map(user => {
                let rMember = message.guild.member(user);
                if(rMember.voice.channel){
                    rMember.voice.setChannel(channelA);
                }
            })
        }


        if(currB.length!=0){
            currB.map(user => {
                let rMember = message.guild.member(user);
                if(rMember.voice.channel){
                    rMember.voice.setChannel(channelB);
                }
            })
        } 
    },
};