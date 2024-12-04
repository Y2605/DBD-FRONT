import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { BuenaVenturaService } from '../../../../services/services';
import { ActivatedRoute } from '@angular/router';
import { Empleado, Informe } from '../../../models/models';
import { DatePipe } from '@angular/common'; // Importar DatePipe para el formateo de fecha

@Component({
  selector: 'app-identificacion',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
  providers: [DatePipe]  // Añadir DatePipe como proveedor
})
export class IdentificacionComponent implements OnInit {
  id_proceso: number | null = null;
  empDataBoxesQuant: number = 0; // Cantidad de casillas de empleados
  cantEmpleados: number = 4; // Cantidad máxima de empleados
  listaEmpleados!: Empleado[];
  equipoEvaluador: Empleado[] = [];
  proceso: string = '';
  unidadMinera: string = '';
  fecha: string = ''; // Fechaen formato 'yyyy-mm-dd'
  area: string = '';

  constructor(
    private service: BuenaVenturaService,
    private route: ActivatedRoute,
    private datePipe: DatePipe // Inyectar DatePipe
  ) {}

  ngOnInit(): void {
    const idProcesoStr = this.route.snapshot.paramMap.get('id_proceso');
    this.id_proceso = idProcesoStr ? parseInt(idProcesoStr, 10) : null;  // Usamos parseInt para convertir a número
    this.loadEmpleados();

    if (this.id_proceso) {
      this.service.getInforme(this.id_proceso).subscribe({
        next: (data: Informe) => {
          this.proceso = data.proceso;
          this.area = data.area;
          this.fecha = this.formatearFecha(data.fechaRegistro); // Formatear la fecha
          this.unidadMinera = data.unidadMinera;
          this.equipoEvaluador = data.equipoEvaluador;
        },
        error: (err) => {
          console.error('Error al obtener informe:', err);
        }
      });
    }
  }

  // Función para formatear la fecha recibida 'dd/mm/yyyy' a un objeto Date
  formatearFecha(fecha: string): string {
    const [day, month, year] = fecha.split('/'); // Dividimos la fecha en partes
    return `${year}-${month}-${day}`; // Creamos un objeto Date con formato 'yyyy-mm-dd'
  }

  loadEmpleados(): void {
    this.service.getEmpleados(null).subscribe({
      next: (data: Empleado[]) => {
        this.listaEmpleados = data; // Asignar directamente la lista de empleados
      },
      error: (err) => {
        console.error('Error al obtener los empleados:', err);
      }
    });
  }

  agregarEmpleado(): void {
    if (this.listaEmpleados.length > this.equipoEvaluador.length) {
      // Agregar un nuevo objeto vacío para la nueva casilla
      this.equipoEvaluador.push({ id_empleado: 0, nombre: '' });
    }
  }
  
  seleccionarEmpleado(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const empleadoSeleccionado = selectElement.value;
  
    // Comprobar si ya el empleado está seleccionado
    const empleadoExistente = this.equipoEvaluador.some(empleado => empleado.id_empleado === parseInt(empleadoSeleccionado,10));
  
    if (!empleadoExistente && empleadoSeleccionado !== '') {
      // Buscar el empleado completo en la lista de empleados
      const empleado = this.listaEmpleados.find(emp => emp.id_empleado === parseInt(empleadoSeleccionado,10));
  
      if (empleado) {
        // Actualizar el equipoEvaluador con el empleado completo
        this.equipoEvaluador[index] = empleado;
      }
    } else {
      alert('El empleado ya está seleccionado o no es válido. Por favor, elige otro.');
      selectElement.value = ''; // Reiniciar el select si el valor ya existe
    }
  }
  
  eliminarEmpleado(index: number): void {
    // Eliminar el empleado de la lista del equipo
    this.equipoEvaluador.splice(index, 1);
  }
  

  submitForm(): void {
    const formData = {
      equipoEvaluador: this.equipoEvaluador,
      proceso: this.proceso,
      unidadMinera: this.unidadMinera,
      fecha: this.fecha,
      area: this.area,
    };
    console.log('Formulario enviado:', formData);
  }

  isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }
    if (typeof value === "string") {
      return value.trim().length === 0;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    if (typeof value === "object") {
      return Object.keys(value).length === 0;
    }
    return false;
  }
}
