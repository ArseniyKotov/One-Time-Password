const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');
const serviceAccount = require('./serviceConfig');
const reqOneTimePassword = require('./reqOneTimePassword');
const verifyOneTimePassword = require('./verifyOneTimePassword');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-password-19dcb.firebaseio.com',
});

exports.createUser = functions.https.onRequest(createUser);
exports.reqOneTimePassword = functions.https.onRequest(reqOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);

