export async function createUser(username: string) {
  await new Promise((r) => setTimeout(r, 500)); // simulate network delay
  sessionStorage.setItem("username", username);
}

export function getUsername() {
  return sessionStorage.getItem("username");
}
