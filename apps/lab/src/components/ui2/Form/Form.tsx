import React from "react";
import styles from "./Form.module.scss";

function FormHeader({ title, children }: any) {
  return (
    <header className={styles.FormHeader}>
      <h3 className={styles.title}>{title}</h3>
    </header>
  );
}

function FormBody({ children }) {
  return <main className={styles.FormBody}>{children}</main>;
}

function FormFooter({ children }) {
  return <footer className={styles.FormFooter}>{children}</footer>;
}

export function Form({ handleSubmit, children, name }) {
  return (
    <form id={name} name={name} className={styles.Form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

Form.Header = FormHeader;
Form.Body = FormBody;
Form.Footer = FormFooter;
