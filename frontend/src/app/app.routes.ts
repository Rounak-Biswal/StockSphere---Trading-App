import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Trades } from './trades/trades';
import { Profile } from './profile/profile';
import { Settings } from './settings/settings';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { authGuardGuard } from './auth-guard-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }, {
        path: "home",
        component: Home,
        canActivate: [authGuardGuard]
    }, {
        path: "dashboard",
        component: Dashboard,
        canActivate: [authGuardGuard]
    }, {
        path: "trades",
        component: Trades,
        canActivate: [authGuardGuard]
    }, {
        path: "profile",
        component: Profile,
        canActivate: [authGuardGuard]
    }, {
        path: "settings",
        component: Settings,
        canActivate: [authGuardGuard]
    }, {
        path: "register",
        component: Register
    }, {
        path: "login",
        component: Login
    }
];
