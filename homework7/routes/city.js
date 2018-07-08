import {
  getRandomCity, getAllCities, createCity,
  getCityById, deleteCityById, updateCityById,
} from '../controllers/city';

async function getAllCitiesTreatment(req, res) {
  try {
    const cities = await getAllCities();
    res.status(200).json({ cities });
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getCityByIdTreatment(req, res) {
  try {
    const city = await getCityById(req.params.id);
    if (!city) {
      res.status(404).json({ error: 'City is not found' });
    } else {
      res.status(200).json({ city });
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getRandomCityTreatment(req, res) {
  try {
    const city = await getRandomCity();
    res.status(200).json({ city });
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createCityTreatment(req, res) {
  try {
    const cityBody = req.body;
    const product = await createCity(cityBody);
    res.status(200).json(product);
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateCityByIdTreatment(req, res) {
  try {
    const cityBody = req.body;
    const city = await updateCityById(req.params.id, cityBody);
    if (!city) {
      res.status(404).json({ error: 'City is not found' });
    } else {
      res.status(200).json({ city });
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteCityByIdTreatment(req, res) {
  try {
    const city = await deleteCityById(req.params.id);
    if (!city) {
      res.status(404).json({ error: 'City is not found' });
    } else {
      res.status(200).json({ city });
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const setCityApi = (router) => {
  /**
   * @swagger
   * /api/cities:
   *   get:
   *     description: Returns all cities
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: cities
   *       500:
   *         description: Internal Server Error!
   *   post:
   *     description: Create new city
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     parameters:
   *      - city:
   *        name: city
   *        description: parameter contains object which describe city
   *        in: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *              example: Monaco
   *            country:
   *              type: string
   *              example: Monaco
   *            capital:
   *              type: boolean
   *              example: true
   *            location:
   *              type: object
   *              properties:
   *                lat:
   *                  type: number
   *                  example: 43.738418
   *                long:
   *                  type: number
   *                  example: 7.424616
   *          required:
   *            - name
   *            - country
   *            - capital
   *            - location
   *     responses:
   *       200:
   *         description: product
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/cities')
    .get(getAllCitiesTreatment)
    .post(createCityTreatment);

  /**
   * @swagger
   * /api/cities/random:
   *   get:
   *     description: Returns random city
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: city
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/cities/random')
    .get(getRandomCityTreatment);

  /**
   * @swagger
   * /api/cities/{id}:
   *   get:
   *     description: Returns city by id
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the city to get
   *     responses:
   *       200:
   *         description: city
   *       404:
   *         description: City is not found!
   *       500:
   *         description: Internal Server Error!
   *   put:
   *     description: Update city by id
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the city to get
   *      - city:
   *        name: city
   *        description: parameter contains object which describe city
   *        in: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *              example: Monaco
   *            country:
   *              type: string
   *              example: Monaco
   *            capital:
   *              type: boolean
   *              example: true
   *            location:
   *              type: object
   *              properties:
   *                lat:
   *                  type: number
   *                  example: 43.738418
   *                long:
   *                  type: number
   *                  example: 7.424616
   *     responses:
   *       200:
   *         description: city
   *       404:
   *         description: City is not found!
   *       500:
   *         description: Internal Server Error!
   *   delete:
   *     description: Delete city by id
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the city to get
   *     responses:
   *       200:
   *         description: city
   *       404:
   *         description: City is not found!
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/cities/:id')
    .get(getCityByIdTreatment)
    .put(updateCityByIdTreatment)
    .delete(deleteCityByIdTreatment);
};

export default setCityApi;
