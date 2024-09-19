import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ITodo} from "../interfaces/itodo";
import {TodoService} from "../services/todoService/todo.service";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {AsyncPipe, NgFor} from "@angular/common";
import {UsersService} from "../services/usersService/users.service";

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    TodoCardComponent,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  public readonly todos$: Observable<ITodo[]> = this._todoService.todos$;
  constructor(private _todoService: TodoService, private _usersService: UsersService) {}

  ngOnInit(): void {
    this._todoService.loadTodos();
    this._usersService.loadUsers();
  }

  deleteTodo(id: number) {
    this._todoService.deleteTodo(id);
  }

}
