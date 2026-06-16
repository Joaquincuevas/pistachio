export const especialidades = [
  { id: 'obras',  name: 'Obras Civiles', icon: '📐', tag: 'Especialidad clásica',   blurb: 'Estructuras, suelos y construcción.' },
  { id: 'compu',  name: 'Computación',   icon: '💻', tag: 'Énfasis digital',        blurb: 'Software, datos y sistemas.' },
  { id: 'indus',  name: 'Industrial',    icon: '⚙️',  tag: 'Gestión y optimización', blurb: 'Procesos, operaciones y decisiones.' },
  { id: 'electr', name: 'Eléctrica',     icon: '⚡', tag: 'Potencia y control',     blurb: 'Energía, señales y automatización.' },
  { id: 'quim',   name: 'Química',       icon: '🧪', tag: 'Procesos químicos',      blurb: 'Reacciones, plantas y materiales.' },
];

const comun = [
  { code: 'MAT1001', name: 'Cálculo I',                    sem: 1, credits: 6, prof: 'Dra. Ramírez',   prereqs: [],                        area: 'Ciencias Básicas' },
  { code: 'MAT1002', name: 'Álgebra Lineal',               sem: 1, credits: 6, prof: 'Dr. Soto',       prereqs: [],                        area: 'Ciencias Básicas' },
  { code: 'FIS1001', name: 'Física I: Mecánica',           sem: 1, credits: 6, prof: 'Dr. Vergara',    prereqs: [],                        area: 'Ciencias Básicas' },
  { code: 'QUI1001', name: 'Química General',              sem: 1, credits: 5, prof: 'Dra. Fuentes',   prereqs: [],                        area: 'Ciencias Básicas' },
  { code: 'ICC1000', name: 'Introducción a la Ingeniería', sem: 1, credits: 4, prof: 'Dr. Larraín',    prereqs: [],                        area: 'Ingeniería' },
  { code: 'MAT1003', name: 'Cálculo II',                   sem: 2, credits: 6, prof: 'Dra. Ramírez',   prereqs: ['MAT1001'],               area: 'Ciencias Básicas' },
  { code: 'MAT1004', name: 'Ecuaciones Diferenciales',     sem: 2, credits: 6, prof: 'Dr. Soto',       prereqs: ['MAT1001'],               area: 'Ciencias Básicas' },
  { code: 'FIS1002', name: 'Física II: Electromagnetismo', sem: 2, credits: 6, prof: 'Dr. Vergara',    prereqs: ['FIS1001'],               area: 'Ciencias Básicas' },
  { code: 'ICC1010', name: 'Programación',                 sem: 2, credits: 5, prof: 'Dra. Bravo',     prereqs: ['ICC1000'],               area: 'Ingeniería' },
  { code: 'ETH1001', name: 'Persona y Sentido',            sem: 2, credits: 3, prof: 'Dr. Echeverría', prereqs: [],                        area: 'Formación' },
  { code: 'MAT2001', name: 'Cálculo III',                  sem: 3, credits: 6, prof: 'Dra. Ramírez',   prereqs: ['MAT1003'],               area: 'Ciencias Básicas' },
  { code: 'FIS2001', name: 'Física III: Ondas y Calor',   sem: 3, credits: 6, prof: 'Dr. Vergara',    prereqs: ['FIS1002', 'MAT1004'],    area: 'Ciencias Básicas' },
  { code: 'ICC2001', name: 'Estática',                     sem: 3, credits: 6, prof: 'Dr. Mella',      prereqs: ['FIS1001', 'MAT1002'],    area: 'Ingeniería' },
  { code: 'ICC2010', name: 'Estructuras de Datos',         sem: 3, credits: 5, prof: 'Dra. Bravo',     prereqs: ['ICC1010'],               area: 'Ingeniería' },
  { code: 'ICE2001', name: 'Economía',                     sem: 3, credits: 4, prof: 'Dr. Pinto',      prereqs: [],                        area: 'Formación' },
  { code: 'MAT2010', name: 'Probabilidades y Estadística', sem: 4, credits: 6, prof: 'Dr. Soto',       prereqs: ['MAT1003'],               area: 'Ciencias Básicas' },
  { code: 'FIS2010', name: 'Termodinámica',                sem: 4, credits: 5, prof: 'Dra. Fuentes',   prereqs: ['FIS2001'],               area: 'Ciencias Básicas' },
  { code: 'ICC2020', name: 'Mecánica de Sólidos',          sem: 4, credits: 6, prof: 'Dr. Mella',      prereqs: ['ICC2001'],               area: 'Ingeniería' },
  { code: 'ICC2030', name: 'Métodos Numéricos',            sem: 4, credits: 5, prof: 'Dra. Bravo',     prereqs: ['MAT1004', 'ICC1010'],    area: 'Ingeniería' },
  { code: 'FIL2001', name: 'Antropología',                 sem: 4, credits: 3, prof: 'Dr. Echeverría', prereqs: [],                        area: 'Formación' },
];

