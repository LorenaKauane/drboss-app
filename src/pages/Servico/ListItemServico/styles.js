import styled from 'styled-components/native';
import * as theme from '../../../theme';

// ou view
export const Container = styled.TouchableOpacity`
  flex: 1;
  height: 50;
  margin-top: 16;
  background-color: ${props => props.color || theme.colors.AZUL_CLARO};
  padding: 16px;
  border-radius: 8;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 1;
  /* opacity: 0.7; */
`;

export const ContainerPaciente = styled.View`
  flex: 1;
  padding-left: 15px;
  flex-direction: column;
  align-items: flex-start;
`;

export const ContainerData = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  background-color: #ff9d8b;
  padding: 5px;
  border-radius: ${theme.sizes.RADIUS_BUTTON};
`;

export const TextData = styled.Text`
  color: ${theme.colors.FONTE};
  font-family: ${theme.fonts.MONTSERRAT};
  font-size: ${theme.sizes.FONT};
`;

export const TextNomePaciente = styled.Text`
  color: ${theme.colors.FONTE};
  font-family: ${theme.fonts.MONTSERRAT_BOLD};
  font-size: ${theme.sizes.FONT};
`;
