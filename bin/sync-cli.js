#!/usr/bin/env node

try {
    const config = require('../config.json');
    validateConfig();
    runMusicSync();
} catch (err) {
    console.error('Configuration file [config.json] with required attributes must exist in the root directory - see README for details: ' + err);
    process.exitCode = 1;
}

function validateConfig() {
    return;
}

function runMusicSync() {
    const SpotifyAuthClient = require('../src/spotifyAuthClient');
    const AppleAuthClient = require('../src/appleAuthClient');
    const factory = require('../src/client-factory');
    const constants = require('../lib/constants');

    let spotifyAuthClient = new SpotifyAuthClient();
    let appleAuthClient = new AppleAuthClient();

    let spotifyApi = factory.createMusicClient(constants.SOURCE_SPOTIFY);
    spotifyApi.getPlaylists();

    let appleApi = factory.createMusicClient(constants.SOURCE_APPLE);
    appleApi.getPlaylists();
}

console.log('We done');