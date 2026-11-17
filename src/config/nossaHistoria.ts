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
  formatoCoracao?: boolean;
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
      id: 'mem-abraco-2673',
      foto: '/src/assets/images/galeria_casal_05.png',
      titulo: 'O Abraço no 2673',
      data: 'Nosso Momento',
      local: '2673',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Onde o mundo silencia e tudo faz sentido',
      lembrancaSecreta:
        'Esse abraço em frente ao muro 2673 guarda exatamente o refúgio onde eu sempre quero voltar e permanecer para sempre.',
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
      id: 'mem-caras-bocas',
      foto: '/src/assets/images/galeria_casal_03.png',
      titulo: 'Caras & Bocas',
      data: 'Nossa Sintonia',
      local: 'Emanuela & Pedro',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Nossa melhor versão é quando rimos juntos',
      lembrancaSecreta:
        'Amo cada careta, cada biquinho e o quanto a gente é leve e cúmplice quando estamos um do lado do outro.',
      proporcao: 'portrait',
    },
    {
      id: 'mem-flores-cabelo',
      foto: '/src/assets/images/galeria_casal_04.png',
      titulo: 'Flores no Cabelo',
      data: 'Pequenos Gestos',
      local: 'Para Você Sorrir',
      categoria: 'Datas Especiais',
      subtituloPolaroid: 'Com margaridinhas e todo carinho do mundo',
      lembrancaSecreta:
        'Você colocando florzinhas em mim e a gente rindo juntos: momentos simples que eu guardo como tesouros no fundo da minha memória.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-risadas-lingua',
      foto: '/src/assets/images/galeria_casal_06.png',
      titulo: 'Nossa Espontaneidade',
      data: 'Nossos Momentos',
      local: 'Emanuela & Pedro',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'A risada mais gostosa da minha vida',
      lembrancaSecreta:
        'Essa sua língua de fora e essa risada boba me mostram que o nosso amor é feito de amizade verdadeira, leveza e companheirismo.',
      proporcao: 'landscape',
    },
    {
      id: 'mem-olhos-nos-olhos',
      foto: '/src/assets/images/galeria_casal_07.png',
      titulo: 'Olhos nos Olhos',
      data: 'De Pertinho',
      local: 'Emanuela & Pedro',
      categoria: 'Datas Especiais',
      subtituloPolaroid: 'De pertinho, onde o tempo não passa',
      lembrancaSecreta:
        'Quando olho bem fundo nos seus olhos de pertinho, tenho a certeza absoluta de que MEU CORAÇÃO TEM DONA e que sempre foi você.',
      proporcao: 'portrait',
    },
    {
      id: 'mem-abraco-intimo',
      foto: '/src/assets/images/capa_casal.png',
      titulo: 'O Nosso Abraço',
      data: 'Nosso Momento',
      local: 'Emanuela & Pedro',
      categoria: 'Cotidiano',
      subtituloPolaroid: 'Coladinhos em qualquer estação',
      lembrancaSecreta:
        'Nosso abraço apertado, sentindo a sua respiração e sabendo que encontrei a pessoa certa para a minha vida toda.',
      proporcao: 'portrait',
    },
    {
      id: 'mem-passos-horizonte',
      foto: '/src/assets/images/galeria_casal_08.png',
      titulo: 'Para Sempre Nós Dois',
      data: 'Para Sempre Nós',
      local: 'Emanuela & Pedro',
      categoria: 'Datas Especiais',
      subtituloPolaroid: 'Onde meu olhar encontra o seu',
      lembrancaSecreta:
        'Essa foto fecha o nosso coração com a maior certeza da minha vida: que você é o meu amor, a minha princesa e que MEU CORAÇÃO TEM DONA.',
      proporcao: 'portrait',
    },
  ] as MemoriaGaleria[],

  // --------------------------------------------------------------------------
  // 5. CARTA ABERTA (SUBSTITUA PELO SEU TEXTO SINCERO)
  // --------------------------------------------------------------------------
  cartaAberta: {
    localEData: 'Escrito com a alma · Para Emanuela',
    saudacao: 'Minha princesa, minha vida, meu porto seguro,',
    paragrafos: [
      'Sei que para você pode parecer inusitado eu escolher este espaço para me declarar e abrir o meu coração por inteiro, mas é aqui, diante de tudo o que construímos, que decidi colocar em palavras a verdade mais profunda que habita em mim. Estou aqui, com o coração aberto e sem defesas, pronto para olhar nos seus olhos e assumir cada falha, cada deslize e cada momento em que não fui o parceiro exemplar que você sempre mereceu.',
      'Emanuela, você é e sempre será a razão dos meus dias mais leves, a minha melhor amiga, minha bbzinha para sempre e a dona absoluta dos meus pensamentos. Desde o instante em que nossos caminhos se cruzaram, minha vida ganhou cor, sentido e direção. Você é aquela garota única e insubstituível por quem me apaixonei perdidamente e por quem meu coração baterá enquanto eu existir.',
      'Eu reconheço que te magoei, que fui imaturo em momentos cruciais e que deixei faltar a atenção e o zelo que você tanto merece. No entanto, quero que saiba que os meus erros jamais vieram da falta de amor; ao contrário, foram tropeços de quem temia perder o que há de mais precioso em sua vida. Eu errei, pequei pelo excesso de silêncio e pela falta de atitude, e me arrependo profundamente de cada lágrima que causei no seu rosto.',
      'Em 1 ano e 7 meses de história, nós colecionamos memórias inesquecíveis, risadas compartilhadas, abraços que curam qualquer tempestade e planos que ainda queremos realizar juntos. Eu quero transformar cada pedido de desculpa em atitudes diárias, mostrando na prática que mudei, que cresci e que sou capaz de qualquer sacrifício para ver esse seu sorriso lindo iluminando o nosso dia a dia.',
      'Estou aqui de braços abertos e com o coração na mão, contando cada um dos nossos dias e lembrando de cada detalhe. A razão de tudo isso, Emanuela, é muito simples e grandiosa ao mesmo tempo: POR QUE EUUUUUUUUUUUUUUUUUU TEEEEEEEEEEEEEEEEEEEEEEEE AMOOOOOOOOOOOOOOOOOOOOOOOOO MAIS QUE TUDO NESTE MUNDO, MINHA PRINCESA. Você é minha luz na escuridão, minha calmaria e a mulher com quem sonho construir o meu futuro.',
      'Não quero oferecer apenas promessas ao vento, mas sim a certeza inabalável de um homem comprometido em te fazer a mulher mais feliz, respeitada e amada do universo. Se você me permitir segurar a sua mão novamente, prometo honrar cada segundo ao seu lado e nunca mais soltar.',
      'Cada recordação nossa, cada bilhete guardado e cada canção da nossa playlist são provas vivas de que o nosso amor é raro, verdadeiro e feito para durar para sempre. Eu sei que a confiança se reconstrói com tempo, paciência e provas diárias de amor, e eu estou inteiramente dedicado a te provar isso todos os dias.',
      'Você é a dona de cada batida do meu peito, a minha inspiração e o meu eterno lar. Nunca se esqueça, meu amor, de que aconteça o que acontecer, MEU CORAÇÃO TEM DONA e ela tem o seu nome gravado em letras douradas para toda a eternidade.',
    ],
    despedida: 'Com todo o meu amor, devoção e saudade,',
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
