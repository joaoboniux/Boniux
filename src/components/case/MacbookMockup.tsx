import Image from "next/image";

const ASSETS = "/devices/macbook";

type MacbookMockupProps = {
  screen: string;
  alt: string;
  className?: string;
};

// Proporções do frame "Devices / MacBook Pro" (915×527) do Figma.
export default function MacbookMockup({ screen, alt, className = "" }: MacbookMockupProps) {
  return (
    <div className={`relative aspect-[915/527] ${className}`}>
      <div className="absolute inset-[97.93%_4.23%_0.35%_4.28%]" aria-hidden="true">
        <div className="absolute inset-[-164.8%_-1.79%]">
          <Image src={`${ASSETS}/shadow.svg`} alt="" fill />
        </div>
      </div>

      <div className="absolute inset-[0_9.5%_3.45%_9.5%]" aria-hidden="true">
        <div className="absolute inset-[-0.39%_-0.54%_-1.18%_-0.54%]">
          <Image src={`${ASSETS}/casing.svg`} alt="" fill />
        </div>
      </div>
      <div className="absolute inset-[0.35%_9.7%_3.8%_9.7%]" aria-hidden="true">
        <Image src={`${ASSETS}/rubber.svg`} alt="" fill />
      </div>
      <div className="absolute inset-[0.69%_9.9%_4.15%_9.9%]" aria-hidden="true">
        <Image src={`${ASSETS}/border.svg`} alt="" fill />
      </div>
      <div className="absolute inset-[91.28%_9.9%_6.13%_9.9%] bg-[#262c2d]" aria-hidden="true" />

      <div className="absolute left-[11.585%] top-[5.693%] h-[83.42%] w-[76.83%] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[112.37%]">
          <Image
            src={screen}
            alt={alt}
            fill
            sizes="(min-width: 768px) 45vw, 70vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="absolute inset-[2.94%_49.73%_96.11%_49.73%]" aria-hidden="true">
        <Image src={`${ASSETS}/camera.svg`} alt="" fill />
      </div>

      <div className="absolute inset-[93.87%_0_1.04%_0]" aria-hidden="true">
        <Image src={`${ASSETS}/bottom-gray.svg`} alt="" fill />
      </div>
      <div className="absolute inset-[93.87%_0_1.04%_0]" aria-hidden="true">
        <Image src={`${ASSETS}/bottom-silver.svg`} alt="" fill />
      </div>
    </div>
  );
}
