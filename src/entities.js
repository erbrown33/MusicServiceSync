const constants = require('../lib/constants');

class MusicArtifact {
    source = constants.SOURCE_APPLE;
}

class Album extends MusicArtifact {
    name;
    artistName;
    realeaseDate;
    trackCount;

    constructor(name) {
        this.name = name;
    }
}

class Track extends MusicArtifact {
    name;
    length;
    number;
    album;

    constructor(name, album) {
        this.name = name;
        this.album = album;
    }

    isMatch(track) {
        // Logic to determine likihood of a match
    }
}

module.exports = { MusicArtifact, Album, Track};