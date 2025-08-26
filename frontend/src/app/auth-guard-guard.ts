import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  // return true;
  const router = inject(Router)
  const token = localStorage.getItem('token')

  if (token) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
