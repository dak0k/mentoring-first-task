import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UsersApiService} from "../usersApiService/users-api.service";
import {IUser} from "../../interfaces/iuser";
interface IUserService {
  loadUsers(): void;
  deleteUser(id: number): void;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUserService {
  private usersObject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersObject$.asObservable();
  constructor(private _usersApiService: UsersApiService) { }

  loadUsers(): void {
    this._usersApiService.getUsers().subscribe(
      (data: IUser[]) => {
        this.usersObject$.next(data);
      }
    );
  }
  deleteUser(id: number): void {
    this.usersObject$.next(this.usersObject$.value.filter(user => user.id !== id));
  }
}
