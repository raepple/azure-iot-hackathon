sap.ui.require([
	"sap/m/Shell",
	"sap/m/App",
	"sap/m/Page",
	"sap/ui/core/ComponentContainer"
], function(
	Shell, App, Page, ComponentContainer) {
	"use strict";

	sap.ui.getCore().attachInit(function() {
		new Shell ({
			app : new App ({
				pages : [
					new Page({
						title : "SMB Innovation Summit 2020 - Hackathon",
						enableScrolling : true,
						content : [
							new ComponentContainer({
								name : "iothackathon.webapp",
								settings : {
									id : "iothackathon.webapp"
								}
							})
						]
					})
				]
			})
		}).placeAt("content");
	});
});