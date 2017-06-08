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
	}, callback);
};


fftopiaSDK.prototype.addOrder = function(cMap, callback) {
	var priceClass = cMap.priceClass ? cMap.priceClass : 'Default';
	request({
		method: 'POST',
		headers: {
			'SOAPAction': 'http://omscom/AddOrder',
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
										<OrderVariables>\
										</OrderVariables>\
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
												<ThirdPartyType>' + cMap.shipToThirdPartyType + '</ThirdPartyType>\
												<ThirdPartyAccountNumber>' + cMap.shipToThirdPartyAccountNummber + '</ThirdPartyAccountNumber>\
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
										<Offers>\
											<OfferOrdered>\
												<Offer>\
													<Header>\
														<ID>' + cMap.offerID + '</ID>\
													</Header>\
												</Offer>\
												<Quantity>' + cMap.quantity + '</Quantity>\
												<OrderShipToKey>\
													<Key>' + cMap.shipToKey + '</Key>\
												</OrderShipToKey>\
												<PriceType>' + cMap.priceType + '</PriceType>\
												<UnitPrice>' + cMap.unitPrice + '</UnitPrice>\
												<ShippingHandling>' + cMap.shippingHandling + '</ShippingHandling>\
												<Discounts>' + cMap.discounts + '</Discounts>\
											</OfferOrdered>\
										</Offers>\
									</order>\
								</AddOrder>\
							</soap:Body>\
						</soap:Envelope>'
	}, callback);
};
