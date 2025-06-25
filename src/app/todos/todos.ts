import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';

@Component({
  selector: 'app-todos',
  imports: [TodoItem],
  templateUrl: './todos.html',
  styleUrls: ['./todos.scss']
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

  updateTodoItem(todoItem : Todo){
    this.todoItems.update((todos) => {
      return  todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return { 
            ...todo,
            completed: !todo.completed 
          };
        }
        return todo;
      });
    });
  }
}
