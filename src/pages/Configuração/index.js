import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import {signOut} from '~/store/modules/auth/actions';
import Button from '~/components/Button';

export default Configuracao = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    navigation.setParams({
      nomeTela: 'Configuração',
    });
  }, []);

  function sair() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Inner>
        <Form>
          <TextInfoBold>Nome: {auth.usuario.nome}</TextInfoBold>
          <TextInfoBold>Seu plano: Free</TextInfoBold>
          <TextInfoBold>Deseja mudar de plano? Acesse nosso site!</TextInfoBold>
          <Button onPress={sair}>Sair</Button>
        </Form>
      </Inner>
    </Container>
  );
};

Configuracao.navigationOptions = {
  header: ({navigation}) => {
    let nomeTela = '';
    if (navigation.state.routes) {
      let router = navigation.state.routes.find(
        item => item.routeName == 'Configuracao'
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
