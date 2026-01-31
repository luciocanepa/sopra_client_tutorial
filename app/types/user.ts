export interface User {
  id: number;
  name: string | null;
  username: string;
  token: string;
  status: "ONLINE" | "OFFLINE";
  bio: string | null;
  creationDate: string;
}
