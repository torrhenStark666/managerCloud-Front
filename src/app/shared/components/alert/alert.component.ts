import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  private subscripition = new Subscription();
  public message: any;

  constructor(private alertService : AlertService) { }

  clear(){
    this.alertService.clear();
  }

  ngOnInit() {

    this.subscripition = this.alertService.getAlert()
      .subscribe( message =>{ switch(message && message.type){
        case 'sucess':
          message.cssClass = 'alert alert-success';
          break;
        case 'error':
          message.cssClass = 'alert alert-danger';
          break;
        }
        this.message = message;
      });
  }

  ngOnDestroy(){
    this.subscripition.unsubscribe();
  }

}
