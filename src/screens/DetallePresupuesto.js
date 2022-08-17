import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {formatMoney} from '../helpers/formatoMoneda';
import FormularioGasto from '../components/FormularioGasto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GenerarId} from '../helpers/generarId';
import ListGastos from '../components/Gastos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExportPDF from '../components/reportPDF';

const DetallePresupuesto = ({route}) => {
  const {presupuesto, id, nombre, fechaDeInicio, fechaDeFinal} = route.params;
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [modal, setModal] = useState(false); //activar el modal con el boton
  const [totalGastos, setTotalGastos] = useState(0);
  const [gastoSelect, setGastoSelect] = useState([]);

  useEffect(() => {
    const obtenerPresupuestos = async () => {
      try {
        const presupuestosStorage = await AsyncStorage.getItem('planificador');
        if (presupuestosStorage) {
          setGastado(JSON.parse(presupuestosStorage));
          const filtrarGasto = gastado.filter(gastos => gastos.id === id);
          setGastos(filtrarGasto);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestos();
  }, [gastado]);

  function handleGasto(gasto) {
    const {nombre, cantidad, categoria, descripcion} = gasto;

    if ([nombre, cantidad, categoria, descripcion].includes('')) {
      return Alert.alert('Advertencia', 'Rellene todos los campos', [
        {text: 'Aceptar'},
      ]);
    }
    gasto.id = id;
    gasto.idGasto = GenerarId();
    const nuevoGasto = [...gastado, gasto];
    setGastado(nuevoGasto);
    guardarGastos(JSON.stringify(nuevoGasto));
    setModal(!modal);
  }

  //Almacenar gastos
  const guardarGastos = async GastosJSON => {
    try {
      await AsyncStorage.setItem('planificador', GastosJSON);
    } catch (error) {
      Alert.alert('Error', error.message, [{text: 'Aceptar'}]);
    }
  };

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );
    const totalDispnible = presupuesto - totalGastado;
    const nuevoPorcentaje =
      ((presupuesto - totalDispnible) / presupuesto) * 100;

    setDisponible(totalDispnible);
    setTotalGastos(totalGastado);
    setPorcentaje(nuevoPorcentaje);
  }, [gastos]);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{marginBottom: 50}}>
        <View style={styles.header}>
          <View style={{alignItems: 'center', marginTop: 12}}></View>

          <View style={styles.contenedor}>
            <View style={styles.centrarGrap}>
              <CircularProgress
                value={porcentaje}
                duration={1500}
                radius={150}
                valueSuffix="%"
                title="Gastado"
                activeStrokeColor={'#41AFD1'}
                activeStrokeSecondaryColor={'#C25AFF'}
                activeStrokeWidth={20}
                inActiveStrokeWidth={20}
                titleStyle={{fontWeight: 'bold', fontSize: 30}}
              />
            </View>

            <View style={{alignItems: 'center', marginTop: 8}}>
              <Text style={{color: '#002E85', fontSize: 20}}>
                Presupuesto: {formatMoney(presupuesto)}
              </Text>

              <Text style={{color: '#002E85', fontSize: 20}}>
                Disponible: {formatMoney(disponible)}
              </Text>
              <Text style={{color: '#002E85', fontSize: 20}}>
                Gastado: {formatMoney(totalGastos)}
              </Text>
            </View>
          </View>
        </View>
        <ExportPDF
          gastos={gastos}
          presupuesto={presupuesto}
          nombre={nombre}
          fechaDeFinal={fechaDeFinal}
          fechaDeInicio={fechaDeInicio}
          totalGastos={totalGastos}
          disponible={disponible}
        />
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '500',
            marginTop: 55,
          }}>
          Gastos
        </Text>
        <ListGastos
          id={id}
          gastos={gastos}
          setGastos={setGastos}
          gastado={gastado}
          setGastado={setGastado}
        />
      </ScrollView>
      <TouchableOpacity style={styles.btnAdd} onPress={() => setModal(true)}>
        <View
          style={{
            position: 'absolute',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <MaterialCommunityIcons name="plus" color="#FFF" size={50} />
        </View>
      </TouchableOpacity>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
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
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
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
  header: {
    backgroundColor: '#002E85',
    minHeight: 400,
  },
  centrarGrap: {
    alignItems: 'center',
  },
  btnAdd: {
    backgroundColor: 'rgba(37, 162, 240, 0.4)',
    opacity: 20,
    borderRadius: 50,
    bottom: 10,
    width: 30,
    height: 30,
    padding: 30,
    right: 15,
    position: 'absolute',
  },
  btnDelete: {
    alignItems: 'center',
    backgroundColor: '#FC2621',
    width: 120,
    lineHeight: 3,
    color: '#FFF',
    borderRadius: 12,
    padding: 5,
    marginHorizontal: 6,
  },
  textButtonDelete: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
});
export default DetallePresupuesto;
