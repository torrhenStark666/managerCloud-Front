import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CondicaoPagamento } from 'src/app/core/model/condicaoPagamento/condicao-pagamento';
import { Cor } from 'src/app/core/model/cor/cor';
import { FormaPagamento } from 'src/app/core/model/formaPagamento/forma-pagamento';
import { Fornecedor } from 'src/app/core/model/fornecedor/fornecedor';
import { ItemPedidoCompra } from 'src/app/core/model/ItemPedidoCompra/item-pedido-compra';
import { Liberador } from 'src/app/core/model/liberador/liberador';
import { PedidoCompra, SituacaoCompra } from 'src/app/core/model/pedidoCompra/pedido-compra';
import { Produto } from 'src/app/core/model/produto/produto';
import { Solicitante } from 'src/app/core/model/solicitante/solicitante';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LiberadorService } from 'src/app/shared/services/liberador.service';
import { SolicitanteService } from 'src/app/shared/services/solicitante.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  list1: FormaPagamento[] = [];
  list2: CondicaoPagamento[] = [];
  list3: Fornecedor[] = [];
  list4: Cor[] = [];
  list5: Produto[] = [];
  list6 = [{value : "c", mask : 'CIF'},{value : "f", mask : 'FOB'}];

  liberador! : Liberador;
  solicitante! : Solicitante;

  valorTotal = 0.0;
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private service: BaseService<PedidoCompra>,
    private produtoService: BaseService<Produto>,
    private formPagamentoService: BaseService<FormaPagamento>,
    private condicaoPagamentoService: BaseService<CondicaoPagamento>,
    private fornecedorService : BaseService<Fornecedor>,
    private corService : BaseService<Cor>,
    private solicitanteService : SolicitanteService,
    private liberadorService : LiberadorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
    service.type = 'pedido-compras';
    produtoService.type = 'produtos';
    formPagamentoService.type = 'formas-pagamentos';
    condicaoPagamentoService.type = 'condicao-pagamentos';
    fornecedorService.type = 'fornecedores';
    corService.type = 'cores';

    this.solicitanteService.solicitante.subscribe(data => {
      this.solicitante = data;
    });
    this.liberadorService.liberador.subscribe(data => {
      this.liberador = data;
    });
  }

  ngOnInit(): void {

    if (this.list1.length === 0) {
      this.formPagamentoService.type = 'formas-pagamentos';
      this.formPagamentoService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list1 = res
        },
        (err) => { });
    }

    if (this.list2.length === 0) {
      this.condicaoPagamentoService.type = 'condicao-pagamentos';
      this.condicaoPagamentoService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list2 = res
        },
        (err) => { });
    }

    if (this.list3.length === 0) {
      this.fornecedorService.type = 'fornecedores';
      this.fornecedorService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list3 = res
        },
        (err) => { });
    }

    if (this.list4.length === 0) {
      this.corService.type = 'cores';
      this.corService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list4 = res
        },
        (err) => { });
    }

    if(this.list5.length === 0){
      this.produtoService.type = 'produtos';
      this.produtoService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list5 = res
        },
        (err) => { });
    }

    console.log(this.route.snapshot);

    //if(this.route.snapshot.url[1].path === 'edit'){
    //}

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      formaPagamento: [null, Validators.required],
      condicaoPagamento: [null, Validators.required],
      fornecedor: [null, Validators.required],
      solicitante: [this.solicitante, Validators.required],
      dataSolicitacao: [new Date(), Validators.required],
      dataPrevistaEntrega : ['', Validators.required],
      sifFob: [null, Validators.required],
      valorFrete : ['0', Validators.required],
      valorTotal : ['', Validators.required],
      situacao : [SituacaoCompra.SOLICITADO],
      itensPedidoCompra: this.formBuilder.array([], Validators.required)
    });

    console.log((this.form.controls));

    if (!this.isAddMode) {
      this.service.type = 'pedido-compras';
      this.service.getbyId(Number(this.id))
        ?.pipe(first())
        .subscribe((x: any) => this.form.patchValue(x));
    }

  }

  addItem(){
    this.itensPedido.push(this.createItem());
  }

  removeItem(){
    this.itensPedido.removeAt(this.itensPedido.length - 1);
  }

  createItem(item?: ItemPedidoCompra): FormGroup {
    if (item) {
      return this.formBuilder.group({
        produto : [item.produto, Validators.required],
        cor : [item.cor],
        solicitante : [item.solicitante],
        liberador : [item.liberador],
        nivel : [item.nivel],
        situacao : [item.situacao],
        quantidade : [item.quantidade, Validators.required],
        valor : [item.valor, Validators.required]
      });
    } else {
      return this.formBuilder.group({
        produto : [null, Validators.required],
        cor : [{ disabled: true, value: null }],
        solicitante : [this.solicitante],
        liberador : [null],
        nivel : [this.solicitante?.nivel],
        situacao : [SituacaoCompra.SOLICITADO],
        quantidade : [{ disabled: true, value: 0 },Validators.required],
        valor : [{ disabled: true, value: 0 },Validators.required]
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.alert.clear();

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value));
    this.loading = true;
    if (this.isAddMode) {
      this.create();
    } else {
      this.update();
    }
  }

  get f() { return this.form.controls; }

  get itensPedido() { return this.form.get('itensPedidoCompra') as FormArray; }

  itemPedido(i : number){
    const fg = this.itensPedido.at(i) as FormGroup;
    return fg.controls;
  }

  productselected(index ?: number){
    this.list4 = this.itensPedido.at(index!).get('produto')?.value.cores as Cor[];
    this.itensPedido.at(index!).get('cor')?.enable();
    this.itensPedido.at(index!).get('quantidade')?.enable();
    this.itensPedido.at(index!).get('valor')?.enable();
  }

  calcularTotal(index ?: number) {
    this.valorTotal = 0.0;
    let valorTotal = 0.0;

    this.f.itensPedidoCompra.value.forEach( (currentValue : any) => {
      valorTotal += currentValue.quantidade * currentValue.valor;
    });
    this.valorTotal = valorTotal;
    this.form.get('valorTotal')?.setValue(valorTotal);
    console.log(this.form);
  }

  private create() {
    this.service.type = 'pedido-compras';
    this.service.save(this.form.value)
      ?.pipe(first())
      .subscribe(
        (res) => {
          this.alert.success("Item adicionado com sucesso!");
          this.router.navigate(['../'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        }
      )
  }

  private update() {
    this.service.type = 'pedido-compras';
    this.service.update(this.form.value, Number(this.id))
      ?.pipe(first())
      .subscribe(
        (res) => {
          this.alert.success("Item Atualizado com sucesso!");
          this.router.navigate(['/Compras/'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        });
  }


}
