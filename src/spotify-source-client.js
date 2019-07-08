const MusicSourceClient = require('./musicSourceClient');
const constants = require('../lib/constants');
const SpotifyWebApi = require('spotify-web-api-node');
const factory = require('./client-factory');

class SpotifySourceClient extends MusicSourceClient {
    constructor() {
        super(constants.SOURCE_SPOTIFY);
    }

    initializeWebApi() {
        console.log("Initializing authentication client for Spotify...");
        this.spotifyApi = new SpotifyWebApi();
        this.authClient = factory.createAuthorizationClient(this.source);

        return new Promise((resolve, reject) => {
            if (this.spotifyApi.getAccessToken()) {
                console.log('Spotify auth token already initialized.');
                resolve(this.spotifyApi);
            } else {
                console.log('Initializing new Spotify access token.');
                this.authClient.getUserToken()
                    .then((token) => {
                        this.spotifyApi.setAccessToken(token);
                        resolve(this.spotifyApi);
                    });
            }
        });
    }

    getPlaylists() {
        this.initializeWebApi()
            .then(() => {
                console.log('Retrieving Spotify playlists...');
                return this.spotifyApi.getUserPlaylists()
            })
            .then((result) => {
                console.log(result.body);
            });
    }
}

module.exports = SpotifySourceClient;
