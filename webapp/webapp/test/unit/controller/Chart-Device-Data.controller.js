/*global QUnit*/

sap.ui.define([
	"iothackathon/webapp/controller/Chart-Device-Data.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Chart-Device-Data Controller");

	QUnit.test("I should test the Chart-Device-Data controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});