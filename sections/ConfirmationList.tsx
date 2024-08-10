import { useSection } from "deco/hooks/useSection.ts";
import { SectionProps } from "deco/mod.ts";
import { AppContext } from "site/apps/site.ts";

export const loader = async (
  { toggle, accepted, remove }: {
    remove?: string;
    toggle?: string;
    accepted?: boolean;
  },
  _req: Request,
  ctx: AppContext,
) => {
  if (toggle) {
    accepted
      ? await ctx.invoke.site.actions.invites.confirm({ code: toggle })
      : await ctx.invoke.site.actions.invites.unconfirm({ code: toggle });
  }
  if (remove) {
    await ctx.invoke.site.actions.invites.uninvite({ code: remove });
  }
  return {
    confirmations: await ctx.invoke.site.loaders.invites.list(),
  };
};

export default function Section(
  { confirmations }: SectionProps<typeof loader>,
) {
  let totalAccepted = 0;
  const cnfs = Object.entries(confirmations).map(([code, accepted], id) => {
    accepted && totalAccepted++;
    return {
      id,
      code,
      accepted,
    };
  });
  return (
    <div>
      <div class="container mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4">
          Convites {totalAccepted}/{cnfs.length}
        </h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Código</th>
                <th>Confirmado</th>
                <th>Desconvidar</th>
              </tr>
            </thead>
            <tbody>
              {cnfs.map((confirmation) => (
                <tr key={confirmation.id}>
                  <td>{confirmation.code}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={confirmation.accepted}
                      class="checkbox"
                      hx-trigger="change"
                      hx-swap="outerHTML"
                      hx-target="closest section"
                      hx-post={useSection({
                        props: {
                          toggle: confirmation.code,
                          accepted: !confirmation.accepted,
                        },
                      })}
                    />
                  </td>
                  <td>
                    <a
                      class="btn btn-primary"
                      hx-swap="outerHTML"
                      hx-target="closest section"
                      hx-post={useSection({
                        props: {
                          remove: confirmation.code,
                        },
                      })}
                    >
                      &#10006;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
