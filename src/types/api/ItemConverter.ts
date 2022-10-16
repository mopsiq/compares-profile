import { ConverterResponseDTO } from "@app/types/api/dto/ConverterResponseDTO";
import { SteamProfileCount } from "@app/types/store/SteamProfileCount";

export interface ItemConverter extends ConverterResponseDTO {
  type: SteamProfileCount;
}
