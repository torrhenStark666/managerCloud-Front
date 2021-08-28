import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/core/model/empresa/empresa';
import { Endereco } from 'src/app/core/model/endereco/endereco';
import { Usuario } from 'src/app/core/model/login/usuario';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading     : boolean   = false;
  erro        : String | null   = null;
  step        : number    = 1;
  rate        : string    = "1%";
  confirmPas  : string    = '';
  endereco    : Endereco  = new Endereco();
  empresa     : Empresa   = new Empresa();
  usuario     : Usuario   = new Usuario();


  constructor(
    private authentication: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.erro = null;
    this.step = 1;
    this.rate = "1%";
    this.confirmPas = '';
    this.endereco = new Endereco();
    this.empresa = new Empresa();
    this.usuario = new Usuario();
  }

  validateStepOne() : boolean{

    if(this.empresa.cnpj.length !== 18){
      this.erro = "CNPJ invalido"
      return false;
    }

    if(!this.empresa.incricaoEstadual || this.empresa.incricaoEstadual.length === 0){
      this.erro = "Inscrição Estadual não preenchida"
      return false;
    }

    if(!this.empresa.nomeFantasia || this.empresa.nomeFantasia.length === 0){
      this.erro = "Nome Fantasia não preenchido"
      return false;
    }

    if(!this.empresa.razaoSocial || this.empresa.razaoSocial.length === 0){
      this.erro = "Razão Social não preenchida"
      return false;
    }

    return true;
  }

  validateStepTwo() : boolean{

    if(!this.endereco.endereco || this.endereco.endereco.length === 0){
      this.erro = "Endereço não preenchido"
      return false;
    }

    if(!this.endereco.numero || this.endereco.numero === 0){
      this.erro = "Número não preenchido"
      return false;
    }

    if(!this.endereco.bairro || this.endereco.bairro.length === 0){
      this.erro = "Bairro não preenchido"
      return false;
    }

    if(!this.endereco.cep || this.endereco.cep === 0){
      this.erro = "CEP não preenchido"
      return false;
    }

    if(!this.endereco.estado || this.endereco.estado.length === 0){
      this.erro = "Estado não preenchido"
      return false;
    }

    return true;
  }

  validateStepTree() : boolean{

    if(!this.usuario.login || this.usuario.login.length === 0){
      this.erro = "Nome de usuário não preenchido"
      return false;
    }

    if(!this.usuario.senha || this.usuario.senha.length === 0){
      this.erro = "Senha não preenchida"
      return false;
    }

    if(this.usuario.senha.length < 6){
      this.erro = "A senha deve ter pelo menos 6 digitos"
      return false;
    }

    if(!this.confirmPas || this.confirmPas.length === 0){
      this.erro = "Confirmar a senha por favor."
      return false;
    }

    if(this.confirmPas !== this.usuario.senha){
      this.erro = "As senhas não correspondem"
      return false;
    }

    return true;
  }

  sendNewCompanyAndUser(){
    this.empresa.endereco = this.endereco;
    this.usuario.empresa = this.empresa;
    this.authentication.cadastrar(this.usuario).subscribe( res =>{
      this.router.navigate(['/Authentication']);
    }, err =>{
      this.erro = err
      this.loading = false
    })
  }

  nextStep(){

    this.erro = null

    if(this.step === 1){
      if(!this.validateStepOne())
        return;
      else
        this.rate = '33%';
    }else if(this.step === 2){
      if(!this.validateStepTwo())
        return;
      else
        this.rate = '66%';
    }else if(this.step === 3){

      this.loading = true
      if(!this.validateStepTree()){
        this.loading = false
        return;
      }else{
        this.sendNewCompanyAndUser()
        this.rate = '100%';
      }
    }

    if(this.step < 4){
      this.step++;
    }

  }

  backStep(){
    this.step--;

    if(this.step === 1)
      this.rate = '1%';
    if(this.step === 2)
      this.rate = '33%'
    if(this.step === 3)
      this.rate = '66%'
  }

}
