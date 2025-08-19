import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  pt: {
    translation: {
      // App Title
      appTitle: 'GESTÃO DOS DISCURSOS DO GRUPO KBV DE LYON',
      
      // Navigation
      dashboard: 'Dashboard',
      oradores: 'Oradores',
      hotes: 'Anfitriões',
      calendario: 'Calendário',
      configuracoes: 'Configurações',
      
      // Dashboard
      visitantesAtuais: 'Visitantes Atuais',
      necessidadesNaoCobertas: 'Necessidades Não Cobertas',
      anfitriaoesDisponiveis: 'Anfitriões Disponíveis',
      alertasAlergia: 'Alertas de Alergia',
      visitantesRecentes: 'Visitantes Recentes',
      alertasImportantes: 'Alertas Importantes',
      
      // Oradores
      nomeOrador: 'Nome do Orador',
      congregacao: 'Congregação',
      telefone: 'Telefone',
      ultimaVisita: 'Última Visita',
      proximaVisita: 'Próxima Visita',
      necessidades: 'Necessidades',
      hospedagem: 'Hospedagem',
      refeicoes: 'Refeições',
      transporte: 'Transporte',
      alergias: 'Alergias',
      grave: 'Grave',
      moderada: 'Moderada',
      
      // Actions
      adicionar: 'Adicionar',
      editar: 'Editar',
      excluir: 'Excluir',
      salvar: 'Salvar',
      cancelar: 'Cancelar',
      confirmar: 'Confirmar',
      
      // Status
      compativel: 'Compatível',
      incompativel: 'Incompatível',
      confirmado: 'Confirmado',
      proposto: 'Proposto',
      cancelado: 'Cancelado',
      
      // Sobre
      sobre: 'Sobre',
      versao: 'Versão',
      aplicacaoGestao: 'Aplicação para gestão de visitas de oradores capverdianos',
      desenvolvidoOffline: 'Desenvolvido para uso offline em dispositivos Android',
      baseadoDiretrizes: 'Baseado nas diretrizes da organização jw.org',
      todosOsDireitos: 'Todos os direitos reservados',
      desenvolvidoPara: 'Desenvolvido para o Grupo KBV de Lyon',
      desenvolvedor: 'Desenvolvedor: Francisco Pinto'
    }
  },
  fr: {
    translation: {
      // App Title
      appTitle: 'GESTION DES DISCOURS DU GROUPE KBV DE LYON',
      
      dashboard: 'Tableau de bord',
      oradores: 'Orateurs',
      hotes: 'Hôtes',
      calendario: 'Calendrier',
      configuracoes: 'Paramètres',
      
      visitantesAtuais: 'Visiteurs actuels',
      necessidadesNaoCobertas: 'Besoins non couverts',
      anfitriaoesDisponiveis: 'Hôtes disponibles',
      alertasAlergia: 'Alertes allergies',
      
      nomeOrador: 'Nom de l\'orateur',
      congregacao: 'Congrégation',
      telefone: 'Téléphone',
      ultimaVisita: 'Dernière visite',
      proximaVisita: 'Prochaine visite',
      necessidades: 'Besoins',
      hospedagem: 'Hébergement',
      refeicoes: 'Repas',
      transporte: 'Transport',
      alergias: 'Allergies',
      grave: 'Grave',
      moderada: 'Modérée',
      
      adicionar: 'Ajouter',
      editar: 'Modifier',
      excluir: 'Supprimer',
      salvar: 'Enregistrer',
      cancelar: 'Annuler',
      confirmar: 'Confirmer',
      
      compativel: 'Compatible',
      incompativel: 'Incompatible',
      confirmado: 'Confirmé',
      proposto: 'Proposé',
      cancelado: 'Annulé',
      
      // Sobre
      sobre: 'À propos',
      versao: 'Version',
      aplicacaoGestao: 'Application pour la gestion des visites d\'orateurs capverdiens',
      desenvolvidoOffline: 'Développé pour un usage hors ligne sur appareils Android',
      baseadoDiretrizes: 'Basé sur les directives de l\'organisation jw.org',
      todosOsDireitos: 'Tous droits réservés',
      desenvolvidoPara: 'Développé pour le Groupe KBV de Lyon',
      desenvolvedor: 'Développeur: Francisco Pinto'
    }
  },
  kbv: {
    translation: {
      // App Title
      appTitle: 'JESTÕN DI DISKURSU DI GRUPU KBV DI LYON',
      
      dashboard: 'Painel',
      oradores: 'Irmons Visitanti',
      hotes: 'Irmons Lokal',
      calendario: 'Kalendáriu',
      configuracoes: 'Konfigurasõn',
      
      visitantesAtuais: 'Visitanti Atual',
      necessidadesNaoCobertas: 'Nesesidadi ki ka ta kubri',
      anfitriaoesDisponiveis: 'Anfitriõn Disponível',
      alertasAlergia: 'Alerta di Alergia',
      
      nomeOrador: 'Nomi di Orador',
      congregacao: 'Kongregasõn',
      telefone: 'Telefoni',
      ultimaVisita: 'Última Vizita',
      proximaVisita: 'Próxima Vizita',
      necessidades: 'Nesesidadi',
      hospedagem: 'Kaza',
      refeicoes: 'Kumida',
      transporte: 'Transporte',
      alergias: 'Alergia',
      grave: 'Gravi',
      moderada: 'Moderadu',
      
      adicionar: 'Djunta',
      editar: 'Muda',
      excluir: 'Tira',
      salvar: 'Garda',
      cancelar: 'Kansela',
      confirmar: 'Konfirma',
      
      compativel: 'Kompatível',
      incompativel: 'Ka kompatível',
      confirmado: 'Konfirmadu',
      proposto: 'Propóstu',
      cancelado: 'Kanseladu',
      
      // Sobre
      sobre: 'Sobri',
      versao: 'Versõn',
      aplicacaoGestao: 'Aplikasõn pa jestõn di vizita di orador kabuverdianu',
      desenvolvidoOffline: 'Dizenvolvidu pa uzu offline na aparelhu Android',
      baseadoDiretrizes: 'Bazadu na diretriz di organizasõn jw.org',
      todosOsDireitos: 'Tudu direitu rezervadu',
      desenvolvidoPara: 'Dizenvolvidu pa Grupu KBV di Lyon',
      desenvolvedor: 'Dizenvolvedor: Francisco Pinto'
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n