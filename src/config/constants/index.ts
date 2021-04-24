import { MongoErrorCodes } from 'config/constants/mongodb-error-codes';

const saltRounds = 15;
const PASSWORD_REGEX = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$%!&*\_\-#?])[A-Za-z\d@$!%\_\-*#&?]{6,}/g;

export { saltRounds, MongoErrorCodes, PASSWORD_REGEX };
