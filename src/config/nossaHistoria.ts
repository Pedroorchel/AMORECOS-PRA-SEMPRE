/**
 * ============================================================================
 * GUIA DE PERSONALIZAÇÃO — NOSSA HISTÓRIA
 * ============================================================================
 * Substitua os textos, datas e links das fotos abaixo pelos momentos reais
 * de vocês dois. Todos os componentes leem automaticamente este arquivo.
 *
 * Dica para fotos próprias:
 * Coloque suas fotos na pasta `/public/fotos/` e referencie como `/fotos/nome.jpg`,
 * ou cole URLs diretas de imagens hospedadas.
 * ============================================================================
 */

export interface EventoTimeline {
  id: string;
  numero: string;
  data: string;
  titulo: string;
  local: string;
  descricao: string;
  foto: string;
  legendaFoto: string;
  proporcao?: 'portrait' | 'landscape';
  objectPosition?: string;
}

export type CategoriaMemoria = 'Viagens' | 'Cotidiano' | 'Datas Especiais';

export interface MemoriaGaleria {
  id: string;
  foto: string;
  titulo: string;
  data: string;
  local: string;
  categoria: CategoriaMemoria;
  /** Frase curta manuscrita na borda da Polaroid */
  subtituloPolaroid?: string;
  /** Mensagem íntima revelada ao clicar na foto (lightbox) */
  lembrancaSecreta: string;
  /** 'portrait' (vertical 3:4) ou 'landscape' (horizontal 4:3) para o ritmo editorial */
  proporcao: 'portrait' | 'landscape';
}

export interface MotivoAmor {
  id: string;
  numeroRomano: string;
  tituloFrente: string;
  mensagemVerso: string;
}

export interface PlanoFuturo {
  id: string;
  titulo: string;
  detalhe: string;
  categoria: string;
  concluido: boolean;
}

export type PlataformaMusica = 'Spotify' | 'YouTube Music' | 'Apple Music' | 'Arquivo Local';

export interface FaixaPlaylist {
  id: string;
  titulo: string;
  artista: string;
  duracao: string;
  /** Trecho ou motivo especial que lembra vocês dois */
  dedicatoria?: string;
  /** Link direto para ouvir a versão original no Spotify ou YouTube Music */
  linkExterno?: string;
  /** OPCIONAL: Cole aqui o link direto de um arquivo .mp3 para tocar a música real. */
  audioUrl?: string;
  /** Arranjo instrumental embutido caso não tenha MP3 (0 a 5) */
  temaIndex?: number;
}

export interface PlaylistCasal {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  plataforma: PlataformaMusica;
  linkUrl?: string;
  faixas: FaixaPlaylist[];
}

