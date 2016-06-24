var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var index = require('./index.js');
var config = require('./config.js');
var mongoose = require('mongoose');
var compression = require('compression');
var port = process.env.PORT || 9090;
mongoose.connect(config.database);
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(compression());
app.get('/', function (req, res) {
    res.send('Root of this fcm enabled api.....');
});
app.post('/adddevice', function (req, res) {
    if (req.body.userId != 'undefined' && req.body.userId && req.body.deviceToken != 'undefined' && req.body.deviceToken && req.body.deviceType != 'undefined' && req.body.deviceType) {
        index.addDevice(req.body.userId, req.body.deviceToken, req.body.deviceType, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }
});
app.delete('/unsubscribeuser', function (req, res) {
    if (req.body.userId != 'undefined' && req.body.userId) {
        index.unSubscribeUser(req.body.userId, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.delete('/unsubscribedevice', function (req, res) {
    if (req.body.deviceToken != 'undefined' && req.body.deviceToken) {
        index.unSubscribeDevice(req.body.deviceToken, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.post('/pushtousers', function (req, res) {
    if (req.body.recieverUserIds != 'undefined' && req.body.recieverUserIds && req.body.message != 'undefined' && req.body.message && req.body.senderUserId != 'undefined' && req.body.senderUserId) {
        index.sendFcmPushNotificationToUsers(req.body.recieverUserIds, req.body.message, req.body.senderUserId, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }
});
app.post('/broadcast', function (req, res) {
    if (req.body.message != 'undefined' && req.body.message && req.body.senderUserId != 'undefined' && req.body.senderUserId) {
        index.sendFcmBroadcastPushNotifications(req.body.message, req.body.senderUserId, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.get('/shownotifications', function (req, res) {
    if (req.query.userId != 'undefined' && req.query.userid) {
        index.showNotifications(req.query.userid, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);
        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.delete('/deletenotifications', function (req, res) {
    if (req.body.notificationIdArray != 'undefined' && req.body.notificationIdArray) {
        index.deleteNotifications(req.body.notificationIdArray, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.delete('/deleteallnotifications', function (req, res) {
    if (req.body.userId != 'undefined' && req.body.userId) {
        index.deleteAllNotifications(req.body.userId, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.put('/enablenotifications', function (req, res) {
    if (req.body.deviceToken != 'undefined' && req.body.deviceToken) {
        index.enableNotifications(req.body.deviceToken, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});
app.put('/disablenotifications', function (req, res) {
    if (req.body.deviceToken != 'undefined' && req.body.deviceToken) {
        index.disableNotifications(req.body.deviceToken, function (err, response) {
            if (err) {
                res.status(err.status).send(err);
            }
            else
                res.status(response.status).send(response);

        });
    }
    else {
        res.status(400).send({ 'message': 'request can not be understood', 'status': 400, 'data': 'bad request please give all the parameters' });
    }

});

module.exports = app;