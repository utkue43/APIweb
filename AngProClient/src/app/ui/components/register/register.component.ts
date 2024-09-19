import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder){}
  
frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      userName:["",[Validators.required, 
        Validators.maxLength(30), 
        Validators.minLength(5)]],
      eMail:["",[Validators.required, 
        Validators.maxLength(60), 
        Validators.minLength(10)],
        Validators.email],
      passWord:["",[Validators.required]],
      passWord2:["", [Validators.required]]

    },
      {validators:(group: AbstractControl) : ValidationErrors | null =>{
        let passWord = group.get("passWord").value;
        let passWord2= group.get("passWord2").value; 
        return passWord===passWord2 ? null :{notSame: true};
      }})    
  }

    get component(){
      return this.frm.controls;
    }

  submitted: boolean=false;  
  onSubmit(data:User){
    this.submitted=true;
    if(this.frm.invalid)
      return;
  }


}
