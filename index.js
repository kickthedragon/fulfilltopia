// var soap = require('strong-soap')
// 	.soap;
//
// var fftopiaSDK = module.exports = function(rhu, username, password, handler) {
// 	this.username = username;
// 	this.password = password;
// 	this.responseHandler = handler || function() {};
// 	var options = {
// 		envelopeKey: 'soapenv',
// 	};
// 	soap.createClient('https://' + rhu + '.veracore.com/pmomsws/oms.asmx?WSDL', options, (err, client) => {
// 		client.setSecurity(new soap.BasicAuthSecurity(this.username, this.password));
// 		var authHeaders = {
// 			AuthenticationHeader: {
// 				Username: this.username,
// 				Password: this.password
// 			}
// 		};
// 		client.addSoapHeader(authHeaders);
// 		this.client = client;
// 	});
// };
//
// fftopiaSDK.prototype.addOrder = function(cMap, callback) {
// 	this.client.AddOrder(cMap, callback);
// };
var request = require('request');
var fftopiaSDK = module.exports = function(rhu, username, password, debug, handler) {
	this.username = username;
	this.password = password;
	this.uri = 'https://' + rhu + '.veracore.com/pmomsws/oms.asmx';
	this.responseHandler = handler || function() {};
	this.debug = debug;
};

fftopiaSDK.prototype.addOrder = function(cMap, callback) {
	var re = this.debug ? 'AddOrder' : '';
	request({
		method: 'POST',
		headers: {
			'SOAPAction': 'http://omscom/AddOrder',
			'Content-Type': 'text/xml; charset=utf-8'
		},
		uri: this.uri,
		body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:oms ="http://omscom/">\
		  <soapenv:Header>\
		    <DebugHeader>\
		      <Debug>' + this.debug + '</Debug>\
		      <Request>' + re + '</Request>\
		    </DebugHeader>\
		    <AuthenticationHeader>\
		      <Username>' + this.username + '</Username>\
		      <Password>' + this.password + '</Password>\
		    </AuthenticationHeader>\
		  </soapenv:Header>\
		  <soapenv:Body>\
		    <AddOrder>\
		      <order>\
		        <Header>\
		          <ID>12345678</ID>\
		          <EntryDate>2017-06-01T16:09:41.098Z</EntryDate>\
		          <Comments>Testing</Comments>\
		          <InsertDate>2017-06-01T16:09:41.098Z</InsertDate>\
		          <UTCEntryDate>2017-06-01T16:09:41.098Z</UTCEntryDate>\
		        </Header>\
		        <Classification>\
		          <CustomerProject>\
		            <ID>AGHARD</ID>\
		          </CustomerProject>\
		        </Classification>\
		        <Money>\
		          <PriceClass>\
		            <Description>Default</Description>\
		          </PriceClass>\
		          <ShippingHandlingCharge>0</ShippingHandlingCharge>\
		          <RushHandlingCharge>0</RushHandlingCharge>\
		        </Money>\
		        <OrderedBy>\
		          <Prefix/>\
		          <FirstName>John</FirstName>\
		          <MiddleInitial/>\
		          <LastName>Doe</LastName>\
		          <Suffix/>\
		          <CompanyName/>\
		          <Title/>\
		          <Address1>1234 Wood Dr</Address1>\
		          <Address2/>\
		          <Address3/>\
		          <City>Woohooo</City>\
		          <State>ZA</State>\
		          <PostalCode>000000</PostalCode>\
		          <Country>US</Country>\
		          <Phone>5555555555</Phone>\
		          <Fax/>\
		          <Email>blaaaah@gmail.com</Email>\
		          <UID>TL123</UID>\
		          <TaxExempt>false</TaxExempt>\
		          <TaxExemptID/>\
		          <TaxExemptApproved>false</TaxExemptApproved>\
		          <Commercial>false</Commercial>\
		        </OrderedBy>\
		        <ShipTo>\
		          <OrderShipTo>\
		            <Prefix/>\
		            <FirstName>John</FirstName>\
		            <MiddleInitial/>\
		            <LastName>Doe</LastName>\
		            <Suffix/>\
		            <CompanyName/>\
		            <Title/>\
		            <Address1>1234 Wood Dr</Address1>\
		            <Address2/>\
		            <Address3/>\
		            <City>Woohooo</City>\
		            <State>ZA</State>\
		            <PostalCode>000000</PostalCode>\
		            <Country>US</Country>\
		            <Phone>5555555555</Phone>\
		            <Fax/>\
		            <Email>blaaaah@gmail.com</Email>\
		            <UID>TL123</UID>\
		            <TaxExempt>false</TaxExempt>\
		            <TaxExemptID/>\
		            <TaxExemptApproved>false</TaxExemptApproved>\
		            <Commercial>false</Commercial>\
		            <Flag>Other</Flag>\
		            <Key>0</Key>\
		            <NeededBy/>\
		            <ReleaseDate>2017-06-01T16:09:41.098Z</ReleaseDate>\
		            <Rush>false</Rush>\
		            <RushHandling>0</RushHandling>\
		            <Comments>Tests comments</Comments>\
		            <FreightCarrier>\
		              <Name>Freight Name</Name>\
		            </FreightCarrier>\
		            <FreightService>\
		              <Description>Freight Service Description</Description>\
		            </FreightService>\
		            <ThirdPartyType>3</ThirdPartyType>\
		            <ThirdPartyAccountNumber>123456</ThirdPartyAccountNumber>\
		            <FreightCode/>\
		            <FreightCodeDescription/>\
		            <SpecialHandling>\
		              <Description>UPS Ground</Description>\
		            </SpecialHandling>\
		          </OrderShipTo>\
		        </ShipTo>\
		        <BillTo>\
		          <TaxExempt>false</TaxExempt>\
		          <TaxExemptID/>\
		          <TaxExemptApproved>false</TaxExemptApproved>\
		          <Commercial>false</Commercial>\
		        </BillTo>\
		        <Offers>\
		          <OfferOrdered>\
		            <Offer>\
		              <Header>\
		                <ID>ZEPH-9999</ID>\
		              </Header>\
		            </Offer>\
		            <Quantity>1</Quantity>\
		            <OrderShipToKey>\
		              <Key>0</Key>\
		            </OrderShipToKey>\
		            <PriceType>1</PriceType>\
		            <UnitPrice>0</UnitPrice>\
		            <ShippingHandling>0</ShippingHandling>\
		            <Discounts>0</Discounts>\
		          </OfferOrdered>\
		        </Offers>\
		      </order>\
		    </AddOrder>\
		  </soapenv:Body></soapenv:Envelope>'
	}, callback);
};
