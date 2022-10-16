export interface ConverterResponseDTO {
  error: boolean;
  data: {
    steam_url: string;
    steam_id64: string;
    steam_id3: string;
    steam_id: string;
    battleye_id: string;
    bohemia_id: string;
  };
}
