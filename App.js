import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
//Componentes
import Inicio from './src/screens/Inicio';
import NuevoPresupuesto from './src/screens/NuevoPresupuesto';
import DetallePresupuesto from './src/screens/DetallePresupuesto';
import Splash from './src/screens/Splash';

const Stack = createStackNavigator();
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#002E85',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{animationEnabled: false, header: () => null}}
          />
          <Stack.Screen
            name="inicio"
            component={Inicio}
            options={{animationEnabled: true, title: 'Presupuestos'}}
          />
          <Stack.Screen
            name="nuevoPresupuesto"
            component={NuevoPresupuesto}
            options={{
              title: 'Ingresar Presupuesto',
            }}
          />
          <Stack.Screen
            name="detallePresupuesto"
            component={DetallePresupuesto}
            options={{
              title: 'Detalles',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
