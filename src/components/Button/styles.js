import styled from 'styled-components/native';
import * as theme from '../../theme';

export const Container = styled.TouchableOpacity`
  height: 49px;
  background: ${theme.colors.AZUL_ESCURO};
  border-radius: ${theme.sizes.RADIUS_BUTTON};

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: bold;
  font-size: 20px;
  font-family:${theme.fonts.MONTSERRAT_BOLD}
`;
