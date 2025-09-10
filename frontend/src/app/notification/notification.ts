import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification/notification';
import { notificationModel } from '../../model/notification';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [FormsModule, CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService)
  private subscription: Subscription = new Subscription()
  currentNotification: notificationModel | null = null

  ngOnInit(): void {
    this.subscription = this.notificationService.notification$.subscribe((value) => {
      this.currentNotification = value
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  clear(){
    this.currentNotification = null
  }
}
