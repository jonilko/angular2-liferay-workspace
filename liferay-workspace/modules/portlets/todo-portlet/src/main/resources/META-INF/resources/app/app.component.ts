import { Component } from '@angular/core';

import { TodoStore, Todo } from './services/store.js';

@Component({
    selector: 'todo-app',
    templateUrl: '/o/todo-portlet-1.0.0/app/app.component.html',
    providers: [TodoStore]
})
export class AppComponent {
    todoStore: TodoStore;
    newTodoText = '';

    constructor(todoStore: TodoStore) {
        this.todoStore = todoStore;
    }

    stopEditing(todo: Todo, editedTitle: string) {
        todo.title = editedTitle;
        todo.editing = false;
    }

    cancelEditingTodo(todo: Todo) {
        todo.editing = false;
    }

    updateEditingTodo(todo: Todo, editedTitle: string) {
        editedTitle = editedTitle.trim();
        todo.editing = false;

        if (editedTitle.length === 0) {
            return this.todoStore.remove(todo);
        }

        todo.title = editedTitle;
    }

    editTodo(todo: Todo) {
        todo.editing = true;
    }

    removeCompleted() {
        this.todoStore.removeCompleted();
    }

    toggleCompletion(todo: Todo) {
        this.todoStore.toggleCompletion(todo);
    }

    remove(todo: Todo) {
        this.todoStore.remove(todo);
    }

    addTodo() {
        if (this.newTodoText.trim().length) {
            this.todoStore.add(this.newTodoText);
            this.newTodoText = '';
        }
    }
}