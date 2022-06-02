import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BotonCantidad = ({contador, setContador}) => {
  function handleAdd() {
    setContador(contador + 1);
  }
  function handLess() {
    if (contador > 1) {
      setContador(contador - 1);
    }
  }

  return (
    <View style={styles.contenido}>
      <TouchableOpacity onPress={handLess} style={styles.btnMenos}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="minus"
          color="#FFF"
          size={25}
        />
      </TouchableOpacity>
      <Text style={styles.contador}>{contador}</Text>
      <TouchableOpacity onPress={handleAdd} style={styles.btnMenos}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="plus"
          color="#FFF"
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'row',
    width: '50%',
    marginTop: 20,
  },
  btnMenos: {
    backgroundColor: '#FFC23D',
    borderRadius: 50,
    bottom: 10,
    width: 20,
    height: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  icon: {
    position: 'absolute',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  contador: {
    color: '#4E616B',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BotonCantidad;
