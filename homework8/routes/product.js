import { getAllProducts, getProductById, createProduct, deleteProductById } from '../controllers/product';
import { getReviewsByProductId } from '../controllers/review';

async function getAllProductsTreatment(req, res) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getProductByIdTreatment(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product is not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createProductTreatment(req, res) {
  try {
    const productBody = req.body;
    const product = await createProduct(productBody);
    res.status(200).json(product);
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteProductByIdTreatment(req, res) {
  try {
    const product = await deleteProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product is not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getReviewsByProductIdTreatment(req, res) {
  try {
    const reviews = await getReviewsByProductId(req.params.id);
    res.status(200).json(reviews);
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const setProductApi = (router) => {
  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Returns all products
   *     description: Returns all products
   *     tags:
   *      - Product
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Product'
   *       500:
   *         description: Internal Server Error!
   *   post:
   *     summary: Create new product
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
   *          $ref: '#/definitions/ProductWithoutId'
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/Product'
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
   *     summary: Returns product by id
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/Product'
   *       404:
   *         description: Product is not found!
   *       500:
   *         description: Internal Server Error!
   *   delete:
   *     summary: Delete product by id
   *     description: Delete product by id
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/Product'
   *       404:
   *         description: Product is not found!
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/products/:id')
    .get(getProductByIdTreatment)
    .delete(deleteProductByIdTreatment);

  /**
   * @swagger
   * /api/products/{id}/reviews:
   *   get:
   *     summary: Returns product reviews
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
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/Review'
   *       404:
   *         description: Product is not found!
   *       500:
   *         description: Internal Server Error!
   */
  router.route('/products/:id/reviews')
    .get(getReviewsByProductIdTreatment);
};

export default setProductApi;
