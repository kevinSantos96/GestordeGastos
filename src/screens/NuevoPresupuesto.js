import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, StackActions} from '@react-navigation/native';
import {formatearFecha} from '../helpers/formatDate';
import DatePiker from '../helpers/datePiker';

const NuevoPresupuesto = ({route}) => {
  const {presupuestos, setPresupuestos} = route.params;
  const navigation = useNavigation();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [dateInit, setDateInit] = useState(new Date());
  const [openInit, setOpenInit] = useState(false);
  const [dateEnd, setDateEnd] = useState(new Date());
  const [openEnd, setOpenEnd] = useState(false);
  const [nombre, setNombre] = useState('');

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
  }, []);

  const guardarPresupuesto = async PresupuestosJSON => {
    try {
      await AsyncStorage.setItem('presupuestos', PresupuestosJSON);
    } catch (error) {
      Alert.alert('Error', error.message, [{text: 'Aceptar'}]);
    }
  };

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) <= 0) {
      Alert.alert('Error', 'El presupuesto no puede ser menor a L. 0', [
        {text: 'Aceptar'},
      ]);
      return;
    }

    if (!nombre || nombre.length <= 3) {
      Alert.alert('Error', 'El nombre es muy corto', [{text: 'Aceptar'}]);
      return;
    }
    const NuevoPresupuesto = {
      nombre,
      presupuesto,
      fechaDeInicio: dateInit,
      fechaDeFinal: dateEnd,
    };
    NuevoPresupuesto.id = Date.now();
    const nuevoPres = [...presupuestos, NuevoPresupuesto];
    setPresupuestos(nuevoPres);
    //guardar Presupuesto
    guardarPresupuesto(JSON.stringify(nuevoPres));
    navigation.dispatch(StackActions.popToTop());
    setPresupuesto(0);
  };

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.label}> Definir presupuesto </Text>

        <View style={{marginVertical: 20}}>
          <Text style={styles.texto}>Nombre del proyecto:</Text>
          <TextInput
            placeholder="Agrega un nombre: Ej. viaje al sur"
            placeholderTextColor="#666"
            style={styles.input}
            value={nombre} //se convierte a presupuesto ya que solo acepta string
            onChangeText={setNombre}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.texto}>Ingrese una cantidad:</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Agrega tu presupuesto: Ej. 300"
            placeholderTextColor="#666"
            style={styles.input}
            value={presupuesto.toString()} //se convierte a presupuesto ya que solo acepta string
            onChangeText={setPresupuesto}
          />
        </View>

        <View style={{marginVertical: 5, marginHorizontal: 5}}>
          <DatePiker
            open={openInit}
            setOpen={setOpenInit}
            date={dateInit}
            setDate={setDateInit}
            minDate={new Date()}
          />
        </View>
        <Text style={styles.texto}>Fecha de inicio:</Text>
        <TouchableOpacity
          style={[styles.boton, styles.btnDate]}
          onPress={() => setOpenInit(true)}>
          <Text style={{color: '#000'}}> {formatearFecha(dateInit)}</Text>
        </TouchableOpacity>

        <View style={{marginVertical: 5, marginHorizontal: 5}}>
          <DatePiker
            open={openEnd}
            setOpen={setOpenEnd}
            date={dateEnd}
            setDate={setDateEnd}
            minDate={dateInit}
          />
        </View>
        <Text style={styles.texto}>Fecha de finalización:</Text>
        <TouchableOpacity
          style={[styles.boton, styles.btnDate]}
          onPress={() => setOpenEnd(true)}>
          <Text style={{color: '#000'}}> {formatearFecha(dateEnd)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, styles.btnSubmit]}
          onPress={() => handleNuevoPresupuesto(presupuesto)}>
          <Text style={styles.textoBoton}> Agregar Presupuesto</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    transform: [{translateY: 50}],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#002E85',
  },
  texto: {
    color: '#525B61',
    fontWeight: '600',
  },
  input: {
    color: '#252B36',
    fontSize: 18,
    backgroundColor: '#BDE1F0',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 3,
  },
  boton: {
    padding: 10,
    borderRadius: 10,
  },
  textoBoton: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnDate: {
    width: '75%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFC23D',
  },
  btnSubmit: {
    marginTop: 30,
    backgroundColor: '#21AFC5',
  },
});
export default NuevoPresupuesto;
