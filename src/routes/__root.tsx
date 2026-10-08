import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://aisistema.net";
const SITE_TITLE = "Sistema de gestión para PyMEs argentinas | AISistema";
const SITE_DESC =
  "Ventas, stock, facturación electrónica ARCA, clientes y reportes en un solo sistema web, multi-sucursal. Implementación personal, sin intermediarios.";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AISistema",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "claudio@aisistema.net",
  founder: { "@type": "Person", name: "Claudio Pascuarelli" },
  sameAs: ["https://www.linkedin.com/in/claudio-pascuarelli-8b413570/"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AR",
      availableLanguage: ["Spanish"],
    },
  ],
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AIGestión",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: SITE_DESC,
  publisher: { "@type": "Organization", name: "AISistema", url: SITE_URL },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscás no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">No pudimos cargar esta página</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo salió mal. Probá refrescar o volvé al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "author", content: "Claudio Pascuarelli" },
      { name: "theme-color", content: "#0c2340" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_AR" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(SOFTWARE_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Google Analytics 4 */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-1QQPX6H5NN" />
                <script
                            dangerouslySetInnerHTML={{
                                          __html: `
                                                        window.dataLayer = window.dataLayer || [];
                                                                      function gtag(){dataLayer.push(arguments);}
                                                                                    gtag('js', new Date());
                                                                                                  gtag('config', 'G-1QQPX6H5NN');
                                                                                                              `,
                            }}
                          />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
