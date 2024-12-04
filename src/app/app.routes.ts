import { Routes } from '@angular/router';
import { IdentificacionComponent } from './modules/IPERC/identificacion/identificacion.component';
import { ValoracionComponent } from './modules/IPERC/valoracion/valoracion.component';
import { VisualizacionComponent } from './modules/IPERC/visualizacion/visualizacion.component';
import { ListadoComponent } from './modules/IPERC/listado/listado.component';

export const routes: Routes = [
    {
        path: 'identificacion', // Ruta para el componente Identificacion
        component: IdentificacionComponent,
    },
    {
        path: 'identificacion/:id_proceso',
        component: IdentificacionComponent,
    },
    {
        path: 'valoracion', // Ruta para el componente Identificacion
        component: ValoracionComponent,
    },
    {
        path: 'visualizacion/:id_proceso',
        component: ValoracionComponent,
    },
    {
        path: 'visualizacion', // Ruta para el componente Identificacion
        component: VisualizacionComponent,
    },
    {
        path:'visualizacion/:id_proceso',
        component: VisualizacionComponent,
    },
    {
        path:'listado',
        component: ListadoComponent,
    },
];
