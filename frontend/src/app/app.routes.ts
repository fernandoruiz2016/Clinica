import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Layout } from './shared/layout/layout';
import { CitasComponent } from './features/citas/pages/citas-component/citas-component';
import { CrearCita } from './features/citas/pages/crear-cita/crear-cita';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      // { path: 'pacientes', component: PacientesComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'citas/crear', component: CrearCita },
      // { path: 'medicos', component: MedicosComponent },
      // { path: 'reportes', component: ReportesComponent },
    ],
  },
];
