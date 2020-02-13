/**
 * Configuration.
 */

var config = {
	clients: [{
		id: 'application',
        clientId: 'application',
        userId: 'freddbull',
		clientSecret: 'secret',
		grants: [
			'password',
            'refresh_token',
            'client_credentials',
		],
		redirectUris: []
	}],
	tokens: [],
	users: [{
        userId: 'freddbull',
		username: 'freddbull',
		password: 'password'
	}]
};

/**
 * Dump the memory storage content (for debug)
 */
const dump = () => {
    console.log(config.clients);
    console.log(config.tokens);
    console.log(config.users);
}

/**
 * Dump the memory storage content in an Express middleware
 */
const expressDump = (req, res, next) => {
    console.log(config.clients);
    console.log(config.tokens);
    console.log(config.users);
    next();
} 

/**
 * Invoked to retrieve a client using a client id or a client
 * id/client secret combination, depending on the grant type.
 * 
 * @param {*} clientId      The client id of the client to retrieve.
 * @param {*} clientSecret  The client secret of the client to retrieve. Can be null.
 */
const getClient = (clientId, clientSecret) => {
    console.log('Get client was called!');
    
    return new Promise((resolve, reject) => {
        let client = null;
        if(!clientSecret) {
            client = config.clients.find((client) => client.clientId === clientId);
        } else {
            client = config.clients.find((client) => client.clientId === clientId && client.clientSecret === clientSecret);
        }
        if(!client) {
            reject();
        }
        resolve(client);
    });
};

/**
 * Invoked to retrieve a user using a username/password combination.
 * 
 * @param {*} username 
 * @param {*} password
 * 
 * @returns An Object representing the user, or a falsy value if no such user could
 *          be found. The user object is completely transparent to oauth2-server and is 
 *          simply used as input to other model functions.
 */
const getUser = (username, password) => {    
    console.log('Get user was called!');
    return config.users.find((user) => user.username === username && user.password === password);
};

/**
 * Invoked to save an access token and optionally a refresh token,
 * depending on the grant type.
 * 
 * @param {Object} token The token(s) to be saved.
 * @param {String} token.accessToken The access token to be saved.
 * @param {Date} token.accessTokenExpiresAt The expiry time of the access token.
 * @param {String} token.refreshToken The refresh token to be saved.
 * @param {Date} token.refreshTokenExpiresAt The expiry time of the refresh token.
 * @param {String} token.scope The authorized scope of the token(s).
 * @param {Object} client The client associated with the token(s).
 * @param {Object} user The user associated with the token(s).
 */
const saveToken = (token, client, user) => {
    console.log('Save token was called!');

	token.client = {
		id: client.clientId,
	};

	token.user = {
		username: user.username,
	};

    config.tokens.push(token);

	return token;
};

/**
 * Invoked to revoke a refresh token.
 * 
 * @param {Object} token The token to be revoked.
 * @param {String} token.refreshToken The refresh token.
 * @param {Date}   token.refreshTokenExpiresAt The expiry time of the refresh token.
 * @param {String} token.scope The authorized scope of the refresh token.
 * @param {Object} token.client The client associated with the refresh token.
 * @param {String} token.client.id A unique string identifying the client.
 * @param {Object} token.user The user associated with the refresh token.
 * @returns {Boolean} Return true if the revocation was successful or false if the refresh token could not be found.
 */
const revokeToken = (token) => {

    let tmp_length = config.tokens.length;

	config.tokens = config.tokens.filter(function(savedToken) {

		return savedToken.refreshToken !== token.refreshToken;
    });

    return tmp_length !== config.tokens.length;
};

 /**
  * Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
  * 
  * @param {String} refreshToken The access token to retrieve.
  * @returns {Object} An Object representing the refresh token and associated data.
  * See: https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getrefreshtoken
  */
const getRefreshToken = function(refreshToken) {
	return config.tokens.find((savedToken) => savedToken.refreshToken === refreshToken);
};

/**
 * Invoked to retrieve an existing access token previously saved through Model#saveToken().
 * 
 * @param {String} accessToken The access token to retrieve.
 */
var getAccessToken = (accessToken) => {
    console.log('Get access token was called!');

    return config.tokens.find((token) => token.accessToken === accessToken);
};

/**
 * Invoked to retrieve the user associated with the specified client.
 * 
 * @param {Object} client The client to retrieve the associated user for.
 * @param {String} client.id A unique string identifying the client.
 */
const getUserFromClient =(client) => {
    console.log('Get user from client was called!');

    return config.users.find((user) => user.userId === client.userId);
};

/**
 * Gives error if not implemented. Only needed for Authorization Code Grant!
 */
const saveAuthorizationCode = (code, client, user) => {
    console.log('Save authorization code was called!');

    console.error('\'saveAuthorizationCode\' is not implemented!');
}

module.exports = {
    getClient,
    getUser,
    saveToken,
    revokeToken,
    getRefreshToken,
    dump,
    expressDump,
    saveAuthorizationCode,
    getAccessToken,
    getUserFromClient,
}
