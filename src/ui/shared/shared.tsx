import styles from "./shared.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
  loading?: boolean;
}

export function Button({ loading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={
        props.className
          ? [styles.button, props.className].join(" ")
          : styles.button
      }
    >
      {loading ? <span className={styles.buttonSpinner} /> : props.children}
    </button>
  );
}

export function Field(props: React.ComponentProps<"div">) {
  return <div {...props} className={styles.field} />;
}

export function Input(props: React.ComponentProps<"input">) {
  return <input {...props} className={styles.input} />;
}

export function Textarea(props: React.ComponentProps<"textarea">) {
  return <textarea {...props} className={styles.input} rows={4} />;
}

interface ModalProps extends React.PropsWithChildren {
  visible: boolean;
  onClose(): void;
}
export function Modal({ visible, onClose, children }: ModalProps) {
  if (!visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
