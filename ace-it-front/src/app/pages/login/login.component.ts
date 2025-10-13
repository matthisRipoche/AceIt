import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common"; // Pour ngIf/ngFor

import { ToastrService } from "ngx-toastr";
import { AuthService, LoginRequest } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  user: LoginRequest = { email: "", password: "" };
  loading = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(user: LoginRequest) {
    this.loading = true;
    this.authService.login(user).subscribe({
      next: (res: any) => {
        this.loading = false;

        const token = res.token || res;
        const role = res.role || "USER";

        localStorage.setItem("token", token);

        this.toastr.success("Connexion réussie 🚀");

        if (role === "ADMIN") {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error || "Email ou mot de passe incorrect ❌");
        console.error(err);
      }
    });
  }
}
