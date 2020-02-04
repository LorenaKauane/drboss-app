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

export const ContainerImage = styled.TouchableOpacity`
  align-items: center;
`;

export const TextInfo = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT};
  padding: 10px;
  color: ${theme.colors.FONTE};
`;
export const TextInfoBold = styled.Text`
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  padding: 10px;
  color: ${theme.colors.FONTE};
`;

export const ImagePaciente = styled.Image`
  border-radius: ${theme.sizes.CIRCLE};
  padding: 10px;
  width: 100;
  height: 100;
`;
