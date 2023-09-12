import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.state';
import { selectUser } from '../store/user/user.selector';
import { combineLatest, map, startWith, take, tap } from 'rxjs';
import { Role } from 'src/Roles';
import { AppState } from '../store/state';
import { selectDoctor } from '../store/doctor/doctor.selector';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  
  let userRole: Role | undefined;

  const userInState = combineLatest([
    store.select(selectUser).pipe(startWith(null), take(1)),
    store.select(selectDoctor).pipe(startWith(null), take(1)),
  ]);

  userInState.pipe(
    map(([user, doctor]) => {
      if (user) {
        if (user.role === Role.Patient) {
          userRole = Role.Patient;
      }
      else if (doctor) {
        if (doctor.role === Role.Doctor) {
          userRole = Role.Doctor;
        }
      }
      else {
        userRole = undefined;
      }
    }
    })
  );

  // store.select(selectUser).pipe(
  //   map((user) => user?.role),
  //   take(1),
  // ).subscribe(role => userRole = role ?? undefined);
  console.log(userRole);
  if (userRole === Role.Patient || userRole === Role.Doctor)
    return true;
  else {
    router.navigateByUrl('/');
    console.log("Not authorized");
    return false;
  }
};
