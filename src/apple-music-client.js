const MusicSourceClient = require('./musicSourceClient');
const constants = require('../lib/constants');
const factory = require('./client-factory');
const request = require('request-promise');

const DEV_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikg3WlFZNzI5Q1kifQ.eyJpYXQiOjE1NjAyMTg5NTcsImV4cCI6MTU3MDU4Njk1NywiaXNzIjoiTTk5ODJLQURRTiJ9.B4OzCC_Gc0FbJgflkAO_EnTTZyi0faoqiy0jnAX2Eb_8mLgKkU6LyxuVMAYqLT4lBZ7k3eKX57ugQThFp7Aaow'

const URL_BASE = 'https://api.music.apple.com/v1';
const API_LIBRARY_PATH = '/me/library';
const API_PLAYLIST_PATH = '/playlists'

class AppleMusicClient extends MusicSourceClient {
    constructor(source) {
        super(constants.SOURCE_APPLE);
    }

    initializeWebApi() {
        console.log("Initializing authentication client for Apple...");
        this.authClient = factory.createAuthorizationClient(this.source);

        return new Promise((resolve, reject) => {
            if (this.musicToken) {
                console.log('Apple auth token already initialized.');
                resolve(this.musicToken);
            } else {
                console.log('Initializing new Apple Music user token.');
                this.authClient.getUserToken()
                    .then((token) => {
                        this.musicToken = token;
                        resolve(token);
                    });
            }
        });
    }

    getPlaylists() {

        this.initializeWebApi()
            .then(() => {
                var options = {
                    uri: URL_BASE + API_LIBRARY_PATH + API_PLAYLIST_PATH,
                    headers: {
                        'Music-User-Token': this.musicToken,
                        'Authorization': 'Bearer ' + DEV_TOKEN
                    }
                };
                request(options)
                    .then((data) => {
                        console.log('Playlists from Apple: ' + data);
                    })
            })
    }
}

module.exports = AppleMusicClient;