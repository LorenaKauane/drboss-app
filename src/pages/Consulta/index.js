import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  YellowBox,
  ScrollView,
  TouchableOpacity,
  Picker,
  Text,
} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import {parseISO, format, addHours} from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
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
} from './styles';

import {getEnum} from '~/store/modules/enum/actions';
import {getAllServico} from '~/store/modules/servico/actions';
import {getAllPaciente} from '~/store/modules/paciente/actions';
import {createConsulta} from '~/store/modules/consulta/actions';
import {dataSemHoras, dataHoras, valorDinheiro} from '~/util/mask';
import Button from '~/components/Button';
import Input from '~/components/Input';
import * as theme from '~/theme';

YellowBox.ignoreWarnings([
  'Warning: DatePickerAndroid has been merged',
  'Warning: TimePickerAndroid has been merged',
]);

export default Consulta = ({navigation}) => {
  const dispatch = useDispatch();

  const servico = useSelector(state => state.servico);
  const paciente = useSelector(state => state.paciente);
  const consulta = useSelector(state => state.consulta);
  const enumStatusConsulta = useSelector(state => state.enums);

  const [error, setError] = useState(null);
  const [pacienteId, setPacienteId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [dataConsulta, setDataConsulta] = useState(
    consulta.dataConsulta
      ? consulta.dataConsulta
      : format(new Date(), 'dd/MM/yyyy', {
          locale: ptBrLocale,
        })
  );
  const [movimentacaoFinanceira, setMovimentacaoFinanceira] = useState(true);
  const [valor, setValor] = useState('');
  const [statusConsulta, setStatusConsulta] = useState('');
  const [observacao, setObservacao] = useState('');
  const [horaInicio, setHoraInicio] = useState(
    consulta.horaInicio
      ? consulta.horaInicio
      : format(new Date(), 'hh:mm', {
          locale: ptBrLocale,
        })
  );
  const [horaFim, setHoraFim] = useState(
    consulta.horaFim
      ? consulta.horaFim
      : format(addHours(new Date(), 1), 'hh:mm', {
          locale: ptBrLocale,
        })
  );

  const nomeRef = useRef();

  useEffect(() => {
    navigation.setParams({
      nomeTela: 'Consulta',
    });
    dispatch(getAllServico());
    dispatch(getAllPaciente());
    dispatch(getEnum());
  }, []);

  function handleCheckBox() {
    setMovimentacaoFinanceira(!movimentacaoFinanceira);
  }

  function handleSubmit() {
    if (dataConsulta) {
      const stringDay = dataConsulta.substring(0, 2);
      const stringMonth = dataConsulta.substring(3, 5);
      const stringYear = dataConsulta.substring(6, 10);

      const dayComplete = parseISO(`${stringYear}-${stringMonth}-${stringDay}`);

      if (isNaN(dayComplete)) {
        setError('Data consulta e inválido');
        return '';
      }
    }

    if (!pacienteId) {
      setError('Campo Paciente está vazio');
      return '';
    }

    if (!servicoId) {
      setError('Campo Serviço está vazio');
      return '';
    }

    if (!servico.loading) {
      setError(null);
      const consulta_servico = [{servicoId}];
      let movimentacao_financeira = {};
      if (movimentacaoFinanceira) {
        movimentacao_financeira = {
          valor: valor || null,
          tipoMovimentacao: 'Entrada',
          // tipoPagamento: 'Dinheiro',
        };
      }
      dispatch(
        createConsulta(
          {
            pacienteId,
            consulta_servico,
            movimentacao_financeira,
            statusConsulta,
            observacao,
            horaInicio,
            horaFim,
            dataConsulta,
          },
          navigation
        )
      );

      return;
    }
  }

  return (
    <Container>
      <Inner>
        <Form>
          <Picker
            selectedValue={pacienteId}
            style={{
              flex: 1,
            }}
            onValueChange={(itemValue, itemIndex) => setPacienteId(itemValue)}>
            <Picker.Item label="Selecione Paciente" value="" />
            {paciente.pacientes &&
              paciente.pacientes.map(item => (
                <Picker.Item key={item.id} label={item.nome} value={item.id} />
              ))}
          </Picker>
          <Picker
            selectedValue={servicoId}
            style={{
              flex: 1,
            }}
            onValueChange={(itemValue, itemIndex) => {
              const servicoSelecionado = servico.servicos.find(
                item => item.id === itemValue
              );
              setValor(valorDinheiro(servicoSelecionado.valor));
              setServicoId(itemValue);
            }}>
            <Picker.Item label="Selecione Serviço" value="" />
            {servico.servicos &&
              servico.servicos.map(item => (
                <Picker.Item key={item.id} label={item.nome} value={item.id} />
              ))}
          </Picker>

          <Picker
            selectedValue={statusConsulta}
            style={{
              flex: 1,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setStatusConsulta(itemValue)
            }>
            <Picker.Item label="Selecione Status" value="" />
            {enumStatusConsulta.enums &&
              enumStatusConsulta.enums.statusConsulta.map(item => (
                <Picker.Item
                  key={item.nome}
                  label={item.nome}
                  value={item.nome}
                />
              ))}
          </Picker>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Data inicio DD/MM/YYYY"
            returnKeyType="next"
            value={dataSemHoras(dataConsulta)}
            onChangeText={v => {
              if (v.length < 11) {
                setDataConsulta(dataSemHoras(v));
              }
            }}
            keyboardType={'numeric'}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Hora inicio HH:MM"
            returnKeyType="next"
            value={dataHoras(horaInicio)}
            onChangeText={v => {
              if (v.length <= 5) {
                setHoraInicio(dataHoras(v));
              }
            }}
            keyboardType={'numeric'}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Hora fim HH:MM"
            returnKeyType="next"
            value={dataHoras(horaFim)}
            onChangeText={v => {
              if (v.length < 5) {
                setHoraFim(dataHoras(v));
              }
            }}
            keyboardType={'numeric'}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            value={observacao}
            placeholder="Observação"
            onChangeText={setObservacao}
          />

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={handleCheckBox}>
            <Icon
              size={24}
              color={'black'}
              name={
                movimentacaoFinanceira ? 'check-box' : 'check-box-outline-blank'
              }
            />
            <Text>Movimentação Financeira</Text>
          </TouchableOpacity>
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
          <Button loading={!servico.loadingProntuario} onPress={handleSubmit}>
            Salvar
          </Button>
        </Form>
      </Inner>
    </Container>
  );
};

Consulta.navigationOptions = {
  header: ({navigation}) => {
    let nomeTela = '';
    if (navigation.state.routes) {
      let router = navigation.state.routes.find(
        item => item.routeName == 'Consulta'
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

// export default Consulta;
