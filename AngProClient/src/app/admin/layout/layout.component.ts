import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../services/admin/alertify.service';
declare var alertify: any;


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor(private alertify : AlertifyService){}
  

  ngOnInit(): void{
  
  } 
  
  
   

}
