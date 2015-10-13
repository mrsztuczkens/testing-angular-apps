(function(){
	"use strict";
	
	angular.module("todoApp").controller("todoListController", todoListController);
		
	todoListController.$inject = [];
		
	function todoListController(){
		
		this.test = true;
		this.anArray = ['item1', 'item2'];
		
	}
	
})();