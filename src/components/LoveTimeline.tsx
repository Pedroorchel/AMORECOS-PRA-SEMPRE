import { motion } from 'motion/react';
import { NOSSA_HISTORIA } from '../config/nossaHistoria';
import { EditorialImage } from './EditorialImage';

export function LoveTimeline() {
  return (
    <section
      id="linha-do-tempo"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#FAF7F2] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1120px] mx-auto">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-[#6A645E] mb-3">
            Capítulo II · Nossa Linha do Tempo
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2C2A29] text-balance">
            Os capítulos que nos trouxeram até aqui
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#6A645E] leading-relaxed font-light">
            Cada encontro, cada viagem e cada escolha que transformou dois caminhos distintos em uma única história.
          </p>
        </motion.div>

        {/* Eixo Vertical da Linha do Tempo */}
        <div className="relative">
          {/* Linha Central no Desktop e Lateral no Mobile */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C5A059]/55 to-transparent"
            aria-hidden="true"
          />
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C5A059]/55 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-24">
            {NOSSA_HISTORIA.timelineEventos.map((evento, index) => {
              const isLeftPhoto = index % 2 === 0;

              return (
                <motion.article
                  key={evento.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-[1fr_80px_1fr] md:items-center gap-6"
                >
                  {/* Marcador Editorial Numerado no Mobile */}
                  <div
                    className="md:hidden absolute left-0 top-1 w-8 h-8 flex items-center justify-center bg-[#FFFDF9] border border-[#C5A059] text-[#2C2A29] font-serif editorial-numerals text-sm"
                    aria-hidden="true"
                  >
                    {evento.numero}
                  </div>

                  {/* Coluna Esquerda (Foto nos pares, Texto nos ímpares) */}
                  <div className={isLeftPhoto ? 'md:pr-6' : 'md:pr-6 md:order-1'}>
                    {isLeftPhoto ? (
                      <figure className="relative group bg-[#FFFDF9] p-3.5 border border-[#E5DEC9] shadow-[0_14px_32px_-22px_rgba(44,42,41,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059]/60">
                        <span
                          className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/50"
                          aria-hidden="true"
                        />
                        <span
                          className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C5A059]/50"
                          aria-hidden="true"
                        />
                        <EditorialImage
                          src={evento.foto}
                          alt={evento.titulo}
                          fallbackLabel={evento.titulo}
                          aspectClassName={
                            evento.proporcao === 'portrait' ? 'aspect-square' : 'aspect-[4/3]'
                          }
                          className={`transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
                            evento.objectPosition === '50% 60%'
                              ? 'object-[50%_60%]'
                              : evento.objectPosition === '50% 58%'
                              ? 'object-[50%_58%]'
                              : evento.objectPosition === '50% 75%'
                              ? 'object-[50%_75%]'
                              : ''
                          }`}
                        />
                        <figcaption className="pt-3.5 pb-1 px-1 text-xs font-serif italic text-[#6A645E] border-t border-[#E5DEC9]/60 mt-3">
                          {evento.legendaFoto}
                        </figcaption>
                      </figure>
                    ) : (
                      <div className="md:text-right md:flex md:flex-col md:items-end">
                        <div className="flex flex-wrap items-center md:justify-end gap-2 text-xs tracking-[0.16em] uppercase text-[#C5A059] mb-2">
                          <span>{evento.data}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#6A645E]">{evento.local}</span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2C2A29] text-balance">
                          {evento.titulo}
                        </h3>
                        <div className="w-10 h-px bg-[#D4A392]/80 my-4" aria-hidden="true" />
                        <p className="text-[15px] leading-[1.8] text-[#6A645E] font-light max-w-[44ch]">
                          {evento.descricao}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Marcador Central no Desktop */}
                  <div className="hidden md:flex justify-center md:order-2">
                    <div className="w-12 h-12 p-1 bg-[#FAF7F2] border border-[#C5A059]/70 flex items-center justify-center shadow-[0_4px_16px_-8px_rgba(44,42,41,0.2)]">
                      <div className="w-full h-full border border-[#E5DEC9] flex items-center justify-center font-serif editorial-numerals text-sm text-[#2C2A29]">
                        {evento.numero}
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita (Texto nos pares, Foto nos ímpares) */}
                  <div className="mt-6 md:mt-0 md:pl-6 md:order-3">
                    {isLeftPhoto ? (
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#C5A059] mb-2">
                          <span>{evento.data}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#6A645E]">{evento.local}</span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2C2A29] text-balance">
                          {evento.titulo}
                        </h3>
                        <div className="w-10 h-px bg-[#D4A392]/80 my-4" aria-hidden="true" />
                        <p className="text-[15px] leading-[1.8] text-[#6A645E] font-light max-w-[44ch]">
                          {evento.descricao}
                        </p>
                      </div>
                    ) : (
                      <figure className="relative group bg-[#FFFDF9] p-3.5 border border-[#E5DEC9] shadow-[0_14px_32px_-22px_rgba(44,42,41,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059]/60">
                        <span
                          className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/50"
                          aria-hidden="true"
                        />
                        <span
                          className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C5A059]/50"
                          aria-hidden="true"
                        />
                        <EditorialImage
                          src={evento.foto}
                          alt={evento.titulo}
                          fallbackLabel={evento.titulo}
                          aspectClassName={
                            evento.proporcao === 'portrait' ? 'aspect-square' : 'aspect-[4/3]'
                          }
                          className={`transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
                            evento.objectPosition === '50% 60%'
                              ? 'object-[50%_60%]'
                              : evento.objectPosition === '50% 58%'
                              ? 'object-[50%_58%]'
                              : evento.objectPosition === '50% 75%'
                              ? 'object-[50%_75%]'
                              : ''
                          }`}
                        />
                        <figcaption className="pt-3.5 pb-1 px-1 text-xs font-serif italic text-[#6A645E] border-t border-[#E5DEC9]/60 mt-3">
                          {evento.legendaFoto}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
