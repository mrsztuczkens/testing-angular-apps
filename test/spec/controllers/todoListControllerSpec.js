describe('todoListController', function(){
	
	var $controller;
	
	beforeEach(function(){
		angular.mock.module('todoApp');
		
		angular.mock.inject(function(_$controller_){
			$controller = _$controller_('todoListController');
		});
	});
	
	it('should work', function(){
		chai.expect($controller.test).to.be.true;
		chai.expect($controller.anArray).to.have.lengthOf(2);
	});
});