import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { NgModule } from '@angular/core'; // Importar NgModule
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-identificacion',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent], // Declarar FormsModule y CommonModule aquí
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
})
export class IdentificacionComponent {
  empDataBoxesQuant: number = 0; // Cantidad actual de casillas para empleados
  cantEmpleados: number = 4; // Cantidad máxima de empleados
  listaEmpleados: string[] = ['Empleado 1', 'Empleado 2', 'Empleado 3', 'Empleado 4']; // Lista original de empleados
  equipoEvaluador: string[] = []; // Lista del equipo evaluador
  proceso: string = ''; // Proceso ingresado
  unidadMinera: string = ''; // Unidad minera ingresada
  fecha: string = ''; // Fecha ingresada
  area: string = ''; // Área ingresada

  /**
   * Agregar una nueva casilla para seleccionar un empleado, si hay disponibles.
   */
  agregarEmpleado() {
    if (this.listaEmpleados.length > this.equipoEvaluador.length) {
      this.equipoEvaluador.push(''); // Agrega una nueva casilla vacía
      this.empDataBoxesQuant++;
    }
    console.log(this.equipoEvaluador);
  }

  /**
   * Actualiza la lista de empleados seleccionados.
   * @param event - Evento del cambio en el select.
   * @param index - Índice de la casilla actual en el equipo evaluador.
   */
  seleccionarEmpleado(event: Event, index: number) {
    const selectElement = event.target as HTMLSelectElement;
    const empleadoSeleccionado = selectElement.value;

    // Validación para evitar duplicados
    if (!this.equipoEvaluador.includes(empleadoSeleccionado)) {
      this.equipoEvaluador[index] = empleadoSeleccionado; // Actualiza el empleado seleccionado
    } else {
      alert('El empleado ya está seleccionado. Por favor, elige otro.');
      selectElement.value = ''; // Reinicia el select si el valor ya existe
    }
    
  }

  /**
   * Actualiza la lista de empleados disponibles para excluir los ya seleccionados.
   */

  /**
   * Elimina un empleado del equipo evaluador y lo devuelve a la lista de disponibles.
   * @param index - Índice del empleado en el equipo evaluador.
   */
  eliminarEmpleado(index: number) {
    const empleadoEliminado = this.equipoEvaluador[index];
    if (empleadoEliminado) {
      this.equipoEvaluador.splice(index, 1); // Elimina al empleado de la lista
      this.empDataBoxesQuant--;
    }
  }

  /**
   * Envía el formulario con los datos ingresados y seleccionados.
   */
  submitForm() {
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
      return true; // Nulo o indefinido se considera vacío
    }
  
    if (typeof value === "string") {
      return value.trim().length === 0; // Cadenas vacías o solo con espacios
    }
  
    if (Array.isArray(value)) {
      return value.length === 0; // Arrays vacíos
    }
  
    if (typeof value === "object") {
      return Object.keys(value).length === 0; // Objetos sin propiedades
    }
  
    return false; // Otros tipos no se consideran vacíos
  }
  
}
