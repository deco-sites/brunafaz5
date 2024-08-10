const kv = await Deno.openKv();
const INVITES = ["invites"];
export const Invites = {
    new: async (code: string) => {
        const current = await kv.get(INVITES);
        const op = kv.atomic().check(current).set(INVITES, {
            [code]: false,
            ...current.value ?? {},
        });
        await op.commit();
    },
    confirm: async (code: string) => {
        const current = await kv.get(INVITES);
        const op = kv.atomic().check(current).set(INVITES, {
            ...current.value ?? {},
            [code]: true,
        });
        await op.commit();
    },
    list: async (): Promise<Record<string, boolean>> => {
        const current = await kv.get<Record<string, boolean>>(INVITES);
        return current.value ?? {} as Record<string, boolean>;
    },
};
