// Retrieve tasks from local storage when the page loads
window.onload = function() {
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(function(savedTask) {
      addTaskFromLocalStorage(savedTask);
    });
  };
  
  function addTask() {
    var taskInput = document.getElementById('task');
    var deadlineInput = document.getElementById('deadline');
    var priorityInput = document.getElementById('priority');
    var taskList = document.getElementById('task-list');
  
    var task = taskInput.value;
    var deadline = new Date(deadlineInput.value);
    var priority = priorityInput.value;
  
    if (task !== '') {
      var taskObj = { task: task, deadline: deadline, priority: priority };
      addTaskToLocalStorage(taskObj);
  
      var li = document.createElement('li');
      li.textContent = task;
  
      var timer = document.createElement('span');
      li.appendChild(timer);
  
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        removeTaskFromLocalStorage(taskObj);
        taskList.removeChild(li);
      };
      li.appendChild(deleteButton);
  
      if (priority === 'high') {
        li.className = 'high-priority';
        taskList.insertBefore(li, taskList.firstChild);
      } else if (priority === 'low') {
        li.className = 'low-priority';
        taskList.appendChild(li);
      }
  
      var countdownInterval = setInterval(function() {
        var now = new Date().getTime();
        var timeLeft = deadline - now;
  
        if (timeLeft < 0) {
          timer.textContent = 'Deadline passed';
          clearInterval(countdownInterval);
        } else {
          var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
          timer.textContent = 'Time left: ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        }
      }, 1000);
  
      taskInput.value = '';
      deadlineInput.value = '';
    }
  }
  
  function addTaskToLocalStorage(taskObj) {
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }
  
  function addTaskFromLocalStorage(savedTask) {
    var taskList = document.getElementById('task-list');
  
    var li = document.createElement('li');
    li.textContent = savedTask.task;
  
    if (savedTask.priority === 'high') {
      li.className = 'high-priority';
      taskList.insertBefore(li, taskList.firstChild);
    } else if (savedTask.priority === 'low') {
      li.className = 'low-priority';
      taskList.appendChild(li);
    }
  
    var timer = document.createElement('span');
    li.appendChild(timer);
  
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
      removeTaskFromLocalStorage(savedTask);
      taskList.removeChild(li);
    };
    li.appendChild(deleteButton);
  
    var countdownInterval = setInterval(function() {
      var now = new Date().getTime();
      var timeLeft = new Date(savedTask.deadline) - now;
  
      if (timeLeft < 0) {
        timer.textContent = 'Deadline passed';
        clearInterval(countdownInterval);
      } else {
        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        timer.textContent = 'Time left: ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
      }
    }, 1000);
  }
  
  function removeTaskFromLocalStorage(taskObj) {
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks = savedTasks.filter(function(savedTask) {
      return savedTask.task !== taskObj.task && savedTask.deadline !== taskObj.deadline && savedTask.priority !== taskObj.priority;
    });
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }
  
  // Add event listener to form submission
  document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    addTask();
  });
  
