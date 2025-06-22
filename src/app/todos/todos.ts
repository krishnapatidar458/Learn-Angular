import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class TodosComponent implements OnInit {
  todosService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  ngOnInit(): void {
    this.todosService
    .getTodosFromAPIs()
    .pipe(
      catchError((error) => {
        console.error('Error fetching todos:', error);
        throw error;
      })
    )
    .subscribe((todos) =>{
      this.todoItems.set(todos);
    })
  }
}
