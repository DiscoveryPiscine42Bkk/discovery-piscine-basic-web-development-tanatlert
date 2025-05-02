$(document).ready(function () {
    // Load todos from cookie
    var saved = getCookie("todos");
    if (saved) {
        try {
            var todos = JSON.parse(saved);
            for (var i = 0; i < todos.length; i++) {
                addTodo(todos[i]);
            }
        } catch (e) {
            console.error("Error parsing saved todos:", e);
        }
    }

    // Delete item when clicking the close button with confirmation
    $('#todoList').on('click', '.close', function () {
        if (confirm("Are you sure you want to delete this todo?")) {
            $(this).parent().remove();
            saveTodos();
        }
    });
});

function newElement() {
    var value = $('#todoInput').val().trim();

    if (value === "") {
        alert("You must write something!");
        return;
    }

    addTodo(value);
    $('#todoInput').val("");
    saveTodos();
}

function addTodo(text) {
    var $li = $('<li></li>').text(text);
    var $span = $('<span class="close">\u00D7</span>');

    $li.append($span);
    $('#todoList').prepend($li); // Add to top
}

function saveTodos() {
    var todos = [];

    $('#todoList li').each(function () {
        var text = $(this).contents().get(0).nodeValue.trim(); // get only text, not the span
        todos.push(text);
    });

    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

function getCookie(name) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim();
        if (c.indexOf(name + "=") === 0) {
            return c.substring(name.length + 1);
        }
    }
    return null;
}
