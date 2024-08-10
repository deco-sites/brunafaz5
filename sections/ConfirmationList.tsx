import { SectionProps } from "deco/mod.ts";
import { AppContext } from "site/apps/site.ts";

interface Props {
  /**
   * @description The description of name.
   */
  name?: string;
}

export const loader = async (_: unknown, _req: Request, ctx: AppContext) => {
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
                <th>Nome</th>
                <th>Confirmado</th>
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
                      disabled
                    />
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
