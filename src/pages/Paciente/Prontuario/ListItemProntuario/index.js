import React from 'react';
import {useDispatch} from 'react-redux';
import {Alert, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  TextData,
  ContainerData,
  ContainerPaciente,
  TextNomePaciente,
  ProvidersList,
  ImagePaciente,
} from './styles';
import api from '~/services/api';
import {deleteProntuario} from '~/store/modules/prontuario/actions';

const ListItemProntuario = ({data, navigation}) => {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    console.log('res', id);
    const res = await api.delete(`prontuario/${id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(deleteProntuario({id}));
    } else {
      Alert.alert('Falha!', 'Falhou ao deletar Paciente');
    }
  };

  const alertDeleteProntuario = id => {
    Alert.alert(
      'Alerta',
      'Deseja realmente excluir esse prontuário?',
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
          <TextNomePaciente>{data.item.data}</TextNomePaciente>

          <TextData>
            {data.item.anotacoes && data.item.anotacoes > 30
              ? data.item.anotacoes.substring(0, 30) + '...'
              : data.item.anotacoes}
          </TextData>
          <ProvidersList
            data={data.item.prontuario_anexo}
            keyExtractor={prontuario_anexo =>
              `prontuario_anexo${new Date()}_${prontuario_anexo.id}`
            }
            renderItem={prontuario_anexo => (
              <View style={{flexDirection: 'column', padding: 5}}>
                <ImagePaciente
                  source={{
                    uri: `${api.defaults.baseURL}uploads/prontuario/${
                      prontuario_anexo.item.foto
                        ? prontuario_anexo.item.foto
                        : 'SEMFOTO.png'
                    }`,
                  }}
                />
              </View>
            )}
          />
        </ContainerPaciente>
        <ContainerData onPress={() => alertDeleteProntuario(data.item.id)}>
          <Icon name="trash" color="#fff" size={25} />
        </ContainerData>
      </Container>
    </ScrollView>
  );
};

export default ListItemProntuario;
