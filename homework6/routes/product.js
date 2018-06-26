import { getAllProducts, getProductById, createProduct } from '../controllers/product';
import { getReviewsByProductId } from '../controllers/review';

async function getAllProductsTreatment(req, res) {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getProductByIdTreatment(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product is not found' });
    } else {
      res.status(200).json({ product });
    }
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createProductTreatment(req, res) {
  try {
    const productBody = req.body;
    const product = await createProduct(productBody);
    res.status(200).json(product);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getReviewsByProductIdTreatment(req, res) {
  try {
    const reviews = await getReviewsByProductId(req.params.id);
    res.status(200).json({ reviews });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const setProductApi = (router) => {
  /**
   * @swagger
   * /api/products:
   *   get:
   *     description: Returns all products
   *     tags:
   *      - Product
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: products
   *       500:
   *         description: Internal Server Error!
   *   post:
   *     description: Create new product
   *     tags:
   *      - Product
   *     produces:
   *      - application/json
   *     parameters:
   *      - product:
   *        name: product
   *        description: parameter contains object which describe product
   *        in: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *              example: product111
   *            price:
   *              type: integer
   *              example: 43
   *            amount:
   *              type: integer
   *              example: 5
   *          required:
   *            - name
   *            - price
   *            - amount
   *     responses:
   *       200:
   *         description: product
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/products')
    .get(getAllProductsTreatment)
    .post(createProductTreatment);

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     description: Returns product by id
   *     tags:
   *      - Product
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the product to get
   *     responses:
   *       200:
   *         description: product
   *       404:
   *         description: Product is not found!
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/products/:id')
    .get(getProductByIdTreatment);

  /**
   * @swagger
   * /api/products/{id}/reviews:
   *   get:
   *     description: Returns product reviews
   *     tags:
   *      - Product
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the product to get
   *     responses:
   *       200:
   *         description: review
   *       404:
   *         description: Product is not found!
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/products/:id/reviews')
    .get(getReviewsByProductIdTreatment);
};

export default setProductApi;
