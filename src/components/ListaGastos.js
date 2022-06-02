import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatMoney} from '../helpers/formatoMoneda';
import {formatearFecha} from '../helpers/formatDate';

const ListaGastos = ({gastos}) => {
  return (
    <View>
      <View style={styles.containerCardSalon}>
        <Text
          style={{
            color: '#000',
            fontSize: 15,
            fontWeight: '600',
            marginLeft: 12,
            marginTop: 3,
          }}>
          {gastos.nombre}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.cantidad}>{formatMoney(gastos.cantidad)}</Text>
          <Text style={styles.fecha}>{formatearFecha(gastos.fecha)} </Text>
        </View>
        {gastos.categoria === 'desayuno' ||
        gastos.categoria === 'almuerzo' ||
        gastos.categoria === 'cena' ? (
          <Text style={styles.contador}>
            Cantidad de platos: {gastos.contador}
          </Text>
        ) : null}
        {gastos.distancia > 0 && (
          <Text style={styles.contador}>
            Distancia recorrida en LPS: {gastos.distancia.toFixed(2)}
          </Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerCardSalon: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    height: 75,
    marginVertical: 7,
    marginHorizontal: 10,
  },
  cantidad: {
    color: '#575958',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    marginTop: 3,
    marginLeft: 20,
  },
  fecha: {
    color: '#575958',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  contador: {
    color: '#575958',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    marginLeft: 18,
    marginTop: 3,
  },
});

export default ListaGastos;
