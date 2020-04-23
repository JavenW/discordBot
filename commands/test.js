// role
// roleMap, 0-top,1-jg,2-mid,3-adc,4-sup
module.exports = {
    name: 'test',
    aliases: [''],
    description: 'split the #queue!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {
        console.log(currB);
    },
};