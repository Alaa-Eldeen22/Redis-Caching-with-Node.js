const productService = require('../services/product.service');

/**
 * Controller: Handles the HTTP GET request to fetch all products.
 *
 * - Calls the product service to retrieve all products (with caching).
 * - Sends a JSON response with the list of products and HTTP 200 on success.
 * - If an error occurs, returns HTTP 500 with an error message.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
exports.getAllProducts = async (req, res) => {
	try {
		// Fetch products via the service (may use Redis caching internally)
		const products = await productService.getAllProducts();

		// Respond with the product data
		res.status(200).json(products);
	} catch (err) {
		// Handle any unexpected errors
		console.error('Error fetching products:', err);
		res.status(500).json({ error: err.message });
	}
};
