import {Platform} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '~/theme';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
`;

// export const Inner = styled.ScrollView.attrs({
//   showsVerticalScrollIndicator: false,
//   contentContainerStyle: {padding: 30},
// })`
//   align-self: stretch;
// `;

export const Inner = styled.View`
  padding: 30px;
  align-self: stretch;
`;

export const HeaderBackground = styled(LinearGradient).attrs({
  colors: [theme.colors.AZUL_PRINCIPAL, theme.colors.AZUL_ESCURO],
})`
  height: ${theme.sizes.IMAGE_HEIGHT - 25};
  border-bottom-left-radius: 60;
  border-bottom-right-radius: 60;
`;

export const RowHeader = styled.View`
  flex-direction: row;
  height: 50;
  margin-top: ${Platform.OS == 'ios' ? 20 : 0};
  align-items: center;
`;

export const ContainerAvatar = styled.View`
  flex: 1;
  flex-direction: row;
  padding-right: 15;
  justify-content: flex-end;
`;

export const RowInformation = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const Search = styled.View`
  flex: 1;
`;

export const FormInput = styled(Input)`
  background-color: ${theme.colors.AZUL_CLARO};
  flex: 4;
  flex-direction: row;
  border-radius: 50;
  border-bottom-width: 0;
`;

export const ContainerHeader = styled.View`
  justify-content: center;
  flex: 1;
  padding: 20px;
`;

export const ContainerStatus = styled.View`
  justify-content: flex-end;
  flex: 1;
  padding-top: 35px;
  padding-bottom: 35px;
  padding-left: 50px;
`;
export const TextLeft = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  color: ${theme.colors.WHITE};
  justify-content: center;
  font-size: ${35};
`;

export const TextTotal = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  color: ${theme.colors.WHITE};
  justify-content: center;
  font-size: ${15};
`;

export const TextBemVindo = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  color: ${theme.colors.WHITE};
  justify-content: center;
  font-size: ${20};
`;

export const FooterContainer = styled.View`
  align-items: center;
`;

export const BotaoCadastraConsulta = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${70};
  height: ${70};
  bottom: 25;
  border-radius: ${theme.sizes.CIRCLE};
  background-color: ${theme.colors.AZUL_ESCURO};
  elevation: 20;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const RowData = styled.View`
  padding: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextData = styled.Text`
  font-family: ${props =>
    props.isShowListConsulta
      ? theme.fonts.MONTSERRAT_BOLD
      : theme.fonts.MONTSERRAT};
  font-size: 16;
  color: ${theme.colors.FONTE};
`;

export const TextMes = styled.Text`
    font-family: ${props =>
    !props.isShowListConsulta
      ? theme.fonts.MONTSERRAT_BOLD
      : theme.fonts.MONTSERRAT};
  font-size: 16;
  color: ${theme.colors.FONTE};
`;
