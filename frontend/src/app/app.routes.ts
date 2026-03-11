import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Layout } from './shared/layout/layout';
import { CitasComponent } from './features/citas/pages/citas-component/citas-component';
import { CrearCita } from './features/citas/pages/crear-cita/crear-cita';
import { EditarCita } from './features/citas/pages/editar-cita/editar-cita';
import { authGuard } from './shared/guards/auth-guard';
import { Login } from './features/login/pages/login/login';
import { UsuariosComponent } from './features/usuarios/pages/usuarios-component/usuarios';
import { CrearUsuario } from './features/usuarios/pages/crear-usuario/crear-usuario';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      // { path: 'pacientes', component: PacientesComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'citas/crear', component: CrearCita },
      { path: 'citas/editar/:id', component: EditarCita },
      // { path: 'medicos', component: MedicosComponent },
      // { path: 'reportes', component: ReportesComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/crear', component: CrearUsuario },
    ],
  },

  // { path: '**', redirectTo: 'login' },
];
