class BaseAuthClient {
    source;

    constructor()

    getUserToken() {
        throw new Error('Auth client must implement the getUserToken() function.');
    }

    getAppToken() {
        throw new Error('Auth client must implement the getAppToken() function.');
    }
}