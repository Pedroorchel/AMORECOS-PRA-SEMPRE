import { useEffect, useState } from 'react';
import { Heart, Mail, MailOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NOSSA_HISTORIA } from '../config/nossaHistoria';
import { RomanticPianoSynth } from '../utils/romanticAudio';

const STORAGE_KEY_CARTA_SELADA = 'emanuela_pedro_carta_coracao_v1';
const STORAGE_KEY_CARTA_ABERTA = 'emanuela_pedro_carta_aberta_v1';

export function OpenLetter() {
  const { cartaAberta } = NOSSA_HISTORIA;
  const [guardada, setGuardada] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY_CARTA_SELADA) === 'true';
    } catch {
      return false;
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY_CARTA_ABERTA) === 'true';
    } catch {
      return false;
    }
  });

  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; scale: number }>>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_CARTA_SELADA, String(guardada));
    } catch {
      // Ignora em navegação privada
    }
  }, [guardada]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_CARTA_ABERTA, String(isOpen));
    } catch {
      // Ignora em navegação privada
    }
  }, [isOpen]);

  const handleOpenLetter = () => {
    // Tocar breve arpejo romântico ao abrir a carta
    try {
      const synth = new RomanticPianoSynth();
      synth.start(0);
      setTimeout(() => {
        synth.pause();
        synth.destroy();
      }, 2500);
    } catch {
      // Fallback silencioso se áudio não suportado
    }

    // Criar partículas de brilho e corações na abertura
    const newSparkles = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.7) * 180,
      scale: 0.6 + Math.random() * 0.8,
    }));
    setSparkles(newSparkles);
    setIsOpen(true);

    // Rolar suavemente para a carta aberta
    setTimeout(() => {
      const el = document.getElementById('carta-aberta-conteudo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <section
      id="carta-aberta"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#FAF7F2] border-b border-[#E5DEC9] relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative z-10">
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

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope Fechado / Selo Clicável com Efeito Editorial de Cera e Dourado */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleOpenLetter}
              className="group cursor-pointer flex flex-col items-center justify-center p-10 sm:p-16 bg-[#F3EFE7] border-2 border-[#C5A059]/40 shadow-[0_20px_50px_-20px_rgba(44,42,41,0.25)] text-center relative overflow-hidden transition-all duration-500 hover:border-[#C5A059] hover:shadow-[0_25px_60px_-18px_rgba(197,160,89,0.35)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.14)_0%,transparent_75%)] pointer-events-none" />
              
              {/* Cantoneiras Decorativas */}
              <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/60 pointer-events-none" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/60 pointer-events-none" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/60 pointer-events-none" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/60 pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] flex items-center justify-center mb-6 shadow-md text-[#C5A059] group-hover:scale-110 transition-transform duration-300 relative">
                <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#C5A059] pointer-events-none" />
                <Mail className="w-8 h-8 stroke-[1.5]" />
              </div>

              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C5A059] font-medium mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Carta Confidencial · Lacre Dourado
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#2C2A29] mb-3 group-hover:text-[#C5A059] transition-colors">
                Para Emanuela, com todo o meu amor
              </h3>
              <p className="text-sm text-[#6A645E] max-w-md mx-auto mb-8 font-light">
                Toque no envelope ou no botão para quebrar o lacre e desfrutar desta carta escrita com a alma.
              </p>

              <button
                type="button"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#2C2A29] text-[#FAF7F2] text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#C5A059] hover:text-[#2C2A29] transition-all duration-300 shadow-lg cursor-pointer"
              >
                <MailOpen className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                <span>Quebrar Lacre e Abrir</span>
              </button>
            </motion.div>
          ) : (
            /* Folha de Papel Texturizado Aberta com Efeito Mágico de Revelação */
            <motion.article
              id="carta-aberta-conteudo"
              key="carta"
              initial={{ opacity: 0, scale: 0.92, y: 30, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative paper-texture border border-[#E5DEC9] p-4 sm:p-10 md:p-14 shadow-[0_24px_54px_-24px_rgba(44,42,41,0.28)] overflow-hidden"
            >
              {/* Partículas de Brilho Flutuantes na Abertura */}
              {sparkles.map((sparkle) => (
                <motion.div
                  key={sparkle.id}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: sparkle.scale,
                    x: sparkle.x,
                    y: sparkle.y,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2 text-[#C5A059] pointer-events-none z-20"
                >
                  <Sparkles className="w-5 h-5 fill-[#C5A059]/30" />
                </motion.div>
              ))}

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
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DEC9]/80">
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
                  </div>

                  <p className="font-serif italic text-2xl md:text-3xl text-[#2C2A29] mb-8">
                    {cartaAberta.saudacao}
                  </p>

                  <div className="space-y-6 text-[15.5px] sm:text-[16px] md:text-[17px] leading-[1.85] text-[#2C2A29]/90 font-light [overflow-wrap:anywhere]">
                    {cartaAberta.paragrafos.map((paragrafo, index) => (
                      <p
                        key={index}
                        className={
                          index === 0
                            ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-normal first-letter:text-[#C5A059] first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-[0.85]'
                            : ''
                        }
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-[#E5DEC9] flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                    {/* Ação Íntima de Guardar a Carta */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuardada((prev) => !prev)}
                        aria-pressed={guardada}
                        className={`inline-flex items-center gap-2.5 px-4 min-h-[44px] border text-xs tracking-[0.14em] uppercase transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
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

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 px-3.5 min-h-[44px] border border-[#E5DEC9] bg-[#FAF7F2] text-[11px] tracking-[0.14em] uppercase text-[#6A645E] hover:text-[#2C2A29] hover:border-[#C5A059] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Dobrar e Lacrar</span>
                      </button>
                    </div>

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
                  </div>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
