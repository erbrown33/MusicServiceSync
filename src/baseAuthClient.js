class BaseAuthClient {

    constructor(source) {
        this.source = source;
    }

    getUserToken() {
        throw new Error('Auth client must implement the getUserToken() function.');
    }

    getAppToken() {
        throw new Error('Auth client must implement the getAppToken() function.');
    }
}

module.exports = BaseAuthClient;