import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
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
import { AppState } from './store/state';
import { sessionReducer } from './store/session/session.reducer';
import { SessionModule } from './session/session.module';
import { SessionPreviewModule } from './session-preview/session-preview.module';
import { SessionListComponent, SessionListModule } from './session-list/session-list.module';
import { HomeModule } from './home/home.module';
//import { doctorReducer } from './store/doctor/doctor.reducer';

export function persistanceReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  const localStorageKey = 'state';
  return function(state : AppState | undefined, action: Action) {
    if (state === undefined) {
      const persistance = localStorage.getItem(localStorageKey);
      console.log("Ucitacu perzistenciju");
      return persistance ? JSON.parse(persistance) : reducer(state, action);
    }
    
    const newState = reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(newState));
    
    return newState;
  };
}
export const metaReducers: MetaReducer<any>[] = [persistanceReducer];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingPageModule,
    LoginModule,
    RegisterModule,
    SessionModule,
    SessionPreviewModule,
    SessionListModule,
    HomeModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer, session: sessionReducer}, {metaReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: LandingPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    ]),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'sr-sp'},
    httpInterceptorProviders,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
