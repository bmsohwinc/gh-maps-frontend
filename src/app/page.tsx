"use client"

import styles from "./page.module.css";
import App from "./App";
import { enableMapSet } from 'immer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

enableMapSet();

export default function Home() {
  return (
    <main className={styles.main}>
        <App />
    </main>
  );
}
