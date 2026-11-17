import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Disc3,
  ExternalLink,
  Loader2,
  Music2,
  Pause,
  Play,
  Plus,
  SkipBack,
  SkipForward,
  Trash2,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  FaixaPlaylist,
  NOSSA_HISTORIA,
  PlataformaMusica,
  PlaylistCasal,
} from '../config/nossaHistoria';

const STORAGE_KEY_PLAYLISTS = 'emanuela_pedro_playlists_v2';

export interface ActiveTrackState {
  playlistId: string;
  playlistTitulo: string;
  faixa: FaixaPlaylist;
}

interface SoundtrackAndPlansProps {
  activeTrack: ActiveTrackState | null;
  isPlaying: boolean;
  isLoadingAudio?: boolean;
  isMuted: boolean;
  elapsedSeconds: number;
  durationSeconds: number;
  onSelectTrack: (playlist: PlaylistCasal, faixa: FaixaPlaylist) => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onPrevTrack: (allTracks: ActiveTrackState[]) => void;
  onNextTrack: (allTracks: ActiveTrackState[]) => void;
}

function getSpotifyEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('spotify.com')) return null;
    const match = parsed.pathname.match(/\/(playlist|album|track)\/([a-zA-Z0-9]+)/);
    if (!match) return null;
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const listId = parsed.searchParams.get('list');
      if (listId) return `https://www.youtube.com/embed/videoseries?list=${listId}`;
      const videoId = parsed.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  } catch {
    return null;
  }
}

