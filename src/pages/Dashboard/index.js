import React, {useState, useEffect, useRef} from 'react';
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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import api from '~/services/api';
import {signOut} from '~/store/modules/auth/actions';
import {getConsulta} from '~/store/modules/consulta/actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as theme from '~/theme';
import ListStatus from './ListStatus';
import ListConsulta from './ListConsulta';
import {
  startOfDay,
  endOfDay,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import {
  Container,
  HeaderBackground,
  RowHeader,
  ContainerAvatar,
  RowInformation,
  TextLeft,
  ContainerHeader,
  TextBemVindo,
  TextTotal,
  ContainerStatus,
  BotaoCadastraConsulta,
  FooterContainer,
  Inner,
  List,
  RowData,
  TextData,
  TextMes,
} from './styles';
LocaleConfig.locales['br'] = {
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'br';

YellowBox.ignoreWarnings([
  // O flatList por default ja vem com o scrool, porem para poder visualizar o scrool na lateral
  //Adicionei o ScrollView por esse motivo o warning
  'VirtualizedLists should never be nested',
  // A lib calendar ainda não da suporte para HOOKS,
  'Warning: componentWillReceiveProps has been renamed',
]);
//https://medium.com/@mehulmistri/drawer-navigation-with-custom-side-menu-react-native-fbd5680060ba

let nomeUsuario = '';
export default function Dashboard({navigation}) {
  const [marketDate, setMarketDate] = useState({});
  const [isShowListConsulta, setIsShowListConsulta] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const dispatch = useDispatch();
  const consulta = useSelector(state => state.consulta);
  const auth = useSelector(state => state.auth);

  nomeUsuario = auth.usuario ? auth.usuario : '';

  useEffect(() => {
    let inicioDia = format(startOfDay(new Date()), 'yyyy-MM-dd HH:mm');
    let fimDia = format(endOfDay(new Date()), 'yyyy-MM-dd HH:mm');
    dispatch(getConsulta(inicioDia, fimDia));
  }, []);

  useEffect(() => {
    navigation.setParams({
      qtdConsultas: consulta.consultas ? consulta.consultas.length : 0,
    });
  }, [consulta.consultas]);

  const sair = () => {
    // props.navigation.openDrawer();
    dispatch(signOut());
  };

  const buscaData = () => {
    setIsShowListConsulta(true);
    let inicioDia = format(
      startOfDay(parseISO(dataSelecionada)),
      'yyyy-MM-dd HH:mm'
    );
    let fimDia = format(
      endOfDay(parseISO(dataSelecionada)),
      'yyyy-MM-dd HH:mm'
    );
    dispatch(getConsulta(inicioDia, fimDia));
  };

  const retornaInicioFimMes = dataSelecionada => {
    return {
      inicioMes: format(
        startOfMonth(parseISO(dataSelecionada)),
        'yyyy-MM-dd HH:mm'
      ),
      fimMes: format(endOfMonth(parseISO(dataSelecionada)), 'yyyy-MM-dd HH:mm'),
    };
  };

  const buscaMes = async () => {
    setIsShowListConsulta(false);
    // setMarketDate(null); tem algum motivo que fiz isso kk
    const {inicioMes, fimMes} = retornaInicioFimMes(dataSelecionada);
    const response = await api.get(
      `consulta/${inicioMes}/${fimMes}/statusConsulta`
    );

    setMarketDate(response.data);
  };

  const trocaMes = async month => {
    setDataSelecionada(month.dateString);
    const {inicioMes, fimMes} = retornaInicioFimMes(month.dateString);
    const response = await api.get(
      `consulta/${inicioMes}/${fimMes}/statusConsulta`
    );
    setMarketDate(response.data);
  };

  return (
    <>
      <Container>
        <Inner>
          <ScrollView>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={consulta.loadingConsultas && marketDate !== null}>
              {/* <TouchableOpacity onPress={sair}>
                <Text>Dashboard/sair </Text>
              </TouchableOpacity> */}
              <RowData>
                <TouchableOpacity onPress={buscaData}>
                  <TextData isShowListConsulta={isShowListConsulta}>
                    {dataSelecionada === format(new Date(), 'yyyy-MM-dd')
                      ? 'Hoje'
                      : format(parseISO(dataSelecionada), 'dd/MM/yyyy')}
                  </TextData>
                </TouchableOpacity>
                <TouchableOpacity onPress={buscaMes}>
                  <TextMes isShowListConsulta={isShowListConsulta}>Mês</TextMes>
                </TouchableOpacity>
              </RowData>

              {isShowListConsulta ? (
                consulta.consultas && consulta.consultas.length > 0 ? (
                  <List
                    data={consulta.consultas}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <ListConsulta data={item} />}
                  />
                ) : (
                  <TextData> Sem Consulta agendada</TextData>
                )
              ) : (
                <Calendar
                  onDayPress={day => setDataSelecionada(day.dateString)}
                  monthFormat={'MM/yyyy'}
                  hideExtraDays
                  markingType={'multi-dot'}
                  onMonthChange={month => {
                    trocaMes(month);
                  }}
                  markedDates={{
                    ...marketDate,
                    [dataSelecionada]: {
                      selected: true,
                      disableTouchEvent: true,
                    },
                  }}
                />
              )}
            </ShimmerPlaceHolder>
          </ScrollView>
        </Inner>
      </Container>
      <FooterContainer>
        <BotaoCadastraConsulta onPress={() => navigation.navigate('Consulta')}>
          <Text style={{fontSize: 45, color: theme.colors.WHITE}}>+</Text>
        </BotaoCadastraConsulta>
      </FooterContainer>
    </>
  );
}

Dashboard.navigationOptions = {
  header: ({navigation}) => {
    let qtdConsultas = 0;
    if (navigation.state.routes) {
      let router = navigation.state.routes.find(
        item => item.routeName == 'Dashboard'
      );
      if (router.params) {
        qtdConsultas = router.params.qtdConsultas;
      }
    }

    return (
      <HeaderBackground>
        <RowHeader>
          <TouchableOpacity onPress={e => navigation.openDrawer()}>
            <Icon
              style={{paddingLeft: 15, paddingRight: 20}}
              name="bars"
              color="#fff"
              size={40}
            />
          </TouchableOpacity>

          <TextBemVindo>
            Bem vindo{' '}
            {nomeUsuario.length > 7
              ? nomeUsuario.substring(0, 7) + '...'
              : nomeUsuario}
          </TextBemVindo>
        </RowHeader>

        <RowInformation>
          <ContainerHeader>
            <TextLeft>Consultas</TextLeft>
            <TextTotal>{qtdConsultas} Total</TextTotal>
          </ContainerHeader>
          <ContainerStatus>
            <ListStatus />
          </ContainerStatus>
        </RowInformation>
      </HeaderBackground>
    );
  },
};
