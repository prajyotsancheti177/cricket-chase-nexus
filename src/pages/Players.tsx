import { useState } from "react";
import { mockPlayers } from "@/data/mockData";
import { PlayerCard } from "@/components/auction/PlayerCard";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { PlayerStatus } from "@/types/auction";

const Players = () => {
  const [filter, setFilter] = useState<PlayerStatus | "All">("All");

  const filteredPlayers = filter === "All" 
    ? mockPlayers 
    : mockPlayers.filter(p => p.status === filter);

  const soldCount = mockPlayers.filter(p => p.status === "Sold").length;
  const unsoldCount = mockPlayers.filter(p => p.status === "Unsold").length;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-2 md:px-4 py-6 md:py-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4 px-3 md:px-6 py-2 md:py-3 rounded-full bg-card border-2 border-primary shadow-glow">
            <Users className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            <span className="text-sm md:text-xl font-bold text-foreground">Player Registry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 md:mb-4">
            All Players
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground mb-4 md:mb-8">
            {mockPlayers.length} registered players
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 md:gap-8 mb-4 md:mb-8">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-accent">{soldCount}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Sold</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-destructive">{unsoldCount}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Unsold</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 md:gap-4">
            <Button
              variant={filter === "All" ? "default" : "outline"}
              onClick={() => setFilter("All")}
              className={`text-xs md:text-base ${filter === "All" ? "bg-gradient-primary" : ""}`}
              size="sm"
            >
              All ({mockPlayers.length})
            </Button>
            <Button
              variant={filter === "Sold" ? "default" : "outline"}
              onClick={() => setFilter("Sold")}
              className={`text-xs md:text-base ${filter === "Sold" ? "bg-gradient-accent" : ""}`}
              size="sm"
            >
              Sold ({soldCount})
            </Button>
            <Button
              variant={filter === "Unsold" ? "default" : "outline"}
              onClick={() => setFilter("Unsold")}
              className={`text-xs md:text-base ${filter === "Unsold" ? "bg-gradient-secondary" : ""}`}
              size="sm"
            >
              Unsold ({unsoldCount})
            </Button>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredPlayers.map((player, index) => (
            <div
              key={player.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PlayerCard player={player} />
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">No players found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
