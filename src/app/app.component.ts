import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ToolbarComponent } from './core/toolbar/toolbar.component'
import { SvgDrawingComponent } from './rectangle/svg-drawing.component';
import { SvgService } from './svg-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet, 
    ToolbarComponent,
    SvgDrawingComponent
  ],
  providers:[
    SvgService,
    HttpClient,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'svg-rectangle-drawing';
}
