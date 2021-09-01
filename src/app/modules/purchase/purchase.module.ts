import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductSubGroupComponent } from './product-sub-group/product-sub-group.component';
import { ProviderTypeComponent } from './provider-type/provider-type.component';
import { ProviderGroupComponent } from './provider-group/provider-group.component';
import { ProviderComponent } from './provider/provider.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { FormPayComponent } from './form-pay/form-pay.component';
import { TermPayComponent } from './term-pay/term-pay.component';
import { AddTypeProductComponent } from './product-type/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGroupProductComponent } from './product-group/add/add.component';
import { AddSubgroupProductComponent } from './product-sub-group/add/add.component';
import { NgSearchPipe } from 'ng-search-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProviderComponent } from './provider/add/add.component';
import { AddGroupProviderComponent } from './provider-group/add/add.component';
import { AddTypeProviderComponent } from './provider-type/add/add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddProductComponent } from './product/add/add.component';
import { ColorComponent } from './color/color.component';
import { AddColorComponent } from './color/add/add.component';
import { NoRecordsFoundComponent } from 'src/app/shared/components/no-records-found/no-records-found.component';
import { AddFormPayComponent } from './form-pay/add/add.component';
import { AddTermPayComponent } from './term-pay/add/add.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { RequesterComponent } from './requester/requester.component';
import { ReleaserComponent } from './releaser/releaser.component';
import { AddReleaserComponent } from './releaser/add-releaser/add-releaser.component';
import { AddRequesterComponent } from './requester/add-requester/add-requester.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ProductGroupComponent,
    ProductTypeComponent,
    ProductSubGroupComponent,
    ProviderTypeComponent,
    ProviderGroupComponent,
    ProviderComponent,
    ProductComponent,
    OrderComponent,
    FormPayComponent,
    TermPayComponent,
    AddTypeProductComponent,
    AddGroupProductComponent,
    AddSubgroupProductComponent,
    AddProviderComponent,
    AddGroupProviderComponent,
    AddTypeProviderComponent,
    AddProductComponent,
    ColorComponent,
    AddColorComponent,
    NoRecordsFoundComponent,
    AddFormPayComponent,
    AddTermPayComponent,
    AddOrderComponent,
    RequesterComponent,
    ReleaserComponent,
    AddReleaserComponent,
    AddRequesterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PurchaseRoutingModule,
    NgSearchPipe,
    NgxPaginationModule,
    NgSelectModule,
    ChartsModule
  ]
})
export class PurchaseModule { }
