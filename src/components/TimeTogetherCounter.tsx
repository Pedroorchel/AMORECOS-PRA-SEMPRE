import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { NOSSA_HISTORIA } from '../config/nossaHistoria';

interface DurationBreakdown {
  anos: number;
  meses: number;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  totalDias: number;
  totalHoras: number;
  diasProximoMes: number;
}

function calculateCalendarDuration(startDateISO: string, now: Date): DurationBreakdown {
  const start = new Date(startDateISO);
  if (Number.isNaN(start.getTime()) || now < start) {
    return {
      anos: 0,
      meses: 0,
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
      totalDias: 0,
      totalHoras: 0,
      diasProximoMes: 0,
    };
  }

  const diffMs = now.getTime() - start.getTime();
  const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHoras = Math.floor(diffMs / (1000 * 60 * 60));

  const diaMarco = start.getDate();
  const hojeInicio = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let proximoMarco = new Date(now.getFullYear(), now.getMonth(), diaMarco);
  if (hojeInicio > proximoMarco) {
    proximoMarco = new Date(now.getFullYear(), now.getMonth() + 1, diaMarco);
  }
  const diasProximoMes = Math.round(
    (proximoMarco.getTime() - hojeInicio.getTime()) / (1000 * 60 * 60 * 24)
  );

  let anos = now.getFullYear() - start.getFullYear();
  let meses = now.getMonth() - start.getMonth();
  let dias = now.getDate() - start.getDate();
  let horas = now.getHours() - start.getHours();
  let minutos = now.getMinutes() - start.getMinutes();
  let segundos = now.getSeconds() - start.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos -= 1;
  }
  if (minutos < 0) {
    minutos += 60;
    horas -= 1;
  }
  if (horas < 0) {
    horas += 24;
    dias -= 1;
  }
  if (dias < 0) {
    const previousMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    dias += previousMonthDays;
    meses -= 1;
  }
  if (meses < 0) {
    meses += 12;
    anos -= 1;
  }

  return {
    anos,
    meses,
    dias,
    horas,
    minutos,
    segundos,
    totalDias,
    totalHoras,
    diasProximoMes,
  };
}

export function TimeTogetherCounter() {
  const [duration, setDuration] = useState<DurationBreakdown>(() =>
    calculateCalendarDuration(NOSSA_HISTORIA.dataInicioNamoroISO, new Date())
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDuration(calculateCalendarDuration(NOSSA_HISTORIA.dataInicioNamoroISO, new Date()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const unidades = [
    { valor: duration.anos, label: duration.anos === 1 ? 'Ano' : 'Anos', destaque: false },
    { valor: duration.meses, label: duration.meses === 1 ? 'Mês' : 'Meses', destaque: false },
    { valor: duration.dias, label: duration.dias === 1 ? 'Dia' : 'Dias', destaque: false },
    { valor: duration.horas, label: duration.horas === 1 ? 'Hora' : 'Horas', destaque: false },
    { valor: duration.minutos, label: duration.minutos === 1 ? 'Minuto' : 'Minutos', destaque: false },
    {
      valor: duration.segundos,
      label: duration.segundos === 1 ? 'Segundo' : 'Segundos',
      destaque: true,
    },
  ];

  return (
    <section
      id="tempo-juntos"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#FAF7F2] border-b border-[#E5DEC9]"
    >
      <div className="max-w-[1120px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.22em] uppercase text-[#6A645E] mb-3">
            Capítulo I · O Nosso Tempo
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2C2A29] text-balance">
            Cada instante ao seu lado
          </h2>

          {/* Linha de Destaque com Total de Dias */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base text-[#6A645E] font-light">
            <span>Desde {NOSSA_HISTORIA.dataInicioPorExtenso}</span>
            <span aria-hidden="true" className="text-[#C5A059]">
              ·
            </span>
            <span className="text-[#2C2A29] font-normal editorial-numerals">
              {duration.totalDias.toLocaleString('pt-BR')} dias de história
            </span>
          </div>
        </motion.div>

        {/* Relógio Editorial em Cartões Refinados com Numerais Alinhados */}
        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {unidades.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative px-3 sm:px-4 py-6 sm:py-8 md:py-10 flex flex-col items-center justify-center border transition-colors duration-200 ${
                item.destaque
                  ? 'bg-[#2C2A29] border-[#C5A059]/70 text-[#FAF7F2] shadow-[0_12px_28px_-18px_rgba(44,42,41,0.45)]'
                  : 'bg-[#FFFDF9] border-[#E5DEC9] hover:border-[#C5A059]/60 text-[#2C2A29] shadow-[0_8px_24px_-20px_rgba(44,42,41,0.2)]'
              }`}
            >
              {item.destaque && (
                <>
                  <span
                    className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/60"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C5A059]/60"
                    aria-hidden="true"
                  />
                </>
              )}

              {/* Detalhe sutil dourado no topo do cartão */}
              <span
                className={`w-6 h-px mb-5 ${
                  item.destaque ? 'bg-[#C5A059]' : 'bg-[#D4A392]/75'
                }`}
                aria-hidden="true"
              />

              <span
                className={`font-serif editorial-numerals text-5xl md:text-[3.5rem] leading-none font-normal tracking-tight ${
                  item.destaque ? 'text-[#C5A059]' : 'text-[#2C2A29]'
                }`}
              >
                {String(item.valor).padStart(2, '0')}
              </span>

              <span
                className={`mt-4 text-[11px] tracking-[0.22em] uppercase ${
                  item.destaque ? 'text-[#FAF7F2]/85' : 'text-[#6A645E]'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Faixa Editorial com Métricas Contínuas do Casal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 pt-7 border-t border-[#E5DEC9]/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-[#6A645E] font-light"
        >
          <span className="editorial-numerals">
            {duration.totalHoras.toLocaleString('pt-BR')} horas compartilhadas
          </span>
          <span aria-hidden="true" className="text-[#C5A059]">
            ·
          </span>
          <span className="editorial-numerals">
            {duration.diasProximoMes === 0
              ? 'Hoje celebramos mais um mês juntos'
              : duration.diasProximoMes === 1
              ? 'Falta 1 dia para o nosso próximo dia 06'
              : `Faltam ${duration.diasProximoMes} dias para o nosso próximo dia 06`}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
