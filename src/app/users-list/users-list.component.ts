import { Component } from '@angular/core';
import {UsersApiService} from "../services/usersApiService/users-api.service";
import {IUser} from "../interfaces/iuser";
import {NgFor} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {


  constructor(private _usersApiService: UsersApiService) {}

}
