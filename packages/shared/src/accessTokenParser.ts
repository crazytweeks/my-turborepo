import bcrypt from 'bcrypt';

import config from './config';

const {TOKEN_SECRET} = config;
const saltRounds = 2;

const accessTokenParser = (token?: string | null) => new Promise<string>((resolve, reject) => {
    if (!token) {
        return reject("No token provided");
    }

    bcrypt.compare(token, TOKEN_SECRET, function(err, result) {
        console.log('result: ', result);
        console.log('err: ', err);
        if (err) {
            return reject(err);
        }
        resolve(result ? token : "");
    });
});

const accessTokenCreate = (token?: string | null) => new Promise<string>((resolve, reject) => {
    if (!token) {
     return   reject("No token provided");
    }

    bcrypt.hash(token, saltRounds, function(err, hash) {
        
        if (err) {
            return reject(err);
        }
        resolve(
            // resolve string to safely sent in url params
            encodeURIComponent(hash)
        );
    });
});

export {accessTokenParser , accessTokenCreate};