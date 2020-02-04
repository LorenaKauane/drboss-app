import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEnum} from '~/store/modules/enum/actions';
import ListItem from './ListItemStatus';
import {Container, TextCarregando} from './styles';

const ListStatus = () => {
  const dispatch = useDispatch();
  const [statusList, setStatusList] = useState([]);

  const enumStatusConsulta = useSelector(state => state.enums);

  useEffect(() => {
    dispatch(getEnum());
  }, []);

  return (
    <Container>
      {enumStatusConsulta.loading && (
        <TextCarregando>Carregando...</TextCarregando>
      )}

      {enumStatusConsulta.enums !== null &&
        enumStatusConsulta.enums.statusConsulta.map((item, key) => <ListItem key={item.nome} item={item}/>)}

      {/* <Text> {JSON.stringify(enumStatusConsulta)} </Text> */}
    </Container>
  );
};

export default ListStatus;
