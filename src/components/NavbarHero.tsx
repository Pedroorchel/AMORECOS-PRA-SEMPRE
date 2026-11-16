import { ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { NOSSA_HISTORIA } from '../config/nossaHistoria';
import { EditorialImage } from './EditorialImage';

interface NavbarHeroProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
}

export function NavbarHero({ isPlaying, isMuted, onTogglePlay }: NavbarHeroProps) {
  const scrollToCounter = () => {
    const el = document.getElementById('tempo-juntos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#2C2A29] text-[#FAF7F2]">
      {/* Foto de Capa em Tela Cheia (Full-Bleed) com Filtro Sutil e Scrim Medido */}
      <div className="absolute inset-0 z-0">
        <EditorialImage
          src={NOSSA_HISTORIA.fotoCapa}
          alt={NOSSA_HISTORIA.altFotoCapa}
          priority
          aspectClassName="w-full h-full"
          className="w-full h-full object-cover object-center sepia-[0.06] contrast-[1.03] saturate-[0.94] scale-[1.01]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#2C2A29]/88 via-[#2C2A29]/36 to-[#2C2A29]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(44,42,41,0.38)_0%,transparent_65%)]"
          aria-hidden="true"
        />
      </div>

      {/* Barra Superior Editorial (Contrato de 3 Zonas: Marca · 5 Links · 1 Ação) */}
      <header className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-4 md:py-6 flex items-center justify-between gap-3 sm:gap-8 border-b border-[#FAF7F2]/18">
        {/* Zona 1: Wordmark em uma linha */}
        <a
          href="#"
          className="font-serif text-lg sm:text-xl md:text-2xl tracking-wide text-[#FAF7F2] whitespace-nowrap shrink-0 min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
        >
          {NOSSA_HISTORIA.tituloCabecalho}
        </a>

        {/* Zona 2: Links de navegação concisos em linha única (PC / Tablet) */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-light tracking-wide text-[#FAF7F2]/85"
        >
          <a
            href="#tempo-juntos"
            className="hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
          >
            Tempo
          </a>
          <a
            href="#linha-do-tempo"
            className="hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
          >
            História
          </a>
          <a
            href="#galeria"
            className="hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
          >
            Galeria
          </a>
          <a
            href="#carta-aberta"
            className="hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
          >
            Carta
          </a>
          <a
            href="#trilha-e-planos"
            className="hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
          >
            Playlists
          </a>
        </nav>

        {/* Zona 3: 1 Ação primária */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 min-h-[44px] md:min-h-[38px] text-[11px] sm:text-xs tracking-wider uppercase border border-[#FAF7F2]/40 bg-[#2C2A29]/25 backdrop-blur-xs text-[#FAF7F2] hover:border-[#C5A059] hover:bg-[#C5A059]/20 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
        >
          {isPlaying && !isMuted ? (
            <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#FAF7F2]/80" aria-hidden="true" />
          )}
          <span>{isPlaying ? 'Pausar Trilha' : 'Ouvir Trilha'}</span>
        </button>
      </header>

      {/* Sub-navegação Rápida Exclusiva para Mobile / Android */}
      <nav
        aria-label="Atalhos da página"
        className="relative z-10 flex md:hidden items-center justify-start sm:justify-center gap-5 px-4 py-1.5 border-b border-[#FAF7F2]/12 overflow-x-auto text-xs tracking-[0.14em] uppercase text-[#FAF7F2]/85"
      >
        <a href="#tempo-juntos" className="min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 hover:text-[#C5A059]">
          Tempo
        </a>
        <a href="#linha-do-tempo" className="min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 hover:text-[#C5A059]">
          História
        </a>
        <a href="#galeria" className="min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 hover:text-[#C5A059]">
          Galeria
        </a>
        <a href="#carta-aberta" className="min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 hover:text-[#C5A059]">
          Carta
        </a>
        <a href="#trilha-e-planos" className="min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 hover:text-[#C5A059]">
          Playlists
        </a>
      </nav>

      {/* Conteúdo Central da Capa */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 my-auto py-12 md:py-16 text-center flex flex-col items-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] sm:text-xs md:text-sm tracking-[0.22em] md:tracking-[0.24em] uppercase text-[#FAF7F2]/90 mb-4 md:mb-5"
        >
          {NOSSA_HISTORIA.edicaoEditorial}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-normal text-[clamp(3.25rem,11vw,7rem)] leading-[0.96] tracking-tight text-[#FAF7F2] text-balance max-w-4xl"
        >
          {NOSSA_HISTORIA.nomeDela}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-px bg-[#C5A059] my-6 md:my-7 origin-center"
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#FAF7F2]/95 font-normal max-w-xl text-balance"
        >
          {NOSSA_HISTORIA.fraseCapa}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 md:mt-6 text-[11px] tracking-[0.22em] uppercase text-[#FAF7F2]/75 editorial-numerals"
        >
          Desde {NOSSA_HISTORIA.dataInicioPorExtenso}
        </motion.p>
      </div>

      {/* Seta Discreta de Rolagem para Baixo */}
      <div className="relative z-10 pb-8 md:pb-10 flex justify-center">
        <button
          type="button"
          onClick={scrollToCounter}
          aria-label="Rolar para baixo para descobrir nossa história"
          className="group min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-2 p-3 text-[#FAF7F2]/85 hover:text-[#FAF7F2] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-full"
        >
          <span className="text-[11px] tracking-[0.22em] uppercase">Explorar</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
          </motion.span>
        </button>
      </div>
    </section>
  );
}
