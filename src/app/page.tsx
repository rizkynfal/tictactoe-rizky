import { CatFace } from "@/components/cat-face";
import { Game } from "@/components/game";

export default function Home() {
  return (
    <main className="paw-bg flex min-h-dvh flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-5xl">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex items-end gap-2">
            <div className="h-14 w-14 -rotate-6 sm:h-16 sm:w-16">
              <CatFace player="boni" />
            </div>
            <span className="pb-3 text-lg font-black text-muted-foreground">vs</span>
            <div className="h-14 w-14 rotate-6 sm:h-16 sm:w-16">
              <CatFace player="beni" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            <span className="text-boni-ink">Boni</span> vs <span className="text-beni-ink">Beni</span>
          </h1>
          <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
            Two cats, one board. Get three paws in a row to win.
          </p>
        </header>

        <Game />

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Built with React 19, Next.js 16, Tailwind CSS and shadcn/ui · by{" "}
          <a
            href="https://rizkynfal.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-foreground"
          >
            Rizky
          </a>
        </footer>
      </div>
    </main>
  );
}
