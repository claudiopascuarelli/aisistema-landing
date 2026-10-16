import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage, FaqList, articleHead } from "@/components/site";

const FAQS = [
  {
    q: "¿Puedo pasar mis datos desde Xubio?",
    a: "La carga inicial de artículos, clientes, proveedores y saldos la hago yo, a partir de lo que Xubio te permita exportar (por ejemplo a Excel). En el relevamiento vemos qué datos tenés y qué conviene pasar. Como referencia, en una empresa industrial con unos 8.000 artículos la carga y la puesta en marcha me llevaron 5 días.",
  },
  {
    q: "¿Y mi contador?",
    a: "Lo vemos en el relevamiento: qué necesita tu estudio contable y en qué formato se lo entregás.",
  },
  {
    q: "¿Cuánto cuesta comparado con Xubio?",
    a: "No publico precios: dependen de los módulos y la cantidad de usuarios, y se definen después del relevamiento. Si estás comparando, contame qué pagás hoy y qué usás, y lo vemos.",
  },
  {
    q: "¿Factura electrónica con ARCA?",
    a: "Sí. Emite facturas A, B y C electrónicas con CAE, y notas de crédito y de débito.",
  },
  {
    q: "¿Tengo que instalar algo?",
    a: "No. Es un sistema web: se usa desde el navegador en la computadora, la tablet o el celular.",
  },
];

export const Route = createFileRoute("/alternativa-a-xubio")({
  head: () =>
    articleHead({
      path: "/alternativa-a-xubio",
      title: "Alternativa a Xubio para distribuidoras | AISistema",
      description:
        "¿Usás Xubio y tu distribuidora creció? Cuándo conviene seguir con Xubio y cuándo evaluar un sistema implementado en persona, armado alrededor de tu operación.",
      faqs: FAQS,
    }),
  component: Page,
});

function Page() {
  return (
    <ArticlePage origen="alternativa-xubio" tema="alternativas a Xubio">
      <p className="!mt-0 font-mono text-xs uppercase tracking-wider text-accent">
        // Alternativa a Xubio
      </p>
      <h1 className="mt-3">Alternativa a Xubio: cuándo conviene cambiar y cuándo no</h1>
      <p>
        Xubio es un software de gestión en la nube para empresas, con foco en facturar y
        llevar la contabilidad, y se puede empezar a usar gratis y por cuenta propia. Si
        te funciona, probablemente no necesites cambiarlo. Esta página es para quien
        tiene una distribuidora o un mayorista que creció y está evaluando otra opción.
      </p>

      <h2>Cuándo conviene quedarse con Xubio</h2>
      <ul>
        <li>Si lo que más usás es la facturación y la contabilidad.</li>
        <li>Si tu estudio contable trabaja directamente sobre tu Xubio.</li>
        <li>Si te alcanza con configurarlo vos mismo y el plan que usás hoy.</li>
      </ul>

      <h2>Cuándo vale la pena evaluar una alternativa</h2>
      <ul>
        <li>
          Cuando el día a día es operativo (pedidos, remitos, varios depósitos y
          sucursales) y necesitás que el sistema quede configurado según cómo se mueve tu
          mercadería, no con una configuración estándar.
        </li>
        <li>
          Cuando querés que el sistema se arme alrededor de cómo trabaja tu depósito y tu
          mostrador.
        </li>
        <li>
          Cuando preferís que alguien haga el relevamiento y la puesta en marcha con vos,
          en lugar de configurarlo solo.
        </li>
        <li>
          Cuando querés que las adaptaciones a tu forma de trabajar las resuelva
          directamente quien te implementó el sistema.
        </li>
      </ul>

      <h2>Qué es AIGestión</h2>
      <p>
        Es un sistema de gestión web para PyMEs argentinas de entre 4 y 30 usuarios.
        Se activan solo los módulos que vas a usar:
      </p>
      <ul>
        <li>Ventas: presupuestos, pedidos, remitos y punto de venta.</li>
        <li>Stock en tiempo real, con varios depósitos.</li>
        <li>
          Compras: cargás la factura del proveedor y el stock se actualiza en el mismo
          paso, sin cargar la mercadería dos veces.
        </li>
        <li>Facturación electrónica ARCA: facturas A, B y C con CAE.</li>
        <li>Clientes con cuenta corriente e historial.</li>
        <li>Reportes de ventas, rentabilidad y stock crítico.</li>
        <li>Varias sucursales, con permisos por usuario.</li>
      </ul>
      <p>
        La implementación la hago yo, personalmente. Tengo más de 40 años en
        administración y operaciones de empresas industriales.
      </p>
      <p>
        <a href="/?origen=alternativa-xubio#contacto" className="text-accent underline underline-offset-2">
          Pedí una demo con tu operación
        </a>
        : te contacto yo, vemos cómo trabajás hoy y lo comparás con Xubio, sin compromiso.
      </p>

      <h2>Lo que AIGestión no es</h2>
      <ul>
        <li>No es de autoservicio: no te das de alta solo, siempre empieza con un relevamiento conmigo.</li>
        <li>No tiene módulo de producción.</li>
        <li>No es para empresas con cientos de usuarios.</li>
        <li>
          No tiene una red de distribuidores: soy una sola persona, así que tomo pocas
          implementaciones a la vez.
        </li>
      </ul>

      <h2>Cómo es el cambio</h2>
      <p>
        Primero hago un relevamiento de cómo trabajás hoy y qué datos tenés. Con eso
        planificamos qué se migra (artículos, clientes, proveedores, saldos), configuro
        los módulos y te acompaño en la puesta en marcha.
      </p>
      <p>
        Un ejemplo real: en una empresa industrial con un catálogo de unos 8.000
        artículos, la carga inicial y la puesta en marcha me llevaron 5 días. El plazo
        depende de cada empresa y de cómo estén sus datos; lo estimamos juntos en el
        relevamiento.
      </p>

      <h2>Preguntas frecuentes</h2>
      <FaqList faqs={FAQS} />

      <p className="!mt-10 text-xs">
        Xubio es una marca de su titular. AISistema no tiene relación con Xubio. La
        información sobre Xubio surge de su sitio público (xubio.com/ar) al 16 de octubre
        de 2026.
      </p>
    </ArticlePage>
  );
}
