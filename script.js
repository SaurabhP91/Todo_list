
function get_todos(){
    var todos=new Array;
    var todos_str=localStorage.getItem('todo');
    if(todos_str !== null){
        todos=JSON.parse(todos_str);
    }
    return todos;
}
function toggleCompleted() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
}
function add(){
    
    var task=document.getElementById('task').value;
    if(task!==null && task.trim() !== "")
    {
        var todos=get_todos();
        todos.push(task);
        localStorage.setItem('todo',JSON.stringify(todos));
        document.getElementById('task').value=" ";
        show();
        
        
        return false;
    }
  
}

function clearDefault(a){
    if(a.defaultValue==a.value) {a.value=""}


};

function remove(){
    var id=this.getAttribute('id');
    var todos=get_todos();
    todos.splice(id,1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function edit() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    var newTask = prompt("Edit task:", todos[id]);

    // Check if the user clicked "Cancel" or entered an empty task
    if (newTask !== null && newTask.trim() !== "") {
        todos[id] = newTask;
        localStorage.setItem('todo', JSON.stringify(todos));
        show();
    }
}

function show(){
    var todos=get_todos();
     

    var html='<ul>';
    for(var i=0;i<todos.length;i++){
        var checkbox = '<input type="checkbox" class="completed" id="' + i + '"';
        checkbox += todos[i].completed ? ' checked' : '';  // Check the checkbox if task is completed
        checkbox += '>';

        html+='<li>'+todos[i] + checkbox +
        
        '<button class="edit" id="' + i + '">Edit</button>' + 
        '<button class="remove" id="'+ i + '">Delete</button> </li>';
    };
    html+='<ul/>';

    document.getElementById('todos').innerHTML = html;

    var buttons= document.getElementsByClassName('remove');
    for(var i=0;i<buttons.length;i++){
        buttons[i].addEventListener('click',remove);
        
    };

    var editButtons = document.getElementsByClassName('edit');
    for (var i=0; i<editButtons.length; i++) {
        editButtons[i].addEventListener('click', edit);
    }

}

document.getElementById('add').addEventListener('click',add);
show();