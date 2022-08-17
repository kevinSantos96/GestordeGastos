import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {formatMoney} from '../helpers/formatoMoneda';
import {formatearFecha} from '../helpers/formatDate';
import FormularioGasto from './FormularioGasto';

const ListaGastos = ({gastos}) => {
  const [openModal, setModal] = useState(false);
  const [gastoSelect, setGastoSelect] = useState([]);

  const handlePress = () => {
    setGastoSelect(gastos);
    setModal(true);
  };

  function handleGasto(gasto) {
    const {nombre, cantidad, categoria, descripcion} = gasto;

    if ([nombre, cantidad, categoria, descripcion].includes('')) {
      return Alert.alert('Advertencia', 'Rellene todos los campos', [
        {text: 'Aceptar'},
      ]);
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.containerCardSalon}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
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
              <Text style={styles.cantidad}>
                {formatMoney(gastos.cantidad)}
              </Text>
              <Text style={styles.fecha}>{formatearFecha(gastos.fecha)} </Text>
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

            <View>
              <Avatar.Image
                size={80}
                style={styles.imagen}
                source={{uri: 'data:image/jpeg;base64,' + gastos.pic}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {openModal && (
        <Modal
          animationType="slide"
          visible={openModal}
          onRequestClose={() => {
            setModal(!openModal);
          }}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gastoSelect={gastoSelect}
            setGastoSelect={setGastoSelect}
          />
        </Modal>
      )}
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
    height: 100,
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
    marginHorizontal: 18,
  },
  contador: {
    color: '#575958',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    marginLeft: 18,
    marginTop: 3,
  },
  imagen: {
    marginVertical: 10,
    marginRight: 20,
  },
});

export default ListaGastos;
