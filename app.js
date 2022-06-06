const Discord = require('discord.js');
const env = require('dotenv').config();
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { deleteMessages, getId, voiceCrickets } = require('./commands/textCommands');
const ytdl = require('ytdl-core');
const { exitCode, exit } = require('process');
const { getVideoDurationInSeconds } = require('get-video-duration')
const chalk = require('chalk');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] })

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.content.includes('!getid')) {
        getId(message);
    }

    if (message.content.includes('!delete')) {
        deleteMessages(message)
    }

    if (message.content == '!ping') {
        message.channel.send('Pong!');
    }

    if (message.content == '!cookie') {
        try {
            const channel = message.member.voice.channel;
            console.log(channel);
            const connection = voiceConnection(channel);
            const player = createAudioPlayer(connection);
            const resource = createAudioResource(ytdl('https://youtu.be/FiakHYXMGhM', { filter: 'audioonly' }));
            player.play(resource);
            connection.subscribe(player);
            setTimeout(() => {
                player.stop();
                connection.disconnect();
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    }
    if (message.content == '!btr') {
        try {
            const channel = message.member.voice.channel;
            console.log(channel);
            const connection = voiceConnection(channel);
            const player = createAudioPlayer(connection);
            const resource = createAudioResource(ytdl('https://youtu.be/KYCtHgCHqbw', { filter: 'audioonly' }));
            player.play(resource);
            connection.subscribe(player);
            setTimeout(() => {
                player.stop();
                connection.disconnect();
            }, 2100000);
        } catch (error) {
            console.log(error);
        }
    }

    if (message.content.includes('!play')) {
        try {
            const channel = message.member.voice.channel;
            const audio = message.content.split(' ')[1];
            const connection = voiceConnection(channel);
            const player = createAudioPlayer(connection);
            const resource = createAudioResource(ytdl(audio, { filter: 'audioonly' }));
            player.play(resource);
            connection.subscribe(player);
            setTimeout(() => {
                player.stop();
                connection.disconnect();
            }, 300000);
        } catch (error) {
            console.log(error);
        }
    }

    if (message.content == '😐') {
        try {
            const channel = message.member.voice.channel;
            console.log(channel);
            const connection = voiceConnection(channel);
            const player = createAudioPlayer(connection);
            const resource = createAudioResource(ytdl('https://www.youtube.com/watch?v=K8E_zMLCRNg', { filter: 'audioonly' }));
            player.play(resource);
            connection.subscribe(player);
            setTimeout(() => {
                player.stop();
                connection.disconnect();
            }, 4000);
        } catch (error) {
            console.log(error);
        }
    }

});

client.on('voiceStateUpdate', (newMember, oldMember) => {
    if (newMember.id === '153326445362413569') {
        const channel = newMember.guild.channels.cache.find(channel => channel.name === 'Froggy Pond');
        console.log(channel.name);
        const connection = voiceConnection(channel);
        const player = createAudioPlayer(connection);
        const resource = createAudioResource(ytdl('https://youtu.be/FiakHYXMGhM', { filter: 'audioonly' }));

        player.play(resource);
        connection.subscribe(player);
        setTimeout(() => {
            player.stop();
            connection.disconnect();
        }, 5000);
    }
});

// 153326445362413569 cookie
// 151039878694567937 simon
// https://www.youtube.com/watch?v=MBmb5_TTT-w - fart sound 

function voiceConnection(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    return connection;
}


client.login(process.env.BOT_TOKEN)