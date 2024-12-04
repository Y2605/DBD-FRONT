export interface ListadoIPERC {
    // Ajusta las propiedades según la estructura real del modelo
    id_proceso: number;
    proceso: string;
    ult_fecha_act: string;
    // Otros campos que tenga tu modelo ListadoIPERC
  }
  
  export interface Empleado {
    id_empleado: number;
    nombre: string;
  }

  export interface Informe {
    equipoEvaluador: Empleado[];
    proceso: string;
    unidadMinera: string;
    fechaRegistro: string;
    area: string;
  }