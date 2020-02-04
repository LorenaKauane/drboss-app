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
import {createServico, getAllServico} from '~/store/modules/servico/actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import ListItemServico from './ListItemServico';
export default Servico = ({navigation}) => {
  const dispatch = useDispatch();
  const servico = useSelector(state => state.servico);
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const nomeRef = useRef();

  useEffect(() => {
    navigation.setParams({
      nomeTela: 'Serviço',
    });
    dispatch(getAllServico());
  }, []);

  useEffect(() => {
    setNome('');
    setValor('');
  }, [servico.servicos]);

  function handleSubmit() {
    if (!nome) {
      setError('Campo Serviço está vazio');
      return '';
    }

    if (!valor) {
      setError('Campo valor está vazio');
      return '';
    }

    if (!servico.loading) {
      setError(null);

      dispatch(createServico({nome, valor}));

      return;
    }
  }

  return (
    <Container>
      <Inner>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Serviço"
            returnKeyType="next"
            onSubmitEditing={() => nomeRef.current.focus()}
            value={nome}
            onChangeText={setNome}
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Valor"
            returnKeyType="next"
            ref={nomeRef}
            value={valor}
            onChangeText={setValor}
            keyboardType={'numeric'}
          />
          {error && <TextError>{error}</TextError>}
          <Button loading={!servico.loadingProntuario} onPress={handleSubmit}>
            Salvar
          </Button>

          <TextInfoBold>Lista de Serviços</TextInfoBold>
          <ScrollView>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={servico.loadingProntuario}>
              {servico.servicos && servico.servicos.length > 0 ? (
                <List
                  data={servico.servicos}
                  keyExtractor={data => String(data.id)}
                  renderItem={data => <ListItemServico data={data} />}
                />
              ) : (
                <TextInfoBold>Sem servicos cadastrados</TextInfoBold>
              )}
            </ShimmerPlaceHolder>
          </ScrollView>
        </Form>
      </Inner>
    </Container>
  );
};

Servico.navigationOptions = {
  header: ({navigation}) => {
    let nomeTela = '';
    if (navigation.state.routes) {
      let router = navigation.state.routes.find(
        item => item.routeName == 'Servico'
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

// export default Servico;
