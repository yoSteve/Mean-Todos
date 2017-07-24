import { Todo } from './todo.model';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todos = [];
    this.todoService.getTodos()
      .subscribe( (todos) => {
        this.todos = todos;
        console.log(todos);
      });
  }

  addTodo(event, todoText) {
    let result;
    let newTodo = {
      _id: '',
      text: todoText.value,
      isCompleted: false
    };
    result = this.todoService.saveTodo(newTodo);
    result.subscribe( () => {
      this.todos.push(newTodo);
      todoText.value = '';
    });
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo) {
    let _todo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    }
    this.todoService.updateTodo(_todo)
      .subscribe( (data) => {
        todo.isCompleted = !todo.isCompleted;
      });
  }

  updateTodoText(event, todo) {
    // if keypress event is the 'Enter' key
    if(event.which === 13) {
      let _todo = {
        _id: todo._id,
        text: event.target.value,
        isCompleted: todo.isCompleted
      };
      this.todoService.updateTodo(_todo)
        .subscribe((data) => {
          todo.text = _todo.text;
          this.setEditState(todo, false);
        })
    }
  }

  deleteTodo(todo) {
    let todos = this.todos;
    let targetId = todo._id;
    this.todoService.deleteTodo(targetId)
      .subscribe((data) => {
        if (data.n == 1) {
          todos.forEach((todo, index) => {
            if (todo._id == targetId) {
              todos.splice(index, 1);
            }
          });
        }
      });
  }

}
