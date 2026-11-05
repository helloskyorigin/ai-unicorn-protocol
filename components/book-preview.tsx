'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Expand, Minus, Plus, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
const pages = [
  { title: 'The cover', short: 'Cover' },
  { title: 'The operating principle', short: 'The principle' },
  { title: 'The opportunity landscape', short: 'Market map' },
  { title: 'The $1B Potential Test', short: '100-point test' },
  { title: 'Product versus company', short: 'The distinction' },
];
export function BookPreview() {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      const center = root.scrollLeft + root.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      root.querySelectorAll<HTMLElement>('[data-page]').forEach(card => {
        const nextDistance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
        if (nextDistance < distance) { distance = nextDistance; nearest = Number(card.dataset.page); }
      });
      setActive(nearest);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    root.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => { cancelAnimationFrame(frame); root.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  function go(index: number) {
    const next = Math.max(0, Math.min(pages.length - 1, index));
    const root = track.current; const card = root?.querySelector<HTMLElement>(`[data-page="${next}"]`);
    if (!root || !card) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.scrollTo({ left: card.offsetLeft - (root.clientWidth - card.clientWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
    setActive(next);
  }
  function fullscreenGo(index: number) { go(index); setZoom(false); }
  return <>
    <div className="preview-shell">
      <div className="viewer-toolbar"><span className="viewer-label"><span className="tiny-square" />THE ACTUAL FIRST FIVE PAGES</span>
        <button className="viewer-zoom" onClick={() => { setZoom(false); dialog.current?.showModal(); }}><Expand size={15} /><span>Expand page</span></button>
      </div>
      <div ref={track} className="preview-track" tabIndex={0} role="region" aria-label="Book preview. Swipe or use the arrow keys to change pages." onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); go(active + (e.key === 'ArrowRight' ? 1 : -1)); } }}>
        {pages.map((p, i) => <figure key={p.title} data-page={i} className={`preview-page ${active === i ? 'active' : ''}`}>
          {/* Real PDF renders are pre-optimized and retain all original page typography. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/preview/page-${i + 1}.webp`} width={1400} height={2100} alt={`Actual preview page ${i + 1}: ${p.title}`} loading="lazy" draggable={false} />
          <figcaption className="sr-only">{p.title}</figcaption>
        </figure>)}
      </div>
      <div className="viewer-bottom">
        <div className="viewer-caption"><span className="page-counter" aria-live="polite">0{active + 1}<span> / 05</span></span><span className="current-title">{pages[active].title}</span></div>
        <div className="viewer-controls"><button className="icon-button" disabled={active === 0} aria-label="Previous preview page" onClick={() => go(active - 1)}><ArrowLeft size={20} /></button><button className="icon-button" disabled={active === 4} aria-label="Next preview page" onClick={() => go(active + 1)}><ArrowRight size={20} /></button></div>
      </div>
    </div>
    <div className="preview-under"><p>Five pages. The real book. No email required.</p><a className="text-link" href={siteConfig.previewPdf} download="The_AI_Unicorn_Protocol_2027_Free_Preview.pdf"><Download size={15} />Download free preview <span>PDF</span></a></div>
    <dialog ref={dialog} className="page-dialog" aria-labelledby="expanded-title" onClose={() => setZoom(false)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); fullscreenGo(active + (e.key === 'ArrowRight' ? 1 : -1)); } }}>
      <div className="expanded-toolbar"><span id="expanded-title">Page {active + 1} of 5 <span className="expanded-subtitle">· {pages[active].short}</span></span><div className="expanded-actions"><button className="icon-button" aria-label={zoom ? 'Zoom out' : 'Zoom in'} onClick={() => setZoom(z => !z)}>{zoom ? <Minus size={20} /> : <Plus size={20} />}</button><button className="icon-button" aria-label="Close expanded preview" onClick={() => dialog.current?.close()}><X size={22} /></button></div></div>
      <div className={`expanded-page ${zoom ? 'zoomed' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/preview/page-${active + 1}.webp`} width={1400} height={2100} alt={`Expanded actual book page ${active + 1}: ${pages[active].title}`} />
      </div>
      <div className="expanded-footer"><button className="button button-outline" disabled={active === 0} onClick={() => fullscreenGo(active - 1)}><ArrowLeft size={17} />Previous</button><span>Use arrow keys · Escape to close</span><button className="button button-outline" disabled={active === 4} onClick={() => fullscreenGo(active + 1)}>Next<ArrowRight size={17} /></button></div>
    </dialog>
  </>;
}
