import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { Player, PlayerSkill, PlayerStatus } from "@/types/auction";
import { toast } from "sonner";

const UploadPlayers = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedPlayers, setUploadedPlayers] = useState<Player[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      const players: Player[] = jsonData.map((row, index) => ({
        id: `p${Date.now()}_${index}`,
        name: row.Name || row.name || "",
        skill: (row.Skill || row.skill || "Batsman") as PlayerSkill,
        basePrice: Number(row["Base Price"] || row["base price"] || row.basePrice || 1000000),
        status: "Unsold" as PlayerStatus,
        photo: "/placeholder.svg",
      }));

      setUploadedPlayers(players);
      toast.success(`Successfully uploaded ${players.length} players!`);
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      toast.error("Failed to parse Excel file. Please check the format.");
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        Name: "Player Name",
        Skill: "Batsman",
        "Base Price": 2000000,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Players");
    XLSX.writeFile(workbook, "players_template.xlsx");
    toast.success("Template downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-black text-foreground">
              Upload Players
            </h1>
            <p className="text-xl text-muted-foreground">
              Import players from Excel sheet to add them to the auction
            </p>
          </div>

          {/* Upload Card */}
          <Card className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Excel File Upload
                </h2>
              </div>
              
              <p className="text-muted-foreground">
                Upload an Excel file (.xlsx, .xls) with columns: Name, Skill, Base Price
              </p>

              <Button 
                onClick={downloadTemplate}
                variant="outline"
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Download Template
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <Input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="max-w-sm mx-auto"
                />
                {file && (
                  <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {file.name}
                  </p>
                )}
              </div>

              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full"
                size="lg"
              >
                {uploading ? "Uploading..." : "Upload Players"}
              </Button>
            </div>
          </Card>

          {/* Uploaded Players Preview */}
          {uploadedPlayers.length > 0 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Uploaded Players ({uploadedPlayers.length})
              </h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {uploadedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex justify-between items-center p-4 rounded-lg bg-muted"
                  >
                    <div>
                      <p className="font-bold text-foreground">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.skill}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        ₹{(player.basePrice / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Instructions */}
          <Card className="p-6 bg-muted">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">Excel Format Requirements:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Column 1: Name (Player name)</li>
                  <li>Column 2: Skill (Batsman, Bowler, All-Rounder, or Wicket-Keeper)</li>
                  <li>Column 3: Base Price (in Rupees, e.g., 2000000 for ₹20L)</li>
                  <li>First row should contain column headers</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPlayers;