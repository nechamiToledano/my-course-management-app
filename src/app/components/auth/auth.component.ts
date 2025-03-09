import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // ✅ Required for mat-form-field
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // ✅ Needed for role selection
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule ,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, // ✅ Added
    MatOptionModule,
    MatSelectModule, // ✅ Added
    MatButtonModule, // ✅ Added
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  title: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
      private snackBar: MatSnackBar 
    
  ) {
    this.initForm();
  }

  private initForm() {
    this.title = this.isLoginMode ? 'Login' : 'Register';
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (!this.isLoginMode) {
      this.authForm.addControl('name', this.fb.control('', Validators.required));
      this.authForm.addControl('role', this.fb.control('', Validators.required));
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.initForm();
  }

  onSubmit() {
    if (this.authForm.valid) {
      if (this.isLoginMode) {
        this.onLogin();
      } else {
        this.onRegister();
      }
    }
  }

  onLogin(): void {
    this.authService.login(this.authForm.value).subscribe(
      (response) => {
        if (response && response.token && response.userId) {
          this.authService.handleAuthResponse(response);
          this.showMessage('✅ Login successful! Redirecting...');
          this.router.navigate(['/dashboard']);
        } else {
          this.showMessage('❌ Login failed: Invalid response from server.');
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.showMessage('❌ Login failed: ' + (error.error?.message || 'Invalid email or password.'));
      }
    );
  }
  
  onRegister(): void {
    this.authService.register(this.authForm.value).subscribe(
      (response) => {
        if (response && response.data) {
          this.authService.handleAuthResponse(response);
          this.showMessage('✅ Registration successful! Redirecting...');
          this.router.navigate(['/dashboard']);
        } else {
          this.showMessage('❌ Registration failed: Invalid response from server.');
        }
      },
      (error) => {
        console.error('Registration failed', error);
        this.showMessage('❌ Registration failed: ' + (error.error?.message || 'Server error.'));
      }
    );
  }
  
  private showMessage(message: string): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000, // 3 שניות
      verticalPosition: 'top', 
      horizontalPosition: 'center'
    });
  }
}
