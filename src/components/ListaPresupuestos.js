import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PresupuestoList from './PresupuestoList';

const ListaPresupuestos = ({presupuestos, setPresupuestos}) => {
  useEffect(() => {
    const obtenerPresupuestos = async () => {
      try {
        const presupuestosStorage = await AsyncStorage.getItem('presupuestos');
        if (presupuestosStorage) {
          setPresupuestos(JSON.parse(presupuestosStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestos();
  }, [presupuestos]);

  return (
    <>
      <View>
        {presupuestos &&
          (presupuestos.length > 0 ? (
            <FlatList
              data={presupuestos}
              style={{marginBottom: 20}}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return <PresupuestoList item={item} />;
              }}
            />
          ) : (
            <View>
              <Image
                style={styles.imagen}
                source={require('../assets/sinDinero.png')}
              />

              <Text style={styles.texto}>No hay presupuestos</Text>
            </View>
          ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  imagen: {
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: '20%',
    width: 200,
    height: 200,
  },
  texto: {
    color: '#4E616B',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
export default ListaPresupuestos;
