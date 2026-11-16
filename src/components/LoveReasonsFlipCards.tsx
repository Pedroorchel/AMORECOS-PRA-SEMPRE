import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import { NOSSA_HISTORIA } from '../config/nossaHistoria';

export function LoveReasonsFlipCards() {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const motivos = NOSSA_HISTORIA.motivosAmor;

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flippedCount = motivos.filter((m) => flippedIds[m.id]).length;
  const allFlipped = flippedCount === motivos.length;

  const handleToggleAll = () => {
    if (allFlipped) {
      setFlippedIds({});
    } else {
      const next: Record<string, boolean> = {};
      motivos.forEach((m) => {
        next[m.id] = true;
      });
      setFlippedIds(next);
    }
  };

  return (
    <section
      id="motivos"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#F3EFE7] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-14"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-[#6A645E] mb-3">
            Capítulo V · Motivos Pelos Quais Eu Te Amo
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2C2A29] text-balance">
            Pequenas razões de um amor inteiro
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#6A645E] font-light">
            Passe o cursor ou toque em cada cartão para revelar o que existe por trás do nosso dia a dia.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3 text-xs tracking-[0.16em] uppercase text-[#6A645E]">
            <span className="editorial-numerals">
              {flippedCount} de {motivos.length} revelados
            </span>
            <span aria-hidden="true" className="text-[#C5A059]">
              ·
            </span>
            <button
              type="button"
              onClick={handleToggleAll}
              className="min-h-[44px] px-2 inline-flex items-center text-[#2C2A29] hover:text-[#C5A059] underline underline-offset-4 decoration-[#C5A059]/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              {allFlipped ? 'Voltar todos' : 'Revelar todos'}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {motivos.map((motivo, idx) => {
            const isFlipped = Boolean(flippedIds[motivo.id]);

            return (
              <motion.div
                key={motivo.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: (idx % 3) * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flip-perspective h-64"
              >
                <button
                  type="button"
                  onClick={() => toggleCard(motivo.id)}
                  data-flipped={isFlipped}
                  aria-pressed={isFlipped}
                  aria-label={`Motivo ${motivo.numeroRomano}: ${motivo.tituloFrente}. Clique para virar o cartão.`}
                  className="flip-card w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <div className="flip-card-inner relative w-full h-full">
                    {/* Frente do Cartão */}
                    <div className="flip-face absolute inset-0 bg-[#FFFDF9] border border-[#E5DEC9] shadow-[0_10px_24px_-18px_rgba(44,42,41,0.2)] p-6 sm:p-8 flex flex-col justify-between">
                      <span
                        className="pointer-events-none absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#C5A059]/45"
                        aria-hidden="true"
                      />
                      <span
                        className="pointer-events-none absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#C5A059]/45"
                        aria-hidden="true"
                      />

                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-2xl text-[#C5A059]">
                          {motivo.numeroRomano}.
                        </span>
                        <RotateCw className="w-3.5 h-3.5 text-[#6A645E]/70" aria-hidden="true" />
                      </div>

                      <div>
                        <div className="w-8 h-px bg-[#D4A392] mb-4" aria-hidden="true" />
                        <h3 className="font-serif text-2xl text-[#2C2A29] leading-snug text-balance">
                          {motivo.tituloFrente}
                        </h3>
                      </div>

                      <span className="text-[11px] tracking-[0.18em] uppercase text-[#6A645E]">
                        Revelar motivo
                      </span>
                    </div>

                    {/* Verso do Cartão */}
                    <div className="flip-face flip-face-back absolute inset-0 bg-[#2C2A29] text-[#FAF7F2] border border-[#C5A059]/60 p-6 sm:p-8 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-xl text-[#C5A059]">
                          {motivo.numeroRomano}.
                        </span>
                        <span className="text-[11px] tracking-[0.16em] uppercase text-[#D4A392]">
                          Para {NOSSA_HISTORIA.nomeDela}
                        </span>
                      </div>

                      <p className="font-serif italic text-lg sm:text-xl leading-relaxed text-[#FAF7F2]/95">
                        “{motivo.mensagemVerso}”
                      </p>

                      <span className="text-[11px] tracking-[0.16em] uppercase text-[#FAF7F2]/65">
                        Toque para voltar
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
