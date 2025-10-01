import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { AuthService, LoginRequest } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    imports: [CommonModule, FormsModule],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  user: LoginRequest = { email: "", motDePasse: "" };
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

        // Exemple : JWT + rôle côté front
        const token = res.token || res; // dépend de ton API
        const role = res.role || "USER"; // si tu renvoies le rôle dans le JWT, il faudra le décoder

        // Stocke le token
        localStorage.setItem("token", token);

        this.toastr.success("Connexion réussie 🚀");

        // Redirection selon le rôle
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
