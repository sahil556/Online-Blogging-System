import { CanActivateFn, Router  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastr : ToastrService = inject(ToastrService);
  if(authservice.isLoggedinguard)
    return true;
  else
  {
    toastr.warning("Requires verification to access requested page.", "Please Login First")
    router.navigate(['/login']); 
    return false;
  }
  return true;
};
