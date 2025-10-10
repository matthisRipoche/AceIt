import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../../services/utilisateur/utilisateur.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// interface spécifique pour la création
export interface CreateUtilisateur {
  name: string;
  email: string;
  role: string;
  motDePasse: string;
}

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']  // petite faute corrigée : styleUrls au pluriel
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

    // stop si le formulaire est invalide
    if (this.userForm.invalid) return;

    const { name, email, role, password, passwordConfirm } = this.userForm.value;

    // validation du password confirm
    if (password !== passwordConfirm) {
      this.userForm.get('passwordConfirm')?.setErrors({ notMatch: true });
      return;
    }

    // préparer le payload pour le back
    const payload: CreateUtilisateur = { name, email, role, motDePasse: password };
    
    this.userService.createUtilisateur(payload).subscribe({
      next: () => this.router.navigate(['/admin/users']),
      error: (err) => console.error('❌ Erreur création utilisateur :', err)
    });

    console.log('✅ Nouvel utilisateur envoyé au back :', payload);
  }
}
