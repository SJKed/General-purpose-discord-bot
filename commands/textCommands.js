module.exports = {
    deleteMessages(message) {
        const amount = message.content.split(' ')[1];
        if (!amount) { return message.channel.send('Please enter a number!'); }
        if (amount > 100) { return message.channel.send('Please enter a number less than 100!'); }
        if (amount < 1) { return message.channel.send('Please enter a number greater than 1!'); }
        message.channel.messages.fetch({ limit: amount }).then(messages => {
            messages.forEach(message => {
                message.delete();
            });
        });
    },

    getId(message) {
        const user = message.mentions.users.first();
        if (!user) { return message.channel.send('Please mention a user!'); }
        message.channel.send(`${user.id}`);
    },

}