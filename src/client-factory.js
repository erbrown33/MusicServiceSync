const constants = require('../lib/constants');
const BaseAuthClient = require('./baseAuthClient');
const SpotifyAuthClient = require('./spotifyAuthClient');
const AppleAuthClient = require('./appleAuthClient');
const SpotifySourceClient = require('./spotify-source-client');
const AppleMusicClient = require('./apple-music-client');

function createAuthorizationClient(source) {
    switch (source) {
        case constants.SOURCE_APPLE:
            return new AppleAuthClient();
        case constants.SOURCE_SPOTIFY:
            return new SpotifyAuthClient();
        default:
            throw new Error('Unsupported authorization client requested: ' + source);
    }

}

function createMusicClient(source) {
    switch (source) {
        case constants.SOURCE_SPOTIFY:
            return new SpotifySourceClient();
        case constants.SOURCE_APPLE:
            return new AppleMusicClient();
        default:
            throw new Error('Unsupported authorization client requested: ' + source);
    }

}

module.exports.createAuthorizationClient = createAuthorizationClient;
module.exports.createMusicClient = createMusicClient;