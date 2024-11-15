import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./shared/components/login/login.component'),
    },
    {
        path: 'sidebar',
        loadComponent: () => import('./shared/components/sidebar/sidebar.component'),
        children: [
            {
                path: 'inicio',
                loadComponent: () => import('./feature/inicio/inicio.component')
            },
            {
                path: 'usuario',
                loadComponent: () => import('./feature/usuario/listar-usuario/usuario.component')
            },
            {
                path: 'usuario/register',
                loadComponent: () => import('./feature/usuario/formulario-usuario/formulario-usuario.component')
            },
            {
                path: 'conductor',
                loadComponent: () => import('./feature/conductores/listar-conductores/conductores.component')
            },
            {
                path: 'reservas',
                loadComponent: () => import('./feature/reservas/reservas.component')
            },
            {
                path: 'envios',
                loadComponent: () => import('./feature/envios/envios.component')
            },
            
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
