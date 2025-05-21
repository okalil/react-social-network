import { toast } from "sonner";
import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "../shared/shared";
import { deletePost } from "../../data/post";
import styles from "./delete-post.module.css";

interface DeletePostProps {
  postId: number;
  onClose(): void;
}
export function DeletePost({ postId, onClose }: DeletePostProps) {
  const queryClient = useQueryClient();
  const [pending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        await deletePost(postId);
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Successfully deleted!");
        onClose();
      } catch {
        toast.error("Sorry, an error happened. Try again later.");
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onDelete();
      }}
    >
      <h4 className={styles.deletePostTitle}>
        Are you sure you want to delete this item?
      </h4>
      <div className={styles.deletePostActions}>
        <Button type="button" data-variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button data-variant="danger" loading={pending}>
          Delete
        </Button>
      </div>
    </form>
  );
}
