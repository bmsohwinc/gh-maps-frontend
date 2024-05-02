"use client"

import styles from "./page.module.css";
import App from "./App";
import { enableMapSet } from 'immer';

enableMapSet();

export default function Home() {
  return (
    <main className={styles.main}>
        <App />
    </main>
  );
}
