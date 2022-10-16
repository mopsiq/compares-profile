interface AppAchievement {
  achieved: number;
  apiname: string;
  unlocktime: number;
}

export interface SteamAchievementStatusDTO {
  playerstats: {
    achievements: AppAchievement[];
    gameName: string;
    steamID: string;
    success: boolean;
  };
}
