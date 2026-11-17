import { TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Heart,
  LayoutGrid,
  Pause,
  Play,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MemoriaGaleria, NOSSA_HISTORIA } from '../config/nossaHistoria';
import { EditorialImage } from './EditorialImage';

const STORAGE_KEY_FAVORITAS = 'emanuela_pedro_galeria_favoritas_v1';
const STORAGE_KEY_EXTRAS = 'emanuela_pedro_galeria_extras_v1';

const ROTACOES_POLAROID = [
  'md:-rotate-[0.9deg]',
  'md:rotate-[0.7deg]',
  'md:-rotate-[0.45deg]',
  'md:rotate-[0.95deg]',
  'md:-rotate-[0.7deg]',
  'md:rotate-[0.5deg]',
];

// Posições matemáticas em grid de 12 colunas para desenhar um coração perfeito com as 9 fotos
const HEART_CELL_POSITIONS = [
  // Linha 1: Os dois lobos superiores do coração (com o entalhe central aberto)
  { col: 'col-start-2 col-span-4', row: 'row-start-1', rotate: '-rotate-2', delay: 0.05 },
  { col: 'col-start-8 col-span-4', row: 'row-start-1', rotate: 'rotate-2', delay: 0.1 },

  // Linha 2: O peito largo do coração (largura máxima: colunas 1 a 12)
  { col: 'col-start-1 col-span-4', row: 'row-start-2', rotate: '-rotate-1', delay: 0.15 },
  { col: 'col-start-5 col-span-4', row: 'row-start-2', rotate: 'rotate-0 scale-[1.02] z-10', delay: 0.2 },
  { col: 'col-start-9 col-span-4', row: 'row-start-2', rotate: 'rotate-1', delay: 0.25 },

  // Linha 3: O corpo afinando suavemente em direção à ponta (10 colunas)
  { col: 'col-start-2 col-span-3', row: 'row-start-3', rotate: 'rotate-1', delay: 0.3 },
  { col: 'col-start-5 col-span-4', row: 'row-start-3', rotate: 'rotate-0', delay: 0.35 },
  { col: 'col-start-9 col-span-3', row: 'row-start-3', rotate: '-rotate-1', delay: 0.4 },

  // Linha 4: O vértice / ponta inferior do coração (centralizado nas colunas 5-8)
  { col: 'col-start-5 col-span-4', row: 'row-start-4', rotate: 'rotate-0', delay: 0.45 },
];

