import MiloImage from "../public/Milo2.png";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#f38524]">
      <Image
        src={MiloImage}
        width={500}
        height={500}
        alt="Milo artwork carrying a bull"
      />
      <p style={{ color: "black" }}>
        Milo, named after a legendary figure from ancient Croton, embodies the
        essence of gradual strength development. In his village, a baby bull was
        born, sparking Milo's idea of lifting it daily to build strength. Over
        four years, Milo carried the calf around, matching its growth with his
        own increasing strength. As the bull matured, Milo's persistent efforts
        allowed him to bear its weight effortlessly, showcasing the power of
        consistent training and progression. Thus, Milo serves as a reminder
        that strength is built over time, through dedication and perseverance.
      </p>
    </main>
  );
}
