import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {htmlPDF} from './htmlPDF';

const ExportPDF = ({
  gastos,
  nombre,
  fechaDeFinal,
  fechaDeInicio,
  presupuesto,
  totalGastos,
  disponible,
}) => {
  const askPermission = () => {
    async function externalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Gastos App necesita almacenar',
            message: 'La app necesita permisos para almacenar',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('No se tiene permisos para almacenar');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }

    externalWritePermission();
  };
  const createPDF = async () => {
    let options = {
      html: htmlPDF(
        gastos,
        nombre,
        fechaDeFinal,
        fechaDeInicio,
        presupuesto,
        totalGastos,
        disponible,
      ),
      fileName: `Gastos ${Date.now()}`,
      directory: '../Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);

    Alert.alert('Guardado exitosamente', 'Ruta:' + file.filePath, [
      {text: 'Aceptar', style: 'ok'},
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={askPermission}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="file-pdf-box"
            color="#FF2133"
            size={50}
          />
        </View>
        <Text> </Text>
        <Text style={styles.text}>Exportar PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 65,
    marginBottom: 20,
  },
  btn: {
    width: '75%',
    height: 55,
    position: 'absolute',
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderColor: '#FF2133',
    borderWidth: 2,
  },
  text: {
    color: '#FF2133',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 30,
    fontWeight: '500',
  },
  imageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
  icon: {
    position: 'absolute',
    marginLeft: '18%',
  },
});

export default ExportPDF;
