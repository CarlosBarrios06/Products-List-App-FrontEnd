import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';



@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {
productos: any = [];
isEditMode: boolean = false;
producto: Producto;
  constructor(private api: ProductoService,private notification: ToastrService) { }

  ngOnInit(): void {
    this.api.cargarDatos().subscribe((res:any) => {
      console.log(res);
      this.productos = res;
    }, error => {
      console.log('algo salio mal')
    })
  }

  deleteProducto(producto: any) {

    console.log(producto._id)
    this.api.deleteProducto(producto._id)
      .subscribe(res => {
        this.notification.warning("employee deleted succefull");
        this.cargarData()
      }, error => {
        this.notification.warning('error to delete product')
      })
  }

  cargarData(){
    this.api.cargarDatos().subscribe((res:any) => {
      this.productos = res
    })
  }

}
