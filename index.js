var request = require('request');
var fftopiaSDK = module.exports = function(rhu, username, password, debug, handler) {
	this.username = username;
	this.password = password;
	this.uri = 'https://' + rhu + '.veracore.com/pmomsws/oms.asmx';
	this.responseHandler = handler || function() {};
	this.debug = debug;
};

fftopiaSDK.prototype.getOrder = function(orderId, callback) {
	var re = this.debug ? 'GetOrderInfo' : '';
	request({
		method: 'POST',
		headers: {
			'SOAPAction': 'http://omscom/GetOrderInfo',
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
			<GetOrderInfo>\
			<orderId>' + orderId + '</orderId>\
			</GetOrderInfo>\
			</soapenv:Body>\
			</soapenv:Envelope>'
	}, callback);
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
		          <ID>1234-567</ID>\
		          <EntryDate>2017-06-01T16:09:41</EntryDate>\
							<OrderEntryView>\
								<Description>128981</Description>\
							</OrderEntryView>\
							<ReferenceNumber>123</ReferenceNumber>\
							<PONumber>456</PONumber>\
		          <Comments>Testing</Comments>\
							<IpAddress></IpAddress>\
							<ApprovalComments></ApprovalComments>\
		          <InsertDate>2017-06-01T16:09:41</InsertDate>\
		          <UTCEntryDate>2017-06-01T16:09:41</UTCEntryDate>\
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
						<OrderVariables>\
							<OrderVariable>\
								<VariableField>\
									<FieldName>Pick/Pack?</FieldName>\
								</VariableField>\
								<Value>yes</Value>\
							</OrderVariable>\
						</OrderVariables>\
		        <OrderedBy>\
		          <Prefix></Prefix>\
		          <FirstName>John</FirstName>\
		          <MiddleInitial></MiddleInitial>\
		          <LastName>Doe</LastName>\
		          <Suffix></Suffix>\
		          <CompanyName></CompanyName>\
		          <Title></Title>\
		          <Address1>1234 Wood Dr</Address1>\
		          <Address2></Address2>\
		          <Address3></Address3>\
		          <City>Woohooo</City>\
		          <State>ZA</State>\
		          <PostalCode>000000</PostalCode>\
		          <Country>US</Country>\
		          <Phone>5555555555</Phone>\
		          <Fax></Fax>\
		          <Email>blaaaah@gmail.com</Email>\
		          <UID>TL123</UID>\
		          <TaxExempt>false</TaxExempt>\
		          <TaxExemptID></TaxExemptID>\
		          <TaxExemptApproved>false</TaxExemptApproved>\
		          <Commercial>false</Commercial>\
		        </OrderedBy>\
		        <ShipTo>\
		          <OrderShipTo>\
							 <Prefix></Prefix>\
	 						 <FirstName>John</FirstName>\
	 						 <MiddleInitial></MiddleInitial>\
	 						 <LastName>Doe</LastName>\
	 						 <Suffix></Suffix>\
	 						 <CompanyName></CompanyName>\
	 						 <Title></Title>\
	 						 <Address1>1234 Wood Dr</Address1>\
	 						 <Address2></Address2>\
	 						 <Address3></Address3>\
	 						 <City>Woohooo</City>\
	 						 <State>ZA</State>\
	 						 <PostalCode>000000</PostalCode>\
	 						 <Country>US</Country>\
	 						 <Phone>5555555555</Phone>\
	 						 <Fax></Fax>\
	 						 <Email>blaaaah@gmail.com</Email>\
	 						 <UID>TL123</UID>\
	 						 <TaxExempt>false</TaxExempt>\
	 						 <TaxExemptID></TaxExemptID>\
	 						 <TaxExemptApproved>false</TaxExemptApproved>\
	 						 <Commercial>false</Commercial>\
		            <Flag>Other</Flag>\
		            <Key>0</Key>\
		            <NeededBy></NeededBy>\
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
		            <FreightCode></FreightCode>\
		            <FreightCodeDescription/>\
		            <SpecialHandling>\
		              <Description>UPS Ground</Description>\
		            </SpecialHandling>\
		          </OrderShipTo>\
		        </ShipTo>\
		        <BillTo>\
		          <TaxExempt>false</TaxExempt>\
		          <TaxExemptID></TaxExemptID>\
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
