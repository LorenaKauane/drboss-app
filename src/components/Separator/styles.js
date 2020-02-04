import styled from 'styled-components/native';
import * as theme from '~/theme';

export const Separator = styled.View`
  border-radius: 1;
  border-style: dashed;
  border-width: 1;
  border-color: ${theme.colors.FONTE};
  height: 1px;
  margin: 20px 0 30px;
`;
