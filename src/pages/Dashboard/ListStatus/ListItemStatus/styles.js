import styled from 'styled-components/native';
import * as theme from '../../../../theme';

export const Container = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const CircleColor = styled.Text`
  border-radius:${theme.sizes.CIRCLE};
  width:14;
  height:14;
  background-color:  ${props => props.color || theme.colors.WHITE};
`;

export const TextStatus = styled.Text`
  font-family:${theme.fonts.MONTSERRAT};
  font-size:15;
  margin-top:-5;
  color:${theme.colors.WHITE}
`;

