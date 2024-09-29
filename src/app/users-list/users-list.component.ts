import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { MatDialog } from '@angular/material/dialog';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { loadUsers, addUser, updateUser, deleteUser } from './ngrx/users.actions';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { selectUsers } from './ngrx/users.selectors';

@Component({
  selector: 'users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  imports: [AsyncPipe, UserCardComponent, NgFor],
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public readonly users$: Observable<IUser[]> = this.store.select(selectUsers);
  readonly dialog = inject(MatDialog);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  openDialog(user: IUser | null = null): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user ? { user, isEdit: true } : { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isEdit) {
          this.store.dispatch(updateUser({ user: result.user }));
        } else {
          this.store.dispatch(addUser({ user: result.user }));
        }
      }
    });
  }

  deleteUser(id: number): void {
    this.store.dispatch(deleteUser({ id }));
  }
}
