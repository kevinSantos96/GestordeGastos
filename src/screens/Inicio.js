import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListaPresupuestos from '../components/ListaPresupuestos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Inicio = () => {
  const navigation = useNavigation();
  const [presupuestos, setPresupuestos] = useState([]);

  const informacion = {
    presupuestos,
    setPresupuestos,
  };
  function nuevoPresupuesto() {
    navigation.navigate('nuevoPresupuesto', informacion);
  }
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <Text style={styles.texto}>Inicio</Text>
        <ListaPresupuestos
          presupuestos={presupuestos}
          setPresupuestos={setPresupuestos}
        />
      </View>

      <TouchableOpacity style={styles.btnAdd} onPress={nuevoPresupuesto}>
        <View
          style={{
            position: 'absolute',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <MaterialCommunityIcons name="plus" color="#FFF" size={50} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {marginHorizontal: 4, marginVertical: 5},
  texto: {
    color: '#000',
    fontWeight: '600',
    fontSize: 20,
  },
  btnAdd: {
    backgroundColor: 'rgba(37, 162, 240, 0.4)',
    borderRadius: 50,
    bottom: 10,
    width: 30,
    height: 30,
    padding: 30,
    right: 15,
    position: 'absolute',
  },
});

export default Inicio;
