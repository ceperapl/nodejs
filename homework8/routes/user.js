import { getAllUsers, getUserById, createUser, deleteUserById } from '../controllers/user';

async function getAllUsersTreatment(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
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
      res.status(200).json(user);
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
      res.status(200).json(user);
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
   *     summary: Returns all users
   *     description: Returns all users
   *     tags:
   *      - User
   *     produces:
   *      - application/json
   *     parameters: []
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/User'
   *       500:
   *         description: Internal Server Error!
   *   post:
   *     summary: Create new user
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
   *          $ref: '#/definitions/UserWithoutId'
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/User'
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
   *     summary: Returns user by id
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/User'
   *       404:
   *         description: User is not found!
   *       500:
   *         description: Internal Server Error!
   *   delete:
   *     summary: Delete user by id
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/User'
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
