import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Field, Input, Textarea } from "../shared/shared";
import { updatePost, type Post } from "../../data/post";
import styles from "./edit-post.module.css";

interface EditPostProps {
  post: Post;
  onClose(): void;
}
export function EditPost({ post, onClose }: EditPostProps) {
  const queryClient = useQueryClient();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!title || !content) return;

        startTransition(async () => {
          try {
            await updatePost(post.id, title, content);
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Successfully updated!");
            onClose();
          } catch {
            toast.error("Sorry, an error happened. Try again later.");
          }
        });
      }}
      className={styles.editPostForm}
    >
      <h4 className={styles.editPostTitle}>Edit item</h4>

      <Field>
        <label htmlFor="edit_title">Title</label>
        <Input
          id="edit_title"
          name="title"
          placeholder="Hello world"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </Field>
      <Field>
        <label htmlFor="edit_content">Content</label>
        <Textarea
          id="edit_content"
          name="content"
          placeholder="Content here"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </Field>

      <div className={styles.editPostActions}>
        <Button type="button" data-variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          data-variant="success"
          loading={pending}
          disabled={!title || !content}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