export function PolaroidGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [viewMode, setViewMode] = useState<'coracao' | 'grade'>('coracao');
  const touchStartXRef = useRef<number | null>(null);

  const [favoritas, setFavoritas] = useState<Record<string, boolean>>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_FAVORITAS);
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : { 'mem-1': true, 'mem-4': true };
    } catch {
      return { 'mem-1': true, 'mem-4': true };
    }
  });

  const [memoriasExtras, setMemoriasExtras] = useState<MemoriaGaleria[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_EXTRAS);
      return saved ? (JSON.parse(saved) as MemoriaGaleria[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_FAVORITAS, JSON.stringify(favoritas));
    } catch {
      // Ignora em navegação privada
    }
  }, [favoritas]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_EXTRAS, JSON.stringify(memoriasExtras));
    } catch {
      // Ignora em navegação privada
    }
  }, [memoriasExtras]);

  const todasMemorias = useMemo(
    () => [...NOSSA_HISTORIA.galeriaMemorias, ...memoriasExtras],
    [memoriasExtras]
  );

  const activeIndex = useMemo(
    () => (activeId ? todasMemorias.findIndex((m) => m.id === activeId) : -1),
    [activeId, todasMemorias]
  );

  const selectedMemoria: MemoriaGaleria | null =
    activeIndex >= 0 ? todasMemorias[activeIndex] ?? null : null;

  const toggleFavorita = useCallback((id: string) => {
    setFavoritas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveId(null);
    setIsSlideshow(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (todasMemorias.length === 0) return;
    setActiveId((current) => {
      const idx = current ? todasMemorias.findIndex((m) => m.id === current) : 0;
      const nextIdx = (idx - 1 + todasMemorias.length) % todasMemorias.length;
      return todasMemorias[nextIdx]?.id ?? null;
    });
  }, [todasMemorias]);

  const handleNext = useCallback(() => {
    if (todasMemorias.length === 0) return;
    setActiveId((current) => {
      const idx = current ? todasMemorias.findIndex((m) => m.id === current) : 0;
      const nextIdx = (idx + 1) % todasMemorias.length;
      return todasMemorias[nextIdx]?.id ?? null;
    });
  }, [todasMemorias]);

  // Navegação por teclado e bloqueio de rolagem no Lightbox
  useEffect(() => {
    if (!selectedMemoria) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSlideshow((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedMemoria, handleCloseLightbox, handleNext, handlePrev]);

  // Slideshow automático no Lightbox
  useEffect(() => {
    if (!isSlideshow || !selectedMemoria) return;
    const timer = window.setInterval(() => {
      handleNext();
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isSlideshow, selectedMemoria, handleNext]);

  const handleRemoveExtra = (id: string) => {
    setMemoriasExtras((prev) => prev.filter((item) => item.id !== id));
    if (activeId === id) {
      handleCloseLightbox();
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const diff = touchStartXRef.current - endX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section
      id="galeria"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-12 bg-[#F3EFE7] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Cabeçalho Editorial com Alternador de Visualização */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#6A645E] mb-3">
              Capítulo III · Galeria de Memórias
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2C2A29] text-balance">
              Retratos em arquivo &amp; notas secretas
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#6A645E] font-light leading-relaxed">
              Nossas fotos reunidas formando o coração da nossa história. Toque em qualquer retrato para ler a nota secreta daquele dia.
            </p>
          </div>

          {/* Alternador de Modo: Mosaico em Coração vs Grade Tradicional */}
          <div className="flex items-center gap-1 p-1 bg-[#FAF7F2] border border-[#E5DEC9] self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('coracao')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs tracking-[0.14em] uppercase font-medium transition-all cursor-pointer ${
                viewMode === 'coracao'
                  ? 'bg-[#2C2A29] text-[#FAF7F2] shadow-sm'
                  : 'text-[#6A645E] hover:text-[#2C2A29]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Mosaico em Coração</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grade')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs tracking-[0.14em] uppercase font-medium transition-all cursor-pointer ${
                viewMode === 'grade'
                  ? 'bg-[#2C2A29] text-[#FAF7F2] shadow-sm'
                  : 'text-[#6A645E] hover:text-[#2C2A29]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Grade de Fotos</span>
            </button>
          </div>
        </motion.div>

        {viewMode === 'coracao' ? (
          /* =========================================================================
             MOSAICO EM FORMATO DE CORAÇÃO (FOTOS JUNTAS FORMANDO UM GRANDE CORAÇÃO)
             ========================================================================= */
          <div className="relative w-full max-w-[1240px] mx-auto py-6 sm:py-12">
            {/* Contorno Dourado Sutil de Coração em SVG ao Fundo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0 opacity-40">
              <svg
                viewBox="0 0 100 90"
                className="w-full max-w-4xl lg:max-w-5xl h-auto text-[#C5A059] scale-105"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 50,86 C 50,86 4,55 4,28 C 4,12 17,4 32,4 C 41,4 47,9 50,14 C 53,9 59,4 68,4 C 83,4 96,12 96,28 C 96,55 50,86 50,86 Z"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2.5 2.5"
                />
              </svg>
            </div>

            <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-7 relative z-10">
              {todasMemorias.slice(0, 9).map((item, idx) => {
                const isFav = Boolean(favoritas[item.id]);
                const pos = HEART_CELL_POSITIONS[idx] ?? {
                  col: 'col-span-4',
                  row: '',
                  rotate: 'rotate-0',
                  delay: 0.1,
                };
                const numeroArquivo = String(idx + 1).padStart(2, '0');

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.92, y: 18 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.7,
                      delay: pos.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`${pos.col} ${pos.row} ${pos.rotate} relative group bg-[#FFFDF9] p-1.5 pb-2.5 sm:p-2.5 sm:pb-3.5 md:p-3 md:pb-4 border border-[#E5DEC9] shadow-[0_10px_24px_-14px_rgba(44,42,41,0.22)] hover:shadow-[0_20px_40px_-14px_rgba(197,160,89,0.38)] transition-all duration-300 ease-out hover:rotate-0 hover:scale-[1.04] hover:z-30 hover:border-[#C5A059]`}
                  >
                    {/* Cantoneiras Sutis de Arquivo */}
                    <span
                      className="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#C5A059]/45"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#C5A059]/45"
                      aria-hidden="true"
                    />

                    {/* Botão de Favorito no Canto da Moldura */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorita(item.id);
                      }}
                      aria-label={isFav ? 'Remover dos favoritos' : 'Favoritar memória'}
                      aria-pressed={isFav}
                      className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#FAF7F2]/95 border border-[#E5DEC9] text-[#2C2A29] hover:border-[#C5A059] transition-colors cursor-pointer shadow-sm rounded-full"
                    >
                      <Heart
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${
                          isFav ? 'fill-[#D4A392] text-[#D4A392]' : 'text-[#6A645E]'
                        }`}
                      />
                    </button>

                    {/* Foto Clicável */}
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      aria-label={`Abrir memória ${item.titulo}`}
                      className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                    >
                      <div className="relative overflow-hidden bg-[#F3EFE7] aspect-[4/3]">
                        <EditorialImage
                          src={item.foto}
                          alt={item.titulo}
                          fallbackLabel={item.titulo}
                          aspectClassName="w-full h-full"
                          className="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[#2C2A29]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2 text-[#FAF7F2]"
                          aria-hidden="true"
                        >
                          <span className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase">
                            Abrir
                          </span>
                          <Expand className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Legenda Estilo Polaroid */}
                      <div className="pt-2 px-0.5">
                        <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-[#6A645E]">
                          <span className="editorial-numerals text-[#C5A059] font-medium">
                            Nº {numeroArquivo}
                          </span>
                          <span className="truncate max-w-[70px] sm:max-w-none">
                            {item.categoria}
                          </span>
                        </div>
                        <h4 className="mt-0.5 font-serif text-xs sm:text-sm md:text-base text-[#2C2A29] group-hover:text-[#C5A059] transition-colors truncate">
                          {item.titulo}
                        </h4>
                      </div>
                    </button>
                  </motion.article>
                );
              })}
            </div>

            {/* Mensagem Poética de Fechamento do Coração */}
            <div className="text-center mt-10">
              <p className="font-serif italic text-base sm:text-lg text-[#6A645E]">
                “Cada foto um batimento, todas juntas o nosso amor.”
              </p>
            </div>
          </div>
        ) : (
          /* =========================================================================
             GRADE DE POLAROIDS TRADICIONAL (COLUNAS MASONRY)
             ========================================================================= */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {todasMemorias.map((item, idx) => {
              const isFav = Boolean(favoritas[item.id]);
              const isExtra = item.id.startsWith('extra-');
              const rotacao = ROTACOES_POLAROID[idx % ROTACOES_POLAROID.length];
              const numeroArquivo = String(idx + 1).padStart(2, '0');

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.75,
                    delay: (idx % 3) * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`break-inside-avoid relative group bg-[#FFFDF9] p-3.5 pb-5 border border-[#E5DEC9] shadow-[0_12px_28px_-18px_rgba(44,42,41,0.22)] transition-all duration-300 ease-out ${rotacao} hover:rotate-0 hover:-translate-y-1.5 hover:border-[#C5A059]/60`}
                >
                  <span
                    className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/45"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#C5A059]/45"
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={() => toggleFavorita(item.id)}
                    aria-label={isFav ? 'Remover dos favoritos' : 'Favoritar memória'}
                    aria-pressed={isFav}
                    className="absolute top-5 right-5 z-10 w-11 h-11 md:w-9 md:h-9 flex items-center justify-center bg-[#FAF7F2]/92 border border-[#E5DEC9] text-[#2C2A29] hover:border-[#C5A059] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-[#D4A392] text-[#D4A392]' : 'text-[#6A645E]'
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-label={`Abrir memória ${item.titulo} em tela cheia`}
                    className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  >
                    <div className="relative overflow-hidden bg-[#F3EFE7]">
                      <EditorialImage
                        src={item.foto}
                        alt={item.titulo}
                        fallbackLabel={item.titulo}
                        aspectClassName={
                          item.proporcao === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                        }
                        className="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2C2A29]/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 text-[#FAF7F2]"
                        aria-hidden="true"
                      >
                        <span className="text-[11px] tracking-[0.18em] uppercase">
                          Abrir lembrança
                        </span>
                        <Expand className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="pt-4 px-1.5">
                      <div className="flex items-center justify-between gap-2 text-[11px] tracking-[0.16em] uppercase text-[#6A645E]">
                        <span className="editorial-numerals text-[#C5A059]">
                          Nº {numeroArquivo}
                        </span>
                        <span>{item.categoria}</span>
                      </div>

                      <h3 className="mt-1.5 font-serif text-2xl text-[#2C2A29] group-hover:text-[#C5A059] transition-colors">
                        {item.titulo}
                      </h3>

                      {item.subtituloPolaroid && (
                        <p className="mt-1 font-serif italic text-[15px] text-[#6A645E] leading-snug">
                          “{item.subtituloPolaroid}”
                        </p>
                      )}

                      <div className="mt-3 pt-2.5 border-t border-[#E5DEC9]/70 flex items-center justify-between gap-2 text-xs text-[#6A645E]">
                        <span>
                          {item.data} <span aria-hidden="true">·</span> {item.local}
                        </span>
                        {isExtra && (
                          <span className="text-[11px] text-[#C5A059]">Adicionada</span>
                        )}
                      </div>
                    </div>
                  </button>

                  {isExtra && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExtra(item.id)}
                      aria-label={`Remover foto ${item.titulo}`}
                      className="mt-3 ml-1.5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-[#6A645E] hover:text-[#2C2A29] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" aria-hidden="true" />
                      <span>Remover da visualização</span>
                    </button>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Editorial em Tela Cheia com Slideshow e Miniaturas */}
      <AnimatePresence>
        {selectedMemoria && activeIndex >= 0 && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedMemoria.titulo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleCloseLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 bg-[#1F1D1C]/94 backdrop-blur-sm flex flex-col justify-between p-3 sm:p-5 md:p-8 overflow-y-auto"
          >
            {/* Barra Superior do Lightbox */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 text-[#FAF7F2] pb-2 sm:pb-3"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs tracking-[0.16em] uppercase text-[#FAF7F2]/80">
                <span className="editorial-numerals text-[#C5A059]">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(todasMemorias.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate max-w-[140px] sm:max-w-none">{selectedMemoria.categoria}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSlideshow((s) => !s)}
                  aria-label={isSlideshow ? 'Pausar apresentação' : 'Iniciar apresentação'}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 sm:px-3.5 md:min-h-[40px] border border-[#FAF7F2]/25 text-xs tracking-[0.14em] uppercase text-[#FAF7F2] hover:border-[#C5A059] transition-colors cursor-pointer"
                >
                  {isSlideshow ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                      <span className="hidden sm:inline">Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                      <span className="hidden sm:inline">Apresentação</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorita(selectedMemoria.id)}
                  aria-label={
                    favoritas[selectedMemoria.id]
                      ? 'Remover dos favoritos'
                      : 'Favoritar memória'
                  }
                  className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#FAF7F2]/25 text-[#FAF7F2] hover:border-[#C5A059] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favoritas[selectedMemoria.id]
                        ? 'fill-[#D4A392] text-[#D4A392]'
                        : 'text-[#FAF7F2]'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  aria-label="Fechar visualização"
                  className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#FAF7F2]/25 text-[#FAF7F2] hover:border-[#C5A059] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cartão Central do Lightbox */}
            <motion.div
              key={selectedMemoria.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl mx-auto my-auto bg-[#FAF7F2] border border-[#E5DEC9] grid grid-cols-1 md:grid-cols-[1.25fr_1fr] md:max-h-[78vh] overflow-hidden"
            >
              {/* Fotografia Emoldurada */}
              <div className="bg-[#191716] flex items-center justify-center p-3 sm:p-4 md:p-6 min-h-[220px] h-[38svh] sm:h-[46svh] md:h-[68vh]">
                <EditorialImage
                  src={selectedMemoria.foto}
                  alt={selectedMemoria.titulo}
                  fallbackLabel={selectedMemoria.titulo}
                  objectFit="contain"
                  aspectClassName="w-full h-full !bg-[#191716]"
                  className="shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                />
              </div>

              {/* Lembrança Secreta e Metadados */}
              <div className="p-5 sm:p-7 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#C5A059]">
                    <span>{selectedMemoria.data}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#6A645E]">{selectedMemoria.local}</span>
                  </div>

                  <h3 className="mt-2.5 sm:mt-3 font-serif text-2xl sm:text-3xl text-[#2C2A29] text-balance">
                    {selectedMemoria.titulo}
                  </h3>

                  <div className="w-10 h-px bg-[#D4A392] my-4 sm:my-6" aria-hidden="true" />

                  <p className="text-xs tracking-[0.18em] uppercase text-[#6A645E] mb-2">
                    Lembrança secreta daquele dia
                  </p>
                  <p className="font-serif italic text-lg sm:text-xl leading-relaxed text-[#2C2A29]">
                    “{selectedMemoria.lembrancaSecreta}”
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#E5DEC9] flex items-center justify-between gap-4">
                  <span className="text-xs text-[#6A645E] hidden sm:inline">
                    ← → Navegar · Espaço Apresentação
                  </span>
                  <span className="text-xs text-[#6A645E] sm:hidden">
                    Deslize para navegar
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Foto anterior"
                      className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#E5DEC9] text-[#2C2A29] hover:border-[#C5A059] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Próxima foto"
                      className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-[#E5DEC9] text-[#2C2A29] hover:border-[#C5A059] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tira de Miniaturas na Base do Lightbox */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl mx-auto pt-3 sm:pt-4 pb-1 flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto px-1"
            >
              {todasMemorias.map((thumb) => {
                const isSelected = thumb.id === selectedMemoria.id;
                return (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => setActiveId(thumb.id)}
                    aria-label={`Selecionar ${thumb.titulo}`}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C5A059] scale-105 opacity-100'
                        : 'border-[#FAF7F2]/25 opacity-55 hover:opacity-90'
                    }`}
                  >
                    <EditorialImage
                      src={thumb.foto}
                      alt={thumb.titulo}
                      fallbackLabel={thumb.titulo}
                      aspectClassName="w-full h-full"
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
