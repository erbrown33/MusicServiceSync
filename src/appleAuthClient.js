const opn = require('opn')
const chalk = require('chalk')
const express = require('express')
const argv = require('minimist')(process.argv.slice(2))
const BaseAuthClient = require('./baseAuthClient');

const PORT = argv.port || 4816

const URL = 'http://localhost:' + PORT + '/auth'

const app = express()
var server;

class AppleAuthClient extends BaseAuthClient {

  processAppleMusicUserAuth() {
    app.get('/auth', (req, res) => {
      res.sendFile(__dirname + '/appleAuth.html');
      console.log('Processing auth')
      if (req.query.error) {
        console.log(chalk.red('Something went wrong. Error: '), req.query.error);
      }
    });

    return new Promise((resolve, reject) => {
      app.get('/token', (req, res) => {
        res.sendStatus(200)
        console.log('Processing token from query: ' + req.query)
        var token = decodeURIComponent(req.query.access_token);
        if (token) {
          console.log(chalk.green('Your user music token is: '), chalk.bold(token));
          resolve(token);
        } else {
          reject(Error('Unable to resolve valid token after Apple Music authorization.'));
        }
      });
    });
  }

  launchAuthServer() {
    server = app.listen(PORT, () => {
      console.log(chalk.blue('Opening the Apple Music Auth utility in your browser...'))
      opn(URL)
    })
  }

  getUserToken() {
    this.launchAuthServer();

    return new Promise((resolve, reject) => {
      this.processAppleMusicUserAuth().then((token) => {
        console.log('Received valid Apple Music user token: ' + token);
        server.close();
        resolve(token);
      });
    });
  }
}

module.exports = AppleAuthClient;
