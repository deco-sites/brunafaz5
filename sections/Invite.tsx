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
export default function RobloxInvite({
  backgroundImage = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326",
  coverImage = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  daughterImage = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
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
}: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap');
      `}}/>
      <div 
        class="min-h-screen w-full bg-repeat overflow-y-auto relative flex flex-col items-center justify-center p-4"
        style={{ backgroundImage: `url(${backgroundImage})`, fontFamily: "'Chewy', cursive" }}
      >
        <div class="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
          <div class="relative mb-24">
            <img src={coverImage} alt="Roblox characters" class="w-full h-auto rounded-lg"/>
            <div class="absolute left-1/2 transform -translate-x-1/2 translate-y-1/3 bottom-0">
              <div class="w-64 h-64 rounded-full overflow-hidden border-8" style={{borderColor: primaryColor}}>
                <img src={daughterImage} alt="Daughter's picture" class="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <h1 style={{color: secondaryColor}} class="text-4xl">ROBLOX</h1>
            <p style={{color: primaryColor}} class="text-2xl">{inviteText}</p>
            <h2 style={{color: primaryColor}} class="text-5xl">{name}</h2>
            <div style={{backgroundColor: accentColor}} class="text-white py-2 px-4 rounded-full inline-block">
              <span class="text-3xl">{age} ANOS</span>
            </div>
            <div class="space-y-2">
              <p style={{color: secondaryColor}}>DATA: <span style={{color: primaryColor}}>{date}</span></p>
              <p style={{color: secondaryColor}}>LOCAL: 
                <a href={mapLink} target="_blank" rel="noopener noreferrer" class="block">
                  <span style={{color: primaryColor}}>{location}</span>
                </a>
              </p>
              <p style={{color: secondaryColor}}>HORÁRIO: <span style={{color: primaryColor}}>{time}</span></p>
            </div>
            <p style={{color: accentColor}} class="text-xl">Esperamos você!</p>
          </div>
        </div>
      </div>
    </>
  );
}
