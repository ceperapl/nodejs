import {
  getRandomCity, getAllCities, createCity,
  getCityById, deleteCityById, updateCityById,
} from '../controllers/city';

async function getAllCitiesTreatment(req, res) {
  try {
    const cities = await getAllCities();
    res.status(200).json(cities);
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
      res.status(200).json(city);
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getRandomCityTreatment(req, res) {
  try {
    const city = await getRandomCity();
    res.status(200).json(city[0]);
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createCityTreatment(req, res) {
  try {
    const cityBody = req.body;
    const city = await createCity(cityBody);
    res.status(200).json(city);
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
      res.status(200).json(city);
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
      res.status(200).json(city);
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
   *     summary: Returns all cities
   *     description: Returns all cities
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     parameters: []
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/City'
   *       500:
   *         description: Internal Server Error!
   *   post:
   *     summary: Create new city
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
   *          $ref: '#/definitions/CityWithoutId'
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/City'
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
   *     summary: Returns random city
   *     description: Returns random city
   *     tags:
   *      - City
   *     produces:
   *      - application/json
   *     parameters: []
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/City'
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/cities/random')
    .get(getRandomCityTreatment);

  /**
   * @swagger
   * /api/cities/{id}:
   *   get:
   *     summary: Returns city by id
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/City'
   *       404:
   *         description: City is not found!
   *       500:
   *         description: Internal Server Error!
   *   put:
   *     summary: Update city by id
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
   *          $ref: '#/definitions/CityWithoutId'
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/City'
   *       404:
   *         description: City is not found!
   *       500:
   *         description: Internal Server Error!
   *   delete:
   *     summary: Delete city by id
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/City'
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
