import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  user = { email: "", password: "" };

  constructor(private toastr: ToastrService) {}

  onSubmit(user: { email: string; password: string }) {
    this.toastr.success("User logged in successfully 🚀");
    console.log(user);
  }
}
