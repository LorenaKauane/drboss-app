import React, {useState, useRef} from 'react';
// import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  KeyBoard,
  Inner,
  TituloPagina,
  LogoTexto,
  Secao,
  Form,
  TextError,
  RedirectLogin,
  TextTermoCondicao,
  HeaderBackground,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Separator from '../../components/Separator';
import {signUpRequest} from '../../store/modules/auth/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as theme from '../../theme';

export default function Cadastro({navigation}) {
  const dispatch = useDispatch();
  const nomeRef = useRef();
  const emailRef = useRef();

  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    if (!nome) {
      setError('Campo nome está vazio');
      return '';
    }

    if (!email) {
      setError('Campo e-mail está vazio');
      return '';
    }

    if (!senha) {
      setError('Campo senha está vazio');
      return '';
    }

    if (!loading) {
      setError(null);
      console.log(navigation)
      dispatch(signUpRequest(nome, email, senha, navigation));
      return ;
    }
  }

  return (
    <KeyBoard>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Inner>
          <HeaderBackground>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Icon
                style={{marginRight: theme.sizes.WIDTH - 60}}
                name="chevron-left"
                color="#fff"
                size={20}
              />
            </TouchableOpacity>

            <TituloPagina>Cadastro</TituloPagina>
            <LogoTexto>DrBoss</LogoTexto>
          </HeaderBackground>
          <Form>
            {error && <TextError>{error}</TextError>}
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => nomeRef.current.focus()}
              value={nome}
              onChangeText={setNome}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              icon="envelope-o"
              placeholder="E-mail"
              returnKeyType="next"
              ref={nomeRef}
              onSubmitEditing={() => emailRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              icon="lock"
              secureTextEntry={true}
              ref={emailRef}
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={senha}
              onChangeText={setSenha}
            />

            <Button loading={loading} disabled={loading} onPress={handleSubmit}>
              Salvar
            </Button>

            <Separator />
            <Secao>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <RedirectLogin>Já tem cadastro? Clique aqui!</RedirectLogin>
              </TouchableOpacity>
            </Secao>
            <Secao>
              <TouchableOpacity>
                <TextTermoCondicao>Termos e condições</TextTermoCondicao>
              </TouchableOpacity>
            </Secao>
          </Form>
        </Inner>
      </TouchableWithoutFeedback>
    </KeyBoard>
  );
}
