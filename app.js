// SELECTORS
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.todo-filter')

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getToDos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteOrCheck)
filterOption.addEventListener('change', filterToDo)

// FUNCTIONS
function addTodo (event) {
	// Prevent the default submit button behavior
	event.preventDefault()
	
	// Create the todo div and add a class to it
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')
	
	// Create the list item and add a class to it
	const newTodo = document.createElement('li')
	newTodo.innerText = todoInput.value
	newTodo.classList.add('todo-item')
	
	// Append the list element to the div wrapper
	todoDiv.appendChild(newTodo)
	
	// Add the value to the local storage
	saveLocalTodos(todoInput.value)
	
	// Create a check mark and append it to the div wrapper
	const completedButton = document.createElement('button')
	completedButton.innerText = 'done'
	completedButton.classList.add('complete-button')
	todoDiv.appendChild(completedButton)
	
	// Create a delete button and append it to the div wrapper
	const trashButton = document.createElement('button')
	trashButton.innerText = 'delete'
	trashButton.classList.add('trash-button')
	todoDiv.appendChild(trashButton)
	
	// Append the whole div to the todo list
	todoList.appendChild(todoDiv)
	
	// Clear the value after submitting it
	todoInput.value = null
} 

function deleteOrCheck (event) {
	// Create a new variable with the clicked element
	const item = event.target;
	
	// Check if the clicked element is the trash button and then delete the element
	if (item.classList[0] === 'trash-button') {
		const todo = item.parentElement
		todo.classList.add('remove')
		
		// Remove the item from the local storage
		removeLocalToDos(todo)
		
		// Wait until the transitions finishes before executing the remove function
		todo.addEventListener('transitionend', function() {
			todo.remove()	
		})
	}
	
	// Check if the clicked element is the complete button and then add a class of complete to it
	if (item.classList[0] === 'complete-button') {
		const todo = item.parentElement
		todo.classList.toggle('completed')
	}
}

function filterToDo (event) {
	// Create a node list of the elements just clicked
	const todos = todoList.childNodes
	// Loop through the list
	todos.forEach(function(todo) {
		switch(event.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
			if (!todo.classList.contains('completed')) {
				todo.style.display = 'flex';
			} else {
				todo.style.display = 'none';
			}
			break;
		}
	})
}

function saveLocalTodos (todo) {
	// Check if there are already todos in the local storage
	let todos
	// If there is nothing in the storage, create an empty array
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		// If there exists something in the storage, parse it into an array
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	
	todos.push(todo)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getToDos () {
	// Check if there are already todos in the local storage
	let todos
	// If there is nothing in the storage, create an empty array
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		// If there exists something in the storage, parse it into an array
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.forEach(function(todo) {
		// Create the todo div and add a class to it
		const todoDiv = document.createElement('div')
		todoDiv.classList.add('todo')
		
		// Create the list item and add a class to it
		const newTodo = document.createElement('li')
		newTodo.innerText = todo
		newTodo.classList.add('todo-item')
		
		// Append the list element to the div wrapper
		todoDiv.appendChild(newTodo)
		
		// Create a check mark and append it to the div wrapper
		const completedButton = document.createElement('button')
		completedButton.innerText = 'done'
		completedButton.classList.add('complete-button')
		todoDiv.appendChild(completedButton)
		
		// Create a delete button and append it to the div wrapper
		const trashButton = document.createElement('button')
		trashButton.innerText = 'delete'
		trashButton.classList.add('trash-button')
		todoDiv.appendChild(trashButton)
		
		// Append the whole div to the todo list
		todoList.appendChild(todoDiv)
	})
}

function removeLocalToDos (todo) {
	// Check if there are already todos in the local storage
	let todos
	// If there is nothing in the storage, create an empty array
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		// If there exists something in the storage, parse it into an array
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	
	// Create a variable that brings back the first child, which in this case is the li element
	const toDoIndex = todo.children[0].innerText
	// Remove the element from the local storage by selecting it through indexOf
	todos.splice(todos.indexOf(toDoIndex), 1)
	// Update the local storage accordingly
	localStorage.setItem('todos', JSON.stringify(todos))
}