
const opn = require('opn');
const express = require('express')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))
const clipboardy = require('clipboardy')
const BaseAuthClient = require('./baseAuthClient');
const constants = require('../lib/constants');

const app = express();
var server;

const PORT = argv.port || 4815
const CLIENT_ID = argv.clientId || '2fcef4a4a1614ec8bf04dab266d9ad8a'
const SHOW_DIALOG = argv.showDialog || false
const SCOPE = argv.scope ? argv.scope.split(',').join('%20') : [
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'streaming',
  'ugc-image-upload',
  'user-follow-modify',
  'user-follow-read',
  'user-library-read',
  'user-library-modify',
  'user-read-private',
  'user-read-birthdate',
  'user-read-email',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played'
].join('%20')

const REDIRECT_URI = 'http://localhost:' + PORT + '/callback'

const URL =
  'https://accounts.spotify.com/authorize'
  + '?client_id=' + CLIENT_ID
  + '&response_type=token'
  + '&scope=' + SCOPE
  + '&show_dialog=' + SHOW_DIALOG
  + '&redirect_uri=' + REDIRECT_URI


class SpotifyAuthClient extends BaseAuthClient {

  constructor(source) {
    super(constants.SOURCE_SPOTIFY);
  }

  processSpotifyUserAuth() {
    // Initialize the call back Spotify requires from the auth check
    app.get('/callback', (req, res) => {
      res.sendFile(__dirname + '/callback.html')
      if (req.query.error) {
        console.log(chalk.red('Something went wrong. Error: '), req.query.error)
      }
    })

    // Establish a Promise that should be resolved through the callback request, passing
    // through the token 
    return new Promise((resolve, reject) => {
      app.get('/token', (req, res) => {
        res.sendStatus(200)
        const token = req.query.access_token
        if (token) {
          clipboardy.writeSync(token)
          console.log(chalk.green('Your token is: '), chalk.bold(token))
          console.log('(It has been copied to your clipboard)')
          resolve(token);
        } else {
          reject(Error('Valid Spotify user token was not returned from authorization service.'));
        }
      });
    });
  }

  launchAuthServer() {
    server = app.listen(PORT, () => {
      console.log(chalk.blue('Opening the Spotify Login Dialog in your browser...'))
      opn(URL)
    });
  }

  getUserToken() {
    this.launchAuthServer();
    return new Promise((resolve, reject) => {
      this.processSpotifyUserAuth().then((token) => {
        console.log('Promise resolved token:' + token);
        server.close();
        resolve(token);
      }, (error) => {
        console.log('Promise rejected...awww shit: ' + error);
      })
    });
  }
}

module.exports = SpotifyAuthClient;