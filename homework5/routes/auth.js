import jwt from 'jsonwebtoken';
import { login } from '../controllers/user';

async function loginTreatment(req, res) {
  try {
    const user = await login(req.body);
    if (!user) {
      res.status(404).json({
        code: 404,
        message: 'User not found',
      });
    }
    const userId = { sub: user.id };
    const token = jwt.sign(userId, 'secret', { expiresIn: 100 });
    res.cookie('auth', token);
    res.json({
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function logoutTreatment(req, res) {
  try {
    res.clearCookie('auth');
    res.status(200).json({ result: 'logout successful' });
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const setAuthApi = (router) => {
  /**
   * @swagger
   * /api/auth/login:
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
  router.route('/auth/login')
    .post(loginTreatment);

  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     description: Logout
   *     tags:
   *      - Auth
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: successful
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/auth/logout')
    .post(logoutTreatment);
};

export default setAuthApi;
