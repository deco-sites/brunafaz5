let kv: Deno.Kv | null = null;
try {
    kv = await Deno.openKv();
} catch {
    console.error("KV storage is not available");
}
const INVITES = ["invites"];
export const Invites = {
    new: async (code: string) => {
        if (!kv) {
            return;
        }
        const current = await kv.get(INVITES);
        const op = kv.atomic().check(current).set(INVITES, {
            [code]: false,
            ...current.value ?? {},
        });
        await op.commit();
    },
    confirm: async (code: string) => {
        if (!kv) {
            return;
        }
        const current = await kv.get(INVITES);
        const op = kv.atomic().check(current).set(INVITES, {
            ...current.value ?? {},
            [code]: true,
        });
        await op.commit();
    },
    unconfirm: async (code: string) => {
        if (!kv) {
            return;
        }
        const current = await kv.get(INVITES);
        const op = kv.atomic().check(current).set(INVITES, {
            ...current.value ?? {},
            [code]: false,
        });
        await op.commit();
    },
    list: async (): Promise<Record<string, boolean>> => {
        if (!kv) {
            return {};
        }
        const current = await kv.get<Record<string, boolean>>(INVITES);
        return current.value ?? {} as Record<string, boolean>;
    },
};
