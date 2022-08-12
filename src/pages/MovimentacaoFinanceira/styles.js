import {Platform} from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

export const KeyBoard = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : null,
})`
  flex: 1;
  background-color: ${theme.colors.WHITE};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Inner = styled.View`
  padding: 0 30px;
  align-self: stretch;
`;
export const HeaderBackground = styled(LinearGradient).attrs({
  colors: [theme.colors.AZUL_PRINCIPAL, theme.colors.AZUL_ESCURO],
})`
  height: 80;
  border-bottom-left-radius: 60;
  border-bottom-right-radius: 60;
  padding-top: 30px;
`;

export const TituloPagina = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  font-size: 25;
  padding-bottom: 10px;
  color: ${theme.colors.WHITE};
  top: 14;
`;

export const RowHeader = styled.View`
  flex-direction: row;
  height: 50;
  margin-top: ${Platform.OS == 'ios' ? 20 : 0};
`;

export const TextInfoBold = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  padding: 10px;
  color: ${theme.colors.FONTE};
`;

export const TextError = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  font-size: 15;
  align-items: center;
  padding: 5px;
  color: red;
`;

export const RowData = styled.View`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextData = styled.Text`
  font-family: ${props =>
    props.isShowForm ? theme.fonts.MONTSERRAT_BOLD : theme.fonts.MONTSERRAT};
  font-size: 16;
  color: ${theme.colors.FONTE};
`;

export const TextProntuario = styled.Text`
  font-family: ${props =>
    !props.isShowForm ? theme.fonts.MONTSERRAT_BOLD : theme.fonts.MONTSERRAT};
  font-size: 16;
  color: ${theme.colors.FONTE};
`;

export const ContainerDataButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.AZUL_ESCURO};
  padding: 10px;

  margin-bottom: 36;
  border-radius: ${theme.sizes.RADIUS_BUTTON};
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
})`
  align-self: stretch;
`;

export const ContainerData = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.AZUL_ESCURO};
  padding: 10px;
  margin-bottom: 25px;
  border-radius: ${theme.sizes.RADIUS_BUTTON};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  // contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;
