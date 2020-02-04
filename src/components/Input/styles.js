import styled from 'styled-components/native';
import * as theme from '~/theme';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  flex-direction: row;
  align-items: center;

  margin-bottom:36;
  border-color:${theme.colors.FONTE};
  border-bottom-width:1;
`;


export const InputEstilizado = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.FONTE,
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: ${theme.colors.FONTE};
  font-family:${theme.fonts.MONTSERRAT}
`;
