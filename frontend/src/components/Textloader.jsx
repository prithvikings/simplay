import { TextLoop } from "./ui/text-loop";

export function TextLoopBasic() {
  return (
    <div className="flex flex-col items-center justify-center">
      <TextLoop
        className="font-spacegrotesk font-semibold text-lg dark:text-zinc-700"
        shuffle={true}
      >
        {/* --- The Classics --- */}
        <span>Control Uday Control</span>
        <span>Utha le re deva utha le</span>
        <span>Abhi maza aayega na bhidu</span>
        <span>Seh lenge thoda</span>
        <span>Jal Lijiye, thak gaye honge</span>

        {/* --- The Viral Ones --- */}
        <span>Aayein?</span>
        <span>Baingan</span>
        <span>Chin Tapak Dam Dam</span>
        <span>Naam bataye? Bhupendra Jogi</span>
        <span>Gaddari Karbe</span>
        <span>Chhoti bachi ho kya?</span>

        {/* --- The Dhamaal/Welcome Logic --- */}
        <span>Sheetal To Sheetal hai</span>
        <span>Aditi hi Sheetal hai</span>
        <span>Par Aditi Nisha Hai</span>
        <span>Nisha Munni hai</span>
        <span>Aur wo laal button dikh raha hai?</span>

        {/* --- Shark Tank --- */}
        <span>Ye sab doglapan hai</span>
        <span>Kya karu main mar jaun?</span>
        <span>Hum bhi bana lenge</span>
      </TextLoop>
    </div>
  );
}
