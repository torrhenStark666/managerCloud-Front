import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { GrupoProduto } from 'src/app/core/model/grupoProduto/grupo-produto';
import { Usuario } from 'src/app/core/model/login/usuario';
import { Solicitante } from 'src/app/core/model/solicitante/solicitante';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { SolicitanteService } from 'src/app/shared/services/solicitante.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-add-requester',
  templateUrl: './add-requester.component.html',
  styleUrls: ['./add-requester.component.css']
})
export class AddRequesterComponent implements OnInit, OnDestroy {


  list1 : GrupoProduto[] = [];
  list2 : Usuario[] = [];

  subscriptionListUser! : Subscription;

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private service: SolicitanteService,
    private grupoProdutoService : BaseService<GrupoProduto>,
    private usuarioService : UsuarioService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
  }

  ngOnDestroy() : void{
    this.subscriptionListUser.unsubscribe();
  }

  ngOnInit(): void {

    this.grupoProdutoService.type = 'grupos-produtos';
    this.grupoProdutoService.getAll()?.pipe(first()).subscribe( (res) =>{
      this.list1 = res
    }, (err) => {});

    this.subscriptionListUser =
    this.usuarioService.login.subscribe( (res) =>{
      this.list2 = res
    }, (err) => {});

    this.usuarioService.getAll();

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      dataInicio: ['', Validators.required],
      dataFim : ['', Validators.required],
      limiteInicial : [''],
      limiteFinal: [''],
      valorDisponivel : [''],
      nivel : ['', Validators.required],
      grupoProduto : [null, Validators.required],
      login : [null, Validators.required],
      ativo: [true, Validators.required],
    });

    if (!this.isAddMode) {
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

    this.loading = true;
    if (this.isAddMode) {
      this.create();
    } else {
      this.update();
    }
  }

  get f() { return this.form.controls; }

  private create() {
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
    this.service.update(this.form.value, Number(this.id))
      ?.pipe(first())
      .subscribe(
        (res) => {
          this.alert.success("Item Atualizado com sucesso!");
          this.router.navigate(['/Compras/Solicitantes'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        });

  }

}
