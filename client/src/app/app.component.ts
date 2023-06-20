import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './auth/shared/model/user.model';
import { Store } from 'store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  user$!: Observable<User>

  constructor(private authService: AuthService, private store: Store) {
    this.authService.autoLogin();
  }

  ngOnInit(): void {
    this.user$ = this.store.select<User>('user');
  }
}
