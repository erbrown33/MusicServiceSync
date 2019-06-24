const opn = require('opn')
const chalk = require('chalk')
const express = require('express')
const argv = require('minimist')(process.argv.slice(2))

const PORT = argv.port || 4815

const URL = 'http://localhost:' + PORT + '/auth'

const app = express()

app.get('/auth', (req,res) => {
    res.sendFile(__dirname + '/appleAuth.html');
    console.log('Processing auth')
    if (req.query.error) {
        console.log(chalk.red('Something went wrong. Error: '), req.query.error);
    }
});

app.get('/token', (req, res) => {
  res.sendStatus(200)
  console.log('Processing token from query: ' + req.query)
  const token = req.query.access_token
  if (token) {
    console.log(chalk.green('Your user music token is: '), chalk.bold(decodeURIComponent(token)));
  }

  process.exit()
})

const main = () => {
  app.listen(PORT, () => {
    console.log(chalk.blue('Opening the Apple Music Auth utility in your browser...'))
    opn(URL)
  })
}

module.exports = main
