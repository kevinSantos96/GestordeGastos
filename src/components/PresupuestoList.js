import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {formatearFecha} from '../helpers/formatDate';
import {formatMoney} from '../helpers/formatoMoneda';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PresupuestoList = ({item}) => {
  const navigation = useNavigation();
  const [nuevoPresupuestos, setNuevoPresupuestos] = useState([]);
  const {id, presupuesto, fechaDeInicio, fechaDeFinal, nombre} = item;

  const informacion = {
    id,
    ...item,
  };

  const handlePress = () => {
    navigation.navigate('detallePresupuesto', informacion);
  };
  const handleDelete = () => {
    Alert.alert(
      'Desea eliminar el siguiente presupuesto?',
      `id del elemento: ${id}`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Si,Eliminar',
          onPress: () => {
            DeleteItemSelect(id);
          },
        },
      ],
    );
  };
  const DeleteItemSelect = async id => {
    try {
      const presupuestosStorage = await AsyncStorage.getItem('presupuestos');
      if (presupuestosStorage) {
        setNuevoPresupuestos(JSON.parse(presupuestosStorage));
      }
      if (nuevoPresupuestos.length > 0) {
        const presupuestoActualizado = nuevoPresupuestos.map(pres =>
          pres.id === id ? '' : pres,
        );
        await AsyncStorage.setItem(
          'presupuestos',
          JSON.stringify(presupuestoActualizado),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View>
      <View style={styles.containerCardSalon}>
        <TouchableHighlight
          activeOpacity={0.2}
          underlayColor="transparent"
          onPress={handlePress}>
          <View>
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
        <TouchableOpacity onPress={handleDelete}>
          <View style={styles.iconBtn}>
            <MaterialCommunityIcons
              name="trash-can"
              color="#FF2133"
              size={40}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerCardSalon: {
    flexDirection: 'row',
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
    justifyContent: 'space-between',
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
  iconBtn: {
    marginVertical: 20,
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
});

export default PresupuestoList;
