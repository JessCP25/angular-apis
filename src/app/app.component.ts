import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(private usersService: UsersService) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Jessica',
      email: 'jessica@gmail.com',
      password: '12345',
      avatar: 'https://i.pinimg.com/564x/e9/9b/0a/e99b0a26d6709288ecb8f5ba212305a4.jpg'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }


}
