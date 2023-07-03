export type GameCollection = {
  "low-volatility": number;
  "classic-slots": number;
  cryptogames: number;
  popularity: number;
  dogegames: number;
  xrpgames: number;
  ethgames: number;
  btcgames: number;
  ltcgames: number;
  novelty: number;
  slots: number;
  all: number;
  _hd: number;
};

export type GameData = {
  real: Record<string, unknown>;
  collections: GameCollection;
  provider: string;
  title: string;
  demo: string;
};

export type GameDataObject = Record<string, GameData>;