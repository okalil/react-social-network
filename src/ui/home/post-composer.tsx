import { useState, useTransition } from "react";
import { Field, Textarea, Input, Button } from "../shared/shared";
import styles from "./post-composer.module.css";
import { createPost } from "../../data/post";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function PostComposer() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>();
  const [pending, startTransition] = useTransition();

  const title = formData?.get("title")?.toString();
  const content = formData?.get("content")?.toString();

  return (
    <form
      className={styles.composerContainer}
      onChange={(e) => setFormData(new FormData(e.currentTarget))}
      onSubmit={(e) => {
        e.preventDefault();

        if (!title || !content) return alert("Fill all fields");

        const form = e.currentTarget;
        startTransition(async () => {
          try {
            await createPost(title, content);
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Post successfully created!");

            // Resets form state
            form.reset();
            setFormData(undefined);

            // Invalidate the posts cache
          } catch (error) {
            console.error(error);
            alert("Sorry, some unexpected error happened. Try again later.");
          }
        });
      }}
    >
      <h2 className={styles.composerTitle}>What's on your mind?</h2>

      <Field>
        <label htmlFor="title">Title</label>
        <Input id="title" name="title" placeholder="Hello world" />
      </Field>
      <Field>
        <label htmlFor="content">Content</label>
        <Textarea id="content" name="content" placeholder="Content here" />
      </Field>

      <Button
        loading={pending}
        disabled={!title || !content}
        className={styles.composerButton}
      >
        Create
      </Button>
    </form>
  );
}
