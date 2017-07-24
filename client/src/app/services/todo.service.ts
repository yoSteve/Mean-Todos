import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class TodoService {
  apiUrl = 'http://localhost:3000/api/v1/todos';

  constructor(private http:Http) { }

  getTodos() {
    return this.http.get(this.apiUrl)
      .map( res => res.json() );
  }

} // end class
