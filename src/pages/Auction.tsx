import { useState } from "react";
import { mockPlayers, mockTeams } from "@/data/mockData";
import { SoldCelebration } from "@/components/auction/SoldCelebration";
import { UnsoldAnimation } from "@/components/auction/UnsoldAnimation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel } from "lucide-react";
import cricketAuctionBg from "@/assets/cricket-auction-bg.jpg";
import placeholderImage from "@/assets/player-placeholder.jpg";

const Auction = () => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(mockPlayers[0].basePrice);
  const [leadingTeam, setLeadingTeam] = useState<string | null>(null);
  const [teamBids, setTeamBids] = useState<Record<string, number>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [showUnsold, setShowUnsold] = useState(false);

  const currentPlayer = mockPlayers[currentPlayerIndex];
  const bidIncrement = 500000;

  const handleTeamBid = (teamId: string) => {
    const newBid = currentBid + bidIncrement;
    setCurrentBid(newBid);
    setLeadingTeam(teamId);
    setTeamBids(prev => ({ ...prev, [teamId]: newBid }));
  };

  const handleSold = () => {
    if (leadingTeam) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        // Move to next player
        if (currentPlayerIndex < mockPlayers.length - 1) {
          setCurrentPlayerIndex(prev => prev + 1);
          setCurrentBid(mockPlayers[currentPlayerIndex + 1].basePrice);
          setLeadingTeam(null);
          setTeamBids({});
        }
      }, 4000);
    }
  };

  const handleUnsold = () => {
    setShowUnsold(true);
    setTimeout(() => {
      setShowUnsold(false);
      // Move to next player
      if (currentPlayerIndex < mockPlayers.length - 1) {
        setCurrentPlayerIndex(prev => prev + 1);
        setCurrentBid(mockPlayers[currentPlayerIndex + 1].basePrice);
        setLeadingTeam(null);
        setTeamBids({});
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${cricketAuctionBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-dark" />

      <div className="relative container mx-auto px-2 md:px-4 py-4 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full bg-card border-2 border-primary shadow-glow">
            <Gavel className="h-4 w-4 md:h-6 md:w-6 text-primary animate-glow-pulse" />
            <span className="text-xs md:text-xl font-bold text-foreground">Live Auction - Player #{currentPlayerIndex + 1}</span>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-4xl md:text-8xl font-black text-secondary mb-1 md:mb-2">
              ₹{(currentBid / 100000).toFixed(1)}L
            </div>
            {leadingTeam && (
              <div className="text-xl md:text-4xl font-black text-primary mb-0.5 md:mb-1">
                {mockTeams.find(t => t.id === leadingTeam)?.name}
              </div>
            )}
            <p className="text-xs md:text-sm text-muted-foreground">
              Base: ₹{(currentPlayer.basePrice / 100000).toFixed(1)}L | Increment: ₹{(bidIncrement / 100000).toFixed(1)}L
            </p>
          </div>
        </div>

        <div className="space-y-3 md:space-y-6 max-w-7xl mx-auto">
          {/* Player Display */}
          <div className="flex justify-center animate-scale-in">
            <Card className="max-w-4xl w-full bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-8">
                {/* Player Photo - Smaller */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border-4 border-primary shadow-glow">
                    <img
                      src={placeholderImage}
                      alt={currentPlayer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge
                    variant={
                      currentPlayer.skill === "All-Rounder"
                        ? "default"
                        : currentPlayer.skill === "Batsman"
                        ? "secondary"
                        : "outline"
                    }
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold shadow-lg"
                  >
                    {currentPlayer.skill}
                  </Badge>
                </div>

                {/* Player Details */}
                <div className="flex-1 space-y-2 md:space-y-4 text-center md:text-left">
                  <h3 className="text-3xl md:text-6xl font-black text-foreground">{currentPlayer.name}</h3>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6">
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">Base Price</p>
                      <p className="text-lg md:text-2xl font-bold text-foreground">
                        ₹{(currentPlayer.basePrice / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Team Bidding Grid */}
          <Card className="p-2 md:p-3 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated max-w-3xl mx-auto">
            <h2 className="text-sm md:text-lg font-bold mb-2 md:mb-3 text-foreground text-center">Click on Team to Bid</h2>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-2 mb-2 md:mb-3">
              {mockTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => handleTeamBid(team.id)}
                  className={`p-1.5 md:p-2 rounded-lg border-2 transition-all ${
                    leadingTeam === team.id
                      ? "border-primary bg-primary/20 shadow-glow scale-105"
                      : "border-border hover:border-primary/50 hover:scale-105"
                  }`}
                >
                  <div className="text-lg md:text-2xl mb-0.5 md:mb-1">{team.logo}</div>
                  <p className="font-bold text-[8px] md:text-[10px] text-foreground mb-0.5">{team.name}</p>
                  {teamBids[team.id] && (
                    <p className="text-[7px] md:text-[9px] text-primary font-bold">
                      ₹{(teamBids[team.id] / 100000).toFixed(1)}L
                    </p>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-2 md:gap-3 justify-center">
              <Button
                onClick={handleUnsold}
                variant="outline"
                size="sm"
                className="px-4 md:px-8 text-xs md:text-base"
              >
                Unsold
              </Button>
              <Button
                onClick={handleSold}
                disabled={!leadingTeam}
                size="sm"
                className="px-4 md:px-8 text-xs md:text-base bg-gradient-accent hover:opacity-90"
              >
                Sold!
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Celebration */}
      <SoldCelebration
        show={showCelebration}
        playerName={currentPlayer.name}
        teamName={mockTeams.find(t => t.id === leadingTeam)?.name || ""}
        amount={currentBid}
      />

      {/* Unsold Animation */}
      <UnsoldAnimation
        show={showUnsold}
        playerName={currentPlayer.name}
      />
    </div>
  );
};

export default Auction;
