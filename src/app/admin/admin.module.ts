import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/components/login-page.component';
import { AddPageComponent } from './add-page/components/add-page.component';
import { DashboardPageComponent } from './dashboard-page/components/dashboard-page.component';
import { EditPageComponent } from './edit-page/components/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { AuthGuardService } from "../shared/services/auth-guard.service";
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService]},
          {path: 'add', component: AddPageComponent,  canActivate: [AuthGuardService]},
          {path: 'orders', component: OrdersPageComponent,  canActivate: [AuthGuardService]},
          {path: 'product/:id/edit', component: EditPageComponent,  canActivate: [AuthGuardService]}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule {

}
