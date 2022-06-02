export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return fechaNueva.toLocaleDateString('es-Es', opciones);
};

export const dateFormatShort = fecha => {
  const options = {
    dateStyle: 'short',
  };
  return Intl.DateTimeFormat('es-MX', options).format(fecha);
};
