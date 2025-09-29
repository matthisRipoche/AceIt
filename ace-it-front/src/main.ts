import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                  // routing
    importProvidersFrom(
      BrowserAnimationsModule,             // animations nécessaires pour ngx-toastr
      ToastrModule.forRoot()               // fournit ToastrService et ToastConfig
    )
  ]
}).catch(err => console.error(err));
