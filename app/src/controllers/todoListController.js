(function(){
	"use strict";
	
	angular.module("todoApp").controller("todoListController", todoListController);
		
	todoListController.$inject = ['$filter', 'todoService'];
		
	function todoListController($filter, todoService){
		
		var vm = this;
		
		vm.cancel = cancel;
		vm.current = {};
		vm.currentId = -1;
		vm.edit = edit;
		vm.editing = false;
		vm.save = save;
		vm.select = select;
		vm.todos = [];
		
		init();
		
		function cancel(){
			var matches = $filter('filter')(vm.todos, { id : vm.currentId }, true);
			vm.current = matches[0];
			vm.editing = false;
		}
		
		function edit(){
			if (!vm.editing){
				vm.editing = true;
			}
		}
		
		function init() {
			todoService.getAll().then(_gotTodos);
		}
		
		function save(){
			if (!vm.editing)
				return;
				
			for(var i = 0; i < vm.todos.length; i++){
				if (vm.todos[i].id == vm.currentId){
					vm.todos[i] = angular.copy(vm.current);
					break;
				}
			}
			todoService.save(vm.current);
			vm.editing = false;
		}
		
		function select(id){
			var matches = $filter('filter')(vm.todos, { id : id }, true);
			if (matches.length > 0){
				vm.current = angular.copy(matches[0]);
				vm.currentId = vm.current.id;
			} else {
				vm.current = {};
				vm.currentId = -1;
			}
		}
		
		function _gotTodos(todos){
			vm.todos = todos;
			if (vm.todos.length > 0){
				vm.current = angular.copy(vm.todos[0]);
				vm.currentId = vm.current.id;
			}
		}
	}
	
})();