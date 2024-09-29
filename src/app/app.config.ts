import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usersReducer } from './users-list/ngrx/users.reducer';
import { UsersEffects } from './users-list/ngrx/users.effects';
import { routes } from './app.routes';
import {todosReducer} from "./todo-list/ngrx/todos.reducer";
import {TodoEffects} from "./todo-list/ngrx/todos.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      users: usersReducer,
      todos: todosReducer,
    }),
    provideEffects([UsersEffects]),
    provideEffects([TodoEffects]),
  ]
};
