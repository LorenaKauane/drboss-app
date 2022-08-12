import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Dashboard from './pages/Dashboard';
import ListaPaciente from './pages/Paciente/Lista';
import CadastroPaciente from './pages/Paciente/Cadastro';
import Servico from './pages/Servico';
import Consulta from './pages/Consulta';
import Configuracao from './pages/Configuração';
import MovimentacaoFinanceira from './pages/MovimentacaoFinanceira';

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

const MovimentacaoFinanceiraNavigator = createStackNavigator({
  MovimentacaoFinanceira: {
    screen: MovimentacaoFinanceira,
  },
});

const RootStack = createDrawerNavigator({
  //colocar dashboard primeiro
  Dashboard: DashboardNavigator,
  Paciente: PacienteNavigator,
  Serviço: ServicoNavigator,
  'Movimentação Financeira': MovimentacaoFinanceiraNavigator,
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
