import React, {useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {
  KeyBoard,
  Inner,
  HeaderBackground,
  TituloPagina,
  LogoTexto,
  Secao,
  Form,
  TextoCadastro,
  TextError,
  TextTermoCondicao
} from './styles';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Separator from '~/components/Separator'
import { signInRequest } from '~/store/modules/auth/actions';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const emailRef = useRef();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const loading = useSelector(state => state.auth.loading);
  const handleSubmit = () => {
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
      dispatch(signInRequest(email, senha));
      return ;
    }

  };

  return (
    <KeyBoard>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Inner>
          <HeaderBackground>
            <TituloPagina>Login</TituloPagina>
            <LogoTexto>DrBoss</LogoTexto>
          </HeaderBackground>
          <Form>
          {error && <TextError>{error}</TextError>}
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              icon="envelope-o"
              placeholder="E-mail"
              returnKeyType="next"
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

            <Button loading={loading} disabled={loading} onPress={handleSubmit}>Entrar</Button>
            <Separator />
            <Secao>
              <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
                <TextoCadastro>Cadastre-se</TextoCadastro>
              </TouchableOpacity>
            </Secao>
            {/* <Secao>
              <TouchableOpacity>
                <TextEsqueceuSenha>Esqueceu a senha?</TextEsqueceuSenha>
              </TouchableOpacity>
            </Secao> */}
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
