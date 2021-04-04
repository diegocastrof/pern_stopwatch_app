import express from 'express';
import path from 'path';
import routes from './routes';
const db = require('./models/index').sequelize;
const cors = require('cors');

const app = express();

// DB connection
console.log('Trying to connect to database...');
try {
	db.authenticate();
	console.log('Connection to database has been established successfully.');
} catch (err) {
	console.error('Unable to connect to the database:', err);
}

// Server config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('stopwatch_tubesoft_front/build'));

	app.get('*', (req, res) => {
		res.sendFile(
			path.join(__dirname, 'stopwatch_tubesoft_front', 'build', 'index.html')
		);
	});
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running at localhost:${port}`));
