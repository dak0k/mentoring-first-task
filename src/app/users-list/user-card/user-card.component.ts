import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/usersService/users.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: IUser|any;

  constructor(private _userService: UsersService) {}

  deleteUser(id: number) {
    this._userService.deleteUser(id);
  }

}
