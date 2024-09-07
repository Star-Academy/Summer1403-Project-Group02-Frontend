import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Wait for the user check to complete
  await authService.checkIfUserIsLoggedIn();

  // Get the current user from the observable
  const user = await firstValueFrom(authService.getCurrentUser());
  const currentUrl = route.url[0].path;
  const isLoginRoute = currentUrl === 'login';

  if (user) {
    if (isLoginRoute) {
      if (window.history.length > 1) {
        history.back(); // Navigate back in history
      } else {
        // No history, so navigate to the home page or another default route
        router.navigate(['/']);
      }
      return false;
    }
    return true; // User is authenticated, allow access
  } else {
    if (isLoginRoute) {
      return true;
    }
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false; // User is not authenticated, redirect to login
  }
};
