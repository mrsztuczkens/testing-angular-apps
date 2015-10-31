describe('todoListController', function(){
	
	var $controller;
	var testTodos = [
		{ id: 1, title: 'Todo #1', description: 'Description of todo 1' },	
		{ id: 2, title: 'Todo #2', description: 'Description of todo 2' },	
	]; 
	
	var todoService;
	
	beforeEach(function(){
		todoService = {
			getAll: sinon.spy(function(){ return angular.copy(testTodos); }),
			save: sinon.spy(function(todo){})
		};
	});
	
	beforeEach(function(){
		angular.mock.module('todoApp'); //initialize our module
		
		angular.mock.inject(function(_$controller_){
			$controller = _$controller_('todoListController', {
				todoService: todoService
			}); //create an instance of the todoListController
		});
	});
	
	it('should initialize everything', function(){
		chai.expect($controller.editing).to.be.false;
		chai.expect($controller.todos).to.have.length(testTodos.length, 'Should have all the todos that were passed');
		chai.expect($controller.currentId).to.equal(1, 'currentId should point to the first todo');
		chai.expect($controller.current).to.deep.equal(testTodos[0], "Current should hold the first todo");
		
		chai.expect(todoService.getAll.called).to.be.true;
		chai.expect(todoService.getAll.calledOnce).to.be.true;
	});
	
	describe('select item', function(){
		
		beforeEach(function(){
			$controller.select(2);
		});
		
		it('should set currentId to 2', function(){
			chai.expect($controller.currentId).to.equal(2);
		});
		
		it('should copy the second todo to current', function(){
			chai.expect($controller.current).to.deep.equal(testTodos[1]);
		});
		
		describe('and click edit', function(){
			
			beforeEach(function(){
				$controller.edit();
			});
			
			it('should set editing to true', function(){
				chai.expect($controller.editing).to.be.true;
			});
			
			describe('and edit item', function(){
				
				var updatedTodo = { id: 2, title: 'Brand new title', description: 'Brand new description' };
				
				beforeEach(function(){
					$controller.current = angular.copy(updatedTodo);
				});
				
				it('should update todos and set editing to false after saving', function(){
					$controller.save();
					
					chai.expect(todoService.save.called).to.be.true;
					chai.expect(todoService.save.calledWith(updatedTodo)).to.be.true;
					chai.expect($controller.editing).to.be.false;
					chai.expect($controller.todos[1]).to.deep.equal(updatedTodo);
				});
				
				it('should restore the current value and set editing to false after canceling', function(){
					$controller.cancel();
					
					chai.expect($controller.editing).to.be.false;
					chai.expect($controller.current).to.deep.equal(testTodos[1]);
				});
				
			});
		});
		
	});
});