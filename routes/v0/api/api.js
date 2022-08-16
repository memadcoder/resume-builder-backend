const express = require('express');
const ApiRouter = express.Router();
const pdf = require('html-pdf');
const fs = require('fs');
const upload = require('../../../uploads/multer-upload');

ApiRouter.get('/', function (req, res) {
	res.send('API working!');
});

ApiRouter.post('/create', (req, res) => {
	const data = req.body;

	// for now static image change to dynamic later
	const imageUrl = 'file:/' + __dirname + '/public/uploads/files/profile.jpg';
	data.imageUrl = imageUrl;

	return res.render('index', data, (err, html) => {
		// save html file for future reference
		var randomId = new Date().getTime(); // change later on
		fs.writeFile(
			`public/uploads/files/resume_${randomId}.html`,
			html,
			function (err) {
				if (err) throw err;
				console.log('File is created successfully.');
			}
		);

		res.status(200).send({
			message: 'Congratulations !! Successfully created resume',
			resumeId: `resume_${randomId}`
		});
	});
});

ApiRouter.get('/download', (req, res) => {
	const { id } = req.query;
	output = Date.now() + 'output.pdf'; // to save generated pdf file

	upload(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			var html = fs.readFileSync(
				`public/uploads/files/${id}.html`,
				'utf8'
			);

			var options = {
				format: 'Letter',
				type: 'pdf',
				localUrlAccess: true // to access file
			};

			pdf.create(html, options).toFile(output, function (err, response) {
				if (err) return console.log(err);

				res.download(response.filename, () => {});
			});
		}
	});
});

module.exports = ApiRouter;
