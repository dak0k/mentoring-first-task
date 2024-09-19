import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ITodo } from "../../interfaces/itodo";
import { UsersService } from "../../services/usersService/users.service";
import {TodoService} from "../../services/todoService/todo.service";

@Component({
  selector: 'todo-card',
  standalone: true,
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input()
  todo: ITodo | any;

  userName: string = 'Unknown';

  constructor(private _todoService: TodoService, private _usersService: UsersService) {}

  ngOnInit(): void {
    if (typeof this.todo.userId === 'number') {
      this._usersService.users$.subscribe(users => {
        const user = users.find(u => u.id === this.todo.userId);
        this.userName = user ? user.name : 'Unknown';
      });
    } else if (this.todo.userId && typeof this.todo.userId === 'object') {
      this.userName = this.todo.userId.name;
    }
  }

  deleteTodo(id: number) {
    this._todoService.deleteTodo(id);
  }
}
