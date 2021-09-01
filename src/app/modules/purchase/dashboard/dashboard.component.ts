import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { first } from 'rxjs/operators';
import { PedidoCompra, SituacaoCompra } from 'src/app/core/model/pedidoCompra/pedido-compra';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  valSolicitado: number = 0.0;
  valLiberado: number = 0.0;
  valNegado: number = 0.0;
  valEntregue: number = 0.0;

  countSolicitado: number = 0;
  countLiberado: number = 0;
  countlNegado: number = 0;
  countEntregue: number = 0;

  public lineChartData: ChartDataSets[] = [
    { data: [10, 29, 15, 20], label: 'Liberado' },
    { data: [12, 13, 18, 30], label: 'Negado' },
  ];
  public lineChartLabels: Label[] = ['agosto', 'setembro', 'outubro', 'novembro'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType : ChartType = 'line';
  public lineChartPlugins = [];

  public pieChartLabels: Label[] = ['Solicitado', 'Liberado', 'Entregue', 'Negado'];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartData: SingleDataSet = [20 , 30, 10];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [{

  }];


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['agosto', 'setembro', 'outubro', 'novembro'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [10, 29, 15, 20], label: 'Solicitado' },
    { data: [15, 8, 5, 6], label: 'Liberado' },
    { data: [12, 13, 18, 30], label: 'Negado' },
    { data: [19, 7, 28, 8], label: 'Entregue' },
  ]

  constructor(
    private base : BaseService<PedidoCompra>
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.base.type="pedido-compras"
    this.base.getAll()?.pipe(first())
      .subscribe( (res) =>{
        res.forEach( (value) =>{
          console.log(value);
          if(value.situacao === SituacaoCompra.SOLICITADO){
            this.valSolicitado =this.valSolicitado+ value.valorTotal;
            this.countSolicitado= this.countSolicitado + 1;
          }
          if(value.situacao === SituacaoCompra.LIBERADO){
            this.valLiberado =this.valLiberado + value.valorTotal;
            this.countLiberado=this.countLiberado+1;
          }
          if(value.situacao === SituacaoCompra.NEGADO){
            this.valNegado = this.valNegado+ value.valorTotal;
            this.countlNegado=this.countlNegado+1;
          }
          if(value.situacao === SituacaoCompra.ENTREGUE){
            this.valEntregue = this.valEntregue + value.valorTotal;
            this.countEntregue=this.countEntregue+1;
          }
        });
        this.pieChartData = [this.countSolicitado, this.countLiberado, this.countlNegado, this.countEntregue ] ;

      },
      (err)=>{ });

  }

}
