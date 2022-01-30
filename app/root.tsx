import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { LinksFunction, LoaderFunction } from "remix";
import { isAuthenticated } from "./lib/auth";
import appStyleUrl from "~/styles/app.css";

export let links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "//fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    { rel: "stylesheet", href: appStyleUrl },
    {
      rel: "stylesheet",
      href: "//fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&amp;lang=en",
    },
  ];
};

export default function App() {
  const data = useLoaderData();
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export let loader: LoaderFunction = async ({ request }) => {
  const isAuth = await isAuthenticated(request);
  return {
    isAuthorized: isAuth,
  };
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const data = useLoaderData();

  return (
    <html lang="en" data-theme="cupcake">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {data && data.ENV && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
        )}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const renderMessage = React.useMemo(() => {
    switch (caught.status) {
      case 401:
        return "Oops! Looks like you tried to visit a page that you do not have access to.";
      case 404:
        return "Oops! Looks like you tried to visit a page that does not exist.";
      default:
        throw new Error(caught.data || caught.statusText);
    }
  }, []);

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      <p>{renderMessage}</p>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <div>
        <h1>There was an error</h1>
        <p>{error.message}</p>
      </div>
    </Document>
  );
}
