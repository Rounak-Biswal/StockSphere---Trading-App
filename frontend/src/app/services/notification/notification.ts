import { Injectable } from '@angular/core';
import { notificationModel } from '../../../model/notification';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<notificationModel | null>(null)
  notification$: Observable<notificationModel | null> = this.notificationSubject.asObservable()

  constructor() { }

  show(msg: string, type: 'success' | 'error') {
    this.notificationSubject.next({ msg, type })

    setTimeout(() => this.notificationSubject.next(null), 3000)
  }
}
