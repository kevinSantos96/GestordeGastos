import React from 'react';
import {View, StyleSheet, TouchableHighlight, Text, Alert} from 'react-native';
import {formatearFecha} from '../helpers/formatDate';
import {formatMoney} from '../helpers/formatoMoneda';
import {useNavigation} from '@react-navigation/native';

const PresupuestoList = ({item}) => {
  const navigation = useNavigation();
  const {id, presupuesto, fechaDeInicio, fechaDeFinal, nombre} = item;

  const informacion = {
    id,
    ...item,
  };

  const handlePress = () => {
    navigation.navigate('detallePresupuesto', informacion);
  };

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor="transparent"
        onPress={handlePress}>
        <View style={styles.containerCardSalon}>
          <View>
            <Text style={styles.label}>{nombre}</Text>
          </View>
          <View>
            <Text style={styles.cantidad}>
              Cantidad: {formatMoney(presupuesto)}
            </Text>
          </View>
          <View>
            <Text style={styles.fecha}>{formatearFecha(fechaDeInicio)}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
    height: 90,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cantidad: {
    color: '#575958',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 30,
    marginTop: 3,
  },
  fecha: {
    color: '#7E8280',
    fontSize: 12,
    marginLeft: 30,
    marginTop: 2,
  },
  label: {
    marginTop: 5,
    color: '#4E616B',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PresupuestoList;
