import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { UsersApiService } from "./users-api.service";
import { IUser } from "../interfaces/iuser";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersObject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersObject$.asObservable();
  private readonly localStorageKey = 'users';
  private _localStorageService = inject(LocalStorageService);

  constructor(private _usersApiService: UsersApiService) { }

  loadUsers(): void {
    const usersFromLocalStorage = this._localStorageService.getObjects<IUser>(this.localStorageKey);
    if (usersFromLocalStorage.length > 0) {
      this.usersObject$.next(usersFromLocalStorage);
    } else {
      this._usersApiService.getUsers().subscribe(
        (data: IUser[]) => {
          this.usersObject$.next(data);
          data.forEach(user => this._localStorageService.saveObject(this.localStorageKey, user));
        }
      );
    }
  }

  addUser(user: IUser): void {
    this._localStorageService.saveObject(this.localStorageKey, user);
    const updatedUsers = [...this.usersObject$.value, user];
    this.usersObject$.next(updatedUsers);
  }
  updateUser(user: IUser): void {
    const users = this.usersObject$.value;
    const index = users.findIndex(u => u.id === user.id);

    if (index !== -1) {
      users[index] = { ...users[index], ...user };
      this._localStorageService.updateObject(this.localStorageKey, users[index]);
      this.usersObject$.next(users);
    }
  }


  deleteUser(id: number): void {
    this._localStorageService.deleteObject(this.localStorageKey, id);
    const updatedUsers = this.usersObject$.value.filter(user => user.id !== id);
    this.usersObject$.next(updatedUsers);
  }
}
