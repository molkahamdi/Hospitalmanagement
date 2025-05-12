import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const role = decoded.role;
    const requestedUrl = state.url;

    // ✅ Restrict /admin to admin only
    if (requestedUrl.startsWith('/admin') && role !== 'admin') {
      router.navigate(['/']);
      return false;
    }

    // ✅ Restrict /ordo to doctor only
    if (requestedUrl.startsWith('/ordo') && role !== 'doctor') {
      router.navigate(['/']);
      return false;
    }

    // Allow access
    return true;

  } catch (e) {
    console.error('Token decoding error:', e);
    router.navigate(['/login']);
    return false;
  }
};
