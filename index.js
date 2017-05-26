'use strict';
import xmlrpc from 'xmlrpc';
import types from './lib/types';

var fftopiaSDK = module.exports = function(rhu, username, password, handler) {
	this.username = username;
	this.password = password;
	this.responseHandler = handler || function() {};
	this.client = xmlrpc.createSecureClient('https://' + rhu + '.veracore.com');
};

fftopiaSDK.prototype.methodCaller = function(service, data, callback) {
	var cb = (typeof(callback)) === 'function' ? callback : this.responseHandler;
	this.client.methodCall(service, data, cb);
};

fftopiaSDK.prototype.addOrder = function(cMap, callback) {
	var ca = [this.username, this.password, cMap];
	this.methodCaller('AddOrder', ca, callback);
};

fftopiaSDK.types = types;
