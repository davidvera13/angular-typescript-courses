import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    standalone: false
})
export class ChatComponent implements OnInit {

  constructor(
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  closeChat() {
    console.log("Closing ....")
    this.router.navigate(['../', { outlets: { chat: null } }]).then();
  }
}
