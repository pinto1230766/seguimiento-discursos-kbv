import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  pt: {
    translation: {
      // App Title
      appTitle: 'GESTÃO DOS DISCURSOS DO GRUPO KBV DE LYON',
      copyright: 'Copyright Pinto Francisco',
      offline: 'Offline',
      
      // Oradores
      buscarOrador: 'Buscar por nome ou congregação...',
      nenhumOradorEncontrado: 'Nenhum orador encontrado',
      nenhumOradorCadastrado: 'Nenhum orador cadastrado ainda',
      adicionarPrimeiroOrador: 'Adicionar primeiro orador',
      proximaVisita: 'Próxima visita',
      local: '🏠 Local',
      visitante: '✈️ Visitante',
      alergia: 'Alergia',
      excluirOrador: 'Excluir este orador?',
      semAlergias: 'Sem alergias',
      detalhesAlergias: 'Detalhes das alergias...',
      outrosBesoins: 'Outros besoins spécifiques (médicaments, équipements, etc.)...',
      
      // Hôtes
      anfitrioes: 'Anfitriões',
      adicionarAnfitriao: 'Adicionar anfitrião',
      adicionarPrimeiroAnfitriao: 'Adicionar primeiro anfitrião',
      nenhumAnfitriaoCadastrado: 'Nenhum anfitrião cadastrado ainda',
      nomeAnfitriao: 'Nome do Anfitrião',
      capacidades: 'Capacidades',
      hospedagem: 'Hospedagem (pessoas)',
      refeicoes: 'Refeições (couverts)',
      podeFornecerTransporte: 'Pode fornecer transporte',
      restricoesPreferencias: 'Restrições/Preferências',
      exemploRestricoes: 'Ex: Sem animais, sem crianças pequenas, alergias a evitar...',
      excluirAnfitriao: 'Excluir este anfitrião?',
      pessoa: 'pessoa',
      pessoas: 'pessoas',
      couvert: 'couvert',
      couverts: 'couverts',
      transporte: '🚗 Transporte',
      
      // Dashboard
      noSpeakersYet: 'Nenhum orador cadastrado ainda',
      noVisit: 'Sem visita',
      noAlerts: 'Nenhum alerta no momento',
      visitCalendar: 'Calendário de Visitas',
      assignmentsAndCompatibility: 'Atribuições e Compatibilidade',
      confirmed: 'Confirmadas',
      proposed: 'Propostas',
      unassigned: 'Sem Atribuição',
      manageAssignments: 'Gerenciar Atribuições',
      
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
      
      // OradorModal
      oradorModal: {
        titulo: 'Editar Orador',
        secoes: {
          informacoes: 'Informações Básicas',
          visitas: 'Visitas',
          necessidades: 'Necessidades',
          alergias: 'Alergias',
          notas: 'Notas'
        },
        campos: {
          nome: 'Nome',
          congregacao: 'Congregação',
          tipo: 'Tipo de Orador',
          telefone: 'Telefone',
          ultimaVisita: 'Última Visita',
          proximaVisita: 'Próxima Visita',
          ultimoDiscurso: 'N° Último Discurso',
          proximoDiscurso: 'N° Próximo Discurso',
          outrasNecessidades: 'Outras Necessidades',
          tipoAlergia: 'Tipo de Alergia',
          detalhesAlergia: 'Detalhes da Alergia'
        },
        opcoes: {
          local: 'Local (Lyon)',
          visiteur: 'Visiteur (Extérieur)',
          hospedagem: 'Hospedagem',
          refeicoes: 'Refeições',
          transporte: 'Transporte',
          semAlergias: 'Sem alergias',
          alergiaModerada: 'Moderada',
          alergiaGrave: 'Grave'
        },
        descricao: {
          local: 'Orateur de la congrégation de Lyon',
          visiteur: 'Orateur visiteur nécessitant hébergement/transport'
        },
        placeholders: {
          outrasNecessidades: 'Descreva outras necessidades específicas...',
          detalhesAlergia: 'Descreva os detalhes da alergia...',
          notas: 'Notas adicionais sobre o orador...'
        }
      },
      
      // Comum
      comum: {
        salvar: 'Salvar',
        cancelar: 'Cancelar'
      },
      
      // Sobre
      sobre: 'Sobre',
      versao: 'Versão',
      aplicacaoGestao: 'Aplicação para gestão de visitas de oradores capverdianos',
      desenvolvidoOffline: 'Desenvolvido para uso offline em dispositivos Android',
      
      // Politique de confidentialité
      politicaConfidentialite: 'Política de Privacidade',
      collecteDonnees: 'Coleta de Dados',
      collecteDonneesTexte: 'Coletamos as seguintes informações:',
      collecteDonnees1: 'Nome e informações de contato dos oradores',
      collecteDonnees2: 'Datas de visita e detalhes dos discursos',
      collecteDonnees3: 'Preferências e necessidades específicas',
      collecteDonnees4: 'Informações de contato',
      utilisationDonnees: 'Uso dos Dados',
      utilisationDonneesTexte: 'Seus dados são usados para:',
      protectionDonnees: 'Proteção de Dados',
      protectionDonneesTexte: 'Protegemos seus dados por meio de:',
      droitsUtilisateurs: 'Direitos do Usuário',
      droitsUtilisateursTexte: 'Você tem o direito de:',
      droitAcces: 'Acessar seus dados',
      droitRectification: 'Retificar seus dados',
      droitSuppression: 'Excluir seus dados',
      droitPortabilite: 'Solicitar a portabilidade de seus dados',
      droitOpposition: 'Opor-se ao processamento de seus dados',
      cookies: 'Cookies',
      cookiesTexte: 'Este site usa cookies para melhorar sua experiência.',
      modifications: 'Alterações',
      modificationsTexte: 'Podemos atualizar esta política periodicamente.',
      nousContacter: 'Entre em Contato',
      nousContacterTexte: 'Para quaisquer dúvidas sobre esta política de privacidade, entre em contato conosco em:',
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
      copyright: 'Droits d\'auteur Pinto Francisco',
      offline: 'Hors ligne',
      
      // Oradores
      buscarOrador: 'Rechercher par nom ou congrégation...',
      nenhumOradorEncontrado: 'Aucun orateur trouvé',
      nenhumOradorCadastrado: 'Aucun orateur enregistré pour le moment',
      adicionarPrimeiroOrador: 'Ajouter le premier orateur',
      proximaVisita: 'Prochaine visite',
      local: '🏠 Local',
      visitante: '✈️ Visiteur',
      alergia: 'Allergie',
      excluirOrador: 'Supprimer cet orateur ?',
      semAlergias: 'Sans allergie',
      detalhesAlergias: 'Détails des allergies...',
      outrosBesoins: 'Autres besoins spécifiques (médicaments, équipements, etc.)...',
      
      // Hôtes
      anfitrioes: 'Hôtes',
      adicionarAnfitriao: 'Ajouter un hôte',
      adicionarPrimeiroAnfitriao: 'Ajouter le premier hôte',
      nenhumAnfitriaoCadastrado: 'Aucun hôte enregistré pour le moment',
      nomeAnfitriao: 'Nom de l\'hôte',
      capacidades: 'Capacités',
      hospedagem: 'Hébergement (personnes)',
      refeicoes: 'Repas (couverts)',
      podeFornecerTransporte: 'Peut fournir un transport',
      restricoesPreferencias: 'Contraintes/Préférences',
      exemploRestricoes: 'Ex: Pas d\'animaux, pas d\'enfants en bas âge, allergies à éviter...',
      excluirAnfitriao: 'Supprimer cet hôte ?',
      pessoa: 'personne',
      pessoas: 'personnes',
      couvert: 'couvert',
      couverts: 'couverts',
      transporte: '🚗 Transport',
      
      // Dashboard
      noSpeakersYet: 'Aucun orateur enregistré pour le moment',
      noVisit: 'Aucune visite',
      noAlerts: 'Aucune alerte pour le moment',
      visitCalendar: 'Calendrier des Visites',
      assignmentsAndCompatibility: 'Attributions et Compatibilité',
      confirmed: 'Confirmées',
      proposed: 'Proposées',
      unassigned: 'Non attribué',
      manageAssignments: 'Gérer les Attributions',
      
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
      
      // OradorModal
      oradorModal: {
        titulo: 'Modifier l\'Orateur',
        secoes: {
          informacoes: 'Informations de Base',
          visitas: 'Visites',
          necessidades: 'Besoins',
          alergias: 'Allergies',
          notas: 'Notes'
        },
        campos: {
          nome: 'Nom',
          congregacao: 'Congrégation',
          tipo: 'Type d\'Orateur',
          telefone: 'Téléphone',
          ultimaVisita: 'Dernière Visite',
          proximaVisita: 'Prochaine Visite',
          ultimoDiscurso: 'N° Dernier Discours',
          proximoDiscurso: 'N° Prochain Discours',
          outrasNecessidades: 'Autres Besoins',
          tipoAlergia: 'Type d\'Allergie',
          detalhesAlergia: 'Détails de l\'Allergie'
        },
        opcoes: {
          local: 'Local (Lyon)',
          visiteur: 'Visiteur (Extérieur)',
          hospedagem: 'Hébergement',
          refeicoes: 'Repas',
          transporte: 'Transport',
          semAlergias: 'Sans allergie',
          alergiaModerada: 'Modérée',
          alergiaGrave: 'Grave'
        },
        descricao: {
          local: 'Orateur de la congrégation de Lyon',
          visiteur: 'Orateur visiteur nécessitant hébergement/transport'
        },
        placeholders: {
          outrasNecessidades: 'Décrivez d\'autres besoins spécifiques...',
          detalhesAlergia: 'Décrivez les détails de l\'allergie...',
          notas: 'Notes supplémentaires sur l\'orateur...'
        }
      },
      
      // Comum
      comum: {
        salvar: 'Enregistrer',
        cancelar: 'Annuler'
      },
      
      // À propos
      sobre: 'À propos',
      versao: 'Version',
      aplicacaoGestao: 'Application pour la gestion des visites d\'orateurs capverdiens',
      desenvolvidoOffline: 'Développé pour un usage hors ligne sur appareils Android',
      
      // Politique de confidentialité
      politiqueConfidentialite: 'Politique de Confidentialité',
      collecteDonnees: 'Collecte des Données',
      collecteDonneesTexte: 'Nous collectons les informations suivantes :',
      collecteDonnees1: 'Noms et coordonnées des orateurs',
      collecteDonnees2: 'Dates de visite et détails des discours',
      collecteDonnees3: 'Préférences et besoins spécifiques',
      collecteDonnees4: 'Informations de contact',
      utilisationDonnees: 'Utilisation des Données',
      utilisationDonneesTexte: 'Vos données sont utilisées pour :',
      protectionDonnees: 'Protection des Données',
      protectionDonneesTexte: 'Nous protégeons vos données en :',
      droitsUtilisateurs: 'Droits des Utilisateurs',
      droitsUtilisateursTexte: 'Vous avez le droit de :',
      droitAcces: 'Accéder à vos données',
      droitRectification: 'Rectifier vos données',
      droitSuppression: 'Supprimer vos données',
      droitPortabilite: 'Demander la portabilité de vos données',
      droitOpposition: 'Vous opposer au traitement de vos données',
      cookies: 'Cookies',
      cookiesTexte: 'Ce site utilise des cookies pour améliorer votre expérience.',
      modifications: 'Modifications',
      modificationsTexte: 'Nous pouvons mettre à jour cette politique de temps à autre.',
      nousContacter: 'Nous Contacter',
      nousContacterTexte: 'Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à :',
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
      copyright: 'Kópiu di direitu di autor Pinto Francisco',
      offline: 'Fora di linha',
      
      // Oradores
      buscarOrador: 'Buska pa nóme ka kongregason...',
      nenhumOradorEncontrado: 'Ningun orador atxa',
      nenhumOradorCadastrado: 'Ningun orador registroda inda',
      adicionarPrimeiroOrador: 'Junta primer orador',
      proximaVisita: 'Próksimu vizita',
      local: '🏠 Lokal',
      visitante: '✈️ Visitanti',
      alergia: 'Alergia',
      excluirOrador: 'Elimina es orador li?',
      semAlergias: 'Ka ten alergia',
      detalhesAlergias: 'Detalhe di alergias...',
      outrosBesoins: 'Otru nesesidadi spésifiku (remédiu, ekipamentu, etc.)...',
      
      // Hôtes
      anfitrioes: 'Anfitrionis',
      adicionarAnfitriao: 'Junta anfitrion',
      adicionarPrimeiroAnfitriao: 'Junta primer anfitrion',
      nenhumAnfitriaoCadastrado: 'Ningun anfitrion registroda inda',
      nomeAnfitriao: 'Nóme di Anfitrion',
      capacidades: 'Kapasidadi',
      hospedagem: 'Alojamentu (pessoa)',
      refeicoes: 'Djanta (pessoa)',
      podeFornecerTransporte: 'Pode fornesi transporti',
      restricoesPreferencias: 'Restrison/Preferénsia',
      exemploRestricoes: 'Ex: Ka ta atxa animal, ka ta atxa kriansa, alergia pa evita...',
      excluirAnfitriao: 'Elimina es anfitrion li?',
      pessoa: 'pessoa',
      pessoas: 'pessoa',
      couvert: 'pessoa',
      couverts: 'pessoa',
      transporte: '🚗 Transporti',
      
      // Dashboard
      noSpeakersYet: 'Nada orador registadu inda',
      noVisit: 'Ka ten visita',
      noAlerts: 'Nada alerta na moméntu',
      visitCalendar: 'Kalendáriu di Visita',
      assignmentsAndCompatibility: 'Atribuison i Kompatibilidadi',
      confirmed: 'Konfirmadu',
      proposed: 'Propondu',
      unassigned: 'Ka ten atribuison',
      manageAssignments: 'Jeré Atribuison',
      
      // Navigation
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
      
      // OradorModal
      oradorModal: {
        titulo: 'Redaktá Orádor',
        secoes: {
          informacoes: 'Informason Bázika',
          visitas: 'Vizitas',
          necessidades: 'Nesidadis',
          alergias: 'Alerjias',
          notas: 'Notas'
        },
        campos: {
          nome: 'Nòm',
          congregacao: 'Kongregason',
          tipo: 'Tipu di Orádor',
          telefone: 'Telifone',
          ultimaVisita: 'Últimu Vizita',
          proximaVisita: 'Próksimu Vizita',
          ultimoDiscurso: 'N° Últimu Diskursu',
          proximoDiscurso: 'N° Próksimu Diskursu',
          outrasNecessidades: 'Otru Nesesidadis',
          tipoAlergia: 'Tipu di Alerjia',
          detalhesAlergia: 'Detalhis di Alerjia'
        },
        opcoes: {
          local: 'Lokal (Lyon)',
          visiteur: 'Vizitante (Fora)',
          hospedagem: 'Alojamentu',
          refeicoes: 'Refeison',
          transporte: 'Transporti',
          semAlergias: 'Sem alerjias',
          alergiaModerada: 'Moderadu',
          alergiaGrave: 'Gravi'
        },
        descricao: {
          local: 'Orádor di kongregason di Lyon',
          visiteur: 'Orádor vizitante ku nesesita alojamentu/transporti'
        },
        placeholders: {
          outrasNecessidades: 'Deskreve otru nesesidadi spésifiku...',
          detalhesAlergia: 'Deskreve detalis di alerjia...',
          notas: 'Notas adisionais kona-sé orádor...'
        }
      },
      
      // Comum
      comum: {
        salvar: 'Gravá',
        cancelar: 'Kanselá'
      },
      
      // Sobri
      sobre: 'Sobri',
      versao: 'Verson',
      aplicacaoGestao: 'Aplikason pa geston di vizita di oradóris kabuverdianu',
      desenvolvidoOffline: 'Dizenvolvidu pa uzu fora di linha na dispozitivus Android',
      
      // Politika di Privasidadi
      politicaConfidentialite: 'Politika di Privasidadi',
      collecteDonnees: 'Rekolha di Dadus',
      collecteDonneesTexte: 'Nu ta rekolli informasons siginti:',
      collecteDonnees1: 'Nomi i kontatus di oradóris',
      collecteDonnees2: 'Data di vizita i detalhis di diskursu',
      collecteDonnees3: 'Preferénsias i nesesidadi spésifika',
      collecteDonnees4: 'Informasons di kontatu',
      utilisationDonnees: 'Uzu di Dadus',
      utilisationDonneesTexte: 'Seus dadus ta ser uzadu pa:',
      protectionDonnees: 'Protekson di Dadus',
      protectionDonneesTexte: 'Nu ta protegi seudadus pamodi:',
      droitsUtilisateurs: 'Direitus di Uzuáriu',
      droitsUtilisateursTexte: 'Bu tem direitu di:',
      droitAcces: 'Acedê a seudadus',
      droitRectification: 'Korigi seudadus',
      droitSuppression: 'Elimina seudadus',
      droitPortabilite: 'Pidi portabilidadi di seudadus',
      droitOpposition: 'Opoñe-ti al tratamentu di seudadus',
      cookies: 'Cookies',
      cookiesTexte: 'Es siti uza cookies pa melhora esperiénsia di bu uzu.',
      modifications: 'Mudansas',
      modificationsTexte: 'Nu ta atualiza es politika di tempu pa tempu.',
      nousContacter: 'Kontatu-nos',
      nousContacterTexte: 'Pa kualker duvida sobri es politika di privasidadi, favor kontata-nos na:',
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