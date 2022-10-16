import { SteamProfileInfoDTO } from "@app/types/api/dto/SteamProfileInfoDTO";

export class SteamService {
  steamApiUrl: string;
  private steamApiKey: string;

  constructor() {
    this.steamApiUrl = "https://api.steampowered.com/";
    this.steamApiKey = import.meta.env.VITE_STEAM_API_KEY;
  }

  public async globalAchievementsForGame(gameId: string) {
    const currentUrl = `${this.steamApiUrl}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${gameId}&format=json`;
  }

  public async profileInfo(steam64id: string): Promise<SteamProfileInfoDTO> {
    const currentUrl = `${this.steamApiUrl}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.steamApiKey}&steamids=${steam64id}`;

    return fetch(currentUrl).then((data) => data.json());
  }

  public gameList(steam64id: string) {
    const currentUrl = `${this.steamApiUrl}/IPlayerService/GetOwnedGames/v0001/?key=${this.steamApiKey}&steamid=${steam64id}&format=json`;
  }

  public friendList(steam64id: string) {
    const currentUrl = `${this.steamApiUrl}/ISteamUser/GetFriendList/v0001/?key=${this.steamApiKey}&steamid=${steam64id}&relationship=friend`;
  }

  public achievementsByGameList(steam64id: string, gameId: string) {
    const currentUrl = `${this.steamApiUrl}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&key=${this.steamApiKey}&steamid=${steam64id}`;
  }

  public statsForGame(steam64id: string, gameId: string) {
    const currentUrl = `${this.steamApiUrl}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${gameId}&key=${this.steamApiKey}&steamid=${steam64id}`;
  }

  public recentlyPlayedGames(steam64id: string) {
    const currentUrl = `${this.steamApiUrl}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.steamApiKey}&steamid=${steam64id}&format=json`;
  }
}
