import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  productos: Producto[] = []; 
  id: string;
  titulo: string = 'Crear un nuevo Producto'

  constructor(private pf: FormBuilder, private router: Router,
    private notification: ToastrService, private api: ProductoService, private route: ActivatedRoute) {
    this.productoForm = this.pf.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.max(1000)]]
    })
    this.id = this.route.snapshot.paramMap.get('id')!
    console.log(this.id)
  }

  ngOnInit(): void {
    this.isEdit()
  }
  agregarProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    

    if(this.id !== null){

      console.log(this.id)
      this.api.updateProducto(PRODUCTO, this.id).subscribe(data=> {
        console.log(data)
        this.notification.info("El producto ha sido editado con exito", "producto actualizado")
        this.router.navigate(['/'])
      }, error => {
        console.log('algo salio mal')
        this.productoForm.reset();
        
      })
    }else{
      

      console.log(PRODUCTO);
    this.productos.push(PRODUCTO);
    this.api.postProductos(PRODUCTO).subscribe((res) => {
      console.log(res);
      this.productoForm.reset();
      this.notification.success('Registro satisfactorio', 'producto añadido con exito!!!')
      this.router.navigate(['/'])
    }, error => {
      console.log('algo salio mal')
      this.productoForm.reset();
    })
    }

    


  }

  isEdit() {
    console.log(this.id)
    if(this.id !== null) {
      this.titulo = 'Editar Producto';
      console.log(this.id)
      console.log(this.productos)
     this.api.obtenerProducto(this.id).subscribe((res) => {
      
      
       this.productoForm.setValue({
         nombre: res.nombre,
         categoria: res.categoria,
         ubicacion: res.ubicacion,
         precio: res.precio
       })
     })
      // let object = this.productos.filter((producto: { _id: any; }) => {
      //   return producto._id === this.id;
      // })


    }
  }

}