export const NOSSA_HISTORIA = {
  // --------------------------------------------------------------------------
  // 1. CAPA E NOMES (SUBSTITUA AQUI)
  // --------------------------------------------------------------------------
  nomeDela: 'Emanuela',
  seuNome: 'Pedro',
  tituloCabecalho: 'Emanuela & Pedro',
  edicaoEditorial: 'Edição Especial · Para Sempre Nós',
  fraseCapa: 'Nossa história, em cada detalhe.',
  // Substitua pelo caminho ou link da foto principal de vocês:
  fotoCapa: '/src/assets/images/hero_golden_sun_sky_1794864691229.jpg',
  altFotoCapa: 'Sol dourado iluminando o céu e o horizonte ao entardecer',

  // --------------------------------------------------------------------------
  // 2. DATA DO INÍCIO DO NAMORO (SUBSTITUA AQUI)
  // Formato ISO: 'AAAA-MM-DDTHH:MM:SS'
  // --------------------------------------------------------------------------
  dataInicioNamoroISO: '2025-04-06T00:00:00',
  dataInicioPorExtenso: '06 de abril de 2025',

  // --------------------------------------------------------------------------
  // 3. NOSSA LINHA DO TEMPO (SUBSTITUA PELOS MARCOS DO RELACIONAMENTO)
  // --------------------------------------------------------------------------
  timelineEventos: [
    {
      id: 'primeira-foto-juntos',
      numero: '01',
      data: 'O Começo de Tudo',
      titulo: 'Primeira Foto Nossa Juntos',
      local: 'Emanuela & Pedro',
      descricao:
        'O nosso primeiro registro lado a lado — o momento em que nossa história começou a ganhar forma, sorrisos e memórias que eu guardaria para sempre.',
      foto: '/src/assets/images/capitulo_01_primeira_foto.png',
      legendaFoto: 'Fig. 01 — Nossa primeira foto juntos, onde tudo começou.',
      proporcao: 'portrait',
      objectPosition: '50% 60%',
    },
    {
      id: 'melhores-momentos',
      numero: '02',
      data: 'Nossas Conquistas',
      titulo: 'Melhores Momentos Juntos',
      local: 'Emanuela & Pedro',
      descricao:
        'Cada risada dividida, cada vitória celebrada lado a lado e a certeza de que os dias mais leves e felizes são sempre aqueles em que estamos juntos.',
      foto: '/src/assets/images/capitulo_02_melhores_momentos.png',
      legendaFoto: 'Fig. 02 — Nossos sorrisos, nossas vitórias e o privilégio de celebrar tudo ao seu lado.',
      proporcao: 'portrait',
      objectPosition: '50% 58%',
    },
    {
      id: 'livro-dos-amores',
      numero: '03',
      data: '23 de Outubro, 2025',
      titulo: 'Cartas, Doces & Nosso Livro',
      local: 'Para Minha Princesa',
      descricao:
        'Cada folha escrita à mão no Livro dos Amores, os envelopes guardados com carinho e todos os seus doces favoritos reunidos para tentar colocar no papel o tamanho do meu amor por você.',
      foto: '/src/assets/images/capitulo_03_nosso_momento.png',
      legendaFoto: 'Fig. 03 — Cartas feitas à mão, chocolates e lembranças que falam por nós.',
      proporcao: 'landscape',
    },
    {
      id: 'flores-para-voce',
      numero: '04',
      data: 'Pequenos Gestos',
      titulo: 'Flores Para Você',
      local: 'Para Iluminar Seu Dia',
      descricao:
        'Um girassol, rosas e toda a delicadeza que cabe em um buquê — porque você merece ser surpreendida com flores e com o melhor de mim em todos os dias comuns.',
      foto: '/src/assets/images/capitulo_04_nosso_momento.png',
      legendaFoto: 'Fig. 04 — Um girassol para lembrar da sua luz na minha vida.',
      proporcao: 'portrait',
      objectPosition: '50% 75%',
    },
  ] as EventoTimeline[],

  // --------------------------------------------------------------------------
  // 4. GALERIA DE MEMÓRIAS (ESTILO POLAROID / EDITORIAL + LEGENDA SECRETA)
  // --------------------------------------------------------------------------
  galeriaMemorias: [
    {
      id: 'mem-emanuela-pedro',
      foto: '/src/assets/images/galeria_casal_01.png',
      titulo: 'Nós Dois',
      data: 'Nosso Momento',
      local: 'Emanuela & Pedro',
      categoria: 'Datas Especiais',
      subtituloPolaroid: 'Um dos meus registros preferidos ao seu lado',
      lembrancaSecreta:
        'Cada vez que olho para essa foto lembro do quanto sou feliz por dividir a vida com você, do seu sorriso que acalma qualquer tempestade e de como estar ao seu lado é sempre o meu lugar favorito no mundo.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-abraco',
      foto: '/src/assets/images/capa_casal.png',
      titulo: 'O Nosso Abraço',
      data: 'Nosso Momento',
      local: '2673',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Onde o mundo silencia e tudo faz sentido',
      lembrancaSecreta:
        'Esse abraço guarda exatamente o lugar onde eu sempre quero voltar.',
      proporcao: 'portrait',
    },
    {
      id: 'mem-nosso-olhar',
      foto: '/src/assets/images/galeria_casal_02.png',
      titulo: 'Pertinho de Você',
      data: 'Nosso Momento',
      local: 'Emanuela & Pedro',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Meu lugar preferido no mundo inteiro é bem aqui',
      lembrancaSecreta:
        'Cada foto assim me lembra da paz que é estar colado com você, do seu jeitinho único e de quanto eu amo o nosso sorriso junto.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-1',
      foto: '/src/assets/images/memory_coastal_walk_1794863618669.jpg',
      titulo: 'Escadaria para o Mar',
      data: 'Novembro · 2023',
      local: 'Litoral Sul',
      categoria: 'Viagens',
      subtituloPolaroid: 'O melhor caminho é sempre onde nos perdemos juntos',
      lembrancaSecreta:
        'Nesse dia nos perdemos procurando o mirante e acabamos encontrando a vista mais silenciosa e linda da viagem inteira. Você sorriu e disse que perder a hora contigo era o melhor plano.',
      proporcao: 'portrait',
    },
    {
      id: 'mem-2',
      foto: '/src/assets/images/memory_first_coffee_1794863618076.jpg',
      titulo: 'A Mesa da Janela',
      data: 'Abril · 2023',
      local: 'Centro Histórico',
      categoria: 'Datas Especiais',
      subtituloPolaroid: 'Duas xícaras que esfriaram enquanto o tempo parou',
      lembrancaSecreta:
        'Eu cheguei vinte minutos antes porque estava nervoso demais para esperar em casa. Quando você entrou pela porta com aquele casaco claro, soube no mesmo instante que minha vida tinha ganhado um novo centro.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-3',
      foto: '/src/assets/images/memory_sunday_morning_1794863619290.jpg',
      titulo: 'Manhãs de Domingo',
      data: 'Março · 2024',
      local: 'Nosso Refúgio',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Luz da manhã, poesia e silêncio bom',
      lembrancaSecreta:
        'Você lia poesia em voz baixa enquanto a luz desenhava sombras de folhas na parede. É nas manhãs lentas como essa que percebo que o amor mora na quietude.',
      proporcao: 'portrait',
    },
    {
      id: 'mem-4',
      foto: '/src/assets/images/memory_candlelight_evening_1794863618505.jpg',
      titulo: 'Brinde ao Crepúsculo',
      data: 'Junho · 2023',
      local: 'Varanda do Mirante',
      categoria: 'Datas Especiais',
      subtituloPolaroid: 'A noite em que o sim mudou tudo',
      lembrancaSecreta:
        'A vela quase apagou com a brisa duas vezes antes de eu conseguir terminar o que queria dizer. Guardo o guardanapo dessa mesa dobrado até hoje na minha gaveta.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-5',
      foto: '/src/assets/images/memory_golden_picnic_1794863619450.jpg',
      titulo: 'Pôr do Sol no Campo',
      data: 'Junho · 2024',
      local: 'Campos Altos',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Grama alta, céu dourado e a primeira estrela',
      lembrancaSecreta:
        'Ficamos olhando as nuvens mudarem de cor até aparecer a primeira estrela. Você adormeceu com a cabeça no meu ombro e o chapéu de palha ao lado.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-6',
      foto: '/src/assets/images/hero_couple_editorial_1794863617129.jpg',
      titulo: 'Passos na Mesma Direção',
      data: 'Setembro · 2024',
      local: 'Falésias do Atlântico',
      categoria: 'Viagens',
      subtituloPolaroid: 'Caminhando em paz para qualquer horizonte',
      lembrancaSecreta:
        'Pedimos a um desconhecido para tirar apenas uma foto, e ele capturou exatamente como me sinto ao seu lado: caminhando em paz para qualquer horizonte.',
      proporcao: 'landscape',
    },
  ] as MemoriaGaleria[],

  // --------------------------------------------------------------------------
  // 5. CARTA ABERTA (SUBSTITUA PELO SEU TEXTO SINCERO)
  // --------------------------------------------------------------------------
  cartaAberta: {
    localEData: 'De coração aberto · Para Emanuela',
    saudacao: 'Oiiiee Minha Princesa,',
    paragrafos: [
      'Pra você deve estar sendo estranho eu te chamar de princesa, mas é o que eu acho de você, minha princesa, minha bbzinha, meu tudo. Eu estou sendo homem de vir aqui e conversar com você. Eu errei e eu assumo, eu não estava tão dedicado e assim acabei perdendo minha vida.',
      'Emanuela, você é meu tudo, você é minha melhor amiga, você é minha bbzinha pra sempre, minha nunuzinha. Você é e sempre será a minha Emanuela, aquela Emanuela que eu conheci. Eu quero te mostrar que eu sou capaz de te fazer feliz novamente e você ser minha princesa que eu AMUUUU MUITOOOO.',
      'Só que pra isso eu preciso que você entenda algumas coisas: eu sei que eu te magoei e eu admito, mas isso não foi por querer. Foi eu, eu te desanimei, te desapontei e fiz uma coisa que você nunca gostou, que foi errar com você, fazer o que não devia e assim eu te perdi.',
      'Em 1 ano e 7 meses eu aprendi muito com você, aprendi a dedicar mais, demonstrar mais, aprendi a nunca parar de amar, mas de um tempo pra cá eu vacilei, eu bobeei, eu fui um idiota, EU FUI UMA PESSOA RIDÍCULA, E EU ESTOU DISPOSTO A REVERTER ISSO, NÃO FICAR DISTANTE, NÃO FICAR LONGE E MOSTRAR QUE EU SOU CAPAZ DE QUALQUER COISA POR VOCÊ, EMANUELA.',
      'Eu estou esperando a sua mão há 1 ano e 7 meses, sabe, 587 dias. Você sabe o porquê, Emanuela: POR QUE EUUUUUUUUUUUUUU TEEEEEEEEEEE AMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO MUITÃOOOOO, MINHA PRINCESA. Você é minha luz na escuridão, você é minha paz na guerra, você é tudo para mim, você é a mãe dos meus filhos, Emanuela, você é tudo pra mim.',
      'Eu não quero promessas vazias, eu quero atitudes todos os dias para reconquistar cada sorriso seu e cuidar do nosso amor do jeito que você sempre mereceu. Se você me der a sua mão de novo, eu nunca mais vou soltar.',
    ],
    despedida: 'Sempre seu, esperando por você com todo o meu coração,',
    assinatura: 'Pedro',
  },

  // --------------------------------------------------------------------------
  // 6. MOTIVOS PELOS QUAIS EU TE AMO (CARTÕES INTERATIVOS / FLIP CARDS)
  // --------------------------------------------------------------------------
  motivosAmor: [
    {
      id: 'motivo-1',
      numeroRomano: 'I',
      tituloFrente: 'O brilho no seu olhar',
      mensagemVerso:
        'Pelo jeito único como seus olhos se iluminam sempre que você fala sobre algo que ama ou descobre uma música nova.',
    },
    {
      id: 'motivo-2',
      numeroRomano: 'II',
      tituloFrente: 'A sua calma gentil',
      mensagemVerso:
        'Porque estar ao seu lado transforma qualquer dia agitado em um domingo silencioso, seguro e cheio de paz.',
    },
    {
      id: 'motivo-3',
      numeroRomano: 'III',
      tituloFrente: 'O nosso humor particular',
      mensagemVerso:
        'Pelas piadas internas que ninguém mais entende e por um simples olhar seu que já me faz rir no meio de qualquer lugar.',
    },
    {
      id: 'motivo-4',
      numeroRomano: 'IV',
      tituloFrente: 'O cuidado nos pequenos gestos',
      mensagemVerso:
        'Pelas mensagens de bom dia, pelo café preparado antes de eu acordar e por lembrar de detalhes que eu mesmo esqueci.',
    },
    {
      id: 'motivo-5',
      numeroRomano: 'V',
      tituloFrente: 'A força da sua doçura',
      mensagemVerso:
        'Admiro profundamente a mulher generosa, corajosa e determinada que você é, sem nunca perder a ternura.',
    },
    {
      id: 'motivo-6',
      numeroRomano: 'VI',
      tituloFrente: 'O futuro que inventamos',
      mensagemVerso:
        'Porque todos os meus planos preferidos — dos mais simples aos mais distantes — têm você bem no meio deles.',
    },
  ] as MotivoAmor[],

  // --------------------------------------------------------------------------
  // 7. NOSSAS PLAYLISTS E PRÓXIMOS PLANOS (SUBSTITUA PELOS LINKS DE VOCÊS)
  // --------------------------------------------------------------------------
  trilhaSonora: {
    tituloMusica: 'Aliança',
    artista: 'Tribalistas',
    albumOuNota: 'Trilha sonora da nossa edição especial',
    audioUrl: '',
    linkPlaylistExterna: 'https://open.spotify.com/search/Alianca%20Tribalistas',
    textoBotaoPlaylist: 'Abrir Nossa Playlist no Spotify',
  },

  nossasPlaylists: [
    {
      id: 'pl-1',
      numero: '01',
      titulo: 'Para Ouvir Abraçados',
      descricao: 'Músicas doces e aconchegantes que têm o nosso jeitinho e acalmam o coração.',
      plataforma: 'Spotify',
      linkUrl: 'https://open.spotify.com/search/Alianca%20Tribalistas',
      faixas: [
        {
          id: 'fx-1',
          titulo: 'Aliança',
          artista: 'Tribalistas',
          duracao: '03:58',
          dedicatoria: '“Se você quiser, a gente casa…”',
          linkExterno: 'https://open.spotify.com/search/Alianca%20Tribalistas',
          audioUrl: '/assets/aistudio/Tribalistas_-_Velha_Infancia__zwqrmEMB0wc__ab80a044.mp3',
          temaIndex: 0,
        },
        {
          id: 'fx-3',
          titulo: 'Ainda Bem',
          artista: 'Marisa Monte',
          duracao: '03:36',
          dedicatoria: '“Ainda bem que agora encontrei você…”',
          linkExterno: 'https://open.spotify.com/search/Ainda%20Bem%20Marisa%20Monte',
          audioUrl: '/assets/aistudio/Foi_assim_09bed6a9.mp3',
          temaIndex: 3,
        },
        {
          id: 'fx-4',
          titulo: 'Partilhar',
          artista: 'Rubel & ANAVITÓRIA',
          duracao: '03:42',
          dedicatoria: '“Eu quero partilhar a vida boa com você…”',
          linkExterno: 'https://open.spotify.com/search/Partilhar%20Rubel%20Anavitoria',
          audioUrl: '/assets/aistudio/Rubel__ANAVIT_RIA_-_Partilhar__Clipe_Oficial___WkLpoUiasZ8__5eca3f89.mp3',
          temaIndex: 4,
        },
        {
          id: 'fx-13',
          titulo: 'Um Amor Puro',
          artista: 'Djavan',
          duracao: '03:50',
          dedicatoria: '“Ah, que bom você chegou, bem a hora de o sol acender o mar…”',
          linkExterno: 'https://open.spotify.com/search/Djavan%20Um%20Amor%20Puro',
          audioUrl: '/assets/aistudio/Djavan_-_Um_Amor_Puro___udio_Oficial__4_54cafd76.mp3',
          temaIndex: 1,
        },
      ],
    },
    {
      id: 'pl-2',
      numero: '02',
      titulo: 'Tudo Que Me Lembra Você',
      descricao: 'Declarações sinceras que dizem exatamente o que eu sinto por você, minha princesa.',
      plataforma: 'Spotify',
      linkUrl: 'https://open.spotify.com/search/Pupila%20Anavitoria%20Vitor%20Kley',
      faixas: [
        {
          id: 'fx-5',
          titulo: 'Pupila',
          artista: 'ANAVITÓRIA & Vitor Kley',
          duracao: '03:20',
          dedicatoria: '“Como que eu vou dizer pra ela que eu gosto do seu cheiro?”',
          linkExterno: 'https://open.spotify.com/search/Pupila%20Anavitoria%20Vitor%20Kley',
          audioUrl: '/assets/aistudio/ANAVIT_RIA__Vitor_Kley_-_Pupila__9Sk7RQtSl5g__0037893e.mp3',
          temaIndex: 1,
        },
        {
          id: 'fx-6',
          titulo: 'De Janeiro a Janeiro',
          artista: 'Roberta Campos & Nando Reis',
          duracao: '03:12',
          dedicatoria: '“O meu amor é teu, de janeiro a janeiro, até o mundo acabar…”',
          linkExterno: 'https://open.spotify.com/search/De%20Janeiro%20a%20Janeiro%20Roberta%20Campos',
          audioUrl: '/assets/aistudio/Roberta_Campos_e_Nando_Reis_-_De_Janeiro_a_Janeiro__Video_Oficial___8nOEO7Hm7rg__b8ce43a6.mp3',
          temaIndex: 4,
        },
        {
          id: 'fx-7',
          titulo: 'Pra Você Guardei o Amor',
          artista: 'Nando Reis & Ana Cañas',
          duracao: '05:45',
          dedicatoria: '“Pra você guardei o amor que nunca soube dar…”',
          linkExterno: 'https://open.spotify.com/search/Pra%20Voce%20Guardei%20o%20Amor%20Nando%20Reis',
          audioUrl: '/assets/aistudio/Nando_Reis__Ana_Ca_as_-_Pra_Voc__Guardei_O_Amor__sB8_zYjxSGg__efafa455.mp3',
          temaIndex: 2,
        },
        {
          id: 'fx-8',
          titulo: 'Velha Infância',
          artista: 'Tribalistas',
          duracao: '04:10',
          dedicatoria: '“Você é assim, um sonho pra mim…”',
          linkExterno: 'https://open.spotify.com/search/Velha%20Infancia%20Tribalistas',
          audioUrl: '/assets/aistudio/Tribalistas_-_Velha_Infancia__zwqrmEMB0wc__ab80a044.mp3',
          temaIndex: 0,
        },
        {
          id: 'fx-14',
          titulo: 'Outro Dia',
          artista: 'Lourena, Mazin, Azzy, Black',
          duracao: '03:40',
          dedicatoria: '“Deixa eu te contar tudo o que eu planejei para nós dois…”',
          linkExterno: 'https://open.spotify.com/search/Outro%20Dia%20Lourena',
          audioUrl: '/assets/aistudio/OUTRO_DIA_-_Lourena__Mazin__AZZY__Black__AZMUTH__Official_Video__7203b364.mp3',
          temaIndex: 2,
        },
      ],
    },
    {
      id: 'pl-3',
      numero: '03',
      titulo: 'Nosso Universo Inteiro',
      descricao: 'Clássicos internacionais apaixonados para dançar devagar na sala e sonhar junto.',
      plataforma: 'YouTube Music',
      linkUrl: 'https://music.youtube.com/search?q=Perfect%20Ed%20Sheeran',
      faixas: [
        {
          id: 'fx-9',
          titulo: 'Perfect',
          artista: 'Ed Sheeran',
          duracao: '04:23',
          dedicatoria: '“I found a love for me, darling, just dive right in…”',
          linkExterno: 'https://music.youtube.com/search?q=Perfect%20Ed%20Sheeran',
          audioUrl: '/assets/aistudio/Ed_Sheeran_-_Perfect__Official_Music_Video__4_76d42cad.mp3',
          temaIndex: 2,
        },
        {
          id: 'fx-10',
          titulo: 'Until I Found You',
          artista: 'Stephen Sanchez',
          duracao: '02:57',
          dedicatoria: '“I would never fall in love again until I found her…”',
          linkExterno: 'https://music.youtube.com/search?q=Until%20I%20Found%20You%20Stephen%20Sanchez',
          audioUrl: '/assets/aistudio/Stephen_Sanchez_-_Until_I_Found_You__Official_Video__4_be539f12.mp3',
          temaIndex: 5,
        },
        {
          id: 'fx-11',
          titulo: 'Lover',
          artista: 'Taylor Swift',
          duracao: '03:41',
          dedicatoria: '“Can I go where you go? Can we always be this close forever?”',
          linkExterno: 'https://music.youtube.com/search?q=Lover%20Taylor%20Swift',
          audioUrl: '/assets/aistudio/Taylor_Swift_-_Lover__Official_Music_Video__4_840b6615.mp3',
          temaIndex: 5,
        },
        {
          id: 'fx-12',
          titulo: 'La Vie En Rose',
          artista: 'Daniela Andrade',
          duracao: '02:34',
          dedicatoria: '“Hold me close and hold me fast, the magic spell you cast…”',
          linkExterno: 'https://music.youtube.com/search?q=La%20Vie%20En%20Rose%20Daniela%20Andrade',
          audioUrl: '/assets/aistudio/La_Vie_En_Rose_4_c8a6156c.mp3',
          temaIndex: 3,
        },
        {
          id: 'fx-15',
          titulo: 'Iris',
          artista: 'Goo Goo Dolls',
          duracao: '04:50',
          dedicatoria: '“And I don’t want the world to see me, ’cause I don’t think that they’d understand…”',
          linkExterno: 'https://open.spotify.com/search/Goo%20Goo%20Dolls%20Iris',
          audioUrl: '/assets/aistudio/Goo_Goo_Dolls_-_Iris__Live_in_Buffalo__NY__7_4_2004___Official_Video__4_a526fbcc.mp3',
          temaIndex: 0,
        },
      ],
    },
  ] as PlaylistCasal[],

  proximosPlanosIniciais: [
    {
      id: 'plano-1',
      titulo: 'Assistir ao nascer do sol na Serra',
      detalhe: 'Café quente na garrafa térmica e dois cobertores',
      categoria: 'Fim de Semana',
      concluido: true,
    },
    {
      id: 'plano-2',
      titulo: 'Viajar de trem pela costa italiana',
      detalhe: 'Cinque Terre & Costa Amalfitana na primavera',
      categoria: 'Viagem dos Sonhos',
      concluido: false,
    },
    {
      id: 'plano-3',
      titulo: 'Fazer uma aula de cerâmica juntos',
      detalhe: 'Moldar nossas próprias xícaras de café da manhã',
      categoria: 'Experiência',
      concluido: false,
    },
    {
      id: 'plano-4',
      titulo: 'Montar a nossa estante de livros e vinis',
      detalhe: 'Um canto inteiro com nossas histórias favoritas',
      categoria: 'Nosso Lar',
      concluido: false,
    },
    {
      id: 'plano-5',
      titulo: 'Ver a aurora boreal abraçados',
      detalhe: 'Sob o céu estrelado do norte em uma cabana de madeira',
      categoria: 'Grande Aventura',
      concluido: false,
    },
  ] as PlanoFuturo[],
};
