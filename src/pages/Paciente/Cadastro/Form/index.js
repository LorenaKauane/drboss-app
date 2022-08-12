import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { YellowBox,  SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import ImagePicker from 'react-native-image-picker';
import {
  Form,
  TextError,
  ContainerImage,
  TextInfo,
  ImagePaciente,
  RowData,
  TextInfoBold,
} from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Separator from '../../../../components/Separator';
import {createPaciente, alterPaciente} from '../../../../store/modules/paciente/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../../services/api';
import * as theme from '../../../../theme';

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
  const nomeRef = useRef();
  const telefone1Ref = useRef();

  const [error, setError] = useState(null);
  const [nome, setNome] = useState(paciente.nome);
  const [telefone1, setTelefone1] = useState(paciente.telefone1);
  const [tipoPaciente, setTipoPaciente] = useState(paciente.tipoPaciente);
  const [image, setImage] = useState(
    `${api.defaults.baseURL}uploads/paciente/${
      paciente.image ? paciente.image : 'SEMFOTO.png'
    }`
  );

  const [endereco, setEndereco] = useState(paciente.endereco);
  const [observacao, setObservacao] = useState(paciente.observacao);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setImage(response.uri);
      }
    });
  };

  function handleSubmit() {
    if (!nome) {
      setError('Campo nome está vazio');
      return '';
    }

    if (!paciente.loading) {
      setError(null);

      let bodyFormData = new FormData();

      if (!image.includes('SEMFOTO.png')) {
        bodyFormData.append('file', {
          uri: image,
          name: 'photo.png',
          filename: 'imageName.png',
          type: 'image/png',
        });
      }

      bodyFormData.append('nome', nome);
      bodyFormData.append('telefone1', telefone1 ? telefone1 : '');
      bodyFormData.append('tipoPaciente', tipoPaciente ? tipoPaciente : '');
      bodyFormData.append('endereco', endereco ? endereco : '');
      bodyFormData.append('observacao', observacao ? observacao : '');

      if (paciente.id) {
        bodyFormData.append('id', paciente.id);
        dispatch(alterPaciente(bodyFormData, navigation));
      } else {
        dispatch(createPaciente(bodyFormData, navigation));
      }

      return;
    }
  }

  return (
    <Form>
      <ContainerImage onPress={handleChoosePhoto}>
        <TextInfo>Selecione foto do paciente</TextInfo>
        <ImagePaciente
          source={{
            uri: image,
          }}
        />
      </ContainerImage>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome"
        returnKeyType="next"
        onSubmitEditing={() => nomeRef.current.focus()}
        value={nome}
        onChangeText={setNome}
      />
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        ref={nomeRef}
        placeholder="Telefone"
        returnKeyType="send"
        onSubmitEditing={() => telefone1Ref.current.focus()}
        value={telefone1}
        onChangeText={setTelefone1}
      />
      <TextInfoBold>Dados do endereço</TextInfoBold>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Endereço"
        returnKeyType="next"
        ref={telefone1Ref}
        value={endereco}
        onChangeText={setEndereco}
      />

      <Picker
        selectedValue={tipoPaciente}
        style={{
          flex: 1,
        }}
        onValueChange={(itemValue, itemIndex) => setTipoPaciente(itemValue)}>
        <Picker.Item label="Selecione o tipo Paciente" value="" />
        <Picker.Item label="Particular" value="Particular" />
        <Picker.Item label="Convenio" value="Convenio" />
      </Picker>

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Observação"
        returnKeyType="next"
        value={observacao}
        onChangeText={setObservacao}
      />

      {/* <Input
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="E-mail"
      returnKeyType="next"
      ref={nomeRef}
      onSubmitEditing={() => emailRef.current.focus()}
      value={email}
      onChangeText={setEmail}
    /> */}
      {/* Nascimento - components */}
      {/* <DatePicker
      style={{width: 350, padding: 10, flex: 1}}
      date={nascimento}
      mode="date"
      placeholder="Data de nascimento"
      format="DD-MM-YYYY"
      confirmBtnText="OK"
      cancelBtnText="Cancel"
      customStyles={{
        dateInput: {
          flex: 1,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          padding: 20,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          fontFamily: theme.fonts.MONTSERRAT,
        },
        placeholderText: {
          color: theme.colors.FONTE,
        },
      }}
      showIcon={false}
      onDateChange={date => {
        setNascimento(date);
      }}
    /> */}

      {/* <RowRadioButton>
      <TextInfo>Feminino</TextInfo>
      <RadioButton onPress={() => setSexo('Feminino')}>
        {sexo === 'Feminino' && <RadioButtonSelected />}
      </RadioButton>

      <TextInfo>Masculino</TextInfo>
      <RadioButton onPress={() => setSexo('Masculino')}>
        {sexo === 'Masculino' && <RadioButtonSelected />}
      </RadioButton>
    </RowRadioButton> */}
      {/* <Input
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Bairro"
      returnKeyType="next"
      value={bairro}
      onChangeText={setBairro}
    />
    <Input
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Cidade"
      returnKeyType="next"
      value={cidade}
      onChangeText={setCidade}
    /> */}
      {/*
    <TextInfoBold>Plano de saúde</TextInfoBold>
    <Input
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Nome convenio"
      returnKeyType="next"
      value={nomeConvenio}
      onChangeText={setNomeConvenio}
    /> */}

      {/* <Button loading={loading} disabled={loading} onPress={handleSubmit}>
    Salvar
  </Button> */}
      {error && <TextError>{error}</TextError>}
      <Button loading={paciente.loading} onPress={handleSubmit}>
        Salvar
      </Button>

      <Separator />
    </Form>
  );
}
