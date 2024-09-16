import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IUser} from "../../interfaces/iuser";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  readonly httpClient: HttpClient = inject(HttpClient);
  getUsers() {
    return this.httpClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
