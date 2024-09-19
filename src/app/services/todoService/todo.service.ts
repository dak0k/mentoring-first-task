import { Injectable } from '@angular/core';
import {TodoApiService} from "../todoApiService/todo-api.service";
import {BehaviorSubject} from "rxjs";
import {ITodo} from "../../interfaces/itodo";

interface ITodoService{
  loadTodos(): void;
  deleteTodo(id: number): void;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService{
  private todosObject$ = new BehaviorSubject<ITodo[]>([]);
  public readonly todos$ = this.todosObject$.asObservable();

  constructor(private _todoApiService: TodoApiService) { }

  loadTodos(): void {
    this._todoApiService.getTodos().subscribe(
      (data: ITodo[]) => {
        this.todosObject$.next(data);
      }
    );
  }

  deleteTodo(id: number) {
    this.todosObject$.next(this.todosObject$.value.filter(todo => todo.id !== id));
  }

}
