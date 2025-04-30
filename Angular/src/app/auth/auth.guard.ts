import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // ✅ correct


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

    if (role === 'admin') {
      return true; // ✅ Grant access to /admin
    }

    if (role === 'doctor') {
      router.navigate(['/calendar']); // ⛔ Block /admin → go to /calendar
      return false;
    }

    if (role === 'patient') {
      router.navigate(['/home']); // ⛔ Block /admin → go to /home
      return false;
    }

    // Default fallback
    router.navigate(['/login']);
    return false;

  } catch (e) {
    console.error('Token decoding error:', e);
    router.navigate(['/login']);
    return false;
  }
};
