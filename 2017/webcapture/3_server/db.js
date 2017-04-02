const mongoose = require('mongoose'),
	DB_URL = 'mongodb://127.0.0.1:27017/phantom';

mongoose.Promise = Promise;
mongoose.connect(DB_URL);

mongoose.connection.on('connection', ()=>console.log('mongoose connected!'));
mongoose.connection.on('error', (err)=>console.log('mongoose error: ', err));

const CrawlSchema = new mongoose.Schema({
	code: {type: String},
	msg: {type: String},
	word: {type: String},
	time: {type: Number},
	dataList : [{}]
})

module.exports = mongoose.model('crawl', CrawlSchema, 'crawl');
