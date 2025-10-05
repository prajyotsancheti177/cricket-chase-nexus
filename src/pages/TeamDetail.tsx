import { useParams, Link } from "react-router-dom";
import { mockTeams, mockPlayers } from "@/data/mockData";
import { PlayerCard } from "@/components/auction/PlayerCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Wallet, Trophy } from "lucide-react";

const TeamDetail = () => {
  const { teamId } = useParams();
  const team = mockTeams.find(t => t.id === teamId);
  const teamPlayers = mockPlayers.filter(p => p.teamId === teamId);

  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Team Not Found</h1>
          <Link to="/teams">
            <Button variant="outline">Back to Teams</Button>
          </Link>
        </div>
      </div>
    );
  }

  const budgetUsedPercentage = (team.spentBudget / team.totalBudget) * 100;
  const remainingBudget = team.totalBudget - team.spentBudget;
  const remainingSlots = team.maxPlayers - team.currentPlayers;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/teams">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
        </Link>

        {/* Team Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="text-7xl p-8 rounded-3xl shadow-elevated"
              style={{ backgroundColor: team.color }}
            >
              {team.logo}
            </div>
            <div>
              <h1 className="text-5xl font-black text-foreground mb-2">{team.name}</h1>
              <p className="text-xl text-muted-foreground">Squad Details & Statistics</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Budget Card */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Budget</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-bold text-foreground">
                    ₹{(team.totalBudget / 10000000).toFixed(1)}Cr
                  </span>
                </div>
                <Progress value={budgetUsedPercentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-bold text-secondary">
                    ₹{(team.spentBudget / 10000000).toFixed(1)}Cr
                  </span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className="font-bold text-accent">
                      ₹{(remainingBudget / 10000000).toFixed(2)}Cr
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Squad Card */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Squad</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Players</span>
                  <span className="font-bold text-foreground">{team.maxPlayers}</span>
                </div>
                <Progress 
                  value={(team.currentPlayers / team.maxPlayers) * 100} 
                  className="h-2" 
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-bold text-secondary">{team.currentPlayers}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Slots Left</span>
                    <span className="font-bold text-accent">{remainingSlots}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Card */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Players</p>
                  <p className="text-3xl font-black text-foreground">{teamPlayers.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Price</p>
                  <p className="text-2xl font-bold text-secondary">
                    ₹{teamPlayers.length > 0 
                      ? ((team.spentBudget / teamPlayers.length) / 100000).toFixed(1) 
                      : 0}L
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Players Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Squad Members ({teamPlayers.length})
          </h2>
          
          {teamPlayers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PlayerCard player={player} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/80 backdrop-blur-sm">
              <p className="text-xl text-muted-foreground">No players in squad yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
