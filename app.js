var express = require('express');
const cors = require('cors');
const ApiRouter = require('./routes/v0/api/router');

var app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public/uploads'));
app.set('view engine', 'ejs');

app.use(ApiRouter);

app.listen(4000, function () {
	console.log('app listening on port 4000 !');
});
