import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { NOSSA_HISTORIA } from '../config/nossaHistoria';

const STORAGE_KEY_CARTA_SELADA = 'emanuela_pedro_carta_coracao_v1';

export function OpenLetter() {
  const { cartaAberta } = NOSSA_HISTORIA;
  const [guardada, setGuardada] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY_CARTA_SELADA) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_CARTA_SELADA, String(guardada));
    } catch {
      // Ignora em navegação privada
    }
  }, [guardada]);

  return (
    <section
      id="carta-aberta"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#FAF7F2] border-b border-[#E5DEC9]"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-[#6A645E] mb-3">
            Capítulo IV · Carta Aberta
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2C2A29] text-balance">
            Palavras que eu precisava escrever
          </h2>
        </motion.div>

        {/* Folha de Papel Texturizado */}
        <motion.article
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative paper-texture border border-[#E5DEC9] p-4 sm:p-10 md:p-14 shadow-[0_18px_46px_-26px_rgba(44,42,41,0.24)]"
        >
          {/* Cantoneiras Sutis de Papel de Arquivo */}
          <span
            className="pointer-events-none absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t border-l border-[#C5A059]/45"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t border-r border-[#C5A059]/45"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b border-l border-[#C5A059]/45"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b border-r border-[#C5A059]/45"
            aria-hidden="true"
          />

          <div className="border border-[#C5A059]/30 p-4 sm:p-10 md:p-12">
            <div className="max-w-2xl mx-auto">
              {/* Monograma Editorial E & P e Cabeçalho da Carta */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DEC9]/80"
              >
                <p className="text-xs tracking-[0.18em] uppercase text-[#6A645E]">
                  {cartaAberta.localEData}
                </p>

                <div
                  className="w-11 h-11 rounded-full border border-[#C5A059]/60 flex items-center justify-center bg-[#FAF7F2]"
                  aria-hidden="true"
                >
                  <span className="font-serif italic text-xs tracking-wider text-[#2C2A29]">
                    E &amp; P
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-2xl md:text-3xl text-[#2C2A29] mb-8"
              >
                {cartaAberta.saudacao}
              </motion.p>

              <div className="space-y-6 text-[15.5px] sm:text-[16px] md:text-[17px] leading-[1.85] text-[#2C2A29]/90 font-light [overflow-wrap:anywhere]">
                {cartaAberta.paragrafos.map((paragrafo, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.75,
                      delay: index === 0 ? 0.08 : 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={
                      index === 0
                        ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-normal first-letter:text-[#C5A059] first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-[0.85]'
                        : ''
                    }
                  >
                    {paragrafo}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 pt-8 border-t border-[#E5DEC9] flex flex-col sm:flex-row sm:items-end justify-between gap-8"
              >
                {/* Ação Íntima de Guardar a Carta */}
                <button
                  type="button"
                  onClick={() => setGuardada((prev) => !prev)}
                  aria-pressed={guardada}
                  className={`inline-flex items-center gap-2.5 px-4 min-h-[44px] border text-xs tracking-[0.14em] uppercase transition-colors cursor-pointer whitespace-nowrap self-start sm:self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                    guardada
                      ? 'bg-[#2C2A29] border-[#2C2A29] text-[#FAF7F2]'
                      : 'bg-[#FAF7F2] border-[#E5DEC9] text-[#6A645E] hover:border-[#C5A059] hover:text-[#2C2A29]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      guardada ? 'fill-[#D4A392] text-[#D4A392]' : 'text-[#C5A059]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    {guardada ? 'Guardada no coração' : 'Guardar no coração'}
                  </span>
                </button>

                {/* Assinatura Caligráfica Estilizada */}
                <div className="flex flex-col items-end text-right">
                  <p className="font-serif italic text-lg text-[#6A645E] max-w-md">
                    {cartaAberta.despedida}
                  </p>

                  <div className="mt-5 flex flex-col items-end">
                    <span className="font-serif italic text-4xl md:text-5xl text-[#2C2A29] tracking-wide">
                      {cartaAberta.assinatura}
                    </span>
                    <svg
                      viewBox="0 0 180 24"
                      className="w-36 h-5 text-[#C5A059] mt-1"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 16 C 42 4, 96 22, 174 7"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
