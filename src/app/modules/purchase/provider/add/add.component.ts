import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Endereco } from 'src/app/core/model/endereco/endereco';
import { Fornecedor } from 'src/app/core/model/fornecedor/fornecedor';
import { GrupoFornecedor } from 'src/app/core/model/grupoFornecedor/grupo-fornecedor';
import { TipoFornecedor } from 'src/app/core/model/tipoFornecedor/tipo-fornecedor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddProviderComponent implements OnInit {

  list1: TipoFornecedor[] = [];
  list2: GrupoFornecedor[] = [];
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private service: BaseService<Fornecedor>,
    private tipoService: BaseService<TipoFornecedor>,
    private groupService: BaseService<GrupoFornecedor>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
    service.type = 'fornecedores';
    tipoService.type = 'tipos-fornecedores';
    groupService.type = 'grupos-fornecedores';

  }

  ngOnInit(): void {

    if (this.list1.length === 0) {
      this.tipoService.type = 'tipos-fornecedores';
      this.tipoService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list1 = res
        },
        (err) => { });
    }

    if (this.list2.length === 0) {
      this.groupService.type = 'grupos-fornecedores';
      this.groupService.getAll()?.pipe(first()).subscribe(
        (res) => {
          this.list2 = res
        },
        (err) => { });
    }
    console.log(this.route.snapshot);

    //if(this.route.snapshot.url[1].path === 'edit'){
    //}

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      nomeFantasia: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      inscricaoEstadual: ['', Validators.required],
      cnpj: ['', Validators.required],
      telefoneFixo: ['', Validators.required],
      grupoFornecedor: [null, Validators.required],
      tipoFornecedor: [null, Validators.required],
      endereco: this.formBuilder.group({
        endereco: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cep: ['', Validators.required],
        municipio: ['', Validators.required],
        estado: ['', Validators.required]
      })

    });

    console.log((this.form.controls));

    if (!this.isAddMode) {
      this.service.type = 'fornecedores';
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
    this.service.type = 'fornecedores';
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
    this.service.type = 'fornecedores';
    this.service.update(this.form.value, Number(this.id))
      ?.pipe(first())
      .subscribe(
        (res) => {
          this.alert.success("Item Atualizado com sucesso!");
          this.router.navigate(['/Compras/Produtos'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        });

  }

}
