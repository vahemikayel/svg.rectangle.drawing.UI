import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule
  ]
})
export class ToolbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    
  }

  logout(): void {

  }

}
