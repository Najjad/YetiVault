import crypto from 'crypto';

const userTagVar = crypto.randomBytes(64).toString('hex');

export { userTagVar };