const especialidadRamos = {
  obras: [
    { code: 'ICC3001', name: 'Mecánica de Fluidos',       sem: 5, credits: 6, prof: 'Dr. Mella',     prereqs: ['FIS2010'],     area: 'Especialidad' },
    { code: 'ICC3010', name: 'Análisis Estructural I',    sem: 5, credits: 6, prof: 'Dra. Cisterna',  prereqs: ['ICC2020'],     area: 'Especialidad' },
    { code: 'ICC3020', name: 'Geología para Ingenieros',  sem: 5, credits: 5, prof: 'Dr. Tapia',      prereqs: ['QUI1001'],     area: 'Especialidad' },
    { code: 'ICC3030', name: 'Materiales de Construcción',sem: 5, credits: 5, prof: 'Dra. Cisterna',  prereqs: ['ICC2020'],     area: 'Especialidad' },
    { code: 'ICC3110', name: 'Hidráulica',                sem: 6, credits: 6, prof: 'Dr. Mella',      prereqs: ['ICC3001'],     area: 'Especialidad' },
    { code: 'ICC3120', name: 'Análisis Estructural II',   sem: 6, credits: 6, prof: 'Dra. Cisterna',  prereqs: ['ICC3010'],     area: 'Especialidad' },
    { code: 'ICC3130', name: 'Mecánica de Suelos',        sem: 6, credits: 6, prof: 'Dr. Tapia',      prereqs: ['ICC3020'],     area: 'Especialidad' },
    { code: 'ICC3140', name: 'Hormigón Armado I',         sem: 6, credits: 5, prof: 'Dra. Cisterna',  prereqs: ['ICC3030'],     area: 'Especialidad' },
    { code: 'ICC4010', name: 'Diseño en Acero',           sem: 7, credits: 6, prof: 'Dr. Ossandón',   prereqs: ['ICC3120'],     area: 'Especialidad' },
    { code: 'ICC4020', name: 'Hormigón Armado II',        sem: 7, credits: 5, prof: 'Dra. Cisterna',  prereqs: ['ICC3140'],     area: 'Especialidad' },
    { code: 'ICC4030', name: 'Geotecnia',                 sem: 7, credits: 6, prof: 'Dr. Tapia',      prereqs: ['ICC3130'],     area: 'Especialidad' },
    { code: 'ICC4040', name: 'Ingeniería Sísmica',        sem: 7, credits: 6, prof: 'Dr. Ossandón',   prereqs: ['ICC3120'],     area: 'Especialidad' },
    { code: 'ICC4110', name: 'Diseño de Fundaciones',     sem: 8, credits: 5, prof: 'Dr. Tapia',      prereqs: ['ICC4030'],     area: 'Especialidad' },
    { code: 'ICC4120', name: 'Pavimentos',                sem: 8, credits: 5, prof: 'Dr. Ossandón',   prereqs: ['ICC3130'],     area: 'Especialidad' },
    { code: 'ICC4900', name: 'Práctica Profesional',      sem: 8, credits: 8, prof: 'Coordinación',   prereqs: ['ICC4010'],     area: 'Especialidad' },
    { code: 'ICC4990', name: 'Proyecto de Título',        sem: 8, credits: 10, prof: 'Dra. Cisterna', prereqs: ['ICC4900'],     area: 'Especialidad' },
  ],
  compu: [
    { code: 'IIC3001', name: 'Algoritmos y Complejidad',  sem: 5, credits: 6, prof: 'Dra. Bravo',    prereqs: ['ICC2010'],              area: 'Especialidad' },
    { code: 'IIC3010', name: 'Bases de Datos',            sem: 5, credits: 6, prof: 'Dr. Gálvez',    prereqs: ['ICC2010'],              area: 'Especialidad' },
    { code: 'IIC3020', name: 'Sistemas Operativos',       sem: 5, credits: 5, prof: 'Dr. Gálvez',    prereqs: ['ICC2010'],              area: 'Especialidad' },
    { code: 'IIC3030', name: 'Redes de Computadores',     sem: 5, credits: 5, prof: 'Dra. Bravo',    prereqs: ['ICC2010'],              area: 'Especialidad' },
    { code: 'IIC3110', name: 'Ingeniería de Software',    sem: 6, credits: 6, prof: 'Dr. Gálvez',    prereqs: ['IIC3010'],              area: 'Especialidad' },
    { code: 'IIC3120', name: 'Inteligencia Artificial',   sem: 6, credits: 6, prof: 'Dra. Bravo',    prereqs: ['IIC3001', 'MAT2010'],   area: 'Especialidad' },
    { code: 'IIC3130', name: 'Computación Gráfica',       sem: 6, credits: 5, prof: 'Dr. Gálvez',    prereqs: ['MAT1002'],              area: 'Especialidad' },
    { code: 'IIC3140', name: 'Arquitectura de Software',  sem: 6, credits: 5, prof: 'Dra. Bravo',    prereqs: ['IIC3110'],              area: 'Especialidad' },
    { code: 'IIC4010', name: 'Aprendizaje de Máquina',    sem: 7, credits: 6, prof: 'Dra. Bravo',    prereqs: ['IIC3120'],              area: 'Especialidad' },
    { code: 'IIC4020', name: 'Sistemas Distribuidos',     sem: 7, credits: 6, prof: 'Dr. Gálvez',    prereqs: ['IIC3030'],              area: 'Especialidad' },
    { code: 'IIC4030', name: 'Ciberseguridad',            sem: 7, credits: 5, prof: 'Dr. Gálvez',    prereqs: ['IIC3030'],              area: 'Especialidad' },
    { code: 'IIC4900', name: 'Práctica Profesional',      sem: 8, credits: 8, prof: 'Coordinación',  prereqs: ['IIC3110'],              area: 'Especialidad' },
    { code: 'IIC4990', name: 'Proyecto de Título',        sem: 8, credits: 10, prof: 'Dra. Bravo',   prereqs: ['IIC4900'],              area: 'Especialidad' },
  ],
  indus: [
    { code: 'IND3001', name: 'Investigación de Operaciones', sem: 5, credits: 6, prof: 'Dr. Pinto',    prereqs: ['MAT2010'],    area: 'Especialidad' },
    { code: 'IND3010', name: 'Gestión de Operaciones',       sem: 5, credits: 6, prof: 'Dra. Aguirre', prereqs: ['ICE2001'],    area: 'Especialidad' },
    { code: 'IND3020', name: 'Simulación',                   sem: 5, credits: 5, prof: 'Dr. Pinto',    prereqs: ['MAT2010'],    area: 'Especialidad' },
    { code: 'IND3110', name: 'Optimización',                 sem: 6, credits: 6, prof: 'Dr. Pinto',    prereqs: ['IND3001'],    area: 'Especialidad' },
    { code: 'IND3120', name: 'Gestión de Personas',          sem: 6, credits: 5, prof: 'Dra. Aguirre', prereqs: ['ICE2001'],    area: 'Especialidad' },
    { code: 'IND3130', name: 'Finanzas',                     sem: 6, credits: 5, prof: 'Dr. Pinto',    prereqs: ['ICE2001'],    area: 'Especialidad' },
    { code: 'IND4010', name: 'Gestión de Proyectos',         sem: 7, credits: 6, prof: 'Dra. Aguirre', prereqs: ['IND3010'],    area: 'Especialidad' },
    { code: 'IND4020', name: 'Logística y Cadena',           sem: 7, credits: 5, prof: 'Dr. Pinto',    prereqs: ['IND3110'],    area: 'Especialidad' },
    { code: 'IND4900', name: 'Práctica Profesional',         sem: 8, credits: 8, prof: 'Coordinación', prereqs: ['IND4010'],    area: 'Especialidad' },
    { code: 'IND4990', name: 'Proyecto de Título',           sem: 8, credits: 10, prof: 'Dra. Aguirre',prereqs: ['IND4900'],    area: 'Especialidad' },
  ],
  electr: [
    { code: 'IEE3001', name: 'Circuitos Eléctricos',   sem: 5, credits: 6, prof: 'Dr. Navarro',  prereqs: ['FIS1002'],    area: 'Especialidad' },
    { code: 'IEE3010', name: 'Señales y Sistemas',     sem: 5, credits: 6, prof: 'Dra. Reyes',   prereqs: ['MAT1004'],    area: 'Especialidad' },
    { code: 'IEE3020', name: 'Electrónica Análoga',    sem: 5, credits: 5, prof: 'Dr. Navarro',  prereqs: ['FIS1002'],    area: 'Especialidad' },
    { code: 'IEE3110', name: 'Sistemas de Control',    sem: 6, credits: 6, prof: 'Dra. Reyes',   prereqs: ['IEE3010'],    area: 'Especialidad' },
    { code: 'IEE3120', name: 'Electrónica Digital',    sem: 6, credits: 5, prof: 'Dr. Navarro',  prereqs: ['IEE3020'],    area: 'Especialidad' },
    { code: 'IEE3130', name: 'Conversión de Energía',  sem: 6, credits: 6, prof: 'Dra. Reyes',   prereqs: ['IEE3001'],    area: 'Especialidad' },
    { code: 'IEE4010', name: 'Sistemas de Potencia',   sem: 7, credits: 6, prof: 'Dr. Navarro',  prereqs: ['IEE3130'],    area: 'Especialidad' },
    { code: 'IEE4020', name: 'Comunicaciones',         sem: 7, credits: 5, prof: 'Dra. Reyes',   prereqs: ['IEE3010'],    area: 'Especialidad' },
    { code: 'IEE4900', name: 'Práctica Profesional',   sem: 8, credits: 8, prof: 'Coordinación', prereqs: ['IEE4010'],    area: 'Especialidad' },
    { code: 'IEE4990', name: 'Proyecto de Título',     sem: 8, credits: 10, prof: 'Dr. Navarro',  prereqs: ['IEE4900'],   area: 'Especialidad' },
  ],
  quim: [
    { code: 'IQU3001', name: 'Balances de Masa y Energía', sem: 5, credits: 6, prof: 'Dra. Fuentes', prereqs: ['FIS2010'],    area: 'Especialidad' },
    { code: 'IQU3010', name: 'Termodinámica de Procesos',  sem: 5, credits: 6, prof: 'Dr. Lagos',    prereqs: ['FIS2010'],    area: 'Especialidad' },
    { code: 'IQU3020', name: 'Química Orgánica',           sem: 5, credits: 5, prof: 'Dra. Fuentes', prereqs: ['QUI1001'],    area: 'Especialidad' },
    { code: 'IQU3110', name: 'Fenómenos de Transporte',    sem: 6, credits: 6, prof: 'Dr. Lagos',    prereqs: ['IQU3001'],    area: 'Especialidad' },
    { code: 'IQU3120', name: 'Operaciones Unitarias',      sem: 6, credits: 6, prof: 'Dra. Fuentes', prereqs: ['IQU3110'],    area: 'Especialidad' },
    { code: 'IQU3130', name: 'Cinética y Reactores',       sem: 6, credits: 5, prof: 'Dr. Lagos',    prereqs: ['IQU3010'],    area: 'Especialidad' },
    { code: 'IQU4010', name: 'Diseño de Plantas',          sem: 7, credits: 6, prof: 'Dra. Fuentes', prereqs: ['IQU3120'],    area: 'Especialidad' },
    { code: 'IQU4020', name: 'Control de Procesos',        sem: 7, credits: 5, prof: 'Dr. Lagos',    prereqs: ['IQU3130'],    area: 'Especialidad' },
    { code: 'IQU4900', name: 'Práctica Profesional',       sem: 8, credits: 8, prof: 'Coordinación', prereqs: ['IQU4010'],    area: 'Especialidad' },
    { code: 'IQU4990', name: 'Proyecto de Título',         sem: 8, credits: 10, prof: 'Dra. Fuentes', prereqs: ['IQU4900'],   area: 'Especialidad' },
  ],
};

