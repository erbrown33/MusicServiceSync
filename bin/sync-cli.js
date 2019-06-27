#!/usr/bin/env node
//require('../')();
const SpotifyAuthClient = require('../src/spotifyAuthClient');
const AppleAuthClient = require('../src/appleAuthClient');

let spotifyAuthClient = new SpotifyAuthClient();
let appleAuthClient = new AppleAuthClient();

console.log('Obtaining Spotify user token...');
var appleUserToken = spotifyAuthClient.getUserToken()
.then((token) => {
    console.log('Spotify token: ' + token);
    console.log('Obtaining Apple Music user token...');
    return appleAuthClient.getUserToken();
})
.then((token) => {
    console.log('Apple Music user token: ' + token);
});

console.log('We done');