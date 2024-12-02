import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuenaVenturaService } from '../../../../services/services';
import { ListadoIPERC } from '../../../models/models';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListadoComponent implements OnInit{
  listadoIPERC: ListadoIPERC[]=[]; // Inicializamos el array vacío

  // Inyectamos el servicio en el constructor
  constructor(private buenaVenturaService: BuenaVenturaService,private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log("HOLA");
    this.buenaVenturaService.getListadoIPERC().subscribe(
      {
        next:data=>{
          this.listadoIPERC=data;
          console.log(this.listadoIPERC);
        }
      }
    );
    this.cd.detectChanges();
  }


  

  // Función para obtener el listado desde el servicio
}
