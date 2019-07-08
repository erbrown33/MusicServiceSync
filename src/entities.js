const constants = require('../lib/constants');

class MusicArtifact {
    constructor(source) {
        this.source = source;
    }
}

class Album extends MusicArtifact {

    constructor(source, name) {
        super(source);
        this.name = name;
    }
}

class Track extends MusicArtifact {

    constructor(source, name, album) {
        super(source);
        this.name = name;
        this.album = album;
    }

    isMatch(track) {
        // Logic to determine likihood of a match
    }
}

class Playlist extends MusicArtifact {
    constructor(source, name) {
        super(source);
        this.name = name;
        this.tracks = [];
    }
}

module.exports = { MusicArtifact, Album, Track};