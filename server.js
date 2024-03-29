let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM ai3siddi.movies`;
	console.log(sql);

	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);
	let review = req.body.review;

	let sql = `INSERT INTO review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES ('${review.title}', '${review.body}', ${review.score}, ${review.user}, ${review.movie})`;
	
	console.log(sql);

	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/search', (req, res) => {

	let connection = mysql.createConnection(config);
	let query = req.body;

	let sql = `
		SELECT m.name, CONCAT(d.first_name, ' ', d.last_name), r.reviewContent, AVG(r.reviewScore)
		FROM movies m, directors d, review r, movies_directors md, roles ro, actors a
		WHERE m.id = r.movieID
	`;
	
	console.log(sql);

	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/mypage', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO trailers (movieID, url) VALUES (${req.body.movie}, '${req.body.url}')`;
	
	console.log(sql);

	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
// app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
app.listen(port, '172.31.31.77') 