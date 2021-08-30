import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Cor } from 'src/app/core/model/cor/cor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddColorComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private service: BaseService<Cor>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
    service.type = 'cores';
  }

  ngOnInit(): void {
    this.service.type = 'cores';
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
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
          this.router.navigate(['/Compras/Fornecedores/grupo'], { relativeTo: this.route })
        },
        (err) => {
          this.alert.error("Ops... Aconteceu um probleminha!");
          this.loading = false
        });

  }

}
