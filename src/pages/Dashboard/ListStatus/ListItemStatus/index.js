import React from 'react';
import {Container, Row, CircleColor, TextStatus} from './styles';

const ListItemStatus = ({item}) => {
  return (
    <Container>
      <Row>
        <CircleColor color={item.cor} />
        <TextStatus> {item.nome}</TextStatus>
      </Row>
    </Container>
  );
};

export default ListItemStatus;
