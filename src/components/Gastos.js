import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import ListaGastos from './ListaGastos';

const ListGastos = ({id, gastos, setGastos, gastado, setGastado}) => {
  return (
    <>
      <View style={{marginVertical: 5, marginHorizontal: 4}}>
        {gastos &&
          (gastos.length > 0 ? (
            gastos.map(gastos => (
              <ListaGastos key={gastos.idGasto} gastos={gastos} />
            ))
          ) : (
            <Text
              style={{
                color: '#000',
                fontSize: 22,
                fontWeight: '600',
                textAlign: 'center',
                marginVertical: 5,
              }}>
              No hay gastos
            </Text>
          ))}
      </View>
    </>
  );
};

export default ListGastos;
