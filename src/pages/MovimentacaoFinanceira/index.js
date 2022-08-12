import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';
import {valorDinheiro, dataSemHoras} from '../../util/mask';
import * as theme from '../../theme';
import {
  Container,
  Inner,
  TituloPagina,
  RowHeader,
  HeaderBackground,
  TextError,
  TextInfoBold,
  Form,
  List,
  RowData,
  ContainerDataButton,
} from './styles';
import {
  createMovimentacaoFinanceira,
  getAllMovimentacaoFinanceira,
} from '../../store/modules/movimentacaoFinanceira/actions';
import {
  format,
  startOfDay,
  endOfDay,
  parseISO,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import Button from '../../components/Button';
import Input from '../../components/Input';

import ListaItemMovimentacao from './ListaItemMovimentacao';
export default MovimentacaoFinanceira = ({navigation}) => {
  const dispatch = useDispatch();
  const movimentacaoFinanceira = useSelector(
    state => state.movimentacaoFinanceira
  );
  const [error, setError] = useState(null);
  const [errorFiltro, setErrorFiltro] = useState(null);
  const [valor, setValor] = useState(0);
  const [dataInicial, setDataInicial] = useState(
    format(new Date(), 'dd/MM/yyyy', {
      locale: ptBrLocale,
    })
  );
  const [dataFinal, setDataFinal] = useState(
    format(new Date(), 'dd/MM/yyyy', {
      locale: ptBrLocale,
    })
  );

  useEffect(() => {
    setValor('');
  }, [movimentacaoFinanceira.movimentacoes_financeiras]);

  useEffect(() => {
    navigation.setParams({
      nomeTela: 'Movimentação financeira',
    });
    let inicioDia = format(startOfDay(new Date()), 'yyyy-MM-dd HH:mm');
    let fimDia = format(endOfDay(new Date()), 'yyyy-MM-dd HH:mm');
    console.log(inicioDia, fimDia);
    dispatch(getAllMovimentacaoFinanceira(inicioDia, fimDia));
  }, []);

  function handleSubmit() {
    if (!valor) {
      setError('Campo Valor está vazio');
      return '';
    }

    if (!movimentacaoFinanceira.loading) {
      setError(null);

      dispatch(createMovimentacaoFinanceira({valor}));

      return;
    }
  }

  function filtrarData() {
    if (!dataInicial) {
      setErrorFiltro('Campo data inicial está vazio');
      return '';
    }

    if (!dataFinal) {
      setErrorFiltro('Campo data final está vazio');
      return '';
    }

    const stringDay = dataInicial.substring(0, 2);
    const stringMonth = dataInicial.substring(3, 5);
    const stringYear = dataInicial.substring(6, 10);
    const stringDayFim = dataFinal.substring(0, 2);
    const stringMonthFim = dataFinal.substring(3, 5);
    const stringYearFim = dataFinal.substring(6, 10);

    const dayComplete = parseISO(`${stringYear}-${stringMonth}-${stringDay}`);
    const dayCompleteFim = parseISO(
      `${stringYearFim}-${stringMonthFim}-${stringDayFim}`
    );

    if (isNaN(dayComplete)) {
      setErrorFiltro('Data Inicial e inválida');
      return '';
    }

    if (isNaN(dayCompleteFim)) {
      setErrorFiltro('Data Final e inválida');
      return '';
    }

    let inicioDia = format(startOfDay(dayComplete), 'yyyy-MM-dd HH:mm');
    let fimDia = format(endOfDay(dayCompleteFim), 'yyyy-MM-dd HH:mm');
    dispatch(getAllMovimentacaoFinanceira(inicioDia, fimDia));
  }

  return (
    <Container>
      <Inner>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Valor"
            returnKeyType="next"
            value={valorDinheiro(valor)}
            onChangeText={v => setValor(valorDinheiro(v))}
            keyboardType={'numeric'}
          />
          {error && <TextError>{error}</TextError>}
          <Button style={{marginBottom: 30}} onPress={handleSubmit}>
            Lançar movimentação
          </Button>
          {/* <Button loading={!servico.loadingProntuario} onPress={handleSubmit}>
            Lançar movimentação
          </Button> */}

          <TextInfoBold>Filtrar movimentação por periodo</TextInfoBold>
          {errorFiltro && <TextError>{errorFiltro}</TextError>}
          <RowData>
            <Input
              style={{
                width: theme.sizes.WIDTH / 2 - 70,
                marginLeft: 0,
              }}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Data inicial"
              returnKeyType="next"
              keyboardType={'numeric'}
              value={dataSemHoras(dataInicial)}
              onChangeText={v => {
                if (v.length < 11) {
                  setDataInicial(dataSemHoras(v));
                }
              }}
            />
            <Input
              style={{
                width: theme.sizes.WIDTH / 2 - 70,
                marginLeft: 0,
              }}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Data final"
              keyboardType={'numeric'}
              value={dataSemHoras(dataFinal)}
              onChangeText={v => {
                if (v.length < 11) {
                  setDataFinal(dataSemHoras(v));
                }
              }}
            />
            <ContainerDataButton onPress={() => filtrarData()}>
              <Icon name="search" color="#fff" size={25} />
            </ContainerDataButton>
          </RowData>
          <ScrollView>
            <TextInfoBold>
              Lista - Total: {movimentacaoFinanceira.valorTotal}
            </TextInfoBold>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={movimentacaoFinanceira.loadingMovimentacaoFinanceira}>
              {movimentacaoFinanceira.movimentacoes_financeiras &&
              movimentacaoFinanceira.movimentacoes_financeiras.length > 0 ? (
                <List
                  data={movimentacaoFinanceira.movimentacoes_financeiras}
                  keyExtractor={data => String(data.id)}
                  renderItem={data => <ListaItemMovimentacao data={data} />}
                />
              ) : (
                <TextInfoBold>Sem servicos cadastrados</TextInfoBold>
              )}
            </ShimmerPlaceHolder>
          </ScrollView>
        </Form>
      </Inner>
    </Container>
  );
};

MovimentacaoFinanceira.navigationOptions = {
  header: ({navigation}) => {
    let nomeTela = '';
    if (navigation.state.routes) {
      let router = navigation.state.routes.find(
        item => item.routeName == 'MovimentacaoFinanceira'
      );

      if (router && router.params && router.params.nomeTela) {
        nomeTela = router.params.nomeTela;
      }
    }
    return (
      <>
        <HeaderBackground>
          <RowHeader>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
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

// export default Servico;
