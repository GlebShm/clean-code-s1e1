//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".new-task-btn");
var incompleteTaskHolder = document.getElementById("incompleted-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "incomplete-list__item list-item"

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";

  var label = document.createElement("label");
  label.innerText = taskString;
  label.className = "input-text";

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "input-field";

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit-btn button";

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn button";

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "btn-pic";
  deleteButton.appendChild(deleteButtonImg);

  let elements = [checkBox, label, editInput, editButton, deleteButton]

  for (let el of elements) {
    listItem.appendChild(el)
  }

  return listItem;
}

var addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;
  var newListItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(newListItem);
  bindTaskEvents(newListItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit-btn");
  var containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit-btn");
  var deleteButton = taskListItem.querySelector("button.delete-btn");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}


for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}