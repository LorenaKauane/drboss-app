import React, {forwardRef} from 'react';
import {Container, InputEstilizado} from './styles';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as theme from '~/theme';

function Input({ style, icon, ...rest }, ref) {
    return (
      <Container style={style}>
        {icon && <Icon name={icon} size={20} color={theme.colors.FONTE} />}
        <InputEstilizado {...rest} ref={ref} />
      </Container>
    );
  }

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
