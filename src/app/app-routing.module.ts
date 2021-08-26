import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'Authentication'   ,
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'Configuration'   ,
    loadChildren: () => import('./modules/config/config.module').then(m => m.ConfigModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**'              ,
    redirectTo: '/Authentication',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
