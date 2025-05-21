import axios from "axios";
import { getUsername } from "./user";

const api = axios.create({
  baseURL: "https://dev.codeleap.co.uk",
  headers: { "Content-Type": "application/json" },
});

export async function getPosts() {
  const username = getUsername();
  const res = await api.get<PostsResponse>("/careers/");
  return {
    ...res.data,
    results: res.data.results.map<Post>((it) => ({
      ...it,
      is_author: it.username === username,
    })),
  };
}
export interface PostsResponse {
  count: number;
  results: {
    id: number;
    username: string;
    created_datetime: string;
    title: string;
    content: string;
  }[];
}
export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
  is_author: boolean;
}

export async function createPost(title: string, content: string) {
  const username = getUsername();
  await api.post("/careers/", {
    username,
    title,
    content,
  });
}

export async function updatePost(id: number, title: string, content: string) {
  await api.patch(`/careers/${id}/`, {
    title,
    content,
  });
}

export async function deletePost(id: number) {
  await api.delete(`/careers/${id}/`);
}
