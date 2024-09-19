import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
constructor(private spinner: NgxSpinnerService){}

  showSpinner(spinnerNameType:SpinnerType){
    this.spinner.show(spinnerNameType);

    setTimeout(()=> this.hideSpinner(spinnerNameType), 1000);
  }

  hideSpinner(spinnerNameType:SpinnerType){
    this.spinner.hide(spinnerNameType);  

  }

}
export enum SpinnerType{
    BallAtom ="s2",
    BallScaleMultiple="s1",
    BallSpinClockwiseFadeRotating="s3"



}





