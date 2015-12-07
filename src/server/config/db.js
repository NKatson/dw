import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/worthfm');
mongoose.connection.on('error', function() {
	console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});
