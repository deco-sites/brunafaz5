import { Invites } from "site/storage/invites.ts";

export default function unconfirm({ code }: { code: string }) {
    return Invites.unconfirm(code);
}
