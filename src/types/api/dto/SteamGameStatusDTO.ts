interface GameAchievements {
  achieved: number;
  name: string;
}

interface GameStats {
  name: string;
  value: number;
}

export interface SteamGameStatusDTO {
  playerstats: {
    achievements: GameAchievements[];
    gameName: string;
    stats: GameStats[];
    steamID: string;
  };
}
