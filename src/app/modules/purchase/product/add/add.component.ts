import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Cor } from 'src/app/core/model/cor/cor';
import { Fornecedor } from 'src/app/core/model/fornecedor/fornecedor';
import { GrupoProduto } from 'src/app/core/model/grupoProduto/grupo-produto';
import { Produto } from 'src/app/core/model/produto/produto';
import { TipoProduto } from 'src/app/core/model/tipoProduto/tipo-produto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddProductComponent implements OnInit {

  list1: TipoProduto[] = [];
  list2: GrupoProduto[] = [];
  list3: Fornecedor[] = [];
  list4: Cor[] = [];
  list5 = [{value : "MEDIO", mask : 'VALOR MÉDIO'},{value : "MENOR_VALOR", mask : 'MENOR VALOR'},{value : "MAIOR_VALOR", mask : 'MAIOR VALOR'}];
  list6=['MULTIPLICAR', 'DIVIDIR', 'SOMAR', 'SUBTRAIR'];
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private service: BaseService<Produto>,
    private tipoService: BaseService<TipoProduto>,
    private groupService: BaseService<GrupoProduto>,
    private fornecedorService : BaseService<Fornecedor>,
    private corService : BaseService<Cor>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
    service.type = 'produtos';
    tipoService.type = 'tipos-produtos';
    groupService.type = 'grupos-produtos';
    fornecedorService.type = 'fornecedores';
    corService.type = 'cores';
  }

  ngOnInit(): void {

    if (this.list1.length === 0) {
      this.tipoService.type = 'tipos-produtos';
      this.tipoService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list1 = res
        },
        (err) => { });
    }

    if (this.list2.length === 0) {
      this.groupService.type = 'grupos-produtos';
      this.groupService.getAll()?.pipe(first()).subscribe(
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
    console.log(this.route.snapshot);

    //if(this.route.snapshot.url[1].path === 'edit'){
    //}

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      unidadeMedida: ['', Validators.required],
      unidadeMedidaTwo: ['', Validators.required],
      conversoAbudade: [null],
      fatorConversor: [''],
      codigoBarrasFornecedor: [''],
      codigoBarras: ['', Validators.required],
      peso: ['', Validators.required],
      altura: ['', Validators.required],
      largura: ['', Validators.required],
      quantidadeMax: [''],
      quantidadeMin: [''],
      pontoPedido: [''],
      loteEconomico: [''],
      dataUltimaCompra: [''],
      tipoProduto: [null, Validators.required],
      grupoProduto: [null, Validators.required],
      calculoValor:  [null, Validators.required],
      valor: [''],
      fornecedores: [null, Validators.required],
      cores:[null, Validators.required]
    });

    console.log((this.form.controls));

    if (!this.isAddMode) {
      this.service.type = 'produtos';
      this.service.getbyId(Number(this.id))
        ?.pipe(first())
        .subscribe((x: any) => this.form.patchValue(x));
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

  get g() {
    const fg = this.f.endereco as FormGroup;
    return fg.controls;
  }

  private create() {
    this.service.type = 'produtos';
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
    this.service.type = 'produtos';
    this.service.update(this.form.value, Number(this.id))
      ?.pipe(first())
      .subscribe(
        (res) => {
          this.alert.success("Item Atualizado com sucesso!");
          this.router.navigate(['/Compras/Fornecedores'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        });

  }

}
