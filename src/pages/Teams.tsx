import { mockTeams } from "@/data/mockData";
import { TeamCard } from "@/components/team/TeamCard";
import { Trophy } from "lucide-react";

const Teams = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full bg-card border-2 border-primary shadow-glow">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Tournament Teams</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-4">
            All Teams
          </h1>
          <p className="text-xl text-muted-foreground">
            {mockTeams.length} teams competing for glory
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
