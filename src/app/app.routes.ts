import { Routes } from '@angular/router';
import { FormularioAgregarComponent } from './feature/usuario/formulario-agregar/formulario-agregar.component';
import { FormularioEditarComponent } from './feature/usuario/formulario-editar/formulario-editar.component';

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
                component: FormularioAgregarComponent
            },
            {
                path: 'usuario/:id',
                component: FormularioEditarComponent
            },
           
            {
                path: 'conductor',
                loadComponent: () => import('./feature/conductores/listar-conductores/conductores.component')
            },
            {
                path: 'conductor/register',
                loadComponent: () => import('./feature/conductores/formulario-conductor/formulario-conductor.component')
            },
            {
                path: 'vehiculo',
                loadComponent: () => import('./feature/autos/lista-autos/lista-autos.component')
            },
            {
                path: 'vehiculo/register',
                loadComponent: () => import('./feature/autos/formulario-autos/formulario-autos.component')
            },
            {
                path: 'reservas',
                loadComponent: () => import('./feature/reservas/lista-reservas/reservas.component')
            },
            {
                path: 'reservas/register',
                loadComponent: () => import('./feature/reservas/formulario-reservas/formulario-reservas.component')
            },
            {
                path: 'envios',
                loadComponent: () => import('./feature/envios/lista-envios/envios.component')
            },
            {
                path: 'envios/register',
                loadComponent: () => import('./feature/envios/formulario-envios/formulario-envios.component')
            },

        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
