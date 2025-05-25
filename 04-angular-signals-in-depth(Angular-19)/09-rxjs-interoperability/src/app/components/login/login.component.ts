import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessagesService} from '../../services/messages.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  messageService = inject(MessagesService);
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })


  async onLogin() {
    try {
      const {email, password} = this.form.value;
      if(!email || !password) {
        this.messageService.showMessage('Enter email & password', 'error');
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    }
    catch(err) {
      console.error(err);
      this.messageService.showMessage('Login failed, try again', 'error');
    }
  }
}
