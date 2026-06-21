export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} NextStarter. MIT License.</span>
        <div className="flex gap-4">
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Next.js
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            shadcn/ui
          </a>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Tailwind
          </a>
        </div>
      </div>
    </footer>
  );
}
