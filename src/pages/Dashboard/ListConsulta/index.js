import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Container,
  TextData,
  ContainerData,
  ContainerPaciente,
  TextNomePaciente,
  Avatar
} from './styles';
import api from '~/services/api';
const ListConsulta = ({data}) => {

  const teste = () => {
    console.log('entrou :C')
  }
  return (
    <Container onPress={teste}  color={data.statusConsulta && data.statusConsulta.cor || '#fff' }>
      <Avatar source={{ uri:`${api.defaults.baseURL}uploads/paciente/${data.paciente.image ? data.paciente.image:'SEMFOTO.png'}`}} foto={data.paciente.image}/>
      <ContainerPaciente>
        <TextNomePaciente>
          {data.paciente.nome.length > 30
            ? data.paciente.nome.substring(0, 30) + '...'
            : data.paciente.nome || ''}
        </TextNomePaciente>
        <TextData>
          {data.paciente.endereco && data.paciente.endereco.length > 30
            ? data.paciente.endereco.substring(0, 30) + '...'
            : data.paciente.endereco }{''}
        </TextData>
        <TextData>
          {data.paciente.cidade && data.paciente.cidade.length > 30
            ? data.paciente.cidade.substring(0, 30) + '...'
            : data.paciente.cidade || ''}
        </TextData>
        <TextData>
          {data.consulta_servico && data.consulta_servico.length > 0
            ? data.consulta_servico[0].servico.nome.substring(0, 30) + '...'
            : data.consulta_servico[0].servico.nome}
        </TextData>
      </ContainerPaciente>
      <ContainerData>
        <TextData>{data.horaInicio}</TextData>
        <TextData> - </TextData>
        <TextData>{data.horaFim}</TextData>
      </ContainerData>
    </Container>
  );
};

export default ListConsulta;
