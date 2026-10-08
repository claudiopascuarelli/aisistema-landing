import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage, FaqList, articleHead } from "@/components/site";

const FAQS = [
  {
    q: "¿Puedo pasar mis datos desde Tango?",
    a: "Se evalúa en el relevamiento. La carga inicial de artículos, clientes, proveedores y saldos se arma a partir de lo que tu sistema actual permita exportar, por ejemplo a Excel.",
  },
  {
    q: "¿Cuánto cuesta comparado con Tango?",
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

export const Route = createFileRoute("/alternativa-a-tango-gestion")({
  head: () =>
    articleHead({
      path: "/alternativa-a-tango-gestion",
      title: "Alternativa a Tango Gestión para PyMEs | AISistema",
      description:
        "¿Evaluás dejar Tango Gestión? Cuándo conviene quedarse, cuándo buscar otra opción y qué ofrece AIGestión: sistema web, factura ARCA, implementación personal.",
      faqs: FAQS,
    }),
  component: Page,
});

function Page() {
  return (
    <ArticlePage origen="alternativa-tango" tema="alternativas a Tango">
      <p className="!mt-0 font-mono text-xs uppercase tracking-wider text-accent">
        // Alternativa a Tango Gestión
      </p>
      <h1 className="mt-3">Alternativa a Tango Gestión: cuándo conviene cambiar y cuándo no</h1>
      <p>
        Tango Gestión, de Axoft, es uno de los sistemas de gestión más conocidos entre
        las PyMEs argentinas. Si lo tenés implementado y te funciona, probablemente no
        necesites cambiarlo. Esta página es para quien está evaluando otra opción y
        quiere saber qué mirar antes de decidir.
      </p>

      <h2>Cuándo conviene quedarse con Tango</h2>
      <ul>
        <li>Si ya está implementado y tu equipo lo usa sin problemas.</li>
        <li>
          Si necesitás módulos que AIGestión no tiene, como control de producción o
          fabricación.
        </li>
        <li>Si tu estudio contable trabaja directamente sobre tu Tango.</li>
      </ul>

      <h2>Cuándo vale la pena evaluar una alternativa</h2>
      <ul>
        <li>Cuando pagás por un sistema mucho más grande de lo que usás.</li>
        <li>
          Cuando necesitás consultar stock, precios o ventas desde el celular o desde
          otra sucursal, sin instalar nada.
        </li>
        <li>
          Cuando querés que las adaptaciones a tu forma de trabajar las resuelva
          directamente quien te implementó el sistema.
        </li>
        <li>
          Cuando querés que la implementación la haga alguien que conozca la operación
          de una PyME, no solo el software.
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
        <a href="/?origen=alternativa-tango#contacto" className="text-accent underline underline-offset-2">
          Pedí una demo con tu operación
        </a>{" "}
        y lo comparás con lo que usás hoy.
      </p>

      <h2>Lo que AIGestión no es</h2>
      <ul>
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

      <h2>Preguntas frecuentes</h2>
      <FaqList faqs={FAQS} />

      <p className="!mt-10 text-xs">
        Tango Gestión es una marca de Axoft Argentina S.A. AISistema no tiene relación
        con Axoft.
      </p>
    </ArticlePage>
  );
}
