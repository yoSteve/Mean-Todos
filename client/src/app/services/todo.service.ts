import { Todo } from './../components/todos/todo.model';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class TodoService {
  apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http:Http) { }

  getTodos() {
    return this.http.get(`${this.apiUrl}/todos`)
      .map( (res) => res.json() )
  }

  saveTodo(todo:Todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/todo`, JSON.stringify(todo), {headers: headers})
      .map( (res) => res.json() );
  }

  updateTodo(todo:Todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.apiUrl}/todo/${todo._id}`, JSON.stringify(todo), {headers: headers})
      .map( (res) => res.json() );
  }

  // deleteTodo(todo:Todo) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.delete(`${this.apiUrl}/todo/${todo._id}`, {headers: headers})
  //     .map( (res) => res.json() );
  // }

} // end class
