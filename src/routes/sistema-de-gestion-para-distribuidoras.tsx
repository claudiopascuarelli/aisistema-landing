import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage, FaqList, articleHead } from "@/components/site";

const FAQS = [
  {
    q: "¿Sirve si tengo más de un depósito o sucursal?",
    a: "Sí. Cada sucursal o depósito puede llevar su stock por separado o consolidado, con movimientos entre depósitos y permisos por usuario.",
  },
  {
    q: "¿Factura electrónica con ARCA?",
    a: "Sí. Emite facturas A, B y C electrónicas con CAE, y notas de crédito y de débito.",
  },
  {
    q: "¿Puedo pasar mis artículos, clientes y saldos?",
    a: "Sí. La carga inicial se planifica en el relevamiento, a partir de planillas de Excel o de lo que tu sistema actual permita exportar.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "No publico precios: dependen de los módulos y la cantidad de usuarios, y se definen después del relevamiento. Contame qué usás hoy y lo vemos.",
  },
];

export const Route = createFileRoute("/sistema-de-gestion-para-distribuidoras")({
  head: () =>
    articleHead({
      path: "/sistema-de-gestion-para-distribuidoras",
      title: "Sistema de gestión para distribuidoras | AISistema",
      description:
        "Stock en varios depósitos, pedidos y remitos, cuenta corriente, facturación ARCA y reportes para distribuidoras y mayoristas argentinas. Sistema web.",
      faqs: FAQS,
    }),
  component: Page,
});

function Page() {
  return (
    <ArticlePage origen="distribuidoras" tema="sistemas para distribuidoras">
      <p className="!mt-0 font-mono text-xs uppercase tracking-wider text-accent">
        // Distribuidoras y mayoristas
      </p>
      <h1 className="mt-3">Sistema de gestión para distribuidoras y mayoristas</h1>
      <p>
        Una distribuidora mueve muchos artículos, trabaja con varios vendedores y
        clientes con cuenta corriente, y muchas veces con más de un depósito. Si todo
        eso se lleva en planillas de Excel o en un sistema que no se adapta a la
        operación, los problemas se repiten.
      </p>

      <h2>Los problemas que más se repiten</h2>
      <ul>
        <li>El stock del sistema no coincide con lo que hay en el depósito.</li>
        <li>Pedidos y remitos que llegan en papel o por WhatsApp y hay que volver a cargar.</li>
        <li>Cuentas corrientes de clientes difíciles de seguir.</li>
        <li>No saber qué se vende, qué deja margen y qué mercadería está parada.</li>
        <li>Cada sucursal o depósito con su propia planilla.</li>
      </ul>

      <h2>Qué resuelve AIGestión en una distribuidora</h2>
      <ul>
        <li>
          <strong className="text-foreground">Stock:</strong> inventario en tiempo real,
          alertas de mínimos y movimientos entre depósitos.
        </li>
        <li>
          <strong className="text-foreground">Ventas:</strong> presupuestos, pedidos,
          remitos y punto de venta, con varios vendedores y el cálculo de sus comisiones.
        </li>
        <li>
          <strong className="text-foreground">Facturación electrónica ARCA:</strong>{" "}
          facturas A, B y C con CAE, notas de crédito y de débito.
        </li>
        <li>
          <strong className="text-foreground">Clientes:</strong> cuenta corriente e
          historial de compras de cada cliente.
        </li>
        <li>
          <strong className="text-foreground">Reportes:</strong> ventas, rentabilidad,
          stock crítico y exportación a Excel.
        </li>
        <li>
          <strong className="text-foreground">Multi-sucursal:</strong> stock
          independiente o consolidado y permisos por usuario.
        </li>
      </ul>
      <p>
        Es un sistema web: funciona desde la computadora, una tablet en el mostrador o
        el celular de un vendedor en la calle, sin instalar nada.
      </p>
      <p>
        <a href="/?origen=distribuidoras#contacto" className="text-accent underline underline-offset-2">
          Pedí una demo con tu operación
        </a>{" "}
        y te muestro cómo quedaría en tu caso.
      </p>

      <h2>Para quién está pensado, y para quién no</h2>
      <p>
        Está pensado para distribuidoras y mayoristas de entre 4 y 30 usuarios. Si tu
        empresa fabrica, sirve para la parte comercial y administrativa (ventas, stock,
        facturación, clientes), pero no para controlar la producción en planta:
        AIGestión no tiene un módulo de producción.
      </p>

      <h2>Cómo es la implementación</h2>
      <p>
        La hago yo, personalmente. Empiezo con un relevamiento de cómo trabajás hoy,
        configuro solo los módulos que vas a usar, hacemos la carga inicial de datos y
        te acompaño en la puesta en marcha. Tengo más de 40 años en administración y
        operaciones de empresas industriales: conozco el día a día de un depósito y de
        un mostrador.
      </p>

      <h2>Preguntas frecuentes</h2>
      <FaqList faqs={FAQS} />
    </ArticlePage>
  );
}
