import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {LoadingIndicatorComponent} from './components/loading/loading.component';
import {MessagesComponent} from './components/messages/messages.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatIcon,
    RouterLink,
    MatToolbar,
    MatIconButton,
    LoadingIndicatorComponent,
    MessagesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "04-angular-signal-based-user-messages-and-error-handling";

}
