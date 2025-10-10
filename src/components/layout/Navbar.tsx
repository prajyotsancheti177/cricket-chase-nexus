import { Link, useLocation } from "react-router-dom";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { path: "/", label: "Live Auction" },
  { path: "/teams", label: "All Teams" },
  { path: "/players", label: "Players" },
  { path: "/upload", label: "Upload Players" },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex h-14 md:h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-1 md:gap-2 group">
            <div className="rounded-lg bg-gradient-primary p-1.5 md:p-2 shadow-glow transition-all group-hover:scale-110">
              <Trophy className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <span className="text-sm md:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cricket Auction
            </span>
          </Link>

          <div className="flex gap-0.5 md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-base font-medium transition-all",
                  location.pathname === link.path
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
