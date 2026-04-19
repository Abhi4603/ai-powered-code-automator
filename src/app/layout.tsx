import type { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>AI PR Pipeline</title>
      </Head>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <Link href="/hello">
                Hello
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;