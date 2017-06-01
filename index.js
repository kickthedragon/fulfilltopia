var soap = require('strong-soap')
	.soap;

var fftopiaSDK = module.exports = function(rhu, username, password, handler) {
	this.username = username;
	this.password = password;
	this.responseHandler = handler || function() {};
	var options = {
		envelopeKey: 'soapenv',
	};
	soap.createClient('https://' + rhu + '.veracore.com/pmomsws/oms.asmx?WSDL', options, (err, client) => {
		client.setSecurity(new soap.BasicAuthSecurity(this.username, this.password));
		var authHeaders = {
			AuthenticationHeader: {
				Username: this.username,
				Password: this.password
			}
		};
		client.addSoapHeader(authHeaders);
		this.client = client;
	});
};

fftopiaSDK.prototype.addOrder = function(cMap, callback) {
	this.client.AddOrder(cMap, callback);
};
