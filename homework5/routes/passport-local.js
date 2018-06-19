import jwt from 'jsonwebtoken';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import AUTH_CONFIGS from '../config/auth';
import { login } from '../controllers/user';

const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  session: false,
};

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await login({ email, password });
    if (!user) {
      return done(null, false, {
        code: 404,
        message: 'User not found',
      });
    }
    const userId = { sub: user.id };
    const token = jwt.sign(userId, 'secret', { expiresIn: 100 });
    return done(null, {
      code: 200,
      message: 'OK',
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      token,
    });
  } catch (exception) {
    console.log(exception);
    return done(null, false, { error: 'Internal Server Error' });
  }
}));

const setPassportLocalApi = (router) => {
  /**
   * @swagger
   * /api/auth/login/local:
   *   post:
   *     description: Login user
   *     tags:
   *      - Auth
   *     produces:
   *      - application/json
   *     parameters:
   *      - user:
   *        name: user
   *        description: parameter contains object which describe user
   *        in: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *              example: siarhei_pazdniakou1@epam.com
   *            password:
   *              type: string
   *              example: siarhei_pazdniakou1@epam.com
   *          required:
   *            - email
   *            - password
   *     responses:
   *       200:
   *         description: user
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/auth/login/local')
    .post(passport.authenticate('local', options));

  router.route('/auth/login/error')
    .get((req, res) => {
      res.status(200).json({ error: 'login error' });
    });
};

export default setPassportLocalApi;
