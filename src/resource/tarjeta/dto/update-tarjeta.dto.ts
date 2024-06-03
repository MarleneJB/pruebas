import { PartialType } from '@nestjs/mapped-types';
import { CreateTarjetaDto } from './create-tarjeta.dto';

import { IsNumber, IsString, Matches } from 'class-validator';
import { Error_Registro } from '../../../common/helpers/registro.helpers';

export class UpdateTarjetaDto extends PartialType(CreateTarjetaDto) {
  @IsString()
  tarjeta_Titular: string;

  @IsString()
  tarjeta_Direccion: string;

  @IsNumber()
  tarjeta_Numero_Tarjeta: string;

  @IsString()
  @Matches(/^(\d{2})-(\d{2})$/, {
    message: Error_Registro.FECHA_VENCIMIENTO,
  })
  tarjeta_Fecha_Vencimiento: string;
}
