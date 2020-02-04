import {Platform} from 'react-native';
import styled from 'styled-components/native';
import * as theme from '~/theme';

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
`;

export const TextError = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  font-size: 15;
  align-items: center;
  padding: 5px;
  color: red;
`;

export const ContainerImage = styled.View`
  padding: 10px;
  flex-direction: column;
`;

export const ContainerListItemProntuario = styled.View`
  padding-right: 30px;
  padding-left: 30px;
  flex-direction: column;
`;

export const ButtonImage = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  background-color: ${theme.colors.AZUL_ESCURO};
  border-radius: 7;
`;

export const ButtonTrash = styled.TouchableOpacity`
  background-color: #ff9d8b;
  align-items: center;
  border-radius: ${theme.sizes.CIRCLE};
  width: 50;
  height: 30;
  margin-top: 5px;
`;

export const TextInfo = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  padding: 10px;
  color: ${theme.colors.FONTE};
`;
export const TextInfoBold = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  /* padding: 10px; */
  color: ${theme.colors.FONTE};
`;

export const TextInfoWhiteBold = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  /* padding: 10px; */
  color: ${theme.colors.WHITE};
`;

export const ImagePaciente = styled.Image`
  border-radius: ${theme.sizes.CIRCLE};
  padding: 10px;
  width: 50;
  height: 50;
`;

export const RowData = styled.View`
  /* padding: 30px 30px 0px; */
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;

export const ProvidersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 5,
})``;

export const ProvidersListProntuarios = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  // numColumns: 2,
})`
  align-self: stretch;
`;
