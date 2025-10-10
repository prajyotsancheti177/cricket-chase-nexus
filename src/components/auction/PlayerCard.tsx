import { Player } from "@/types/auction";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import placeholderImage from "@/assets/player-placeholder.jpg";

interface PlayerCardProps {
  player: Player;
  isAnimated?: boolean;
  isSold?: boolean;
  className?: string;
}

export const PlayerCard = ({ player, isAnimated, isSold, className }: PlayerCardProps) => {
  const formatPrice = (price: number) => {
    return `₹${(price / 100000).toFixed(1)}L`;
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border-2 border-border shadow-elevated transition-all",
        isAnimated && "animate-pop-in",
        isSold && "animate-celebrate",
        className
      )}
    >
      {/* Player Image */}
      <div className="relative h-48 md:h-80 overflow-hidden">
        <img
          src={placeholderImage}
          alt={player.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Skill Badge */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4">
          <Badge
            variant={
              player.skill === "All-Rounder"
                ? "default"
                : player.skill === "Batsman"
                ? "secondary"
                : "outline"
            }
            className="text-xs md:text-sm font-bold shadow-lg"
          >
            {player.skill}
          </Badge>
        </div>

        {/* Status Badge */}
        {player.status === "Sold" && (
          <div className="absolute top-2 md:top-4 left-2 md:left-4">
            <Badge className="bg-accent text-accent-foreground font-bold shadow-lg text-xs md:text-sm">
              SOLD
            </Badge>
          </div>
        )}
      </div>

      {/* Player Details */}
      <div className="p-3 md:p-6 space-y-2 md:space-y-4">
        <h3 className="text-2xl md:text-6xl font-black text-foreground text-center">{player.name}</h3>

        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-1">Base Price</p>
            <p className="text-sm md:text-lg font-bold text-foreground">
              {formatPrice(player.basePrice)}
            </p>
          </div>

          {player.soldPrice && (
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Sold Price</p>
              <p className="text-sm md:text-lg font-bold text-secondary">
                {formatPrice(player.soldPrice)}
              </p>
            </div>
          )}
        </div>

        {player.teamId && (
          <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-border">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">Team</p>
            <p className="text-sm md:text-lg font-bold text-accent">{player.teamId}</p>
          </div>
        )}
      </div>
    </div>
  );
};
