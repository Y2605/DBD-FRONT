import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuenaVenturaService } from '../../../../services/services';
import { ListadoIPERC } from '../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  listadoIPERC: ListadoIPERC[]=[]; // Inicializamos el array vacío

  // Inyectamos el servicio en el constructor
  constructor(private buenaVenturaService: BuenaVenturaService,private router:Router) {
  }

  ngOnInit(): void {
    this.buenaVenturaService.getListadoIPERC().subscribe(
      {
        next:data=>{
          this.listadoIPERC=data;
        }
      }
    );
  }

  editarProceso(id_proceso:number){
    console.log("moviendose")
    this.router.navigate(['/identificacion/'+`${id_proceso}`]);
  }

  

  // Función para obtener el listado desde el servicio
}
