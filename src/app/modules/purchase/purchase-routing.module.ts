import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChildGuard } from 'src/app/core/guards/auth-child.guard';
import { FormPayComponent } from './form-pay/form-pay.component';
import { OrderComponent } from './order/order.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductSubGroupComponent } from './product-sub-group/product-sub-group.component';
import { AddTypeProductComponent } from './product-type/add/add.component';
import { AddGroupProductComponent } from './product-group/add/add.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductComponent } from './product/product.component';
import { ProviderGroupComponent } from './provider-group/provider-group.component';
import { ProviderTypeComponent } from './provider-type/provider-type.component';
import { ProviderComponent } from './provider/provider.component';
import { TermPayComponent } from './term-pay/term-pay.component';
import { AddSubgroupProductComponent } from './product-sub-group/add/add.component';
import { AddTypeProviderComponent } from './provider-type/add/add.component';
import { AddGroupProviderComponent } from './provider-group/add/add.component';
import { AddProviderComponent } from './provider/add/add.component';
import { AddProductComponent } from './product/add/add.component';
import { AddColorComponent } from './color/add/add.component';
import { ColorComponent } from './color/color.component';

const routes: Routes = [
  { path: '', canActivateChild: [AuthChildGuard], component: OrderComponent },
  { path: 'Produtos', canActivateChild: [AuthChildGuard], component: ProductComponent },
  { path: 'Produtos/add', canActivateChild: [AuthChildGuard], component: AddProductComponent },
  { path: 'Produtos/edit/:id', canActivateChild: [AuthChildGuard], component: AddProductComponent },
  { path: 'Produtos/cor', canActivateChild: [AuthChildGuard], component: ColorComponent },
  { path: 'Produtos/cor/add', canActivateChild: [AuthChildGuard], component: AddColorComponent },
  { path: 'Produtos/cor/edit/:id', canActivateChild: [AuthChildGuard], component: AddColorComponent },
  { path: 'Produtos/tipo', canActivateChild: [AuthChildGuard], component: ProductTypeComponent },
  { path: 'Produtos/tipo/add', canActivateChild: [AuthChildGuard], component: AddTypeProductComponent },
  { path: 'Produtos/tipo/edit/:id', canActivateChild: [AuthChildGuard], component: AddTypeProductComponent },
  { path: 'Produtos/grupo', canActivateChild: [AuthChildGuard], component: ProductGroupComponent },
  { path: 'Produtos/grupo/add', canActivateChild: [AuthChildGuard], component: AddGroupProductComponent },
  { path: 'Produtos/grupo/edit/:id', canActivateChild: [AuthChildGuard], component: AddGroupProductComponent },
  { path: 'Produtos/subgrupo', canActivateChild: [AuthChildGuard], component: ProductSubGroupComponent },
  { path: 'Produtos/grupo/add', canActivateChild: [AuthChildGuard], component: AddSubgroupProductComponent },
  { path: 'Produtos/grupo/edit/:id', canActivateChild: [AuthChildGuard], component: AddSubgroupProductComponent },
  { path: 'Fornecedores', canActivateChild: [AuthChildGuard], component: ProviderComponent },
  { path: 'Fornecedores/add', canActivateChild: [AuthChildGuard], component: AddProviderComponent },
  { path: 'Fornecedores/edit/:id', canActivateChild: [AuthChildGuard], component: AddProviderComponent },
  { path: 'Fornecedores/tipo', canActivateChild: [AuthChildGuard], component: ProviderTypeComponent },
  { path: 'Fornecedores/tipo/add', canActivateChild: [AuthChildGuard], component: AddTypeProviderComponent },
  { path: 'Fornecedores/tipo/edit/:id', canActivateChild: [AuthChildGuard], component: AddTypeProviderComponent },
  { path: 'Fornecedores/grupo', canActivateChild: [AuthChildGuard], component: ProviderGroupComponent },
  { path: 'Fornecedores/grupo/add', canActivateChild: [AuthChildGuard], component: AddGroupProviderComponent },
  { path: 'Fornecedores/grupo/edit/:id', canActivateChild: [AuthChildGuard], component: AddGroupProviderComponent },
  { path: 'Pagamento/forma', canActivateChild: [AuthChildGuard], component: FormPayComponent },
  { path: 'Pagamento/condicoes', canActivateChild: [AuthChildGuard], component: TermPayComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
