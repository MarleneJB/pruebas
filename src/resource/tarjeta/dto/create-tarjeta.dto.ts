import { IsNumber, IsString, Matches } from 'class-validator';
import { Error_Registro } from '../../../common/helpers/registro.helpers';

export class CreateTarjetaDto {
  @IsString()
  tarjeta_Titular: string;

  @IsString()
  tarjeta_Direccion: string;

  @IsString()
  tarjeta_Numero_Tarjeta: string;

  @IsString()
  @Matches(/^(\d{2})-(\d{2})$/, {
    message: Error_Registro.FECHA_VENCIMIENTO,
  })
  tarjeta_Fecha_Vencimiento: string;
}
