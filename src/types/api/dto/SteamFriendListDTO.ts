interface SteamFriend {
  friend_since: number;
  relationship: string;
  steamid: string;
}

export interface SteamFriendListDTO {
  friendsList: {
    friends: SteamFriend[];
  };
}
