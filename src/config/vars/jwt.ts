import { JwtVars } from 'config/vars/interfaces';

export default (): { jwt: JwtVars } => ({
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: 0,
  },
});
