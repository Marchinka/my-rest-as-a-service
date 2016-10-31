module.exports = { 
	dburl: process.env.MONGODB_URI || 'mongodb://localhost/test',
	dbuser: process.env.dbuser || undefined,
	dbpassword: process.env.dbpass || undefined
};