// import { inject } from '@angular/core';
// import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { AccountService } from '../../account/account.service';
// import { catchError, finalize, throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
// import { NavigationExtras, Router } from '@angular/router';
// import { BusyService } from "../services/busy.service";

// export function loadingInterceptorFn(request: HttpRequest<any>, next: HttpHandlerFn) {
//     const busyService = inject(BusyService);
//     return next(request).pipe(finalize(() => busyService.idle()));
// }

// export function jwtInterceptorFn(request: HttpRequest<any>, next: HttpHandlerFn) {
//     // add auth header with jwt if user is logged in and request is to the api url
//     const accountService = inject(AccountService);
//     const token = typeof localStorage !== 'undefined' && localStorage.getItem('token') || '';
//     const isLoggedIn: boolean = token != null;
//     const isApiUrl = request.url.startsWith(environment.apiUrl);
//     if (isLoggedIn && isApiUrl) {
//         request = request.clone({
//             setHeaders: { Authorization: `Bearer ${token}` }
//         });
//     }

//     return next(request);
// }

// export function errorInterceptorFn(request: HttpRequest<any>, next: HttpHandlerFn) {
//     const accountService = inject(AccountService);
//     const toastr = inject(ToastrService);
//     const router = inject(Router);

//     return next(request).pipe(catchError(error => {
//         if (error) {
//             if (error.status === 400) {
//                 if (error.error) {
//                     if (error.error.errors) {
//                         throw error.error;
//                     }
//                     else {
//                         toastr.error(error.error?.ClientMessage, error.status);
//                     }
//                 }
//             }
//             if (error.status === 401) {
//                 if (error.error) {
//                     toastr.error(error.error?.ClientMessage, error.status);
//                     accountService.logout();
//                 }
//             }
//             if (error.status === 403)
//                 accountService.logout();
//             if (error.status === 404) {
//                 router.navigateByUrl('/not-found');
//             }
//             if (error.status === 500) {
//                 const navigationExtras: NavigationExtras = { state: { error: error.error } };
//                 router.navigateByUrl('/server-error', navigationExtras);
//             }
//             else {
//                 toastr.error(error?.error?.ClientMessage, error?.status);
//             }
//         }
//         return throwError(() => error);
//     }))
// }