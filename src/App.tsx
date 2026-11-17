/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, MotionConfig, useScroll, useSpring } from 'motion/react';
import { FaixaPlaylist, NOSSA_HISTORIA, PlaylistCasal } from './config/nossaHistoria';
import { NavbarHero } from './components/NavbarHero';
import { TimeTogetherCounter } from './components/TimeTogetherCounter';
import { LoveTimeline } from './components/LoveTimeline';
import { PolaroidGallery } from './components/PolaroidGallery';
import { OpenLetter } from './components/OpenLetter';
import { LoveReasonsFlipCards } from './components/LoveReasonsFlipCards';
import { ActiveTrackState, SoundtrackAndPlans } from './components/SoundtrackAndPlans';
import { RomanticPianoSynth } from './utils/romanticAudio';

function parseDurationToSeconds(duracao: string): number {
  const parts = duracao.split(':').map(Number);
  if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 180;
}

export default function App() {
  const primeiraPlaylist = NOSSA_HISTORIA.nossasPlaylists[0];
  const primeiraFaixa = primeiraPlaylist?.faixas[0];

  const [activeTrack, setActiveTrack] = useState<ActiveTrackState | null>(() =>
    primeiraPlaylist && primeiraFaixa
      ? {
          playlistId: primeiraPlaylist.id,
          playlistTitulo: primeiraPlaylist.titulo,
          faixa: primeiraFaixa,
        }
      : null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(() =>
    primeiraFaixa ? parseDurationToSeconds(primeiraFaixa.duracao) : 180
  );

  const synthRef = useRef<RomanticPianoSynth | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  // Pré-carrega os áudios das músicas em segundo plano para início instantâneo
  useEffect(() => {
    const urls = NOSSA_HISTORIA.nossasPlaylists
      .flatMap((pl) => pl.faixas)
      .map((f) => f.audioUrl?.trim())
      .filter((url): url is string => Boolean(url));

    const preloadedAudioList: HTMLAudioElement[] = [];

    // Carrega prioritariamente as primeiras músicas da playlist
    for (const url of urls.slice(0, 5)) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
      preloadedAudioList.push(audio);
    }

    return () => {
      for (const a of preloadedAudioList) {
        a.src = '';
      }
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    synthRef.current = new RomanticPianoSynth();
    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.destroy();
        synthRef.current = null;
      }
    };
  }, []);

  // Sincroniza timer quando o sintetizador está tocando
  useEffect(() => {
    const customUrl = activeTrack?.faixa.audioUrl?.trim();
    if (!isPlaying || customUrl) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => (prev + 1 >= durationSeconds ? 0 : prev + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeTrack, durationSeconds]);

  const startPlaybackForTrack = useCallback(
    (track: ActiveTrackState, muted: boolean) => {
      const customUrl = track.faixa.audioUrl?.trim();

      // Pausa o que estiver tocando antes
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.pause();
      }

      if (customUrl) {
        setIsLoadingAudio(true);
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = customUrl;
        audio.muted = muted;
        audio.volume = 0.7;

        audio.addEventListener('canplay', () => {
          setIsLoadingAudio(false);
        });

        audio.addEventListener('playing', () => {
          setIsLoadingAudio(false);
          setIsPlaying(true);
        });

        audio.addEventListener('waiting', () => {
          setIsLoadingAudio(true);
        });

        audio.addEventListener('loadedmetadata', () => {
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setDurationSeconds(Math.floor(audio.duration));
          }
        });

        audio.addEventListener('timeupdate', () => {
          setElapsedSeconds(Math.floor(audio.currentTime));
        });

        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          setElapsedSeconds(0);
          setIsLoadingAudio(false);
        });

        audio.addEventListener('error', () => {
          setIsLoadingAudio(false);
          // Fallback instantâneo ao sintetizador suave para não travar a experiência
          if (synthRef.current) {
            setDurationSeconds(parseDurationToSeconds(track.faixa.duracao));
            synthRef.current.setMuted(muted);
            synthRef.current.start(track.faixa.temaIndex ?? 0);
            setIsPlaying(true);
          }
        });

        audioElRef.current = audio;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoadingAudio(false);
              setIsPlaying(true);
            })
            .catch(() => {
              // Se autoplay bloqueado
              setIsLoadingAudio(false);
            });
        }
      } else if (synthRef.current) {
        setDurationSeconds(parseDurationToSeconds(track.faixa.duracao));
        synthRef.current.setMuted(muted);
        synthRef.current.start(track.faixa.temaIndex ?? 0);
        setIsLoadingAudio(false);
        setIsPlaying(true);
      }
    },
    []
  );

  const handleSelectTrack = useCallback(
    (playlist: PlaylistCasal, faixa: FaixaPlaylist) => {
      if (activeTrack?.faixa.id === faixa.id) {
        // Alterna play/pause da mesma faixa
        if (isPlaying) {
          audioElRef.current?.pause();
          synthRef.current?.pause();
          setIsPlaying(false);
        } else {
          if (faixa.audioUrl?.trim() && audioElRef.current) {
            audioElRef.current.muted = isMuted;
            void audioElRef.current.play();
            setIsPlaying(true);
          } else {
            startPlaybackForTrack(
              { playlistId: playlist.id, playlistTitulo: playlist.titulo, faixa },
              isMuted
            );
          }
        }
        return;
      }

      const nextTrack: ActiveTrackState = {
        playlistId: playlist.id,
        playlistTitulo: playlist.titulo,
        faixa,
      };
      setActiveTrack(nextTrack);
      setElapsedSeconds(0);
      startPlaybackForTrack(nextTrack, isMuted);
    },
    [activeTrack, isMuted, isPlaying, startPlaybackForTrack]
  );

  const handleTogglePlay = useCallback(() => {
    if (!activeTrack) return;

    if (isPlaying) {
      audioElRef.current?.pause();
      synthRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (activeTrack.faixa.audioUrl?.trim() && audioElRef.current) {
      audioElRef.current.muted = isMuted;
      void audioElRef.current.play();
      setIsPlaying(true);
    } else {
      startPlaybackForTrack(activeTrack, isMuted);
    }
  }, [activeTrack, isMuted, isPlaying, startPlaybackForTrack]);

  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioElRef.current) {
      audioElRef.current.muted = nextMuted;
    }
    if (synthRef.current) {
      synthRef.current.setMuted(nextMuted);
    }

    if (!isPlaying && !nextMuted && activeTrack) {
      startPlaybackForTrack(activeTrack, false);
    }
  }, [activeTrack, isMuted, isPlaying, startPlaybackForTrack]);

  const handlePrevTrack = useCallback(
    (allTracks: ActiveTrackState[]) => {
      if (allTracks.length === 0) return;
      const idx = activeTrack
        ? allTracks.findIndex((t) => t.faixa.id === activeTrack.faixa.id)
        : 0;
      const prevIdx = (idx - 1 + allTracks.length) % allTracks.length;
      const prevTrack = allTracks[prevIdx];
      if (!prevTrack) return;
      setActiveTrack(prevTrack);
      setElapsedSeconds(0);
      startPlaybackForTrack(prevTrack, isMuted);
    },
    [activeTrack, isMuted, startPlaybackForTrack]
  );

  const handleNextTrack = useCallback(
    (allTracks: ActiveTrackState[]) => {
      if (allTracks.length === 0) return;
      const idx = activeTrack
        ? allTracks.findIndex((t) => t.faixa.id === activeTrack.faixa.id)
        : 0;
      const nextIdx = (idx + 1) % allTracks.length;
      const nextTrack = allTracks[nextIdx];
      if (!nextTrack) return;
      setActiveTrack(nextTrack);
      setElapsedSeconds(0);
      startPlaybackForTrack(nextTrack, isMuted);
    },
    [activeTrack, isMuted, startPlaybackForTrack]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#FAF7F2] text-[#2C2A29] flex flex-col">
        {/* Barra Discreta de Progresso de Leitura no Topo da Página */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#C5A059] origin-left z-50 pointer-events-none"
          aria-hidden="true"
        />

        <main className="flex-1">
          <NavbarHero
            isPlaying={isPlaying}
            isMuted={isMuted}
            onTogglePlay={handleTogglePlay}
          />
          <TimeTogetherCounter />
          <LoveTimeline />
          <PolaroidGallery />
          <OpenLetter />
          <LoveReasonsFlipCards />
          <SoundtrackAndPlans
            activeTrack={activeTrack}
            isPlaying={isPlaying}
            isLoadingAudio={isLoadingAudio}
            isMuted={isMuted}
            elapsedSeconds={elapsedSeconds}
            durationSeconds={durationSeconds}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
            onToggleMute={handleToggleMute}
            onPrevTrack={handlePrevTrack}
            onNextTrack={handleNextTrack}
          />
        </main>

        {/* Rodapé Editorial Minimalista */}
        <footer className="border-t border-[#E5DEC9] bg-[#F3EFE7] pt-12 pb-20 sm:py-14 px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1140px] mx-auto"
          >
            <p className="font-serif italic text-lg md:text-xl text-[#2C2A29]/85 text-center max-w-xl mx-auto mb-8">
              “O amor não se mede apenas no tempo que passa, mas em cada escolha de permanecer.”
            </p>
            <div className="pt-6 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A645E]">
              <p className="font-serif italic text-base text-[#2C2A29]">
                {NOSSA_HISTORIA.tituloCabecalho} · {NOSSA_HISTORIA.dataInicioPorExtenso}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#tempo-juntos"
                  className="min-h-[44px] sm:min-h-0 inline-flex items-center hover:text-[#2C2A29] transition-colors whitespace-nowrap"
                >
                  Voltar ao início
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="#carta-aberta"
                  className="min-h-[44px] sm:min-h-0 inline-flex items-center hover:text-[#2C2A29] transition-colors whitespace-nowrap"
                >
                  Carta Aberta
                </a>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">
                  Feito com amor para {NOSSA_HISTORIA.nomeDela}
                </span>
              </div>
            </div>
          </motion.div>
        </footer>

        {/* Botão Discreto Flutuante de Mutar / Desmutar no Canto da Tela */}
        <button
          type="button"
          onClick={isPlaying ? handleToggleMute : handleTogglePlay}
          aria-label={
            !isPlaying
              ? 'Tocar playlist'
              : isMuted
              ? 'Desmutar música'
              : 'Mutar música'
          }
          title={
            !isPlaying
              ? 'Tocar playlist'
              : isMuted
              ? 'Desmutar som'
              : 'Mutar som'
          }
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:right-5 z-40 w-12 h-12 md:w-11 md:h-11 flex items-center justify-center bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#E5DEC9] text-[#2C2A29] shadow-[0_6px_20px_-8px_rgba(44,42,41,0.28)] hover:border-[#C5A059] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
        >
          {isPlaying && !isMuted ? (
            <Volume2 className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#6A645E]" aria-hidden="true" />
          )}
        </button>
      </div>
    </MotionConfig>
  );
}
