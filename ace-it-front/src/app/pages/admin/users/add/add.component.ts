import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../../services/utilisateur/utilisateur.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AdminUserAddComponent {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private userService: UtilisateurService,
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) return;
    if (this.userForm.value.password !== this.userForm.value.passwordConfirm) {
      this.userForm.get('passwordConfirm')?.setErrors({ notMatch: true });
      return;
    }

    this.userService.createUtilisateur(this.userForm.value).subscribe(() => {
      this.router.navigate(['/admin/users']);
    });

    console.log('✅ Nouvel utilisateur :', this.userForm.value);
  }
}
