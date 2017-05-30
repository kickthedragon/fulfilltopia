var soap = require('strong-soap');

var fftopiaSDK = module.exports = function(rhu, username, password, handler) {
	this.username = username;
	this.password = password;
	this.responseHandler = handler || function() {};
	soap.createClient('https://' + rhu + '.veracore.com/pmomsws/oms.asmx?WSDL', (err, client) => {
		client.setSecurity(new soap.BasicAuthSecurity(this.username, this.password));
		this.client = client;
	});
};

// fftopiaSDK.prototype.methodCaller = function(service, data, callback) {
// 	var cb = (typeof(callback)) === 'function' ? callback : this.responseHandler;
// 	this.client.methodCall(service, data, cb);
// };

fftopiaSDK.prototype.addOrder = function(cMap, callback) {
	//var ca = [this.username, this.password, cMap];
	this.client.AddOrder(cMap, callback);
};
