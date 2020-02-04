import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  YellowBox,
  ScrollView,
} from 'react-native';
import {
  KeyBoard,
  Inner,
  TituloPagina,
  RowHeader,
  HeaderBackground,
  RowData,
  TextInfoBold,
  TextData,
  TextProntuario,
} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as theme from '~/theme';
import Form from './Form';
import Prontuario from '../Prontuario';

YellowBox.ignoreWarnings([
  // O flatList por default ja vem com o scrool, porem para poder visualizar o scrool na lateral
  //Adicionei o ScrollView por esse motivo o warning
  'VirtualizedLists should never be nested',
  // A lib calendar ainda não da suporte para HOOKS,
  'Warning: DatePickerAndroid has been merged',
]);
export default function CadastroPaciente({navigation}) {
  const dispatch = useDispatch();
  const paciente = useSelector(state => state.paciente.paciente);
  const [isShowForm, setisShowForm] = useState(true);

  useEffect(() => {
    navigation.setParams({
      nomeTela: 'Paciente',
    });
  }, []);

  useEffect(() => {
    if (isShowForm) {
      navigation.setParams({
        nomeTela: 'Paciente',
      });
    } else {
      navigation.setParams({
        nomeTela: 'Prontuário',
      });
    }
  }, [isShowForm]);

  const buscaDadoPaciente = () => {
    setisShowForm(true);
  };

  const buscaProntuario = () => {
    setisShowForm(false);
  };

  return (
    <KeyBoard>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Inner>
          <ScrollView>
            {paciente.id && (
              <RowData>
                <TouchableOpacity onPress={buscaDadoPaciente}>
                  <TextData isShowForm={isShowForm}>Dados do paciente</TextData>
                </TouchableOpacity>
                <TouchableOpacity onPress={buscaProntuario}>
                  <TextProntuario isShowForm={isShowForm}>
                    Prontuário
                  </TextProntuario>
                </TouchableOpacity>
              </RowData>
            )}

            {isShowForm ? (
              <Form navigation={navigation} />
            ) : (
              <Prontuario navigation={navigation} />
            )}
          </ScrollView>
        </Inner>
      </TouchableWithoutFeedback>
    </KeyBoard>
  );
}

CadastroPaciente.navigationOptions = {
  header: ({navigation}) => {
    let nomeTela = '';
    if (navigation.state.routes) {
      let router = navigation.state.routes.find(
        item => item.routeName == 'CadastroPaciente'
      );

      if (router && router.params && router.params.nomeTela) {
        nomeTela = router.params.nomeTela;
      }
    }
    return (
      <>
        <HeaderBackground>
          <RowHeader>
            <TouchableOpacity onPress={() => navigation.navigate('Paciente')}>
              <Icon
                style={{padding: 24}}
                name="chevron-left"
                color="#fff"
                size={20}
              />
            </TouchableOpacity>

            <TituloPagina>{nomeTela}</TituloPagina>
          </RowHeader>
        </HeaderBackground>
      </>
    );
  },
};
