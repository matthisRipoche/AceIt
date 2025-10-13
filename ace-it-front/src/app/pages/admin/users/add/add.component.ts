import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../../services/utilisateur/utilisateur.service';
import { CommonModule } from '@angular/common';

// interface spécifique pour la création
export interface CreateUtilisateur {
  firstName: string;
  lastName: string;
  picturePath: string;
  email: string;
  role: string;
  password: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AdminUserAddComponent {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private userService: UtilisateurService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      picturePath: [''],
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

    console.log(this.userForm);

    if (this.userForm.invalid) return;


    const { firstName, lastName, picturePath, email, role, password, passwordConfirm } = this.userForm.value;

    if (password !== passwordConfirm) {
      this.userForm.get('passwordConfirm')?.setErrors({ notMatch: true });
      return;
    }

    const payload: CreateUtilisateur = { firstName, lastName, picturePath, email, role, password };

    this.userService.createUtilisateur(payload).subscribe({
      next: () => {
        console.log('✅ Utilisateur créé avec succès :', payload);
        this.router.navigate(['/admin/users']);
      },
      error: (err) => console.error('❌ Erreur création utilisateur :', err)
    });
  }
}
