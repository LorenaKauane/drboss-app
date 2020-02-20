// import React, { Component } from 'react';
// import { View, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import {
//   createAppContainer,
// } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';

// import Screen1 from './pages/Screen1';
// import Screen2 from './pages/Screen2';
// import Screen3 from './pages/Screen3';

// class NavigationDrawerStructure extends Component {
//   //Structure for the navigatin Drawer
//   toggleDrawer = () => {
//     //Props to open/close the drawer
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           {/*Donute Button Image */}
//           <Icon
//               style={{paddingLeft: 15, paddingRight:20}}
//               name="bars"
//               color="#fff"
//               size={40}
//             />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const FirstActivity_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   First: {
//     screen: Screen1,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 1',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// //For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
// //const FirstActivity_StackNavigator = StackNavigator({

// //For React Navigation 3.+
// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Second: {
//     screen: Screen2,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 2',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// //For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
// //const FirstActivity_StackNavigator = StackNavigator({

// //For React Navigation 3.+
// const Screen3_StackNavigator = createStackNavigator({
//   //All the screen from the Screen3 will be indexed here
//   Third: {
//     screen: Screen3,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 3',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// //For React Navigation 2.+ need to use DrawerNavigator instead createDrawerNavigator
// //const DrawerNavigatorExample = DrawerNavigator({

// //For React Navigation 3.+
// const DrawerNavigatorExample = createDrawerNavigator({
//   //Drawer Optons and indexing
//   Screen1: {
//     //Title
//     screen: FirstActivity_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 1',
//     },
//   },

//   Screen2: {
//     //Title
//     screen: Screen2_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 2',
//     },
//   },

//   Screen3: {
//     //Title
//     screen: Screen3_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 3',
//     },
//   },
// });

//   createAppContainer(
//     DrawerNavigatorExample
//   );

import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Dashboard from './pages/Dashboard';
import ListaPaciente from '~/pages/Paciente/Lista';
import CadastroPaciente from '~/pages/Paciente/Cadastro';
import Servico from '~/pages/Servico';
import Consulta from '~/pages/Consulta';
import Configuracao from '~/pages/Configuração';

const DashboardNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  Consulta: {
    screen: Consulta,
  },
});

const PacienteNavigator = createStackNavigator({
  Paciente: {
    screen: ListaPaciente,
  },
  CadastroPaciente: {
    screen: CadastroPaciente,
  },
});

const ServicoNavigator = createStackNavigator({
  Servico: {
    screen: Servico,
  },
});

const ConfiguracaoNavigator = createStackNavigator({
  Configuracao: {
    screen: Configuracao,
  },
});

const RootStack = createDrawerNavigator({
  //colocar dashboard primeiro
  Dashboard: DashboardNavigator,
  Paciente: PacienteNavigator,
  Serviço: ServicoNavigator,
  Configuração: ConfiguracaoNavigator,
});

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          Login,
          CadastroUsuario,
        }),
        App: RootStack,
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
        // initialRouteName: 'App',
      }
    )
  );