function formatSeconds(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function SoundtrackAndPlans({
  activeTrack,
  isPlaying,
  isLoadingAudio = false,
  isMuted,
  elapsedSeconds,
  durationSeconds,
  onSelectTrack,
  onTogglePlay,
  onToggleMute,
  onPrevTrack,
  onNextTrack,
}: SoundtrackAndPlansProps) {
  const { nossasPlaylists } = NOSSA_HISTORIA;

  const [playlistsExtras, setPlaylistsExtras] = useState<PlaylistCasal[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_PLAYLISTS);
      if (saved) {
        const parsed = JSON.parse(saved) as PlaylistCasal[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [mostrarFormPlaylist, setMostrarFormPlaylist] = useState(false);
  const [plTitulo, setPlTitulo] = useState('');
  const [plDescricao, setPlDescricao] = useState('');
  const [plPlataforma, setPlPlataforma] = useState<PlataformaMusica>('Arquivo Local');
  const [plLink, setPlLink] = useState('');
  const [plNomeMusica, setPlNomeMusica] = useState('');
  const [plArtista, setPlArtista] = useState('');
  const [plAudioUrl, setPlAudioUrl] = useState('');
  const [plArquivoNome, setPlArquivoNome] = useState('');
  const [embedAbertoId, setEmbedAbertoId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const persistiveis = playlistsExtras.filter(
        (pl) => !pl.faixas.some((f) => f.audioUrl?.startsWith('blob:'))
      );
      window.localStorage.setItem(STORAGE_KEY_PLAYLISTS, JSON.stringify(persistiveis));
    } catch {
      // Ignora em navegação privada
    }
  }, [playlistsExtras]);

  const todasPlaylists = useMemo(
    () => [...nossasPlaylists, ...playlistsExtras],
    [nossasPlaylists, playlistsExtras]
  );

  const todasFaixas: ActiveTrackState[] = useMemo(
    () =>
      todasPlaylists.flatMap((pl) =>
        pl.faixas.map((faixa) => ({
          playlistId: pl.id,
          playlistTitulo: pl.titulo,
          faixa,
        }))
      ),
    [todasPlaylists]
  );

  const faixaAtual = activeTrack ?? todasFaixas[0] ?? null;

  const handleAudioFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPlAudioUrl(objectUrl);
    setPlArquivoNome(file.name);
    if (!plNomeMusica.trim()) {
      setPlNomeMusica(file.name.replace(/\.[^/.]+$/, ''));
    }
    setPlPlataforma('Arquivo Local');
  };

  const handleAddPlaylist = (e: FormEvent) => {
    e.preventDefault();
    const tituloLimpo = plTitulo.trim() || plNomeMusica.trim() || 'Nossa Música';
    const nomeFaixa = plNomeMusica.trim() || tituloLimpo;

    const novaPlaylistId = `pl-extra-${Date.now()}`;
    const novaFaixa: FaixaPlaylist = {
      id: `fx-extra-${Date.now()}`,
      titulo: nomeFaixa,
      artista: plArtista.trim() || 'Emanuela & Pedro',
      duracao: plAudioUrl ? 'MP3' : '03:00',
      audioUrl: plAudioUrl.trim() || undefined,
      temaIndex: todasPlaylists.length % 6,
    };

    const linkLimpo = plLink.trim();
    const plataformaDetectada: PlataformaMusica = linkLimpo.includes('spotify.com')
      ? 'Spotify'
      : linkLimpo.includes('youtube.com') || linkLimpo.includes('youtu.be')
      ? 'YouTube Music'
      : plPlataforma;

    const novaPlaylist: PlaylistCasal = {
      id: novaPlaylistId,
      numero: String(todasPlaylists.length + 1).padStart(2, '0'),
      titulo: tituloLimpo,
      descricao: plDescricao.trim() || 'Música especial adicionada para nós dois.',
      plataforma: plataformaDetectada,
      linkUrl: linkLimpo || undefined,
      faixas: [novaFaixa],
    };

    setPlaylistsExtras((prev) => [...prev, novaPlaylist]);
    onSelectTrack(novaPlaylist, novaFaixa);

    setPlTitulo('');
    setPlDescricao('');
    setPlLink('');
    setPlNomeMusica('');
    setPlArtista('');
    setPlAudioUrl('');
    setPlArquivoNome('');
    setMostrarFormPlaylist(false);
  };

  const handleRemovePlaylist = (id: string) => {
    setPlaylistsExtras((prev) => prev.filter((item) => item.id !== id));
    if (embedAbertoId === id) setEmbedAbertoId(null);
  };

  const progressPercent =
    durationSeconds > 0 ? Math.min(100, (elapsedSeconds / durationSeconds) * 100) : 0;

  return (
    <section
      id="trilha-e-planos"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#FAF7F2]"
    >
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Coluna Esquerda: Título, Player Principal e Adicionar Música */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:sticky lg:top-8"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-[#6A645E] mb-3">
            Capítulo VI · Nossas Playlists
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2C2A29] text-balance">
            Dê o play na nossa história
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#6A645E] font-light leading-relaxed">
            Escolha qualquer faixa ao lado para ouvir diretamente aqui na página ou adicione as músicas que mais marcam vocês dois.
          </p>

          {/* Player Principal Ativo na Página */}
          {faixaAtual && (
            <div className="relative mt-8 bg-[#2C2A29] text-[#FAF7F2] p-6 md:p-7 border border-[#C5A059]/45 shadow-[0_16px_38px_-22px_rgba(44,42,41,0.55)]">
              <span
                className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/50"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C5A059]/50"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#C5A059]">
                    {isPlaying && !isMuted && (
                      <span className="inline-flex items-end gap-0.5 h-3" aria-hidden="true">
                        <span className="w-[2px] h-full bg-[#C5A059] eq-bar" />
                        <span className="w-[2px] h-full bg-[#C5A059] eq-bar eq-bar-delay-1" />
                        <span className="w-[2px] h-full bg-[#C5A059] eq-bar eq-bar-delay-2" />
                      </span>
                    )}
                    <span className="truncate">
                      {isPlaying ? 'Tocando agora' : 'Pronta para tocar'} · {faixaAtual.playlistTitulo}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-2xl md:text-3xl text-[#FAF7F2] truncate">
                    {faixaAtual.faixa.titulo}
                  </h3>
                  <p className="text-sm text-[#FAF7F2]/70 mt-0.5 truncate">
                    {faixaAtual.faixa.artista}
                  </p>
                  {faixaAtual.faixa.dedicatoria && (
                    <p className="mt-2 font-serif italic text-sm text-[#C5A059]/90 leading-snug">
                      {faixaAtual.faixa.dedicatoria}
                    </p>
                  )}
                </div>

                <div
                  className="w-10 h-10 flex items-center justify-center border border-[#FAF7F2]/20 text-[#C5A059] shrink-0"
                  aria-hidden="true"
                >
                  <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
                </div>
              </div>

              {/* Barra de Progresso com Transform Compositor-Only */}
              <div className="mt-6">
                <div className="h-1 w-full bg-[#FAF7F2]/15 overflow-hidden">
                  <div
                    className="h-full w-full bg-[#C5A059] origin-left transition-transform duration-300"
                    style={{ transform: `scaleX(${progressPercent / 100})` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#FAF7F2]/65 editorial-numerals">
                  <span>{formatSeconds(elapsedSeconds)}</span>
                  <span>
                    {durationSeconds > 0 ? formatSeconds(durationSeconds) : faixaAtual.faixa.duracao}
                  </span>
                </div>
              </div>

              {/* Controles de Reprodução */}
              <div className="mt-5 flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onPrevTrack(todasFaixas)}
                    aria-label="Música anterior"
                    className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#FAF7F2]/20 text-[#FAF7F2] hover:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onTogglePlay}
                    aria-label={
                      isLoadingAudio
                        ? 'Carregando música...'
                        : isPlaying
                        ? 'Pausar música'
                        : 'Tocar música'
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 h-11 md:h-10 bg-[#C5A059] text-[#2C2A29] text-xs tracking-[0.16em] uppercase font-bold hover:bg-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isLoadingAudio ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2C2A29]" aria-hidden="true" />
                        <span>Carregando...</span>
                      </>
                    ) : isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Tocar</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNextTrack(todasFaixas)}
                    aria-label="Próxima música"
                    className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#FAF7F2]/20 text-[#FAF7F2] hover:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {faixaAtual.faixa.linkExterno && (
                    <a
                      href={faixaAtual.faixa.linkExterno}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ouvir ${faixaAtual.faixa.titulo} original`}
                      title="Ouvir música original"
                      className="inline-flex items-center gap-1.5 px-3 h-11 md:h-10 border border-[#FAF7F2]/20 text-[11px] tracking-[0.14em] uppercase text-[#FAF7F2]/80 hover:border-[#C5A059] hover:text-[#FAF7F2] transition-colors"
                    >
                      <span>Original</span>
                      <ExternalLink className="w-3 h-3 text-[#C5A059]" aria-hidden="true" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={onToggleMute}
                    aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
                    className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#FAF7F2]/20 text-[#FAF7F2] hover:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-[#FAF7F2]/60" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Botão para Abrir Formulário de Nova Música */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setMostrarFormPlaylist((v) => !v)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] border border-[#E5DEC9] bg-[#F3EFE7] text-xs tracking-[0.16em] uppercase text-[#2C2A29] hover:border-[#C5A059] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
              <span>{mostrarFormPlaylist ? 'Fechar Formulário' : 'Adicionar Música ou Playlist'}</span>
            </button>
          </div>

          {/* Formulário Inline para Subir MP3 ou Colar Link */}
          {mostrarFormPlaylist && (
            <form
              onSubmit={handleAddPlaylist}
              className="mt-5 bg-[#F3EFE7] border border-[#C5A059]/45 p-5 sm:p-6 space-y-4"
            >
              <p className="text-xs tracking-[0.16em] uppercase text-[#C5A059]">
                Nova Música ou Playlist
              </p>

              <label className="flex items-center justify-center gap-2.5 w-full min-h-[44px] py-3 px-4 bg-[#FAF7F2] border border-dashed border-[#C5A059] text-xs tracking-[0.14em] uppercase text-[#2C2A29] hover:bg-[#FFFFFF] transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                <span className="truncate">
                  {plArquivoNome
                    ? `Arquivo: ${plArquivoNome}`
                    : 'Escolher MP3 / áudio do dispositivo'}
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileUpload}
                  className="sr-only"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={plNomeMusica}
                  onChange={(e) => setPlNomeMusica(e.target.value)}
                  placeholder="Nome da música"
                  required
                  aria-label="Nome da música"
                  className="px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5DEC9] text-base md:text-sm text-[#2C2A29] focus:outline-none focus:border-[#C5A059]"
                />
                <input
                  type="text"
                  value={plArtista}
                  onChange={(e) => setPlArtista(e.target.value)}
                  placeholder="Artista ou cantor"
                  aria-label="Artista"
                  className="px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5DEC9] text-base md:text-sm text-[#2C2A29] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <input
                type="text"
                value={plTitulo}
                onChange={(e) => setPlTitulo(e.target.value)}
                placeholder="Nome da playlist (opcional)"
                aria-label="Nome da playlist"
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5DEC9] text-base md:text-sm text-[#2C2A29] focus:outline-none focus:border-[#C5A059]"
              />

              <input
                type="url"
                value={plAudioUrl}
                onChange={(e) => setPlAudioUrl(e.target.value)}
                placeholder="Link direto .mp3 (opcional)"
                aria-label="Link direto de áudio MP3"
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5DEC9] text-base md:text-sm text-[#2C2A29] focus:outline-none focus:border-[#C5A059]"
              />

              <input
                type="url"
                value={plLink}
                onChange={(e) => setPlLink(e.target.value)}
                placeholder="Link do Spotify ou YouTube (opcional)"
                aria-label="Link do Spotify ou YouTube"
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5DEC9] text-base md:text-sm text-[#2C2A29] focus:outline-none focus:border-[#C5A059]"
              />

              <input
                type="text"
                value={plDescricao}
                onChange={(e) => setPlDescricao(e.target.value)}
                placeholder="Por que essa música é especial?"
                aria-label="Descrição"
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5DEC9] text-base md:text-sm text-[#2C2A29] focus:outline-none focus:border-[#C5A059]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 min-h-[44px] bg-[#2C2A29] text-[#FAF7F2] text-xs tracking-[0.16em] uppercase hover:bg-[#C5A059] hover:text-[#2C2A29] transition-colors cursor-pointer"
                >
                  Adicionar e Tocar
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Coluna Direita: Lista Editorial das Playlists com Faixas Clicáveis */}
        <div className="lg:col-span-7 space-y-6">
          {todasPlaylists.map((playlist, idx) => {
            const spotifyEmbed = getSpotifyEmbedUrl(playlist.linkUrl);
            const youtubeEmbed = getYouTubeEmbedUrl(playlist.linkUrl);
            const embedUrl = spotifyEmbed || youtubeEmbed;
            const isExtra = playlist.id.startsWith('pl-extra-');
            const isEmbedOpen = embedAbertoId === playlist.id;

            return (
              <motion.article
                key={playlist.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: (idx % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#FFFDF9] border border-[#E5DEC9] p-6 shadow-[0_8px_24px_-20px_rgba(44,42,41,0.18)] transition-colors hover:border-[#C5A059]/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#6A645E]">
                      <span className="text-[#C5A059] font-bold editorial-numerals">
                        {playlist.numero}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{playlist.plataforma}</span>
                    </div>
                    <h3 className="mt-1 font-serif text-2xl text-[#2C2A29]">
                      {playlist.titulo}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#6A645E] font-light">
                      {playlist.descricao}
                    </p>
                  </div>

                  {isExtra && (
                    <button
                      type="button"
                      onClick={() => handleRemovePlaylist(playlist.id)}
                      aria-label={`Remover playlist ${playlist.titulo}`}
                      className="w-9 h-9 flex items-center justify-center border border-[#E5DEC9] bg-[#FAF7F2] text-[#6A645E] hover:text-[#2C2A29] hover:border-[#C5A059] shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Faixas Clicáveis para Tocar na Página */}
                <ul className="mt-5 border-t border-[#E5DEC9] divide-y divide-[#E5DEC9]/80">
                  {playlist.faixas.map((faixa) => {
                    const isThisTrack = faixaAtual?.faixa.id === faixa.id;
                    const isThisLoading = isThisTrack && isLoadingAudio;
                    const isThisPlaying = isThisTrack && isPlaying && !isLoadingAudio;

                    return (
                      <li
                        key={faixa.id}
                        className={`flex items-center justify-between gap-2 transition-colors ${
                          isThisTrack ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/70'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectTrack(playlist, faixa)}
                          className="flex-1 min-w-0 min-h-[60px] py-3.5 px-3 flex items-center justify-between gap-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-9 h-9 md:w-8 md:h-8 flex items-center justify-center border shrink-0 transition-colors ${
                                isThisPlaying || isThisLoading
                                  ? 'bg-[#2C2A29] border-[#2C2A29] text-[#C5A059]'
                                  : 'border-[#E5DEC9] bg-[#FFFFFF] text-[#2C2A29]'
                              }`}
                              aria-hidden="true"
                            >
                              {isThisLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : isThisPlaying ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5 ml-0.5" />
                              )}
                            </span>

                            <div className="min-w-0">
                              <p
                                className={`font-serif text-lg leading-tight truncate ${
                                  isThisTrack ? 'text-[#C5A059]' : 'text-[#2C2A29]'
                                }`}
                              >
                                {faixa.titulo}
                              </p>
                              <p className="text-xs text-[#6A645E] truncate mt-0.5">
                                {faixa.artista}
                              </p>
                              {faixa.dedicatoria && (
                                <p className="font-serif italic text-xs text-[#6A645E]/90 truncate mt-0.5">
                                  {faixa.dedicatoria}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-[#6A645E] tabular-nums shrink-0">
                            {isThisPlaying && (
                              <Music2 className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                            )}
                            <span>{faixa.duracao}</span>
                          </div>
                        </button>

                        {faixa.linkExterno && (
                          <a
                            href={faixa.linkExterno}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Ouvir ${faixa.titulo} no ${playlist.plataforma}`}
                            title={`Ouvir no ${playlist.plataforma}`}
                            className="w-11 h-11 md:w-9 md:h-9 mr-1 flex items-center justify-center text-[#6A645E] hover:text-[#C5A059] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {(embedUrl || playlist.linkUrl) && (
                  <div className="mt-4 pt-3 border-t border-[#E5DEC9] flex flex-wrap items-center gap-3">
                    {embedUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setEmbedAbertoId((curr) =>
                            curr === playlist.id ? null : playlist.id
                          )
                        }
                        className="px-3.5 min-h-[44px] md:min-h-[36px] bg-[#2C2A29] text-[#FAF7F2] text-[11px] tracking-[0.14em] uppercase hover:bg-[#C5A059] hover:text-[#2C2A29] transition-colors cursor-pointer"
                      >
                        {isEmbedOpen ? 'Ocultar Player Externo' : `Player ${playlist.plataforma}`}
                      </button>
                    )}

                    {playlist.linkUrl && (
                      <a
                        href={playlist.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[36px] text-[11px] tracking-[0.14em] uppercase text-[#6A645E] hover:text-[#2C2A29] transition-colors"
                      >
                        <span>Abrir no {playlist.plataforma}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}

                {embedUrl && isEmbedOpen && (
                  <div className="mt-4">
                    <iframe
                      title={`Player: ${playlist.titulo}`}
                      src={embedUrl}
                      width="100%"
                      height={youtubeEmbed ? '215' : '152'}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="border-0 bg-[#2C2A29]"
                    />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
