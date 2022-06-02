import React from 'react';
import DatePicker from 'react-native-date-picker';

const DatePiker = ({open, setOpen, date, setDate, minDate}) => {
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      locale="es"
      mode="date"
      title="Selecciona una fecha"
      confirmText="Aceptar"
      cancelText="Cancelar"
      minimumDate={minDate}
      onConfirm={date => {
        setDate(date);
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    />
  );
};

export default DatePiker;
