import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ShoppingCart,
  Boxes,
  FileText,
  Users,
  BarChart3,
  Building2,
  Check,
  MessageCircle,
  Linkedin,
  Mail,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { submitLead } from "@/lib/leads.functions";
import dashboardMockup from "@/assets/dashboard-mockup.webp";

const SITE_URL = "https://aisistema.net";
const TITLE = "AISistema | Gestión e inteligencia artificial para negocios";
const DESC =
  "Soluciones de gestión, automatización e inteligencia artificial para PyMEs y comercios. Ordená ventas, stock, clientes, caja y procesos administrativos desde un solo lugar.";

const WA_NUMBER = "5491162488744";
const WA_MSG = encodeURIComponent(
  "Hola, quiero información sobre AIGestión. Mi negocio es: _____ y actualmente gestiono con: _____"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const FAQS = [
  {
    q: "¿Cuánto tarda la implementación?",
    a: "En la mayoría de los casos, el sistema está operativo en 3 días desde la primera reunión. Con tus datos cargados, tu equipo capacitado y los módulos que necesitás funcionando.",
  },
  {
    q: "¿Se conecta con ARCA para facturar?",
    a: "Sí. Emitimos facturas A, B y C electrónicas con CAE, notas de crédito y notas de débito. Integración directa con los WebServices de ARCA.",
  },
  {
    q: "¿Puedo migrar mis datos actuales (Excel, Tango, otro sistema)?",
    a: "Sí. Hacemos la migración inicial de productos, clientes, proveedores y saldos. Trabajamos seguido con planillas de Excel y exportaciones de Tango, Bejerman y sistemas a medida.",
  },
  {
    q: "¿Cuánto cuesta el sistema?",
    a: "El modelo de precios se define después del relevamiento, según tu operatoria y los módulos que necesitás. Puede ser un pago único anual con soporte incluido. Sin permanencias ni costos ocultos.",
  },
  {
    q: "¿Funciona en varias sucursales o vendedores?",
    a: "Sí. Manejamos multi-sucursal, multi-usuario con permisos por rol y stock independiente o consolidado según necesites.",
  },
];

const MODULOS = [
  {
    icon: ShoppingCart,
    title: "Ventas",
    desc: "Punto de venta, presupuestos, remitos y pedidos. Multi-vendedor con comisiones.",
  },
  {
    icon: Boxes,
    title: "Stock",
    desc: "Control de inventario en tiempo real, alertas de mínimos y movimientos entre depósitos.",
  },
  {
    icon: FileText,
    title: "Facturación ARCA",
    desc: "Facturas A, B y C electrónicas con CAE. Notas de crédito y débito al instante.",
  },
  {
    icon: Users,
    title: "Clientes / CRM",
    desc: "Cuenta corriente, historial de compras y seguimiento comercial unificado.",
  },
  {
    icon: BarChart3,
    title: "Reportes",
    desc: "Tableros de ventas, rentabilidad, stock crítico y exportación a Excel.",
  },
  {
    icon: Building2,
    title: "Multi-sucursal",
    desc: "Operá varias sucursales con stock independiente o consolidado y permisos por usuario.",
  },
];

const PROBLEMAS = [
  {
    titulo: "Negocios que todavía usan Excel, papel o mensajes sueltos",
    desc: "Sin un sistema central, la información se pierde y las decisiones se toman a ciegas.",
  },
  {
    titulo: "Comercios sin claridad sobre ventas, stock o caja",
    desc: "No saber qué entra, qué sale y cuánto queda genera errores y oportunidades perdidas.",
  },
  {
    titulo: "Empresas que pierden tiempo en tareas repetitivas",
    desc: "Cargar datos dos veces, hacer reconciliaciones manuales o buscar información en distintos lugares.",
  },
  {
    titulo: "Equipos que necesitan reportes simples para decidir mejor",
    desc: "La información existe pero está dispersa. Hace falta consolidarla en un lugar claro.",
  },
  {
    titulo: "Negocios que quieren ordenar sus procesos antes de crecer",
    desc: "Crecer sobre una base desordenada multiplica los problemas. Ordenar primero es la mejor inversión.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: "https://aisistema.net" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <MultiDispositivo />
        <Modulos />
        <AISection />
        <Problemas />
        <VideoPlaceholder />
        <QuienEsta />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
}

/* ----------------- Nav ----------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
            A
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">
            aisistema
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#modulos" className="hover:text-foreground">Módulos</a>
          <a href="#problemas" className="hover:text-foreground">Para quién</a>
          <a href="#equipo" className="hover:text-foreground">Equipo</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
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

/* ----------------- Hero ----------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(92,189,185,0.18),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
        <div className="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AISistema · Primer producto: AIGestión
          </div>
          <h1 className="mt-5 text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.4rem] sm:leading-[1.05]">
            Gestión e inteligencia artificial{" "}
            <span className="text-accent">para tu negocio</span>.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            AIGestión, nuestro primer producto, ayuda a PyMEs y comercios a
            ordenar ventas, stock, clientes, caja, reportes y procesos
            administrativos desde un solo lugar.
          </p>
          <ul className="mt-6 grid max-w-md gap-2 text-sm text-muted-foreground">
            {[
              "Implementación en 3 días",
              "Facturación electrónica ARCA",
              "Multi-sucursal y multi-usuario",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-mono">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Hablar por WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border/70 bg-card/40 font-mono"
            >
              <a href="#contacto">Solicitar demo</a>
            </Button>
          </div>
        </div>

        <div className="relative fade-up">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-primary/30 to-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xl shadow-primary/20">
            <img
              src={dashboardMockup}
              alt="Panel de control de AIGestión: ventas del mes, stock crítico, facturas emitidas y clientes activos"
              width={1536}
              height={1024}
              className="h-auto w-full"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Multi-dispositivo ----------------- */
function MultiDispositivo() {
  const devices = [
    { icon: Laptop, label: "Computadora", desc: "Escritorio completo para operar todo el día." },
    { icon: Tablet, label: "Tablet", desc: "Ideal para mostrar productos y tomar pedidos en el showroom." },
    { icon: Smartphone, label: "Celular", desc: "Consultá stock, precios y ventas desde cualquier lado." },
  ];
  return (
    <section className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Multi-dispositivo
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            En tu oficina, en la calle, en el depósito.
          </h2>
          <p className="mt-5 text-muted-foreground">
            AIGestión funciona en cualquier dispositivo. Controlá stock, consultá
            precios y seguí ventas desde tu celular, tablet o computadora.
            La misma información, actualizada en tiempo real, donde estés.
          </p>
          <ul className="mt-6 grid max-w-md gap-2 text-sm text-muted-foreground">
            {[
              "Responsive y adaptativo",
              "Datos sincronizados al instante",
              "Sin instalaciones ni apps que descargar",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {devices.map((d) => (
            <div
              key={d.label}
              className="flex flex-col items-center rounded-xl border border-border/70 bg-card/60 p-6 text-center transition hover:-translate-y-0.5 hover:border-accent/50"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-accent">
                <d.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-mono text-sm font-semibold">{d.label}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Módulos ----------------- */
function Modulos() {
  return (
    <section id="modulos" className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Módulos de AIGestión
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            Activá solo lo que necesitás. Sumás más cuando crece tu operación.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada módulo está pensado para resolver una parte concreta del día a
            día de una PyME, sin obligarte a pagar features que no usás.
          </p>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULOS.map((m) => (
            <article
              key={m.title}
              className="group rounded-xl border border-border/70 bg-card/60 p-6 transition hover:-translate-y-0.5 hover:border-accent/50"
            >
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-accent">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-mono text-lg">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- IA Section ----------------- */
function AISection() {
  const items = [
    "Automatizar tareas repetitivas",
    "Ordenar y consolidar información dispersa",
    "Generar reportes más claros",
    "Detectar problemas de gestión",
    "Asistir procesos administrativos",
    "Mejorar la toma de decisiones",
  ];
  return (
    <section className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Inteligencia artificial
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            ¿Dónde entra la inteligencia artificial?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Según el caso y la configuración de cada negocio, AISistema puede
            incorporar automatizaciones e inteligencia artificial para simplificar
            tareas, mejorar el control y ayudar a tomar mejores decisiones.
          </p>
        </header>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/60 p-5 transition hover:-translate-y-0.5 hover:border-accent/50"
            >
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Problemas ----------------- */
function Problemas() {
  return (
    <section id="problemas" className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Para quién
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            Problemas habituales que buscamos resolver.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Si tu negocio se identifica con alguno de estos puntos, AIGestión
            puede ayudar.
          </p>
        </header>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMAS.map((p) => (
            <div
              key={p.titulo}
              className="rounded-xl border border-border/70 bg-card/60 p-6 transition hover:-translate-y-0.5 hover:border-accent/50"
            >
              <h3 className="font-mono text-sm font-semibold leading-snug">
                {p.titulo}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-xl border border-accent/40 bg-accent/5 p-6">
            <div>
              <h3 className="font-mono text-sm font-semibold leading-snug">
                ¿Tu caso no está en la lista?
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Contanos tu situación y vemos cómo podemos ayudarte.
              </p>
            </div>
            <Button asChild size="sm" className="mt-6 w-full font-mono">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Video Placeholder ----------------- */
function VideoPlaceholder() {
  return (
    <section className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          // Video
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
          Conocé AISistema en menos de un minuto
        </h2>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
          Estamos preparando un video breve para mostrar cómo AISistema puede
          ayudar a ordenar la gestión de un negocio y sumar automatización de
          forma simple.
        </p>
        <div className="mt-10 mx-auto flex aspect-video max-w-2xl items-center justify-center rounded-xl border border-border/70 bg-card/60">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-border/70 bg-primary/10 text-accent transition hover:bg-primary/20">
              <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Próximamente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Quién está detrás ----------------- */
function QuienEsta() {
  return (
    <section id="equipo" className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:gap-12 sm:px-6 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Quién está detrás
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            Un sistema construido por alguien que escucha.
          </h2>
          <p className="mt-5 text-muted-foreground">
            AISistema no es una empresa con un call center. Soy yo, con más de
            15 años desarrollando software para PyMEs argentinas, atendiendo
            personalmente cada implementación. Sin intermediarios, sin tickets
            que se pierden, sin features que tardan seis meses.
          </p>
          <p className="mt-3 text-muted-foreground">
            Si tenés una necesidad puntual de tu rubro, la discutimos y la
            resolvemos. Esa es la diferencia con un sistema enlatado.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-border/70 bg-card/40">
              <a
                href="https://www.linkedin.com/in/claudio-pascuarelli-8b413570/details/experience/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" className="border-border/70 bg-card/40">
              <a href="mailto:claudio@aisistema.net">
                <Mail className="mr-2 h-4 w-4" />claudio@aisistema.net
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Lead Form + Quiz Calificación ----------------- */
type Semaforo = "verde" | "amarillo" | "rojo";

const QUIZ: {
  name:
    | "q_empleados"
    | "q_sistema_actual"
    | "q_urgencia"
    | "q_presupuesto"
    | "q_decisor";
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    name: "q_empleados",
    label: "¿Cuántas personas trabajan en tu empresa?",
    options: [
      { value: "1-5", label: "1 a 5" },
      { value: "6-20", label: "6 a 20" },
      { value: "21-50", label: "21 a 50" },
      { value: "50+", label: "Más de 50" },
    ],
  },
  {
    name: "q_sistema_actual",
    label: "¿Con qué gestionás hoy?",
    options: [
      { value: "excel", label: "Excel / planillas" },
      { value: "enlatado", label: "Sistema enlatado (Tango, Bejerman…)" },
      { value: "a-medida", label: "Sistema a medida" },
      { value: "nada", label: "Nada formal todavía" },
    ],
  },
  {
    name: "q_urgencia",
    label: "¿Cuándo querrías arrancar?",
    options: [
      { value: "ya", label: "Lo antes posible" },
      { value: "1-3m", label: "Próximos 1-3 meses" },
      { value: "3-6m", label: "3 a 6 meses" },
      { value: "investigando", label: "Solo estoy investigando" },
    ],
  },
  {
    name: "q_presupuesto",
    label: "¿Tenés presupuesto asignado?",
    options: [
      { value: "definido", label: "Sí, definido" },
      { value: "estimado", label: "Tengo un estimado" },
      { value: "sin-definir", label: "Aún sin definir" },
      { value: "no-se", label: "No tengo idea de costos" },
    ],
  },
  {
    name: "q_decisor",
    label: "¿Tomás vos la decisión final?",
    options: [
      { value: "si", label: "Sí" },
      { value: "co-decisor", label: "Co-decisor" },
      { value: "influyo", label: "Influyo en la decisión" },
      { value: "no", label: "No, decide otra persona" },
    ],
  },
];

const SEMAFORO_UI: Record<
  Semaforo,
  { dot: string; ring: string; titulo: string; bajada: string }
> = {
  verde: {
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/30",
    titulo: "¡Encaja muy bien!",
    bajada: "Te escribimos hoy mismo para coordinar la demo.",
  },
  amarillo: {
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    titulo: "Hay buen potencial",
    bajada: "Te contactamos para entender mejor tu caso antes de avanzar.",
  },
  rojo: {
    dot: "bg-rose-400",
    ring: "ring-rose-400/30",
    titulo: "Gracias por escribirnos",
    bajada: "Te mandamos material y quedamos a disposición cuando quieras avanzar.",
  },
};

function LeadForm() {
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    semaforo: Semaforo;
    score: number;
    aiEmail: string;
    nombre: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    for (const q of QUIZ) {
      if (!answers[q.name]) {
        toast.error(`Falta responder: ${q.label}`);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await submit({
        data: {
          nombre: String(fd.get("nombre") ?? ""),
          empresa: String(fd.get("empresa") ?? ""),
          rubro: String(fd.get("rubro") ?? ""),
          email: String(fd.get("email") ?? ""),
          telefono: String(fd.get("telefono") ?? ""),
          mensaje: String(fd.get("mensaje") ?? ""),
          q_empleados: answers.q_empleados,
          q_sistema_actual: answers.q_sistema_actual,
          q_urgencia: answers.q_urgencia,
          q_presupuesto: answers.q_presupuesto,
          q_decisor: answers.q_decisor,
        },
      });
      setResult({
        semaforo: res.semaforo as Semaforo,
        score: res.score,
        aiEmail: res.aiEmail,
        nombre: String(fd.get("nombre") ?? ""),
      });
      form.reset();
      setAnswers({});
    } catch (err) {
      console.error(err);
      toast.error("No pudimos registrar tu consulta. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacto" className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Solicitar demo
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            Contanos sobre tu PyME y te mostramos el sistema funcionando.
          </h2>
          <p className="mt-4 text-muted-foreground">
            5 preguntas rápidas para entender tu situación. Te respondemos con
            una propuesta concreta, no un PDF genérico.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {[
              "Respuesta en menos de 24 hs hábiles",
              "Calificamos tu caso en el momento",
              "Atiende directamente quien va a implementar",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="mb-3 text-sm text-muted-foreground">¿Preferís escribir directo?</p>
            <Button asChild variant="outline" className="border-border/70 bg-card/40 font-mono">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-5 rounded-xl border border-border/70 bg-card/60 p-6 sm:p-8"
        >
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" name="nombre" required autoComplete="name" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input id="empresa" name="empresa" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rubro">Rubro</Label>
              <Input id="rubro" name="rubro" placeholder="Distribuidora, retail…" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
              <Input id="telefono" name="telefono" autoComplete="tel" />
            </div>
          </div>

          <div className="my-2 border-t border-border/60 pt-4">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              // 5 preguntas rápidas
            </p>
          </div>

          {QUIZ.map((q) => (
            <div key={q.name} className="grid gap-2">
              <Label htmlFor={q.name}>{q.label}</Label>
              <Select
                value={answers[q.name] ?? ""}
                onValueChange={(v) =>
                  setAnswers((a) => ({ ...a, [q.name]: v }))
                }
              >
                <SelectTrigger id={q.name}>
                  <SelectValue placeholder="Elegí una opción" />
                </SelectTrigger>
                <SelectContent>
                  {q.options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div className="grid gap-2">
            <Label htmlFor="mensaje">¿Algo más que quieras contarnos? (opcional)</Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              rows={3}
              placeholder="Hoy facturamos con Excel y perdemos el control del stock…"
            />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="mt-2 font-mono">
            {loading ? "Calificando tu caso…" : "Solicitar demo"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            O escribinos a{" "}
            <a className="underline underline-offset-2" href="mailto:claudio@aisistema.net">
              claudio@aisistema.net
            </a>
          </p>
        </form>
      </div>

      <Dialog open={!!result} onOpenChange={(o) => !o && setResult(null)}>
        <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto border-border/70 bg-card">
          {result && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ring-4 ${SEMAFORO_UI[result.semaforo].dot} ${SEMAFORO_UI[result.semaforo].ring}`}
                  />
                  <DialogTitle className="text-2xl">
                    {SEMAFORO_UI[result.semaforo].titulo}
                  </DialogTitle>
                </div>
                <DialogDescription className="pt-2 text-base">
                  {SEMAFORO_UI[result.semaforo].bajada}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 rounded-lg border border-border/60 bg-background/60 p-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                  // Vista previa del mail que te vamos a enviar
                </p>
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground/90">
                  {result.aiEmail}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground">
                Calificación interna: {result.score}/100
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ----------------- FAQ ----------------- */
function FAQ() {
  return (
    <section id="faq" className="border-b border-border/60 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <header>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            // Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl">
            Lo que nos preguntan antes de empezar.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            ¿No está tu pregunta?{" "}
            <a className="text-accent underline" href="#contacto">
              Escribinos
            </a>{" "}
            y te respondemos.
          </p>
        </header>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border-border/60"
            >
              <AccordionTrigger className="text-left font-mono text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ----------------- Footer ----------------- */
function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded bg-primary font-mono text-xs font-bold text-primary-foreground">
            A
          </span>
          <span className="font-mono">aisistema</span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
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
function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-accent p-3 text-accent-foreground shadow-lg shadow-accent/30 transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
