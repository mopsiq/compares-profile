interface Asset {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
}

interface Description {
  type: string;
  value: string;
  color?: string;
}

interface Action {
  link: string;
  name: string;
}

interface MarketAction {
  link: string;
  name: string;
}

interface Tag {
  category: string;
  internal_name: string;
  localized_category_name: string;
  localized_tag_name: string;
  color?: string;
}

interface ItemDescription {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: Description[];
  tradable: number;
  actions: Action[];
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_actions: MarketAction[];
  commodity: number;
  market_tradable_restriction: number;
  marketable: number;
  tags: Tag[];
}

export interface SteamUserInventoryDTO {
  assets: Asset[];
  descriptions: ItemDescription[];
}
