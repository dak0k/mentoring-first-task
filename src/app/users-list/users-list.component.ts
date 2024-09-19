import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../services/usersService/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public readonly users$: Observable<IUser[]> = this._userService.users$;

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this._userService.loadUsers();
  }

  deleteUser(id: number): void {
    this._userService.deleteUser(id);
  }
}
