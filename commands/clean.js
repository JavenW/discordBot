module.exports = {
    name: 'clean',
    aliases: ['restart'],
    description: 'clean the queue!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args, queue, teamA, teamB, userMap, role, roleMap, currA, currB) {

        while(teamA.length){
            teamA.shift();
        }
        while(teamB.length){
            teamB.shift();
        }

        while(currA.length){
            currA.shift();
        }
        while(currB.length){
            currB.shift();
        }

        while(queue.length){
            queue.shift();
        }
    },
};
