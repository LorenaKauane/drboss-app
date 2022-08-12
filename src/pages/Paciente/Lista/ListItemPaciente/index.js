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
  Avatar,
} from './styles';
import api from '../../../../services/api';
import {
  deletePaciente,
  selecionaPaciente,
} from '../../../../store/modules/paciente/actions';

const ListItemPaciente = ({data, navigation}) => {
  const dispatch = useDispatch();

  const editaPaciente = () => {
    dispatch(selecionaPaciente(data));
    navigation.navigate('CadastroPaciente');
  };

  const handleDelete = async id => {
    const res = await api.delete(`paciente/${id}`);

    if (res.status === 200) {
      dispatch(deletePaciente({id}));
    } else {
      Alert.alert('Falha!', 'Falhou ao deletar Paciente');
    }
  };

  const alertDeletePaciente = id => {
    Alert.alert(
      'Alerta',
      'Deseja realmente excluir esse paciente?',
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
      <Container onPress={editaPaciente}>
        <Avatar
          source={{
            uri: `${api.defaults.baseURL}uploads/paciente/${
              data.image ? data.image : 'SEMFOTO.png'
            }`,
          }}
          foto={data.image}
        />

        <ContainerPaciente>
          <TextNomePaciente>
            {data.nome.length > 30
              ? data.nome.substring(0, 30) + '...'
              : data.nome}
          </TextNomePaciente>
          <TextData>
            {data.endereco && data.endereco.length > 30
              ? data.endereco.substring(0, 30) + '...'
              : data.endereco}
          </TextData>
          <TextData>
            {data.telefone1 && data.telefone1.length > 30
              ? data.telefone1.substring(0, 30) + '...'
              : data.telefone1}
          </TextData>
          {/* <TextData>
          {data.plano_saude && data.plano_saude.nomeConvenio.length > 30
            ? data.plano_saude.nomeConvenio.substring(0, 30) + '...'
            : data.plano_saude.nomeConvenio}
        </TextData> */}
        </ContainerPaciente>
        <ContainerData onPress={() => alertDeletePaciente(data.id)}>
          <Icon name="trash" color="#fff" size={25} />
        </ContainerData>
      </Container>
    </ScrollView>
  );
};

export default ListItemPaciente;
