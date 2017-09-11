var request = require('request');
var parser = require('xml2json');
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
    body: '<?xml version="1.0" encoding="utf-8"?>\
		<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\
			<soap:Header>\
				<DebugHeader xmlns="http://omscom/">\
					<Debug>' + this.debug + '</Debug>\
					<Request/>\
					</DebugHeader>\
								<AuthenticationHeader xmlns="http://omscom/">\
									<Username>' + this.username + '</Username>\
									<Password>' + this.password + '</Password>\
								</AuthenticationHeader>\
							</soap:Header>\
			<soap:Body>\
			<GetOrderInfo xmlns="http://omscom/">\
			<orderId>' + orderId + '</orderId>\
			</GetOrderInfo>\
			</soap:Body>\
			</soap:Envelope>'
  }, (err, request, body) => {
    if (!err) {
      var json = parser.toJson(body);
      var result;
      try {
        result = JSON.parse(json)['soap:Envelope']['soap:Body']['GetOrderInfoResponse']['GetOrderInfoResult'];
      } catch (e) {
        result = e;
        return callback(err, result);
      }
    } else {
      return callback(err, request);
    }
  });
};


fftopiaSDK.prototype.addOrder = function(cMap, callback) {
  var priceClass = cMap.priceClass ? cMap.priceClass : 'Default';
  var top = '<?xml version="1.0" encoding="utf-8"?>\
	<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\
	<soap:Header>\
		<DebugHeader xmlns="http://omscom/">\
			<Debug>' + this.debug + '</Debug>\
			<Request/>\
		</DebugHeader>\
			<AuthenticationHeader xmlns="http://omscom/">\
				<Username>' + this.username + '</Username>\
				<Password>' + this.password + '</Password>\
			</AuthenticationHeader>\
	</soap:Header>\
		<soap:Body>\
			<AddOrder xmlns="http://omscom/">\
				<order>\
					<Header>\
						<ID>' + cMap.orderId + '</ID>\
						<EntryDate>' + new Date()
    .toISOString() + '</EntryDate>\
							<OrderEntryView>\
								<Description></Description>\
							</OrderEntryView>\
							<ReferenceNumber>' + cMap.referenceNumber + '</ReferenceNumber>\
							<PONumber>' + cMap.poNumber + '</PONumber>\
							<Comments>' + cMap.comments + '</Comments>\
							<IpAddress></IpAddress>\
							<ApprovalComments>' + cMap.approvalComments + '</ApprovalComments>\
							<InsertDate>' + new Date()
    .toISOString() + '</InsertDate>\
							<UTCEntryDate>' + new Date()
    .toISOString() + '</UTCEntryDate>\
					</Header>\
					<Money>\
						<PriceClass>\
							<Description>' + priceClass + '</Description>\
						</PriceClass>\
						<ShippingHandlingCharge>' + cMap.shippingHandlingCharge + '</ShippingHandlingCharge>\
						<RushHandlingCharge>' + cMap.rushHandlingCharge + '</RushHandlingCharge>\
					</Money>\
					<OrderVariables></OrderVariables>\
					<OrderedBy>\
						<Prefix>' + cMap.orderByPrefix + '</Prefix>\
						<FirstName>' + cMap.orderByFirstName + '</FirstName>\
						<MiddleInitial>' + cMap.orderByMiddleInitial + '</MiddleInitial>\
						<LastName>' + cMap.orderByLastName + '</LastName>\
						<Suffix>' + cMap.orderBySuffix + '</Suffix>\
						<CompanyName>' + cMap.orderByCompanyName + '</CompanyName>\
						<Title>' + cMap.orderByTitle + '</Title>\
						<Address1>' + cMap.orderByAddress1 + '</Address1>\
						<Address2>' + cMap.orderByAddress2 + '</Address2>\
						<Address3>' + cMap.orderByAddress3 + '</Address3>\
						<City>' + cMap.orderByCity + '</City>\
						<State>' + cMap.orderByState + '</State>\
						<PostalCode>' + cMap.orderByPostalCode + '</PostalCode>\
						<Country>' + cMap.orderByCountry + '</Country>\
						<Phone>' + cMap.orderByPhone + '</Phone>\
						<Fax>' + cMap.orderByFax + '</Fax>\
						<Email>' + cMap.orderByEmail + '</Email>\
						<UID>' + cMap.orderByUID + '</UID>\
						<TaxExempt>' + cMap.orderByTaxExempt + '</TaxExempt>\
						<TaxExemptID>' + cMap.orderByTaxExemptID + '</TaxExemptID>\
						<TaxExemptApproved>' + cMap.orderByTaxExemptApproved + '</TaxExemptApproved>\
						<Commercial>' + cMap.orderByCommercial + '</Commercial>\
					</OrderedBy>\
						<ShipTo>\
							<OrderShipTo>\
								<Prefix>' + cMap.shipToPrefix + '</Prefix>\
								<FirstName>' + cMap.shipToFirstName + '</FirstName>\
								<MiddleInitial>' + cMap.shipToMiddleInitial + '</MiddleInitial>\
								<LastName>' + cMap.shipToLastName + '</LastName>\
								<Suffix>' + cMap.shipToSuffix + '</Suffix>\
								<CompanyName>' + cMap.shipToCompanyName + '</CompanyName>\
								<Title>' + cMap.shipToTitle + '</Title>\
								<Address1>' + cMap.shipToAddress1 + '</Address1>\
								<Address2>' + cMap.shipToAddress2 + '</Address2>\
								<Address3>' + cMap.shipToAddress3 + '</Address3>\
								<City>' + cMap.shipToCity + '</City>\
								<State>' + cMap.shipToState + '</State>\
								<PostalCode>' + cMap.shipToPostalCode + '</PostalCode>\
								<Country>' + cMap.shipToCountry + '</Country>\
								<Phone>' + cMap.shipToPhone + '</Phone>\
								<Fax>' + cMap.shipToFax + '</Fax>\
								<Email>' + cMap.shipToEmail + '</Email>\
								<UID>' + cMap.shipToUID + '</UID>\
								<TaxExempt>' + cMap.shipToTaxExempt + '</TaxExempt>\
								<TaxExemptID>' + cMap.shipToTaxExemptID + '</TaxExemptID>\
								<TaxExemptApproved>' + cMap.shipToTaxExemptApproved + '</TaxExemptApproved>\
								<Commercial>' + cMap.shipToCommercial + '</Commercial>\
								<Flag>' + cMap.shipToFlag + '</Flag>\
								<Key>' + cMap.shipToKey + '</Key>\
								<NeededBy>' + cMap.shipToNeededBy + '</NeededBy>\
								<ReleaseDate>' + cMap.shipToReleaseDate + '</ReleaseDate>\
								<Rush>' + cMap.shipToRush + '</Rush>\
								<RushHandling>' + cMap.shipToRushHandling + '</RushHandling>\
								<Comments>' + cMap.shipToComments + '</Comments>\
								<FreightCarrier>\
									<Name>' + cMap.shipToFreightCarrier + '</Name>\
								</FreightCarrier>\
								<FreightCode>' + cMap.shipToFreightCode + '</FreightCode>\
								<FreightCodeDescription>' + cMap.shipToFreightCodeDescription + '</FreightCodeDescription>\
								<SpecialHandling>\
									<Description>' + cMap.shipToSpecialHandling + '</Description>\
								</SpecialHandling>\
							</OrderShipTo>\
						</ShipTo>\
						<BillTo>\
							<TaxExempt>' + cMap.billToTaxExempt + '</TaxExempt>\
							<TaxExemptID>' + cMap.billToTaxExemptID + '</TaxExemptID>\
							<TaxExemptApproved>' + cMap.billToTaxExemptApproved + '</TaxExemptApproved>\
							<Commercial>' + cMap.billToCommercial + '</Commercial>\
						</BillTo>\
						<Offers>';

  var offers = '';

  for (var cnt = 0; cnt < cMap.offers.length; cnt++) {
    offers += '<OfferOrdered>\
					<Offer>\
						<Header>\
							<ID>' + cMap.offers[cnt].offerId + '</ID>\
						</Header>\
					</Offer>\
					<Quantity>' + cMap.offers[cnt].quantity + '</Quantity>\
					<OrderShipToKey>\
						<Key>' + cMap.offers[cnt].shipToKey + '</Key>\
					</OrderShipToKey>\
					<PriceType>' + cMap.offers[cnt].priceType + '</PriceType>\
					<UnitPrice>' + cMap.offers[cnt].unitPrice + '</UnitPrice>\
					<ShippingHandling>' + cMap.offers[cnt].shippingHandling + '</ShippingHandling>\
					<Discounts>' + cMap.offers[cnt].discounts + '</Discounts>\
				</OfferOrdered>';
  }

  var bottom = '</Offers></order></AddOrder></soap:Body></soap:Envelope>';

  var body = top + offers + bottom;
  request({
    method: 'POST',
    headers: {
      'SOAPAction': 'http://omscom/AddOrder',
      'Content-Type': 'text/xml; charset=utf-8'
    },
    uri: this.uri,
    body
  }, (err, request, body) => {
    if (!err) {
      var json = parser.toJson(body);
      var result;
      try {
        result = JSON.parse(json)['soap:Envelope']['soap:Body']['AddOrderResponse']['AddOrderResult'];
      } catch (e) {
        result = e;
        return callback(err, result);
      }
    } else {
      return callback(err, request);
    }
  });
};
