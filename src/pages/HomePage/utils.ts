import {GameDataObject} from "../../types";

export const mockApiRequest = (): Promise<GameDataObject | null> =>
  fetch('/games.json')
    .then((response: Response) => response.json())
    .then((data: unknown) => data as GameDataObject)
    .catch((error: Error) => {
      console.error('Ошибка загрузки файла:', error);
      return null;
    });

export const getCurrencyOptions = (jsonData: GameDataObject): { value: string }[] => {
  const currencySet = new Set<string>();

  Object.keys(jsonData).forEach((key) => {
    const collections = jsonData[key].collections;
    Object.keys(collections)
      .filter((collection) => collection.includes('games'))
      .forEach((collection) => {
        currencySet.add(collection);
      });
  });

  return Array.from(currencySet).map((currency) => ({
    value: currency.charAt(0).toUpperCase() + currency.slice(1, -5)
  }));
};

export const getProviderOptions = (jsonData: GameDataObject): { value: string; label: string }[] => {
  const providerSet = new Set<string>();

  Object.keys(jsonData).forEach((key) => {
    const provider = jsonData[key].provider;
    providerSet.add(provider);
  });

  return Array.from(providerSet).map((provider) => ({
    value: provider,
    label: provider.charAt(0).toUpperCase() + provider.slice(1),
  }));
};

function getGameData(data: { [key: string]: any }, startIndex: number, endIndex: number): { [key: string]: any } {
  const gameKeys = Object.keys(data);
  const slicedKeys = gameKeys.slice(startIndex, endIndex);

  const slicedData = slicedKeys.reduce((result: { [key: string]: any }, key: string) => {
    result[key] = data[key];
    return result;
  }, {});

  return slicedData;
}

export function filterAndSortData(
  data: GameDataObject | null,
  selectedProvider: string | null,
  selectedCurrency: string | null,
  startIndex: number,
  endIndex: number
): GameDataObject | null {
  if (data === null) return null;

  let filteredData = { ...data };

  if (selectedProvider) {
    filteredData = Object.fromEntries(
      Object.entries(filteredData).filter(([key, value]) => value.provider === selectedProvider)
    );
  }

  if (selectedCurrency) {
    let filteredDataCurrency: GameDataObject = {};
    Object.keys(filteredData).forEach(key => {
      const { real } = filteredData[key];

      if (real && real[selectedCurrency.toUpperCase()]) {
        filteredDataCurrency[key] = filteredData[key];
      }
    });
    filteredData = filteredDataCurrency;
  }

  filteredData = getGameData(filteredData, startIndex, endIndex);

  return Object.fromEntries(
    Object.entries(filteredData).sort(([, a], [, b]) => a.collections.popularity - b.collections.popularity)
  );
}

