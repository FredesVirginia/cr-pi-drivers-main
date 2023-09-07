function calcularEdad(fechaNacimiento) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimientoDate.getMonth();
  
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimientoDate.getDate())) {
      return edad - 1;
    }
  
    return edad;
  }

 

  export const edadMin = (a, b) => {
    const fechaNacimientoA = new Date(a.fechaNacimiento);
    const fechaNacimientoB = new Date(b.fechaNacimiento);
    const edadA = calcularEdad(fechaNacimientoA);
    const edadB = calcularEdad(fechaNacimientoB);
    return edadA - edadB;
  };
  
  export const edadMax = (a, b) => {
    const fechaNacimientoA = new Date(a.fechaNacimiento);
    const fechaNacimientoB = new Date(b.fechaNacimiento);
    const edadA = calcularEdad(fechaNacimientoA);
    const edadB = calcularEdad(fechaNacimientoB);
    return edadB - edadA;
  };

