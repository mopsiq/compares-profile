interface SteamProfile {
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  commentpermission: number;
  communityvisibilitystate: number;
  loccityid?: number;
  loccountrycode?: string;
  locstatecode?: string;
  personaname: string;
  personastate: number;
  personastateflags: number;
  primaryclanid?: string;
  profilestate: number;
  profileurl: string;
  realname?: string;
  steamid: string;
  timecreated?: number;
  gameid?: number;
  gameserverip?: string;
  gameextrainfo?: string;
}

export interface SteamProfileInfoDTO {
  response: {
    players: SteamProfile[];
  };
}
