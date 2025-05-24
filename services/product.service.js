const Product = require('../models/Product');
const redisClient = require('../config/redisClient');

/**
 * Retrieves all products, using Redis to cache results.
 *
 * - First checks Redis for cached data under the key `'products'`.
 * - If found, returns the cached data (cache hit).
 * - If not found, fetches from the database, stores the result in Redis (cache write), and returns it.
 * - The cache entry expires in 180 seconds (3 minutes).
 *
 * @returns {Promise<Array>} An array of product objects
 */
exports.getAllProducts = async () => {
	// Try to get cached products from Redis
	const cached = await redisClient.get('products');

	if (cached) {
		console.log('Cache Hit: Serving products from cache');
		return JSON.parse(cached); // Return cached data after parsing JSON
	}

	// If cache miss, fetch products from the database
	console.log('Cache Miss: Fetching products from DB');
	const products = await Product.findAll();

	// Store the fetched products in Redis cache for 180 seconds (3 minutes)
	console.log('Cache Write: Storing fetched products in Redis (TTL: 180s)');
	await redisClient.set('products', JSON.stringify(products), { EX: 180 });

	return products;
};
