import { GaugeColors } from '../shared/liquid-gauge';

export interface Language {
  imgUrl: string;
  imgUrlModal: string;
  title: string;
  nombreToSelector: string;
  descripcion: string;
  porcentaje?: GaugeColors & { valor: number };
}

const IMG = '/public/landing/img/lenguajes';

export const JAVASCRIPT: Language = {
  imgUrl: `${IMG}/javascript.png`,
  imgUrlModal: `${IMG}/javascript.png`,
  porcentaje: { valor: 90, circleColor: '#d5b830', waveColor: '#feda3e', textColor: '#fdfdfd', waveTextColor: '#fdfdfd' },
  title: 'JavaScript',
  nombreToSelector: 'JavaScript',
  descripcion:
    'Aunque empecé a conocerlo con jquery, el lenguaje puro de este lo fui conociendo de a poco, ya hace 3 años que lo uso y he podido generar componentes desde cero sin usar alguna otra librería.',
};

export const ANGULAR: Language = {
  imgUrl: `${IMG}/angular.png`,
  imgUrlModal: `${IMG}/angular_modal.png`,
  porcentaje: { valor: 90, circleColor: '#b62f32', waveColor: '#e43137', textColor: '#f5f6f7', waveTextColor: '#f5f6f7' },
  title: 'Angular 1',
  nombreToSelector: 'Angular',
  descripcion:
    'He manejado este lenguaje ya hace más de dos años, tengo un amplio conocimiento en la primer version de este lenguaje, le he implementado varios componentes que dan agilidad a la hora de desarrollar y cumplir los flujos que se requieran.',
};

export const JQUERY: Language = {
  imgUrl: `${IMG}/jquery.png`,
  imgUrlModal: `${IMG}/jquery.png`,
  porcentaje: { valor: 95, circleColor: '#172c45', waveColor: '#193556', textColor: '#ffffff', waveTextColor: '#ffffff' },
  title: 'jQuery',
  nombreToSelector: 'jQuery',
  descripcion:
    'Lo manejo hace ya 3 años y es usado para generar flujos de información entre html y JavaScript de una manera más eficiente que usando solo Javascript.',
};

export const BOOTSTRAP: Language = {
  imgUrl: `${IMG}/bootstrap.png`,
  imgUrlModal: `${IMG}/bootstrap.png`,
  porcentaje: { valor: 90, circleColor: '#62488a', waveColor: '#b39cd6', textColor: '#ffffff', waveTextColor: '#ffffff' },
  title: 'Bootstrap',
  nombreToSelector: 'Bootstrap',
  descripcion:
    'Con el me sumergí en el concepto responsivo de las paginas actuales, llevo usándolo ya hace 3 años y me desenvuelvo bien a la hora de desarrollar en este.',
};

export const IONIC: Language = {
  imgUrl: `${IMG}/ionic.png`,
  imgUrlModal: `${IMG}/ionic.png`,
  porcentaje: { valor: 95, circleColor: '#4e8ef7', waveColor: '#8fb3ef', textColor: '#ffffff', waveTextColor: '#ffffff' },
  title: 'Ionic',
  nombreToSelector: 'Ionic',
  descripcion:
    'Desde que salio, llevo usando su primera version y el uso de este es muy sencillo de entender ya que se basa en angularJs v1, he desarrollado dos prototipos de aplicaciones en android y dos aplicaciones ya en las tiendas conocidas como AppStore y PlayStore.',
};

export const MATERIALIZE: Language = {
  imgUrl: `${IMG}/materialize.png`,
  imgUrlModal: `${IMG}/materialize.png`,
  porcentaje: { valor: 80, circleColor: '#ec7078', waveColor: '#f5a2ac', textColor: '#ffffff', waveTextColor: '#ffffff' },
  title: 'Materialize',
  nombreToSelector: 'Materialize',
  descripcion:
    'Este es un framework hecho por google y de uso abierto, esta página está basada en este framework, lo he usado hace un año, pero igual su documentación es muy completa y fácil de entender a la hora de desarrollar.',
};

