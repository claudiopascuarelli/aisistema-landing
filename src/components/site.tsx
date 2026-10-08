import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Encabezado, pie y botón de WhatsApp compartidos por todas las páginas del sitio.

const WA_NUMBER = "5491162488744";
const WA_MSG = encodeURIComponent(
  "Hola, quiero información sobre AIGestión. Mi negocio es: _____ y actualmente gestiono con: _____"
);
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// Logo AISistema (Desktop/AISISTEMA ERP/LOGO AISISTEMA.png) redibujado en SVG:
// en el PNG "AI" es casi negro y no se ve sobre el fondo oscuro; acá toma el color del texto.
function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 196 34" className={className} role="img" aria-label="AISistema">
      <g fill="#7EA9DB">
        <rect x="0" y="3" width="26" height="5" rx="2.5" />
        <rect x="0" y="15.5" width="26" height="5" rx="2.5" />
        <rect x="0" y="27" width="26" height="5" rx="2.5" />
        <rect x="33" y="1" width="4" height="32" rx="1" />
      </g>
      <text x="60" y="27" fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" fontSize="27" fontWeight="700">
        <tspan fill="currentColor">AI</tspan>
        <tspan fill="#7EA9DB">Sistema</tspan>
      </text>
    </svg>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <Logo className="h-7" />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="/#modulos" className="hover:text-foreground">Módulos</a>
          <a href="/#problemas" className="hover:text-foreground">Para quién</a>
          <a href="/sistema-de-gestion-para-distribuidoras" className="hover:text-foreground">Distribuidoras</a>
          <a href="/#equipo" className="hover:text-foreground">Quién soy</a>
          <a href="/#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <Button asChild size="sm" className="font-mono">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" /> Hablar por WhatsApp
          </a>
        </Button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-5" />
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="/sistema-de-gestion-para-distribuidoras" className="hover:text-foreground">
            Para distribuidoras y mayoristas
          </a>
          <a href="/alternativa-a-tango-gestion" className="hover:text-foreground">
            Alternativa a Tango
          </a>
          <span className="opacity-30">·</span>
          <a href="mailto:claudio@aisistema.net" className="hover:text-foreground">
            claudio@aisistema.net
          </a>
          <span className="opacity-30">·</span>
          <span>Buenos Aires, Argentina</span>
        </div>
      </div>
    </footer>
  );
}

/* ----------------- WhatsApp FAB ----------------- */
export function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-accent p-3 text-accent-foreground shadow-lg shadow-accent/30 transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}

// Página de contenido (respuestas a una búsqueda concreta): encabezado, texto y cierre con contacto.
export function ArticlePage({
  origen,
  tema,
  children,
}: {
  origen: string; // se guarda con el lead (columna leads.origen)
  tema: string; // va en el mensaje de WhatsApp, lo lee el prospecto
  children: React.ReactNode;
}) {
  const wa = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola, vi la página sobre ${tema} en aisistema.net. Mi negocio es: _____`,
  )}`;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 [&_h1]:text-3xl [&_h1]:leading-tight sm:[&_h1]:text-4xl [&_h2]:mt-12 [&_h2]:text-2xl [&_h3]:mt-6 [&_h3]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground">
        {children}
        <div className="mt-14 rounded-xl border border-border/70 bg-card/60 p-6">
          <h2 className="!mt-0 text-xl">¿Querés verlo con tu operación?</h2>
          <p>
            Contame cómo trabajás hoy y te muestro el sistema funcionando con tu caso.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="font-mono">
              <a href={`/?origen=${encodeURIComponent(origen)}#contacto`}>Solicitar demo</a>
            </Button>
            <Button asChild variant="outline" className="border-border/70 bg-card/40 font-mono">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

// head() de una página de contenido: título, descripción, canonical y preguntas frecuentes.
export function articleHead(o: {
  path: string;
  title: string;
  description: string;
  faqs: { q: string; a: string }[];
}) {
  const url = `https://aisistema.net${o.path}`;
  return {
    meta: [
      { title: o.title },
      { name: "description", content: o.description },
      { property: "og:title", content: o.title },
      { property: "og:description", content: o.description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: o.title },
      { name: "twitter:description", content: o.description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: o.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  };
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <>
      {faqs.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p className="!mt-2">{f.a}</p>
        </div>
      ))}
    </>
  );
}
