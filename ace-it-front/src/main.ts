import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http'; // ← Ajouté

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // ← indispensable pour HttpClient
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    )
  ]
}).catch(err => console.error(err));
