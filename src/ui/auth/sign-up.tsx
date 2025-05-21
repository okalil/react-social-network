import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router";

import { createUser } from "../../data/user";
import { Button, Field, Input } from "../shared/shared";
import styles from "./sign-up.module.css";

export function SignUp() {
  const [pending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.signUpContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          startTransition(async () => {
            await createUser(username);
            toast.success("Successfully created user!");
            navigate("/");
          });
        }}
        className={styles.signUpForm}
      >
        <h2 className={styles.signUpTitle}>Welcome to CodeLeap network!</h2>
        <Field>
          <label>Please enter your username</label>
          <Input
            placeholder="John Due"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Button
          loading={pending}
          className={styles.signUpButton}
          disabled={!username}
        >
          Enter
        </Button>
      </form>
    </div>
  );
}
