import React from 'react';
import {useDispatch} from 'react-redux';
import {Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  TextData,
  ContainerData,
  ContainerPaciente,
  TextNomePaciente,
} from './styles';
import {deleteServico} from '~/store/modules/servico/actions';
import api from '~/services/api';
const ListItemServico = ({data}) => {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    const res = await api.delete(`servico/${id}`);

    if (res.status === 200) {
      dispatch(deleteServico({id}));
    } else {
      Alert.alert('Falha!', 'Falhou ao deletar Servico');
    }
  };

  const alertDeleteServico = id => {
    Alert.alert(
      'Alerta',
      'Deseja realmente excluir esse serviço?',
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
            {data.item.nome && data.item.nome.length > 30
              ? data.item.nome.substring(0, 30) + '...'
              : data.item.nome}
            , R${' '}
            {data.item.valor && data.item.valor.length > 30
              ? data.item.valor.substring(0, 30) + '...'
              : data.item.valor}
          </TextNomePaciente>
        </ContainerPaciente>
        <ContainerData onPress={() => alertDeleteServico(data.item.id)}>
          <Icon name="trash" color="#fff" size={25} />
        </ContainerData>
      </Container>
    </ScrollView>
  );
};

export default ListItemServico;
