import { ImageWidget } from "apps/admin/widgets.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { SectionProps } from "deco/mod.ts";
import { asset } from "https://deno.land/x/fresh@1.6.8/runtime.ts";
import { AppContext } from "site/apps/site.ts";
interface Props {
  /**
   * @hide true
   */
  confirm?: boolean;
  /**
   * @description Background image for the entire site
   */
  backgroundImage?: ImageWidget;
  /**
   * @description Cover image to be displayed above the background
   */
  coverImage?: ImageWidget;
  /**
   * @description Daughter's picture to be displayed below the cover image
   */
  daughterImage?: ImageWidget;
  /**
   * @description Invite text to be displayed below the cover image
   * @format rich-text
   */
  inviteText?: string;
  /**
   * @description Name of the birthday person
   */
  name?: string;
  /**
   * @description Age of the birthday person
   */
  age?: string;
  /**
   * @description Location of the event
   */
  location?: string;
  /**
   * @description Google Maps link for the event location
   */
  mapLink?: string;
  /**
   * @description Date of the event
   */
  date?: string;
  /**
   * @description Time of the event
   */
  time?: string;
  /**
   * @description Primary color for the invite (Roblox Red)
   * @format color-input
   */
  primaryColor?: string;
  /**
   * @description Secondary color for the invite (Roblox Blue)
   * @format color-input
   */
  secondaryColor?: string;
  /**
   * @description Accent color for the invite (Roblox Green)
   * @format color-input
   */
  accentColor?: string;
}

function Confetti() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js">
      </script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
document.getElementById('happy').play();
document.getElementById('playful').play();

var duration = 30 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 100 * (timeLeft / duration);
  // since particles fall down, start a bit higher than random
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
}, 250);

        `,
        }}
      >
      </script>
    </>
  );
}
export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Props & { code?: string | null; confirmed: boolean }> => {
  const code = new URL(req.url).searchParams.get("code");
  if (props.confirm && code) {
    await ctx.invoke.site.actions.invites.confirm({ code });
  }
  if (!code) {
    return { ...props, confirmed: false };
  }
  const list = await ctx.invoke.site.loaders.invites.list();
  if (!(code in list)) {
    await ctx.invoke.site.actions.invites.new({ code });
    return { ...props, code, confirmed: false };
  }
  const confirmed = list[code] === true;
  return { ...props, code, confirmed };
};

export default function RobloxInvite({
  backgroundImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326",
  coverImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  daughterImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  inviteText = "Venha comemorar comigo!",
  name = "BRUNA",
  age = "09",
  location = "PULA PIRULA",
  mapLink = "https://goo.gl/maps/example",
  date = "12 OUTUBRO",
  time = "17:30 ÀS 21:30",
  primaryColor = "#FF4040",
  secondaryColor = "#00A2FF",
  accentColor = "#00FF7F",
  code,
  confirmed,
}: SectionProps<typeof loader>) {
  return (
    <>
      {confirmed && <Confetti />}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap');
      `,
        }}
      />
      <div
        class="min-h-screen w-full bg-repeat overflow-y-auto relative flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          fontFamily: "'Chewy', cursive",
        }}
      >
        <div class="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
          <div class="relative mb-24">
            <img
              src={coverImage}
              alt="Roblox characters"
              class="w-full h-auto rounded-lg"
            />
            <div class="absolute left-1/2 transform -translate-x-1/2 translate-y-1/3 bottom-0">
              <div
                class="w-64 h-64 rounded-full overflow-hidden border-8"
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={daughterImage}
                  alt="Daughter's picture"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <audio loop id="playful">
            <source
              src={asset("/playful.mp3")}
              type="audio/mpeg"
            >
            </source>
          </audio>
          <audio id="happy">
            <source
              src={asset("/happy.mp3")}
              type="audio/mpeg"
            >
            </source>
          </audio>
          <div class="space-y-4">
            <h1 style={{ color: secondaryColor }} class="text-4xl">ROBLOX</h1>
            <p style={{ color: primaryColor }} class="text-2xl">
              {inviteText}
            </p>
            <h2 style={{ color: primaryColor }} class="text-5xl">{name}</h2>
            <div
              style={{ backgroundColor: accentColor }}
              class="text-white py-2 px-4 rounded-full inline-block"
            >
              <span class="text-3xl">{age} ANOS</span>
            </div>
            <div class="space-y-2">
              <p style={{ color: secondaryColor }}>
                DATA: <span style={{ color: primaryColor }}>{date}</span>
              </p>
              <p style={{ color: secondaryColor }}>
                LOCAL:
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block"
                  style={{ textDecoration: "underline" }}
                >
                  <span style={{ color: primaryColor }}>{location}</span>
                </a>
              </p>
              <p style={{ color: secondaryColor }}>
                HORÁRIO: <span style={{ color: primaryColor }}>{time}</span>
              </p>
            </div>
            {!confirmed && (
              <>
                <p style={{ color: accentColor }} class="text-xl">
                  Esperamos você! Confirmar até o dia 25/09/2024
                </p>
              </>
            )}
            {code && !confirmed && (
              <button
                class="btn btn-primary animate-pulse relative overflow-hidden mx-auto"
                hx-post={useSection({ props: { confirm: true } })}
                hx-swap="outerHTML"
                hx-target="closest section"
                style={{
                  background:
                    `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
                }}
              >
                <div class="absolute inset-0 bg-white opacity-50 animate-ping">
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                  Confirmar presença!
                  <svg
                    class="w-6 h-6 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                </div>
              </button>
            )}
            {confirmed && (
              <>
                <span>Presença confirmada!</span>
              </>
            )}
            <p style={{ color: secondaryColor, fontSize: "10px" }}>
              * Para melhor organização está programado que cada criança poderá
              ser acompanhada por um adulto, caso precise trazer mais alguém,
              por favor avise-nos com antecedência. Agradecemos a compreensão.
            </p>
          </div>
        </div>
      </div>
      <style>
        {`
            @keyframes gradient {
               background-position: 0}
            @keyframes pulse {
              
                opacity: 1;
                transform: scale(1);
              }
                opacity: 0.8;
                transform: scale(1.05);
              }
            }
          `}
      </style>
    </>
  );
}
