import { PlusIcon } from "lucide-react";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div">;

function cn(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4 border-white/10",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-white/10" />

      <LogoCard
        className="relative border-r border-b border-white/10 bg-zinc-900/20"
        logo={{
          src: "/Baciraro cap.png",
          alt: "Baciraro Logo",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-zinc-500"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-white/10 md:border-r"
        logo={{
          src: "/Logo (1).png",
          alt: "Partner Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-white/10 bg-zinc-900/20"
        logo={{
          src: "/Logo Kemenbud.png",
          alt: "Logo Kemenbud",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-zinc-500"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block text-zinc-500"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b border-white/10 bg-zinc-900/20 md:bg-zinc-950/20"
        logo={{
          src: "/Baciraro cap.png",
          alt: "Baciraro Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-white/10 bg-zinc-900/20 md:border-b-0 md:bg-zinc-950/20"
        logo={{
          src: "/Logo (1).png",
          alt: "Partner Logo 2",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 text-zinc-500 md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-white/10 bg-zinc-950/20 md:border-r md:border-b-0 md:bg-zinc-900/20"
        logo={{
          src: "/Logo Kemenbud.png",
          alt: "Logo Kemenbud 2",
        }}
      />

      <LogoCard
        className="border-r border-white/10 bg-zinc-950/20"
        logo={{
          src: "/Baciraro cap.png",
          alt: "Baciraro Logo 3",
        }}
      />

      <LogoCard
        className="bg-zinc-900/20"
        logo={{
          src: "/Logo Kemenbud.png",
          alt: "Logo Kemenbud 3",
        }}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-white/10" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-zinc-950/40 px-4 py-8 md:p-8 hover:bg-zinc-900/10 transition-all duration-300",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-10 select-none md:h-12 object-contain opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
        height={logo.height || 48}
        src={logo.src}
        width={logo.width || 120}
      />
      {children}
    </div>
  );
}
