import {
  ANGULAR, BOOTSTRAP, CORDOVA, CSS3, GIT, HTML5, IONIC, JAVASCRIPT, JQUERY, Language,
  MATERIALIZE, MONGODB, MYSQL, NODEJS, PHP,
} from './languages';

export interface Experiencia {
  nombreToSelector: string;
  urlImagen: string;
  color: string;
  colorText: string;
  titulo: string;
  descripcion: string;
  lenguajesAprendidos: Language[];
}

export const EMPRESAS: Experiencia[] = [
  {
    nombreToSelector: 'excelsys',
    urlImagen: '/public/landing/img/empresas/excelsys2.png',
    color: '#9c1c1d',
    colorText: '#9c1c1d',
    titulo: 'Excelsys',
    descripcion:
      'Fue en esta empresa donde desarrolle las primeras habilidades con la presentación de una pagina, cambiar textos, acomodar elementos, también aprendí mas de codigo y funcionalidades, manejo de eventos y cosas que enriquecen la experiencia de usuario.',
    lenguajesAprendidos: [JAVASCRIPT, JQUERY, HTML5, CSS3],
  },
  {
    nombreToSelector: 'grimorum',
    urlImagen: '/public/landing/img/empresas/grimorum.png',
    color: '',
    colorText: '#ec6608',
    titulo: 'Grimorum',
    descripcion:
      'Aquí aprendí de todo en tema de web, afiancé mis conocimientos y crecí de una manera increíble con ellos, tueve la oprtunidad de aprender Front y Back para la web y para aplicaciones hibridas, estuve en el desarrollo de 8 o mas proyectos de innovación.',
    lenguajesAprendidos: [JAVASCRIPT, ANGULAR, JQUERY, BOOTSTRAP, IONIC, MATERIALIZE, CORDOVA, NODEJS, MONGODB, PHP, MYSQL, GIT],
  },
  {
    nombreToSelector: 'cultivando_futuro',
    urlImagen: '/public/landing/img/empresas/cultivando_futuro.png',
    color: '',
    colorText: '#fc583b',
    titulo: 'Cultivando Futuro',
    descripcion:
      'Estuve poco tiempo pero aprendí sobre el problema que tiene ahora el agro en el país y como ellos pueden mejorarlo, de una manera en la que con un click en el mapa del país, se pueda saber que agricultores hay y de cada uno de ellos saber sobre sus fincas, su producción, sus siembras y demás, ayudando a que compradores contacten directamente al productor o grupos de productores.',
    lenguajesAprendidos: [ANGULAR, JQUERY, MATERIALIZE, NODEJS],
  },
  {
    nombreToSelector: 'el_tiempo',
    urlImagen: '/public/landing/img/empresas/el_tiempo.png',
    color: '',
    colorText: '#000000',
    titulo: 'El Tiempo',
    descripcion: 'Trabajo actualmente como contratista y he aprendido CodeIgniter en PHP 5.',
    lenguajesAprendidos: [PHP],
  },
];

export const ESTUDIOS: Experiencia[] = [
  {
    nombreToSelector: 'SENA',
    urlImagen: '/public/landing/img/estudios/sena.png',
    color: '',
    colorText: '#fc7323',
    titulo: 'SENA',
    descripcion:
      'Estuve estudiando un año seguido con seis meses de etapa lectiva y seis meses de etapa práctica, durante el proceso aprendí sobre lenguaje HTML, CSS Y PHP; me gradué como técnico en programación de software en el 2013.',
    lenguajesAprendidos: [],
  },
];
