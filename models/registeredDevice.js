var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var regDeviceSchema = new mongoose.Schema({
   
    userId:String,
    deviceToken:String,
    deviceType:String,
    isNotificationsEnabled:Boolean
});
module.exports = mongoose.model('registeredDevices', regDeviceSchema);