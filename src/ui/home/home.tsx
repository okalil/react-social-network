import styles from "./home.module.css";
import { PostComposer } from "./post-composer";
import { PostsList } from "./posts-list";

export function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Codelap Network</h1>
      </header>
      <div className={styles.feedContainer}>
        <PostComposer />
        <PostsList />
      </div>
    </div>
  );
}
