module.exports = () => {
    console.log('Welcome to the music sync tool!');
}

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '2fcef4a4a1614ec8bf04dab266d9ad8a',
    clientSecret: '5649cac9a4924f2db8a31cf6e3114904',
});

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    })
    .then(function(data) {
      console.log('Artist albums', data.body);
    })
    .catch(function(err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    });
