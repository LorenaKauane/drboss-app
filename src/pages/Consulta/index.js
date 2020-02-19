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

import Button from '~/components/Button';
import Input from '~/components/Input';
import * as theme from '~/theme';
YellowBox.ignoreWarnings(['Warning: DatePickerAndroid has been merged','Warning: TimePickerAndroid has been merged']);

export default Consulta = ({navigation}) => {
  const dispatch = useDispatch();

  const servico = useSelector(state => state.servico);
  const paciente = useSelector(state => state.paciente);
  const consulta = useSelector(state => state.consulta);
  const enumStatusConsulta = useSelector(state => state.enums);

  const [error, setError] = useState(null);
  const [pacienteId, setPacienteId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [dataConsulta, setDataConsulta] = useState(new Date());
  const [movimentacaoFinanceira, setMovimentacaoFinanceira] = useState(true);
  const [valor, setValor] = useState('');
  const [statusConsulta, setStatusConsulta] = useState('');
  const [observacao, setObservacao] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');

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
        createConsulta({
          pacienteId,
          consulta_servico,
          movimentacao_financeira,
          statusConsulta,
          observacao,
          horaInicio,
          horaFim,
          dataConsulta,
        }, navigation)
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
            onValueChange={(itemValue, itemIndex) => setServicoId(itemValue)}>
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
            onValueChange={(itemValue, itemIndex) => setStatusConsulta(itemValue)}>
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
          <DatePicker
            style={{flex: 1, width: theme.sizes.width, paddingBottom: 20}}
            date={dataConsulta}
            mode="date"
            placeholder="Data inicio"
            format="DD-MM-YYYY"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                flex: 1,
                width: 10,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                padding: 25,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: theme.fonts.MONTSERRAT,
              },
              placeholderText: {
                color: theme.colors.FONTE,
              },
            }}
            showIcon={false}
            onDateChange={date => setDataConsulta(date)}
          />
          <DatePicker
            style={{flex: 1, width: theme.sizes.width, paddingBottom: 20}}
            date={horaInicio}
            mode="time"
            placeholder="Hora inicio"
            format="HH:mm"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                flex: 1,
                width: 10,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                padding: 25,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: theme.fonts.MONTSERRAT,
              },
              placeholderText: {
                color: theme.colors.FONTE,
              },
            }}
            showIcon={false}
            onDateChange={date => setHoraInicio(date)}
          />
          <DatePicker
            style={{flex: 1, width: theme.sizes.width, paddingBottom: 20}}
            date={horaFim}
            mode="time"
            placeholder="Hora Fim"
            format="HH:mm"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                flex: 1,
                width: 10,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                padding: 25,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: theme.fonts.MONTSERRAT,
              },
              placeholderText: {
                color: theme.colors.FONTE,
              },
            }}
            showIcon={false}
            onDateChange={date => setHoraFim(date)}
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
            ref={nomeRef}
            value={valor}
            onChangeText={setValor}
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