const DESCRIPTION = 'Curso que entrega las bases conceptuales y herramientas de cálculo necesarias para abordar problemas propios de la disciplina, combinando clases teóricas, ayudantías y trabajo aplicado.';
const OBJECTIVES = [
  'Comprender los fundamentos teóricos del ramo.',
  'Aplicar los conceptos a problemas de ingeniería reales.',
  'Desarrollar criterio para modelar y resolver casos prácticos.',
];
const UNITS = [
  { t: 'Unidad 1 · Fundamentos', items: ['Definiciones y marco teórico', 'Notación y convenciones', 'Casos introductorios'] },
  { t: 'Unidad 2 · Métodos', items: ['Técnicas de resolución', 'Modelamiento aplicado', 'Análisis de resultados'] },
  { t: 'Unidad 3 · Aplicación', items: ['Proyecto integrador', 'Estudio de caso', 'Presentación final'] },
];

function statusForSem(sem) {
  if (sem <= 3) return 'done';
  if (sem === 4) return 'progress';
  return 'pending';
}

export function mallaFor(espId) {
  const list = [...comun, ...(especialidadRamos[espId] || especialidadRamos.obras)];
  return list.map(r => ({
    ...r,
    status: statusForSem(r.sem),
    description: DESCRIPTION,
    objectives: OBJECTIVES,
    units: UNITS,
  }));
}

export const PISTA_FACT = 'Botánicamente, el pistacho no es un fruto seco: es una drupa, pariente del mango y de la hiedra venenosa.';
