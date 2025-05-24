const express = require('express');
require('dotenv').config();
const productRouter = require('./routes/product.routes');
const app = express();
const sequelize = require('./config/database.config');
const { seedProducts } = require('./seeders/products.seeder');
const PORT = process.env.PORT;

app.use('/products', productRouter);


// database synchronization
sequelize
	.sync()
	.then(async () => {
		console.log('Database synchronized');

		// Seed products
		await seedProducts();
		// Start the app
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error during database synchronization:', err);
	});
