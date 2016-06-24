var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var notificationSchema = new mongoose.Schema({
   
    message: Object,
    senderUserId: String,
	recieverUserId: [String],
	time: { type: Date, default: Date.now },
	checked:{type:Boolean,default:false}
});

//mongoose.connect('mongodb://localhost:27017/node-android-chat');
module.exports = mongoose.model('notificationLogs', notificationSchema);