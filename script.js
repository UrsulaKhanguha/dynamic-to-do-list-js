
//Ensures the document has fully loaded
document.addEventListener("DOMContentLoaded", function(){

    //Selection of DOM elemnts
    const addButton = document.getElementById('add-task-btn');

    const taskInput = document.getElementById('task-input');

    const taskList = document.getElementById('task-list');

    //local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
       
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(task => task.firstChild.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    //addTask function
    function addTask(taskText, save = true){ // Responsible for adding new tasks to the list
        let taskText = taskInput.value.trim()   
         if (taskText === ""){
            alert("Add a task!");
            return; 
        }
        
            const listItem = document.createElement('li'); //cretes a new li element
            listItem.textContent = taskText;

            
            //create the remove button
            const removeButton = document.createElement('button')
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn'; //when triggeered it removes the li element from tasklist

            removeButton.onclick = function(){
               taskList.removeChild(listItem);
               saveTasks();

            listItem.appendChild(removeButton); //append the remove button to the li

            taskList.appendChild(listItem); //append the li to tasklist

            if(save){
                saveTasks();
            }

            taskInput.value = ""; //clear the input field
        }

    }
    addButton.addEventListener('click', () =>addTask(taskInput.value)); //calls addtask when button is clicked});

   taskInput.addEventListener('keypress', function(event){ // allow tasks to be added 
    if(event.key === 'Enter'){
        addTask(taskInput.value); //invoke the function 
    }
    });

    loadTasks();
});
