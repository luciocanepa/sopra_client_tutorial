import styles from "./CustomCardComponent.module.scss";

export default function CustomCardComponent(
  { header, body, footer }: {
    header: React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
  },
) {
  return (
    <div className={styles.customCard}>
      <div className={styles.customCard_header}>
        {header}
      </div>
      <div className={styles.customCard_body}>
        {body}
      </div>
      <div className={styles.customCard_footer}>
        {footer}
      </div>
    </div>
  );
}
