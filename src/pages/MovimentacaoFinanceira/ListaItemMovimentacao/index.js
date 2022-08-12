import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  TextData,
  ContainerData,
  ContainerPaciente,
  TextNomePaciente,
  Avatar,
  ContainerDataButton,
} from './styles';
import {format, parseISO} from 'date-fns';
import api from '../../../services/api';
import {valorDinheiro} from '../../../util/mask';
import {deleteMovimentacaoFinanceira} from '../../../store/modules/movimentacaoFinanceira/actions';

const ListaItemMovimentacao = ({data}) => {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    const res = await api.delete(`movimentacao-financeira/${id}`);

    if (res.status === 200) {
      dispatch(deleteMovimentacaoFinanceira({id}));
    } else {
      Alert.alert('Falha!', 'Falhou ao deletar Movimentação');
    }
  };

  const alertDeleteMovimentacao = id => {
    Alert.alert(
      'Alerta',
      'Deseja realmente excluir essa Movimentação?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'OK', onPress: () => handleDelete(id)},
      ],
      {cancelable: false}
    );
  };

  return (
    <ScrollView>
      <Container>
        <ContainerPaciente>
          <TextNomePaciente>
            {data.item.consultum
              ? data.item.consultum.paciente.nome.length > 30
                ? data.item.consultum.paciente.nome.substring(0, 30) + '...'
                : data.item.consultum.paciente.nome || ''
              : 'Movimentação Realizada sem consulta'}
          </TextNomePaciente>
          {data.item.consultum ? (
            <TextData>{data.item.consultum.statusConsulta.nome}</TextData>
          ) : null}

          <TextData>
            {data.item.consultum
              ? data.item.consultum.dataConsulta.substring(0, 9)
              : format(parseISO(data.item.createdAt), 'dd/MM/yyyy')}
          </TextData>
          <TextData>R$ {data.item.valor}</TextData>
        </ContainerPaciente>
        {data.item.consultum ? (
          <ContainerData>
            <TextData>{data.item.consultum.horaInicio}</TextData>
            <TextData> - </TextData>
            <TextData>{data.item.consultum.horaFim}</TextData>
          </ContainerData>
        ) : null}
        <ContainerDataButton
          onPress={() => alertDeleteMovimentacao(data.item.id)}>
          <Icon name="trash" color="#fff" size={25} />
        </ContainerDataButton>
      </Container>
    </ScrollView>
  );
};

export default ListaItemMovimentacao;
