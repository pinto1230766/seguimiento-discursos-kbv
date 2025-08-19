// Données initiales des orateurs basées sur votre liste

export const initialOradores = [
  // Orateurs Locaux (Lyon)
  {
    id: '1',
    nom: 'Jérémy TORRES',
    congregation: 'Lyon',
    phone: '',
    type: 'local',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-07-05',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: true,
      transport: false,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur local'
  },
  {
    id: '2',
    nom: 'João-Paulo BAPTISTA',
    congregation: 'Lyon',
    phone: '',
    type: 'local',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-09-27',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: true,
      transport: false,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur local'
  },
  {
    id: '3',
    nom: 'José FREITAS',
    congregation: 'Lyon',
    phone: '',
    type: 'local',
    lastVisitDate: '2025-04-12',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-12-27',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: true,
      transport: false,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur local'
  },
  {
    id: '4',
    nom: 'Manuel ANTUNES',
    congregation: 'Villiers-sur-Marne',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-01-18',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur',
    type: 'visiteur'
  },
  {
    id: '5',
    nom: 'Dany TAVARES',
    congregation: 'Plaisir',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-05-03',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: 'moderee',
      details: 'Allergie aux fruits à coque'
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '6',
    nom: 'José BATALHA',
    congregation: 'Marseille',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-05-31',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '13',
    nom: 'Joel CARDOSO',
    congregation: 'Nice',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-06-14',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '14',
    nom: 'Luis CARDOSO',
    congregation: 'Nice',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-09-06',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '15',
    nom: 'Alain CURTIS',
    congregation: 'Marseille',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-09-20',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '16',
    nom: 'David LUCIO',
    congregation: 'Porto',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-10-04',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '17',
    nom: 'Isaque PEREIRA',
    congregation: 'St Denis',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-10-18',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '18',
    nom: 'Mario MIRANDA',
    congregation: 'Cannes',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-10-25',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '19',
    nom: 'Gilberto FERNANDES',
    congregation: 'St Denis',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-11-01',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '20',
    nom: 'Gianni FARIA',
    congregation: 'Plaisir',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-11-08',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '21',
    nom: 'Thomas FREITAS',
    congregation: 'Lyon',
    phone: '',
    type: 'local',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-11-29',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: true,
      transport: false,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur local'
  },
  {
    id: '22',
    nom: 'Matthieu DHALENNE',
    congregation: 'Steinsel',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-12-06',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '23',
    nom: 'François GIANNINO',
    congregation: 'St Denis',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-12-13',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '24',
    nom: 'Alexis CARVALHO',
    congregation: 'Lyon',
    phone: '',
    type: 'local',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-01-03',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: true,
      transport: false,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur local'
  },
  {
    id: '25',
    nom: 'Eddy SILVA',
    congregation: 'Steinsel',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-02-07',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '26',
    nom: 'Valdir DIOGO',
    congregation: 'Porto',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-02-14',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '27',
    nom: 'Jorge GONÇALVES',
    congregation: 'Porto',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-02-21',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '28',
    nom: 'Jefersen BOELJIN',
    congregation: 'Rotterdam',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-03-07',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '7',
    nom: 'Moises CALDES',
    congregation: 'Cannes',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '2024-11-16',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-09-13',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: 'grave',
      details: 'Allergie grave aux crustacés'
    },
    notes: 'Orateur visiteur - ATTENTION ALLERGIE GRAVE'
  },
  {
    id: '8',
    nom: 'David VIEIRA',
    congregation: 'Villiers-sur-Marne',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '2024-05-26',
    lastTalkNoOrType: '',
    nextVisitDate: '2025-08-30',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '9',
    nom: 'José DA SILVA',
    congregation: 'Creil',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-01-10',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '10',
    nom: 'David DE FARIA',
    congregation: 'Villiers-sur-Marne',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-01-17',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '11',
    nom: 'Marcelino DOS SANTOS',
    congregation: 'Plaisir',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-01-24',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  },
  {
    id: '12',
    nom: 'David MOREIRA',
    congregation: 'Steinsel',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '2026-01-31',
    nextTalkNoOrType: '',
    needs: {
      hebergement: true,
      repas: true,
      transport: true,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: 'Orateur visiteur'
  }
]

export const initialHotes = [
  {
    id: '1',
    nom: 'Família Silva',
    phone: '0612345678',
    capacites: {
      hebergement: 2,
      repas: 4,
      transport: true
    },
    disponibilites: [],
    contraintes: {
      allergiesEviter: ['crustacés'],
      autres: 'Pas d\'animaux domestiques'
    },
    notes: 'Famille accueillante, maison avec jardin'
  },
  {
    id: '2',
    nom: 'Família Santos',
    phone: '0687654321',
    capacites: {
      hebergement: 1,
      repas: 2,
      transport: false
    },
    disponibilites: [],
    contraintes: {
      allergiesEviter: [],
      autres: 'Appartement centre-ville'
    },
    notes: 'Proche des transports en commun'
  },
  {
    id: '3',
    nom: 'Família Rodrigues',
    phone: '0698765432',
    capacites: {
      hebergement: 3,
      repas: 6,
      transport: true
    },
    disponibilites: [],
    contraintes: {
      allergiesEviter: ['fruits à coque'],
      autres: 'Maison familiale'
    },
    notes: 'Grande famille, très hospitalière'
  }
]