module.exports = {
    name: 'info',
    aliases: ['infomation'],
    description: 'Info!',
    cooldown: 0,
    guildOnly: true,
    args: false,
    usage: '',
    execute(message, args) {
        message.channel.send('@CopyRight from JavenW.');
    },
};