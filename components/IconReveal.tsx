'use client';

import { useEffect, useRef, useState } from 'react';
import {
  IconLibro,
  IconTerminale,
  IconStella,
  IconCactus,
  IconBlocchi,
  IconMano,
  type IconProps,
} from '@/components/icons';

// Animazione icone al reveal (Fase E). Wrappa una delle 6 icone e, quando entra
// in viewport, gli applica `data-animate="true"`: i keyframes (globals.css)
// fanno il draw-on (stroke-dashoffset) + il comportamento specifico per icona
// (cactus cresce, terminale lampeggia, blocchi cadono, mano oscilla, libro si
// apre, stella si traccia). Una sola volta.
//
// reduced-motion: se l'utente lo preferisce, NON aggiungiamo mai `data-animate`
// → l'icona resta statica e piena (il CSS neutralizza comunque, doppia sicurezza).

const ICONS = {
  libro: IconLibro,
  terminale: IconTerminale,
  stella: IconStella,
  cactus: IconCactus,
  blocchi: IconBlocchi,
  mano: IconMano,
} as const;

export type IconName = keyof typeof ICONS;

export function IconReveal({
  icon,
  className,
  size,
  ...props
}: { icon: IconName } & IconProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = useState(false);
  const [ready, setReady] = useState(false); // JS pronto + motion ok → si può nascondere per il draw
  const Cmp = ICONS[icon];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // statico: nessuna animazione, niente stato "ready" (no-JS-safe)
    const el = ref.current;
    if (!el) return;
    setReady(true);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setAnimate(true);
            obs.unobserve(e.target); // una volta sola
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      data-icon={icon}
      data-ready={ready || undefined}
      data-animate={animate || undefined}
      className="icon-reveal inline-flex"
    >
      <Cmp className={className} size={size} {...props} />
    </span>
  );
}
