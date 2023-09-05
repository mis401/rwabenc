import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.state';
import { selectUser } from '../store/user/user.selector';
import { map, take, tap } from 'rxjs';
import { Role } from 'src/Roles';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<UserState>);
  const router = inject(Router);
  
  let userRole: Role | undefined;
  store.select(selectUser).pipe(
    map((user) => user?.role),
    take(1),
  ).subscribe(role => userRole = role ?? undefined);
  console.log(userRole);
  if (userRole === Role.Patient)
    return true;
  else {
    router.navigateByUrl('/');
    console.log("Not authorized");
    return false;
  }
};
