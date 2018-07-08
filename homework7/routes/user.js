import { getAllUsers, getUserById, createUser, deleteUserById } from '../controllers/user';

async function getAllUsersTreatment(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserByIdTreatment(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User is not found' });
    } else {
      res.status(200).json({ user });
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createUserTreatment(req, res) {
  try {
    const userBody = req.body;
    const user = await createUser(userBody);
    res.status(200).json(user);
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUserByIdTreatment(req, res) {
  try {
    const user = await deleteUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User is not found' });
    } else {
      res.status(200).json({ user });
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const setUserApi = (router) => {
  /**
   * @swagger
   * /api/users:
   *   get:
   *     description: Returns all users
   *     tags:
   *      - User
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: users
   *       500:
   *         description: Internal Server Error!
   *   post:
   *     description: Create new user
   *     tags:
   *      - User
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
   *            firstName:
   *              type: string
   *              example: Ivan
   *            lastName:
   *              type: string
   *              example: Ivanov
   *            email:
   *              type: string
   *              example: ivanov@gmail.com
   *            password:
   *              type: string
   *              example: password
   *          required:
   *            - firstName
   *            - lastName
   *            - email
   *            - password
   *     responses:
   *       200:
   *         description: user
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/users')
    .get(getAllUsersTreatment)
    .post(createUserTreatment);

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     description: Returns user by id
   *     tags:
   *      - User
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the user to get
   *     responses:
   *       200:
   *         description: user
   *       404:
   *         description: User is not found!
   *       500:
   *         description: Internal Server Error!
   *   delete:
   *     description: Delete user by id
   *     tags:
   *      - User
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the user to get
   *     responses:
   *       200:
   *         description: user
   *       404:
   *         description: User is not found!
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/users/:id')
    .get(getUserByIdTreatment)
    .delete(deleteUserByIdTreatment);
};

export default setUserApi;
