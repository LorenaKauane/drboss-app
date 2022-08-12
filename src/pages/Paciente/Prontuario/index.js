import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {YellowBox, View, ScrollView, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import {
  Form,
  TextError,
  ContainerImage,
  ImagePaciente,
  RowData,
  ButtonImage,
  TextInfoWhiteBold,
  ButtonTrash,
  ProvidersList,
  TextInfoBold,
  ContainerListItemProntuario,
  ProvidersListProntuarios,
} from './styles';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import ListItemProntuario from './ListItemProntuario';
import {format} from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  createProntuario,
  getAllProntuarioPaciente,
} from '../../../store/modules/prontuario/actions';
import {dataSemHoras} from '../../../util/mask';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../services/api';
import * as theme from '../../../theme';

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
  const prontuario = useSelector(state => state.prontuario);
  const nomeRef = useRef();
  const telefone1Ref = useRef();

  const [error, setError] = useState(null);
  const [data, setData] = useState(
    format(new Date(), 'dd/MM/yyyy', {
      locale: ptBrLocale,
    })
  );
  const [anotacao, setAnotacao] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(paciente.id);
    dispatch(getAllProntuarioPaciente(paciente.id));
  }, []);

  const handleRemoveItem = item => {
    setImages(images => images.filter(image => image !== item));
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    if (images.length < 3) {
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          setImages(oldArray => [...oldArray, response.uri]);
        }
      });
    } else {
      Alert.alert('Ops!', 'Só e possivel adicionar 3 fotos!');
    }
  };

  function handleSubmit() {
    if (!data) {
      setError('Campo data está vazio');
      return '';
    }

    if (!anotacao) {
      setError('Campo anotação está vazio');
      return '';
    }

    if (!paciente.loading) {
      setError(null);

      let bodyFormData = new FormData();

      if (images && images.length > 0) {
        images.map(image =>
          bodyFormData.append('file', {
            uri: image,
            name: 'photo.png',
            filename: 'imageName.png',
            type: 'image/png',
          })
        );
      }

      bodyFormData.append('pacienteId', paciente.id);
      bodyFormData.append('data', data);
      bodyFormData.append('anotacoes', anotacao);

      dispatch(createProntuario(bodyFormData, navigation));

      return;
    }
  }

  return (
    <>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Data inicio DD/MM/YYYY"
          returnKeyType="next"
          value={dataSemHoras(data)}
          onChangeText={v => {
            if (v.length < 11) {
              setData(dataSemHoras(v));
            }
          }}
          keyboardType={'numeric'}
        />
        {/* <DatePicker
          // style={{width: 350, paddingBottom: 20, flex: 1}}
          style={{flex: 1, width: theme.sizes.width, paddingBottom: 20}}
          date={data}
          mode="date"
          placeholder="Data"
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
          onDateChange={date => setData(date)}
        /> */}
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Anotação"
          returnKeyType="next"
          value={anotacao}
          onChangeText={setAnotacao}
        />
        <RowData>
          {/* <TextInfoBold>Anexos </TextInfoBold> */}
          <ButtonImage disabled={false} onPress={handleChoosePhoto}>
            <TextInfoWhiteBold>Selecionar Anexos + </TextInfoWhiteBold>
          </ButtonImage>
        </RowData>

        <ContainerImage>
          <ProvidersList
            data={images}
            keyExtractor={image => `image_${new Date()}_${image}`}
            renderItem={data => (
              <View style={{flexDirection: 'column', padding: 5}}>
                <ImagePaciente
                  source={{
                    uri: data.item,
                  }}
                />
                <ButtonTrash onPress={() => handleRemoveItem(data.item)}>
                  <Icon
                    style={{padding: 5}}
                    name="trash"
                    color="#fff"
                    size={20}
                  />
                </ButtonTrash>
              </View>
            )}
          />
        </ContainerImage>

        {error && <TextError>{error}</TextError>}
        <Button loading={paciente.loading} onPress={handleSubmit}>
          Salvar novo prontuário
        </Button>
      </Form>

      <ScrollView style={{padding: 30}}>
        <ShimmerPlaceHolder
          autoRun={true}
          visible={prontuario.loadingProntuario}>
          {prontuario.prontuarios && prontuario.prontuarios.length > 0 ? (
            <>
              <TextInfoBold>Lista de Prontuários</TextInfoBold>
              <ProvidersListProntuarios
                data={prontuario.prontuarios}
                keyExtractor={prontuario => prontuario.id + new Date()}
                renderItem={data => <ListItemProntuario data={data} />}
              />
            </>
          ) : (
            <TextInfoBold>Sem Prontuários Cadastrados</TextInfoBold>
          )}
        </ShimmerPlaceHolder>
      </ScrollView>
    </>
  );
}
