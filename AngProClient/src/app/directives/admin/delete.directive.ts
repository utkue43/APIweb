import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/models/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog : MatDialog
  ) { 
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 20;
    img.heigth = 20;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id : string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
        this.openDialog(async ()=>{
        const td : HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          fullEndPoint : `https:/localhost:7178/delete/` + this.id
         
        }, this.id).subscribe(data => $(td.parentElement).fadeOut(2000, ()=>{
          this.callback.emit();
        }));
        ;
  })
  }

  openDialog(afterClosed : any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes)
        afterClosed();
      
      
      }
    );

}
}
