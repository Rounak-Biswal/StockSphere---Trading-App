import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Trades } from './trades/trades';
import { Profile } from './profile/profile';
import { Settings } from './settings/settings';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }, {
        path: "home",
        component: Home
    }, {
        path: "dashboard",
        component: Dashboard
    }, {
        path: "trades",
        component: Trades
    }, {
        path: "profile",
        component: Profile
    }, {
        path: "settings",
        component: Settings
    }
];
