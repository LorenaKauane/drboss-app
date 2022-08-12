function valorDinheiro(z) {
  let v = z;
  if (v) {
    v = v.replace(/\D/g, ''); // permite digitar apenas numero
    v = v.replace(/(\d{1})(\d{17})$/, '$1.$2'); // coloca ponto antes dos ultimos digitos
    v = v.replace(/(\d{1})(\d{13})$/, '$1.$2'); // coloca ponto antes dos ultimos 13 digitos
    v = v.replace(/(\d{1})(\d{10})$/, '$1.$2'); // coloca ponto antes dos ultimos 10 digitos
    v = v.replace(/(\d{1})(\d{7})$/, '$1.$2'); // coloca ponto antes dos ultimos 7 digitos
    v = v.replace(/(\d{1})(\d{1,2})$/, '$1.$2'); // coloca virgula antes dos ultimos 4 digitos
    z = v;
    return z;
  }
}

function cpfMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function cnpjMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function phoneMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
}

function cepMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

function dataSemHoras(value) {
  if (value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  }
}

function dataHoras(value) {
  if (value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1:$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }
}

export {
  cpfMask,
  cnpjMask,
  phoneMask,
  cepMask,
  dataSemHoras,
  valorDinheiro,
  dataHoras,
};
