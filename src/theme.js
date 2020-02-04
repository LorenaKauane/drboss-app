import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width / 7;

export const colors = {
  BLACK: '#000',
  WHITE: '#FFF',
  GRAY: '#DCE9',
  AZUL_CLARO:'#eefcfc',
  AZUL_PRINCIPAL: '#03e5ed',
  AZUL_ESCURO: '#009bf9',
  FONTE: '#324b4b',
};


export const fonts = {
  MONTSERRAT: 'Montserrat',
  MONTSERRAT_BOLD: 'Montserrat-Bold',
};

export const sizes = {
  BASE: 16,
  FONT: 14,
  PADDING: 36,
  MARGIN: 36,
  TITLE: 24,
  RADIUS_BUTTON: 10,
  WIDTH: window.width,
  HEIGHT: window.height,
  IMAGE_HEIGHT: IMAGE_HEIGHT,
  IMAGE_HEIGHT_SMALL: IMAGE_HEIGHT_SMALL,
  CIRCLE: Math.round(window.width + window.height) / 2
};
