import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { UsersService } from '../services/usersService/users.service';
import { Observable } from 'rxjs';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import {AsyncPipe, NgFor} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";

@Component({
  selector: 'users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  imports: [
    AsyncPipe,
    UserCardComponent,
    NgFor
  ],
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public readonly users$: Observable<IUser[]> = this._userService.users$;
  readonly dialog = inject(MatDialog);

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this._userService.loadUsers();
  }

  openDialog(user: IUser | null = null): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user ? { user, isEdit: true } : { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isEdit) {
          this._userService.updateUser(result.user);
        } else {
          this._userService.addUser(result.user);
        }
      }
    });
  }

  deleteUser(id: number): void {
    this._userService.deleteUser(id);
  }
}
