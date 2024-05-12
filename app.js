// key: slyYiNHQ3ESGgJSTiHDErA
// secret: jx2IQkNtIVZGq2sF5C1GVaoAarwhbotbZKaF13PKESs

var addButton = document.querySelector("#add-task-btn");
var taskField = document.querySelector("#task-field");

const form = document.querySelector('#add-task-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  newTodoList.addTask(newTodoList);
});

class todoList {
	constructor() {
		this.todoItems = []
	}
	addTask(list) {
		let taskName = taskField.value
		if(taskName) {
			let initialTask = new task(taskName);
			this.todoItems.push(initialTask);			
			this.refreshList(list);
		}
	}
	deleteTask(id, list) {
		const index = list.todoItems.findIndex(item => item.id == id);
		list.todoItems.splice(index,1);
		var complted = true;
		this.refreshList(list);
	}
	refreshList(list) {
		list.showTodoTasks(true);
		list.showTodoTasks(false);
	}
	completedItems(completed) {
		return this.todoItems.filter(function(items) {
    	return items.checked == completed;
		});
	}
	getDisplayLocation(completed) {
		return completed ? document.querySelector("#completed-items-list") : document.querySelector("#to-do-items-list"); 
	}
	showTodoTasks(completed) {
		const template = document.querySelector("#listing-template").innerHTML;
		const templateScript = Handlebars.compile(template);
		const itemsToDisplay = this.completedItems(completed);
		let tasks = {
			'tasks' : itemsToDisplay
		}
		const html = templateScript(tasks);
		const displayType = this.getDisplayLocation(completed);
		displayType.innerHTML =  html;
	}
}

class task extends todoList {
	constructor(name) {
		super();
	  this.name = name; 
	  this.checked = false; 
	  this.id = Date.now(); 
	}
	toggleCheck(newTodoList) {
	  this.checked = !this.checked;
	  newTodoList.refreshList(newTodoList);
	}
	updateTask(id, element, list) {
		const index = list.todoItems.findIndex(item => item.id == id);
	  list.todoItems[index].name = document.querySelector("#"+element).value;
		list.refreshList(list);
	}
}
function openEdit(id, event) {
	if(event.type == 'click') {
		document.querySelector("#"+id).classList.add('editing');
		document.querySelector("#"+id).nextElementSibling.classList.remove('hide');
		document.querySelector("#"+id).nextElementSibling.nextElementSibling.classList.add('hide');
	}
}

let newTodoList = new todoList();