export const CORDOVA: Language = {
  imgUrl: `${IMG}/cordova.png`,
  imgUrlModal: `${IMG}/cordova.png`,
  porcentaje: { valor: 80, circleColor: '#3d4a56', waveColor: '#e2e2e2', textColor: '#43bdbf', waveTextColor: '#43bdbf' },
  title: 'Cordova',
  nombreToSelector: 'Cordova',
  descripcion:
    'Es el compilador de aplicaciones web, el que permite crear un proyecto web y covertirlo en una APP; tengo experiencia de 2 años en su uso.',
};

export const NODEJS: Language = {
  imgUrl: `${IMG}/nodejs.png`,
  imgUrlModal: `${IMG}/nodejs_modal.png`,
  porcentaje: { valor: 85, circleColor: '#404137', waveColor: '#83cd29', textColor: '#ffffff', waveTextColor: '#ffffff' },
  title: 'NodeJs',
  nombreToSelector: 'NodeJs',
  descripcion:
    'Este lenguaje es Javascript pero ahora del lado del servidor y no del cliente, tengo experiencia de 2 años en su uso y es practicamente sencillo implementar cualquier base de datos para crear los servicios CRUD para un proyecto.',
};

export const MONGODB: Language = {
  imgUrl: `${IMG}/mongodb.png`,
  imgUrlModal: `${IMG}/mongodb_modal.png`,
  porcentaje: { valor: 85, circleColor: '#81c564', waveColor: '#412f1f', textColor: '#a2da8a', waveTextColor: '#a2da8a' },
  title: 'MongoDB',
  nombreToSelector: 'MongoDB',
  descripcion:
    'Es un base de datos hecha con JavaScript y es no relacional, la comunicacion con esta base de datos es sencilla y muy rápida, tengo experiencia de 1 año en su uso.',
};

export const GIT: Language = {
  imgUrl: `${IMG}/git.png`,
  imgUrlModal: `${IMG}/git.png`,
  porcentaje: { valor: 94, circleColor: '#f05033', waveColor: 'rgb(255, 61, 26)', textColor: '#fff', waveTextColor: '#fff' },
  title: 'Git',
  nombreToSelector: 'Git',
  descripcion:
    'El manejo de versiones para los proyectos es muy chévere con esto, llevo usándolo 3 años con repositorios como GitLab y BitBucket',
};

export const HTML5: Language = {
  imgUrl: `${IMG}/html5.png`,
  imgUrlModal: `${IMG}/html5.png`,
  title: 'HTML5',
  nombreToSelector: 'HTML5',
  descripcion:
    'Este lenguaje de etiquetas es la estructura en la que se construye la presentación de una página web y aplicaciones hibridas.',
};

export const CSS3: Language = {
  imgUrl: `${IMG}/css3.png`,
  imgUrlModal: `${IMG}/css3.png`,
  title: 'CSS3',
  nombreToSelector: 'CSS3',
  descripcion:
    'Con esto se da estilo a los elementos del HTML, dichos elementos tienen un estilo por defecto pero el CSS da la libertad de poder agregar nuevas propiedas a esos elementos.',
};

export const PHP: Language = {
  imgUrl: `${IMG}/php7.png`,
  imgUrlModal: `${IMG}/php7.png`,
  title: 'PHP',
  nombreToSelector: 'PHP',
  descripcion:
    'Estuve desarrollando dos años en este lenguaje con un framework llamado SMARTY que usaba MVC para y model DOF para la conexión con la base de datos.',
};

export const MYSQL: Language = {
  imgUrl: `${IMG}/mysql2.png`,
  imgUrlModal: `${IMG}/mysql2.png`,
  title: 'MySQL',
  nombreToSelector: 'MySQL',
  descripcion:
    'Es la primera base de datos que manejo y al use en varios proyectos para hacer un buen flujo de información entre front y back.',
};

/** Inicio: sección "Desarrollo de funcionalidad". */
export const FRONT_END_LANGUAGES = [JAVASCRIPT, ANGULAR, JQUERY, BOOTSTRAP, IONIC, MATERIALIZE];
/** Inicio: sección "Desarrollo de servicios". */
export const BACK_END_LANGUAGES = [CORDOVA, NODEJS, MONGODB, GIT];
