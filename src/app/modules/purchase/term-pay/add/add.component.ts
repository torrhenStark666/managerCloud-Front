import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CondicaoPagamento } from 'src/app/core/model/condicaoPagamento/condicao-pagamento';
import { DiasParcelas } from 'src/app/core/model/diasParcelas/dias-parcelas';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddTermPayComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private service: BaseService<CondicaoPagamento>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
    service.type = 'condicao-pagamentos';
  }

  ngOnInit(): void {
    console.log(this.route.snapshot);

    //if(this.route.snapshot.url[1].path === 'edit'){
    //}

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      quantidadeVezes: ['', Validators.required],
      juros: ['', Validators.required],
      desconto: ['', Validators.required],
      diasParcelas: this.formBuilder.array(
        [],[Validators.required])
    });

    if (!this.isAddMode) {
      this.service.type = 'condicao-pagamentos';
      this.service.getbyId(Number(this.id))
        ?.pipe(first())
        .subscribe((x: any) => {
          this.form.patchValue(x)
          for(let i in x.diasParcelas){
            this.diasParcelas.push(this.formBuilder.group({
              diasParcelas : [x.diasParcelas[i].diasParcelas, Validators.required]
            }));
          }
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

  get diasParcelas() { return this.form.get('diasParcelas') as FormArray; }

  addRmCampo(){
    const quantidadeVezes = this.form.get('quantidadeVezes') as FormControl;

    if(quantidadeVezes.value > this.diasParcelas.length){
      while(quantidadeVezes.value != this.diasParcelas.length){
        this.addDiasParcelas();
      }
    }

    if(quantidadeVezes.value < this.diasParcelas.length){
      while(quantidadeVezes.value != this.diasParcelas.length){
        this.rmDiasParcelas();
      }
    }

  }

  addDiasParcelas(){
    this.diasParcelas.push(this.formBuilder.group({
      diasParcelas : ['', Validators.required]
    }));
  }

  rmDiasParcelas(){
    this.diasParcelas.removeAt(this.diasParcelas.length - 1);
  }

  private create() {
    this.service.type = 'condicao-pagamentos';
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
    this.service.type = 'condicao-pagamentos';
    this.service.update(this.form.value, Number(this.id))
      ?.pipe(first())
      .subscribe(
        (res) => {
          this.alert.success("Item Atualizado com sucesso!");
          this.router.navigate(['/Compras/Pagamentos/term'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        });

  }


}
