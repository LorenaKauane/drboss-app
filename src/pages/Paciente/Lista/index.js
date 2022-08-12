import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  YellowBox,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';

import ListItemPaciente from './ListItemPaciente';

import {
  getAllPaciente,
  getForNomePaciente,
  selecionaPaciente,
} from '../../../store/modules/paciente/actions';

import * as theme from '../../../theme';
import {
  Container,
  HeaderBackground,
  RowHeader,
  RowSearch,
  ContainerAvatar,
  RowInformation,
  TextLeft,
  ContainerHeader,
  TextBemVindo,
  TextTotal,
  BotaoCadastraConsulta,
  FooterContainer,
  Inner,
  List,
  RowData,
  TextData,
  TextMes,
  FormInput,
} from './styles';

YellowBox.ignoreWarnings([
  // O flatList por default ja vem com o scrool, porem para poder visualizar o scrool na lateral
  //Adicionei o ScrollView por esse motivo o warning
  'VirtualizedLists should never be nested',
  // A lib calendar ainda não da suporte para HOOKS,
  'Warning: componentWillReceiveProps has been renamed',
]);
//https://medium.com/@mehulmistri/drawer-navigation-with-custom-side-menu-react-native-fbd5680060ba

export default function ListaPaciente({navigation}) {
  const dispatch = useDispatch();
  const paciente = useSelector(state => state.paciente);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getAllPaciente());
    navigation.addListener('willFocus', () => dispatch(getAllPaciente()));
  }, []);

  const searchForName = () => {
    dispatch(getForNomePaciente({nome: search}));
  };

  const cadastrarPaciente = () => {
    dispatch(selecionaPaciente({}));
    navigation.navigate('CadastroPaciente');
  };

  return (
    <>
      <HeaderBackground>
        <RowSearch>
          <FormInput
            icon="search"
            placeholder="Pesquisar por nome"
            returnKeyType="send"
            onSubmitEditing={searchForName}
            value={search}
            onChangeText={setSearch}
          />
        </RowSearch>
        <RowInformation>
          <TextLeft>Lista de pacientes</TextLeft>
          <TextTotal>
            {paciente.pacientes ? paciente.pacientes.length : 0} Total
          </TextTotal>
        </RowInformation>
      </HeaderBackground>
      <Container>
        <Inner>
          <ScrollView>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={paciente.loadingPacientes}>
              {paciente.pacientes && paciente.pacientes.length > 0 ? (
                <List
                  data={paciente.pacientes}
                  keyExtractor={item => String(item.id)}
                  renderItem={({item}) => (
                    <ListItemPaciente data={item} navigation={navigation} />
                  )}
                />
              ) : (
                <TextData>Sem pacientes cadastrado</TextData>
              )}
            </ShimmerPlaceHolder>
          </ScrollView>
        </Inner>
      </Container>
      <FooterContainer>
        <BotaoCadastraConsulta onPress={cadastrarPaciente}>
          <Text style={{fontSize: 45, color: theme.colors.WHITE}}>+</Text>
        </BotaoCadastraConsulta>
      </FooterContainer>
    </>
  );
}

ListaPaciente.navigationOptions = {
  header: ({navigation}) => {
    return (
      <>
        <RowHeader>
          <TouchableOpacity onPress={e => navigation.openDrawer()}>
            <Icon
              style={{paddingLeft: 15, paddingRight: 20}}
              name="bars"
              color="#fff"
              size={40}
            />
          </TouchableOpacity>
        </RowHeader>
      </>
    );
  },
};
