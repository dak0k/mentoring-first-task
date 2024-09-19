import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input()
  user: IUser | any;
  @Output() deleteUser = new EventEmitter();

  onDeleteUser(id: any): void {
    this.deleteUser.emit(id);
  }
}
