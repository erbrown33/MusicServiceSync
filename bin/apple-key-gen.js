#!/usr/bin/env node
const jwt = require('jsonwebtoken');
const fs = require('fs');

const teamId = 'M9982KADQN';
const keyId = 'H7ZQY729CY';

const signingKey = fs.readFileSync(new URL('file:///Users/ebrown/Downloads/AuthKey_' + keyId + '.p8')).toString();
console.log(signingKey);

var token = jwt.sign({}, signingKey, {
    algorithm: 'ES256',
    expiresIn: '120d',
    issuer: teamId,
    keyid: keyId
});

console.log(token);
console.log('Verifying output...\n');

var verified = jwt.verify(token, publicKey, { algorithms: ['ES256'] });
console.log('VERIFIED:' + verified.iss);



//curl -v -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikg3WlFZNzI5Q1kifQ.eyJpYXQiOjE1NjAyMTg5NTcsImV4cCI6MTU3MDU4Njk1NywiaXNzIjoiTTk5ODJLQURRTiJ9.B4OzCC_Gc0FbJgflkAO_EnTTZyi0faoqiy0jnAX2Eb_8mLgKkU6LyxuVMAYqLT4lBZ7k3eKX57ugQThFp7Aaow' "https://api.music.apple.com/v1/catalog/us/songs/203709340"
//curl -v -H 'Music-User-Token: Au4AH+qQEiDXrZ05zabx+DFqn4eX6inryxz+aKQkyikW0Gk5yPkW2iEVgstalsApss8D1OlH1uoXDFZOUuDUKCJEWl7+Ib/QU4NNkIVC/l7mL6dvV8WuXIHVHyGoiJh6jPfHRzJb2PZcq+CAyftyNpznDWon2Dt7X2W2PdVwhLJuVLci7+l5Ne2nbHb3jCDGBmNSxRRoh2V96H1S/yA5T+01aXOgIvNAIXqX4BDyRz+5wNeeJw==' -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikg3WlFZNzI5Q1kifQ.eyJpYXQiOjE1NjAyMTg5NTcsImV4cCI6MTU3MDU4Njk1NywiaXNzIjoiTTk5ODJLQURRTiJ9.B4OzCC_Gc0FbJgflkAO_EnTTZyi0faoqiy0jnAX2Eb_8mLgKkU6LyxuVMAYqLT4lBZ7k3eKX57ugQThFp7Aaow' "https://api.music.apple.com/v1/me/library/playlists"
//curl -v -H 'Music-User-Token: AtoSBR1IrRT5YeBd3JP8Zn2vLiPKGJz+qQarNTw/psCwulrFlLrP7GB2A8chhclSnXhUG+7vsOF7Rr/cU6OCoK5HWXjVHdANle19sZ1pDI15u7zDi8NJ7szWhYKkI9gcbGhmyi6ISIJHsMKobRPlTtepMux+4MBj3fR2q3eyczXst8opcppXkev19iBxfiktDC1Xmlp/HslbFbkHi7WTuzyAEiXC36COh6O7PKkWEHJMHSETEA==' -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdBUzhXQTVCRFcifQ.eyJpYXQiOjE1NTczNDY4MDksImV4cCI6MTU3Mjg5ODgwOSwiaXNzIjoiSloyVE1BR0syMyJ9.rPrIVufoc38Qh31HX8BaYoSh4ICXvHtUlyflv-22u2XdJnLo5YUzBUP1StlXTkBzJxbN19HrszyEopFlKyCwEg' "https://api.music.apple.com/v1/me/library/playlists"