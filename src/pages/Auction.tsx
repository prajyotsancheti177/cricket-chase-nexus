import { useState } from "react";
import { mockPlayers, mockTeams } from "@/data/mockData";
import { PlayerCard } from "@/components/auction/PlayerCard";
import { SoldCelebration } from "@/components/auction/SoldCelebration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gavel, Plus, Minus } from "lucide-react";
import stadiumBg from "@/assets/stadium-bg.jpg";

const Auction = () => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(mockPlayers[0].basePrice);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentPlayer = mockPlayers[currentPlayerIndex];
  const bidIncrement = 500000;

  const handleBidIncrease = () => {
    setCurrentBid(prev => prev + bidIncrement);
  };

  const handleBidDecrease = () => {
    if (currentBid > currentPlayer.basePrice) {
      setCurrentBid(prev => prev - bidIncrement);
    }
  };

  const handleSold = () => {
    if (selectedTeam) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        // Move to next player
        if (currentPlayerIndex < mockPlayers.length - 1) {
          setCurrentPlayerIndex(prev => prev + 1);
          setCurrentBid(mockPlayers[currentPlayerIndex + 1].basePrice);
          setSelectedTeam(null);
        }
      }, 4000);
    }
  };

  const handleUnsold = () => {
    if (currentPlayerIndex < mockPlayers.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setCurrentBid(mockPlayers[currentPlayerIndex + 1].basePrice);
      setSelectedTeam(null);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${stadiumBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-dark" />

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full bg-card border-2 border-primary shadow-glow">
            <Gavel className="h-6 w-6 text-primary animate-glow-pulse" />
            <span className="text-xl font-bold text-foreground">Live Auction</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent">
            Player #{currentPlayerIndex + 1}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Player Card */}
          <div className="flex items-center justify-center animate-scale-in">
            <PlayerCard player={currentPlayer} isAnimated className="max-w-md w-full" />
          </div>

          {/* Auction Controls */}
          <div className="space-y-6 animate-slide-up">
            {/* Current Bid */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Current Bid</h2>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-secondary mb-2">
                  ₹{(currentBid / 100000).toFixed(1)}L
                </div>
                <p className="text-sm text-muted-foreground">
                  Base Price: ₹{(currentPlayer.basePrice / 100000).toFixed(1)}L
                </p>
              </div>

              <div className="flex gap-4 mb-6">
                <Button
                  onClick={handleBidDecrease}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={currentBid <= currentPlayer.basePrice}
                >
                  <Minus className="h-5 w-5 mr-2" />
                  Decrease
                </Button>
                <Button
                  onClick={handleBidIncrease}
                  variant="default"
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Increase
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Increment: ₹{(bidIncrement / 100000).toFixed(1)}L
              </p>
            </Card>

            {/* Team Selection */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Select Team</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {mockTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeam(team.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTeam === team.id
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{team.logo}</div>
                    <p className="font-bold text-sm text-foreground">{team.name}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleUnsold}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Unsold
                </Button>
                <Button
                  onClick={handleSold}
                  disabled={!selectedTeam}
                  size="lg"
                  className="flex-1 bg-gradient-accent hover:opacity-90"
                >
                  Sold!
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Celebration */}
      <SoldCelebration
        show={showCelebration}
        playerName={currentPlayer.name}
        teamName={mockTeams.find(t => t.id === selectedTeam)?.name || ""}
        amount={currentBid}
      />
    </div>
  );
};

export default Auction;
