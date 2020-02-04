import {Platform} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '~/theme';

export const KeyBoard = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : null,
})`
  flex: 1;
  background-color:${theme.colors.WHITE};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Inner = styled.View`
  justify-content: flex-end;
`;

export const HeaderBackground =  styled(LinearGradient).attrs({
  colors: [theme.colors.AZUL_PRINCIPAL, theme.colors.AZUL_ESCURO  ],
})`
  height:${theme.sizes.IMAGE_HEIGHT - 38};
  border-bottom-left-radius:${theme.sizes.IMAGE_HEIGHT };
  border-bottom-right-radius:${theme.sizes.IMAGE_HEIGHT };
  justify-content: center;
  align-items: center;
`;

export const TituloPagina = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  font-size: 25;
  padding-bottom:10px;
  color: ${theme.colors.WHITE};
`;

export const LogoTexto = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: 50;
  padding-bottom:10px;
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
`;

export const Secao = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
`;

export const TextoCadastro = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  padding: 0 10px;
  font-size: 20;
  align-items: center;
  color: ${theme.colors.FONTE};
`;

export const TextEsqueceuSenha = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  padding: 25px;
  font-size: 20;
  align-items: center;
  color: ${theme.colors.FONTE};
`;

export const TextTermoCondicao = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  font-size: 15;
  align-items: center;
  padding:20px;
  color: ${theme.colors.FONTE};
`;

export const TextError = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  font-size: 15;
  align-items: center;
  padding:5px;
  color: red;
`;
