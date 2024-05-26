import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { SvgDrawingComponent } from './rectangle/svg-drawing.component';

const routes: Routes = [
  { path: 'toolbar', component: ToolbarComponent },
  { path: 'rectangle', component: SvgDrawingComponent },
  { path: '', redirectTo: '/toolbar', pathMatch: 'full' },
  { path: '**', redirectTo: '/toolbar' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }