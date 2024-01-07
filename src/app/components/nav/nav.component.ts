import { Component, Input, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  token = '';
  email = '';
  activeMenu = false;
  counter = 0;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginAndProfile() {
    this.authService.loginAndProfile('jessica@gmail.com', '12345')
    .subscribe(profile => {
      this.email = profile.email;
    })
  }

  login() {
    this.authService.login('jessica@gmail.com', '12345')
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
      this.getProfile(this.token);
    })
  }

  getProfile(token: string) {
    this.authService.profile()
    .subscribe(profile => {
      console.log(profile);
      this.email = profile.email;
    })
  }

}
