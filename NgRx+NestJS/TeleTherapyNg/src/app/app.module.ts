import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { LandingPageModule } from './landing-page/landing-page.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { userReducer } from './store/user/user.reducer';
import { LandingPageComponent } from './landing-page/component/landing-page.component';
import { LoginComponent } from './login/component/login.component';
import { RegisterModule } from './register/register.module';
import { RegisterComponent } from './register/component/register.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { httpInterceptorProviders } from './interceptors';
import { HomeComponent } from './home/component/home.component';
import { authGuard } from './guards/auth.guard';
import { SessionComponent } from './session/component/session.component';
//import { doctorReducer } from './store/doctor/doctor.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingPageModule,
    LoginModule,
    RegisterModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: LandingPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    ])
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'sr-sp'},
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
