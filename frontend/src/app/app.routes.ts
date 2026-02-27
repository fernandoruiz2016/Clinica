import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Layout } from './shared/layout/layout'; 

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {path: '', component: Home},
        ]
    }
];
