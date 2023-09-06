import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

interface Notification {
  icon: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-notification-list-component',
  templateUrl: './notification-list-component.component.html',
  styleUrls: ['./notification-list-component.component.scss']
})
export class NotificationListComponentComponent implements OnInit  {
  constructor(private service:ServiceService){
    
  }
 
  ngOnInit(): void {
   const user = JSON.parse(localStorage.getItem("user"));

   this.service.getNotifications(user.id).subscribe(
    res=>{
      console.log(res)
      this.notifications = []
      for(let ele of res){
       this.notifications.push(
         {
           icon: '📌',
           title: ele.intitule,
           message: ele.content
         }
       )
      }
    },err=>{
      console.log(err)

    }
   )
  

   
  
  }

 
  notifications: Notification[] = [
    {
      icon: '📌',
      title: 'New Task',
      message: 'You have a new task assigned to you.'
    },
    {
      icon: '🔔',
      title: 'Reminder',
      message: 'Your meeting starts in 30 minutes.'
    },
    {
      icon: '✉️',
      title: 'New Message',
      message: 'You have a new message from John Doe.'
    }
    // Add more notifications here as needed
  ];

}
