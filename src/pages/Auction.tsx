import { useState } from "react";
import { mockPlayers, mockTeams } from "@/data/mockData";
import { PlayerCard } from "@/components/auction/PlayerCard";
import { SoldCelebration } from "@/components/auction/SoldCelebration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gavel } from "lucide-react";
import stadiumBg from "@/assets/stadium-bg.jpg";

const Auction = () => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(mockPlayers[0].basePrice);
  const [leadingTeam, setLeadingTeam] = useState<string | null>(null);
  const [teamBids, setTeamBids] = useState<Record<string, number>>({});
  const [showCelebration, setShowCelebration] = useState(false);

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
    if (currentPlayerIndex < mockPlayers.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setCurrentBid(mockPlayers[currentPlayerIndex + 1].basePrice);
      setLeadingTeam(null);
      setTeamBids({});
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
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border-2 border-primary shadow-glow">
            <Gavel className="h-6 w-6 text-primary animate-glow-pulse" />
            <span className="text-xl font-bold text-foreground">Live Auction - Player #{currentPlayerIndex + 1}</span>
          </div>
          
          <div className="text-right">
            <div className="text-8xl font-black text-secondary mb-2">
              ₹{(currentBid / 100000).toFixed(1)}L
            </div>
            {leadingTeam && (
              <div className="text-4xl font-black text-primary mb-1">
                {mockTeams.find(t => t.id === leadingTeam)?.name}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Base: ₹{(currentPlayer.basePrice / 100000).toFixed(1)}L | Increment: ₹{(bidIncrement / 100000).toFixed(1)}L
            </p>
          </div>
        </div>

        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Large Player Card */}
          <div className="flex justify-center animate-scale-in">
            <PlayerCard player={currentPlayer} isAnimated className="max-w-4xl w-full" />
          </div>

          {/* Team Bidding Grid */}
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-3 text-foreground text-center">Click on Team to Bid</h2>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-3">
              {mockTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => handleTeamBid(team.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    leadingTeam === team.id
                      ? "border-primary bg-primary/20 shadow-glow scale-105"
                      : "border-border hover:border-primary/50 hover:scale-105"
                  }`}
                >
                  <div className="text-2xl mb-1">{team.logo}</div>
                  <p className="font-bold text-[10px] text-foreground mb-0.5">{team.name}</p>
                  {teamBids[team.id] && (
                    <p className="text-[9px] text-primary font-bold">
                      ₹{(teamBids[team.id] / 100000).toFixed(1)}L
                    </p>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleUnsold}
                variant="outline"
                size="default"
                className="px-8"
              >
                Unsold
              </Button>
              <Button
                onClick={handleSold}
                disabled={!leadingTeam}
                size="default"
                className="px-8 bg-gradient-accent hover:opacity-90"
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
    </div>
  );
};

export default Auction;
