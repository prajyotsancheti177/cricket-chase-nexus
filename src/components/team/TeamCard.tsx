import { Team } from "@/types/auction";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamCardProps {
  team: Team;
}

export const TeamCard = ({ team }: TeamCardProps) => {
  const budgetUsedPercentage = (team.spentBudget / team.totalBudget) * 100;
  const playersFilledPercentage = (team.currentPlayers / team.maxPlayers) * 100;
  const remainingBudget = team.totalBudget - team.spentBudget;

  return (
    <Link to={`/team/${team.id}`}>
      <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all hover:shadow-glow cursor-pointer">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Team Header */}
          <div className="flex items-center gap-3 md:gap-4">
            <div
              className="text-3xl md:text-5xl p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg transition-transform group-hover:scale-110"
              style={{ backgroundColor: team.color }}
            >
              {team.logo}
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {team.name}
              </h3>
            </div>
          </div>

          {/* Budget Info */}
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
                <Wallet className="h-3 w-3 md:h-4 md:w-4" />
                <span>Budget Used</span>
              </div>
              <span className="font-bold text-foreground">
                ₹{(team.spentBudget / 10000000).toFixed(1)}Cr / ₹{(team.totalBudget / 10000000).toFixed(1)}Cr
              </span>
            </div>
            <Progress value={budgetUsedPercentage} className="h-1.5 md:h-2" />
            <p className="text-xs md:text-sm font-medium text-accent">
              Remaining: ₹{(remainingBudget / 10000000).toFixed(2)}Cr
            </p>
          </div>

          {/* Players Info */}
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
                <Users className="h-3 w-3 md:h-4 md:w-4" />
                <span>Squad</span>
              </div>
              <span className="font-bold text-foreground">
                {team.currentPlayers} / {team.maxPlayers}
              </span>
            </div>
            <Progress value={playersFilledPercentage} className="h-1.5 md:h-2" />
            <p className="text-xs md:text-sm font-medium text-muted-foreground">
              {team.maxPlayers - team.currentPlayers} slots remaining
            </p>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      </Card>
    </Link>
  );
};
