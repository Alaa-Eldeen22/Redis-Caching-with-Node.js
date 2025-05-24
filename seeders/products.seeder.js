const Product = require('../models/Product');

/**
 * Seeds the products table with randomly generated products if it's empty.
 *
 * @param {number} count - The number of product records to insert (default is 10,000).
 * @returns {Promise<void>}
 */
module.exports.seedProducts = async (count = 10000) => {
	try {
		// Check if there are already records in the products table
		const existingCount = await Product.count();
		if (existingCount > 0) {
			console.log(
				`Table already contains ${existingCount} products. Skipping seeding.`
			);
			return;
		}

		const products = [];

		// Generate an array of product objects with randomized values
		for (let i = 0; i < count; i++) {
			products.push({
				name: `Product ${i}`,
				price: parseFloat((Math.random() * 100).toFixed(2)), // random price between 0 and 100
				stock: Math.floor(Math.random() * 100), // random stock between 0 and 99
			});
		}

		// Bulk insert products into the database
		await Product.bulkCreate(products);

		console.log(`${count} products inserted successfully.`);
	} catch (error) {
		console.error('Seeding failed:', error);
	}
};
