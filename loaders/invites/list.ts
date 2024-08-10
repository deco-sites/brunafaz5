import { Invites } from "site/storage/invites.ts";

export default function list() {
  return Invites.list();
}
