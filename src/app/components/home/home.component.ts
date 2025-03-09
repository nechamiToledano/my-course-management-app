import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule,MatToolbar],
 templateUrl: './home.component.html'
 ,styleUrl: './home.component.css'
})
export class HomeComponent {}
