import { Invites } from "site/storage/invites.ts";

export default async function ({ code }: { code: string }) {
  await Invites.uninvite(code);
}
