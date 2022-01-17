import * as React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';
import type { LinksFunction, LoaderFunction } from 'remix';
import appStyleUrl from '~/styles/app.css';
import Layout from './components/Layout';
import { isAuthenticated } from './lib/auth';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme_colors } from './styles/theme_styles/colors';
import Nav from './components/Nav/Nav';

const theme = extendTheme({ colors: theme_colors });

export let links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: '//fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    { rel: 'stylesheet', href: appStyleUrl },
    {
      rel: 'stylesheet',
      href: '//fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&amp;lang=en',
    },
  ];
};

export default function App() {
  const data = useLoaderData();
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Nav isLoggedIn={data.isAuthorized} />
        <Layout>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </Document>
  );
}

export let loader: LoaderFunction = async ({ request }) => {
  const isAuth = await isAuthenticated(request);
  return {
    ENV: {
      SB_URL: process?.env?.SB_URL,
      SB_ANON_KEY: process?.env?.SB_ANON_KEY,
    },
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
    <html lang="en">
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
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const renderMessage = React.useMemo(() => {
    switch (caught.status) {
      case 401:
        return 'Oops! Looks like you tried to visit a page that you do not have access to.';
      case 404:
        return 'Oops! Looks like you tried to visit a page that does not exist.';
      default:
        throw new Error(caught.data || caught.statusText);
    }
  }, []);

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        <p>{renderMessage}</p>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ChakraProvider>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
        </div>
      </ChakraProvider>
    </Document>
  );
}
