import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
const CantidaKm = ({kilometros, setKilometros}) => {
  return (
    <View>
      <Text style={styles.label}>Distancia en Km</Text>
      <TextInput
        keyboardType="number-pad"
        placeholder="Ej. 120 Km"
        placeholderTextColor="#666"
        style={styles.input}
        value={kilometros.toString()} //se convierte a presupuesto ya que solo acepta string
        onChangeText={setKilometros}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5F5F5',
    color: '#000000',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  label: {
    color: '#4E616B',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default CantidaKm;
