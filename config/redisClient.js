require('dotenv').config();
const redis = require('redis');

const client = redis.createClient({
	socket: {
		host: process.env.REDIS_HOST || 'localhost',
		port: Number(process.env.REDIS_PORT) || 6379,
	},
});

client.on('connect', () => {
	console.log('Connected to Redis!');
});

client.on('error', (err) => {
	console.error('Redis Client Error', err);
});

(async () => {
	try {
		await client.connect();
	} catch (err) {
		console.error('Redis connection failed:', err);
	}
})();

module.exports = client;
