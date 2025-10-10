import { useParams, Link } from "react-router-dom";
import { mockTeams, mockPlayers } from "@/data/mockData";
import { PlayerCard } from "@/components/auction/PlayerCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        {/* Back Button */}
        <Link to="/teams">
          <Button variant="outline" className="mb-4 md:mb-8 text-xs md:text-base" size="sm">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Back to Teams
          </Button>
        </Link>

        {/* Team Header */}
        <div className="mb-6 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-8">
            <div
              className="text-4xl md:text-7xl p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-elevated"
              style={{ backgroundColor: team.color }}
            >
              {team.logo}
            </div>
            <div>
              <h1 className="text-2xl md:text-5xl font-black text-foreground mb-1 md:mb-2">{team.name}</h1>
              <p className="text-sm md:text-xl text-muted-foreground">Squad Details & Statistics</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
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

        {/* Players Table Section */}
        <div className="mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-6">
            Squad Members ({teamPlayers.length})
          </h2>
          
          {teamPlayers.length > 0 ? (
            <Card className="p-3 md:p-6 bg-card/80 backdrop-blur-sm border-2 border-border shadow-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-bold text-muted-foreground">Player Name</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-bold text-muted-foreground">Skill</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-bold text-muted-foreground">Base Price</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-bold text-muted-foreground">Sold Price</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-bold text-muted-foreground hidden md:table-cell">Price Distribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamPlayers.map((player, index) => {
                      const soldPrice = player.soldPrice || 0;
                      const maxPrice = Math.max(...teamPlayers.map(p => p.soldPrice || 0));
                      const percentage = maxPrice > 0 ? (soldPrice / maxPrice) * 100 : 0;
                      
                      return (
                        <tr 
                          key={player.id} 
                          className="border-b border-border/50 hover:bg-accent/5 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="py-2 md:py-4 px-2 md:px-4">
                            <p className="font-bold text-foreground text-xs md:text-base">{player.name}</p>
                          </td>
                          <td className="py-2 md:py-4 px-2 md:px-4">
                            <Badge 
                              variant={
                                player.skill === "All-Rounder" ? "default" :
                                player.skill === "Batsman" ? "secondary" : "outline"
                              }
                              className="text-xs"
                            >
                              {player.skill}
                            </Badge>
                          </td>
                          <td className="py-2 md:py-4 px-2 md:px-4">
                            <p className="text-muted-foreground text-xs md:text-base">
                              ₹{(player.basePrice / 100000).toFixed(1)}L
                            </p>
                          </td>
                          <td className="py-2 md:py-4 px-2 md:px-4">
                            <p className="font-bold text-secondary text-sm md:text-lg">
                              ₹{(soldPrice / 100000).toFixed(1)}L
                            </p>
                          </td>
                          <td className="py-2 md:py-4 px-2 md:px-4 hidden md:table-cell">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-muted/20 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-accent/10 font-bold">
                      <td className="py-2 md:py-4 px-2 md:px-4" colSpan={3}>
                        <p className="text-foreground text-xs md:text-base">Remaining Budget</p>
                      </td>
                      <td className="py-2 md:py-4 px-2 md:px-4" colSpan={2}>
                        <p className="text-lg md:text-2xl font-black text-accent">
                          ₹{(remainingBudget / 10000000).toFixed(2)}Cr
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
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
