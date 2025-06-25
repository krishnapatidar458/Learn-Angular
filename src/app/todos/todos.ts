import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItem,FormsModule, FilterTodosPipe],
  templateUrl: './todos.html',
  styleUrls: ['./todos.scss']
})
export class TodosComponent implements OnInit {
  todosService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');
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
