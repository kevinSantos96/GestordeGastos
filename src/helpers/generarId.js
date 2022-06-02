export const GenerarId = () => {
  const ramdom = Math.random().toString(36).substring(2, 11); //generar id de manera aleatoria
  const fecha = Date.now().toLocaleString(36);

  return ramdom + fecha;
};
