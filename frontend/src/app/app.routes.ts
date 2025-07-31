import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Trades } from './trades/trades';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {
        path: "dashboard",
        component: Dashboard
    }, {
        path: "trades",
        component: Trades
    }, {
        path: "profile",
        component: Profile
    }
];
