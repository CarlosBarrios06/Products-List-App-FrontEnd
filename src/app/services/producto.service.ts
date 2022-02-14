import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  @Output() emitter: EventEmitter <{}> = new EventEmitter<{}>()
 private api = `${environment.api}`

  constructor(private http: HttpClient) { }

  cargarDatos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.api}productos`);
  }

  postProductos(data: any){
    return this.http.post<any>(`${this.api}productos/crear`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateProducto(data: Producto, id:string ):Observable<any>{
    return this.http.put<any>(`${this.api}productos/`+id, data)
    
  }

  deleteProducto(id: any){
    return this.http.delete<any>(`${this.api}productos/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

obtenerProducto(id: string): Observable<any>{
 return this.http.get(`${this.api}productos/`+id);
}

}
