import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @description Background image for the entire site
   */
  backgroundImage?: ImageWidget;
  /**
   * @description Cover image to be displayed above the background
   */
  coverImage?: ImageWidget;
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
  age?: number;
  /**
   * @description Location of the event
   */
  location?: string;
  /**
   * @description Date of the event
   */
  date?: string;
  /**
   * @description Time of the event
   */
  time?: string;
  /**
   * @description Font family for the invite
   * @default "Comic Sans MS, cursive"
   */
  fontFamily?: string;
}
export default function RobloxInvite({
  backgroundImage = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326",
  coverImage = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  inviteText = "Venha comemorar comigo!",
  name = "BRUNA",
  age = 9,
  location = "PULA PIRULA",
  date = "12 OUTUBRO",
  time = "17:30 ÀS 21:30",
  fontFamily = "Comic Sans MS, cursive"
}: Props) {
  return (
    <div class="min-h-screen w-full bg-repeat overflow-y-auto relative flex flex-col items-center justify-center p-4"
         style={{ backgroundImage: `url(${backgroundImage})`, fontFamily }}>
      <div class="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <img src={coverImage} alt="Roblox characters" class="w-full h-auto mb-4 rounded-lg"/>
        <div class="space-y-4">
          <h1 class="text-blue-500 text-4xl font-bold">ROBLOX</h1>
          <p class="text-pink-500 text-2xl font-semibold">{inviteText}</p>
          <h2 class="text-pink-500 text-5xl font-bold">{name}</h2>
          <div class="bg-blue-500 text-white py-2 px-4 rounded-full inline-block">
            <span class="text-3xl font-bold">{age} ANOS</span>
          </div>
          <div class="space-y-2">
            <p class="text-blue-500 font-bold">DATA: <span class="text-pink-500">{date}</span></p>
            <p class="text-blue-500 font-bold">LOCAL: <span class="text-pink-500">{location}</span></p>
            <p class="text-blue-500 font-bold">HORÁRIO: <span class="text-pink-500">{time}</span></p>
          </div>
          <p class="text-pink-500 text-xl font-semibold">Esperamos você!</p>
        </div>
      </div>
    </div>
  );
}
