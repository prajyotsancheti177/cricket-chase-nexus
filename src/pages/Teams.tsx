import { mockTeams } from "@/data/mockData";
import { TeamCard } from "@/components/team/TeamCard";
import { Trophy } from "lucide-react";

const Teams = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-2 md:px-4 py-6 md:py-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4 px-3 md:px-6 py-2 md:py-3 rounded-full bg-card border-2 border-primary shadow-glow">
            <Trophy className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            <span className="text-sm md:text-xl font-bold text-foreground">Tournament Teams</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 md:mb-4">
            All Teams
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground">
            {mockTeams.length} teams competing for glory
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {mockTeams.map((team, index) => (
            <div
              key={team.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TeamCard team={team} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
