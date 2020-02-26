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
import api from '~/services/api';

import {deleteConsulta} from '~/store/modules/consulta/actions';

const ListConsulta = ({data}) => {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    const res = await api.delete(`consulta/${id}`);

    if (res.status === 200) {
      dispatch(deleteConsulta({id}));
    } else {
      Alert.alert('Falha!', 'Falhou ao deletar Consulta');
    }
  };

  const alertDeleteConsulta = id => {
    Alert.alert(
      'Alerta',
      'Deseja realmente excluir essa consulta?',
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
      <Container
        color={(data.statusConsulta && data.statusConsulta.cor) || '#fff'}>
        <Avatar
          source={{
            uri: `${api.defaults.baseURL}uploads/paciente/${
              data.paciente.image ? data.paciente.image : 'SEMFOTO.png'
            }`,
          }}
          foto={data.paciente.image}
        />
        <ContainerPaciente>
          <TextNomePaciente>
            {data.paciente.nome.length > 30
              ? data.paciente.nome.substring(0, 30) + '...'
              : data.paciente.nome || ''}
          </TextNomePaciente>
          <TextData>
            {data.paciente.endereco && data.paciente.endereco.length > 30
              ? data.paciente.endereco.substring(0, 30) + '...'
              : data.paciente.endereco}
            {''}
          </TextData>
          <TextData>
            {data.paciente.cidade && data.paciente.cidade.length > 30
              ? data.paciente.cidade.substring(0, 30) + '...'
              : data.paciente.cidade || ''}
          </TextData>
          <TextData>
            {data.consulta_servico && data.consulta_servico.length > 0
              ? data.consulta_servico[0].servico.nome.substring(0, 30) + '...'
              : data.consulta_servico[0].servico.nome}
          </TextData>
        </ContainerPaciente>
        <ContainerData>
          <TextData>{data.horaInicio}</TextData>
          <TextData> - </TextData>
          <TextData>{data.horaFim}</TextData>
        </ContainerData>
        <ContainerDataButton onPress={() => alertDeleteConsulta(data.id)}>
          <Icon name="trash" color="#fff" size={25} />
        </ContainerDataButton>
      </Container>
    </ScrollView>
  );
};

export default ListConsulta;
