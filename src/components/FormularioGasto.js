import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {Picker as ComboBox} from '@react-native-picker/picker';
import BotonCantidad from './botonCantidad';
import CantidaKm from './cantidaKm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const FormularioGasto = ({handleGasto, setModal}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState(Date.now());
  const [contador, setContador] = useState(1);
  const [kilometros, setKilometros] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [pic, setPic] = useState('');

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const uploadImage = async () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('cancelar imagen seleccionada');
      } else if (response.errorCode == 'permission') {
        setToastMsg('permiso denegado');
      } else if (response.errorCode == 'other') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert('Advertencia', 'La imagen excede el peso permitido', [
          {text: 'Aceptar'},
        ]);
      } else {
        setPic(response.assets[0].base64);
      }
    });
  };

  function handleSubmit() {
    let distancia = null;
    kilometros > 0 && (distancia = Number(cantidad) / Number(kilometros));
    const total = Number(cantidad) * contador;

    handleGasto({
      nombre,
      cantidad: total,
      categoria,
      fecha,
      contador,
      descripcion,
      pic,
      distancia,
    });
    setModal(false);
  }

  return (
    <>
      <SafeAreaView style={styles.contenedor}>
        <ScrollView style={styles.scroll}>
          <View style={styles.formulario}>
            <Text style={styles.titulo}>Nuevo Gasto</Text>

            <View style={styles.campo}>
              <Text style={styles.label}>Nombre Gasto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Comida"
                placeholderTextColor={'#B0BFBD'}
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Descripcion</Text>
              <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Cantidad del Gasto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 300"
                placeholderTextColor={'#B0BFBD'}
                keyboardType="number-pad"
                value={cantidad}
                onChangeText={setCantidad}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Categoría Gasto</Text>
              <ComboBox
                style={styles.input}
                selectedValue={categoria}
                onValueChange={valor => {
                  setCategoria(valor);
                }}>
                <ComboBox.Item label="--Seleccione--" value="" />
                <ComboBox.Item
                  label="Desayuno --max L. 150.00--"
                  value="desayuno"
                />
                <ComboBox.Item
                  label="Almuerzo --max L. 200.00--"
                  value="almuerzo"
                />
                <ComboBox.Item label="Cena --max L. 180.00--" value="cena" />
                <ComboBox.Item
                  label="Hospedaje --max L.1,200.00--"
                  value="hospedaje"
                />
                <ComboBox.Item label="Papeleria" value="papeleria" />
                <ComboBox.Item
                  label="Transporte Terrestre"
                  value="transporte terrestre"
                />
                <ComboBox.Item
                  label="Impuestos aéreos"
                  value="impuestos aéreos"
                />
                <ComboBox.Item label="Combustible" value="combustible" />
                <ComboBox.Item label="Peajes" value="peajes" />
                <ComboBox.Item
                  label="Mantenimiento de Vehiculos"
                  value="mantenimiento vehiculos"
                />
                <ComboBox.Item
                  label="Otros Gastos Autorizados"
                  value="otros gastos"
                />
              </ComboBox>
            </View>
            {categoria === 'desayuno' ||
            categoria === 'almuerzo' ||
            categoria === 'cena' ? (
              <BotonCantidad contador={contador} setContador={setContador} />
            ) : null}

            {categoria === 'combustible' && (
              <CantidaKm
                kilometros={kilometros}
                setKilometros={setKilometros}
              />
            )}
            <View style={{alignItems: 'center'}}>
              <Image
                style={styles.imagen}
                source={{uri: 'data:image/jpeg;base64,' + pic}}
              />
            </View>

            <TouchableOpacity style={styles.btnImage} onPress={uploadImage}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="file-image-plus"
                color="#FFF"
                size={25}
              />
              <Text style={styles.btnsubmitText}>Subir Imagen</Text>
            </TouchableOpacity>
            <Pressable style={styles.btnSubmit} onPress={handleSubmit}>
              <Text style={styles.btnsubmitText}>Agregar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  scroll: {backgroundColor: '#FF2133'},
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    borderRadius: 15,
    marginHorizontal: 10,
    width: '40%',
    flex: 1,
  },
  btnEliminar: {
    backgroundColor: '#FF3B40',
  },
  btnCancelar: {
    backgroundColor: '#DB4641',
  },
  btnTexto: {
    color: '#FFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  formulario: {
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
    marginBottom: 100,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#002E85',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#4E616B',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    color: '#000000',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  btnImage: {
    backgroundColor: '#C23200',
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
    marginHorizontal: 20,
    height: 40,
  },
  icon: {
    position: 'absolute',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnSubmit: {
    backgroundColor: '#21AFC5',
    padding: 12,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  btnsubmitText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
});

export default FormularioGasto;
