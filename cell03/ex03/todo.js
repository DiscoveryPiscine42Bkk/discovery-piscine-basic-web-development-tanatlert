window.onload = function () {
    var saved = getCookie("todos");
    if (saved) {
        var todos = JSON.parse(saved);
        for (var i = 0; i < todos.length; i++) {
            addTodo(todos[i]);
        }
    }
};

function newElement() {
    var input = document.getElementById("todoInput");
    var value = input.value.trim();

    if (value === "") {
        alert("You must write something!");
        return;
    }

    addTodo(value);
    input.value = "";
    saveTodos();
}

function addTodo(text) {
    var li = document.createElement("li");
    var t = document.createTextNode(text);
    li.appendChild(t);

    var span = document.createElement("span");
    var closeTxt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(closeTxt);
    li.appendChild(span);

    span.onclick = function () {
        li.remove();
        saveTodos();
    };

    var list = document.getElementById("todoList");
    list.insertBefore(li, list.firstChild);
}

function saveTodos() {
    var items = document.querySelectorAll("#todoList li");
    var todos = [];

    for (var i = 0; i < items.length; i++) {
        var text = items[i].childNodes[0].nodeValue.trim();
        todos.push(text);
    }

    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

function getCookie(name) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim();
        if (c.indexOf(name + "=") === 0) {
            return c.substring(name.length + 1, c.length);
        }
    }
    return null;
}
