import { UserService } from './../user/user.service';
import { IUser } from './../user/user.model';
import { MessageService } from './message.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html'
})

export class SendMessageComponent  implements OnInit {

  pageTitle = 'Send Message';
  sendMessageForm: FormGroup;
  users: IUser[];

  ngOnInit() {
    this.sendMessageForm = this.fb.group({
      userId: 0,
      message: ''
    });

    this.userService.get().subscribe( data => {
      this.users = data;
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ){ }

  send() {
    this.messageService.createMessage(this.sendMessageForm.value).subscribe( res => {
      alert('Message Sent');
      this.router.navigateByUrl('/home');
    });
  }

}
