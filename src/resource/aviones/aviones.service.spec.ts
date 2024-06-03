import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvionesService } from './aviones.service';
import { Avion } from '../../resource/aviones/entities/avion.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { CreateAvionDto } from '../../resource/aviones/dto/create-avion.dto';
import { UpdateAvionDto } from '../../resource/aviones/dto/update-avion.dto';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import { ModeloAvion } from '../../resource/modelos/entities/modelo-avion.entity';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import { ESTADO_OPERATIVO } from '../../common/enums/estado-operativo.enum';

const mockAvionRepository = {
  find: jest.fn(),
};

const mockTransaccionService = {
  transaction: jest.fn(),
};

describe('AvionesService', () => {
  let service: AvionesService;
  let avionRepository: Repository<Avion>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvionesService,
        {
          provide: getRepositoryToken(Avion),
          useValue: mockAvionRepository,
        },
        {
          provide: TransaccionService,
          useValue: mockTransaccionService,
        },
      ],
    }).compile();

    service = module.get<AvionesService>(AvionesService);
    avionRepository = module.get<Repository<Avion>>(getRepositoryToken(Avion));
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un avión exitosamente', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Success');
      const createAvionDto: CreateAvionDto = {
        modeloAvionId: 1,
        fabricanteId: 1,
        avion_Capacidad_Pasajeros: 150,
        avion_Capacidad_Carga: 2000,
        avion_Velocidad_Maxima: 850,
        avion_Anio_Fabricacion: 2020,
        avion_Estado_Operativo: ESTADO_OPERATIVO.OPERATIVO,
        avion_Estado_Logico: Estado_Logico.ACTIVO,
        avion_Tipo_Motor: 'Turbofan',
        avion_Autonomia: '10 horas',
      };
      const result = await service.create(createAvionDto);
      expect(result).toEqual({
        status: 201,
        message: 'Creado con éxito',
      });
    });

    it('debería retornar un error si la creación falla', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Error');
      const createAvionDto: CreateAvionDto = {
        modeloAvionId: 1,
        fabricanteId: 1,
        avion_Capacidad_Pasajeros: 150,
        avion_Capacidad_Carga: 2000,
        avion_Velocidad_Maxima: 850,
        avion_Anio_Fabricacion: 2020,
        avion_Estado_Operativo: ESTADO_OPERATIVO.OPERATIVO,
        avion_Estado_Logico: Estado_Logico.ACTIVO,
        avion_Tipo_Motor: 'Turbofan',
        avion_Autonomia: '10 horas',
      };
      const result = await service.create(createAvionDto);
      expect(result).toEqual({
        status: 400,
        message: 'Error al crear',
      });
    });
  });

  describe('findAll', () => {
    it('debería retornar un arreglo de aviones', async () => {
      const aviones = [{ /* propiedades del avión */ }];
      mockAvionRepository.find.mockResolvedValue(aviones);
      const result = await service.findAll();
      expect(result).toEqual(aviones);
    });
  });

  describe('findbyModelo', () => {
    it('debería retornar aviones por modelo', async () => {
      mockTransaccionService.transaction
        .mockResolvedValueOnce([{ modelo_Avion_Id: 1 }])
        .mockResolvedValueOnce([{ modeloAvionId: 1,
          fabricanteId: 1,
          avion_Capacidad_Pasajeros: 150,
          avion_Capacidad_Carga: 2000,
          avion_Velocidad_Maxima: 850,
          avion_Anio_Fabricacion: 2020,
          avion_Estado_Operativo: ESTADO_OPERATIVO.OPERATIVO,
          avion_Estado_Logico: Estado_Logico.ACTIVO,
          avion_Tipo_Motor: 'Turbofan',
          avion_Autonomia: '10 horas' }]);
      const result = await service.findbyModelo('ModeloX');
      expect(result).toEqual({
        status: 200,
        message: [{ modeloAvionId: 1,
          fabricanteId: 1,
          avion_Capacidad_Pasajeros: 150,
          avion_Capacidad_Carga: 2000,
          avion_Velocidad_Maxima: 850,
          avion_Anio_Fabricacion: 2020,
          avion_Estado_Operativo: ESTADO_OPERATIVO.OPERATIVO,
          avion_Estado_Logico: Estado_Logico.ACTIVO,
          avion_Tipo_Motor: 'Turbofan',
          avion_Autonomia: '10 horas' }],
      });
    });

    it('debería retornar un error si el modelo no es encontrado', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Error');
      const result = await service.findbyModelo('ModeloX');
      expect(result).toEqual({
        status: 400,
        message: 'Error al consultar',
      });
    });
  });

  describe('update', () => {
    it('debería actualizar un avión exitosamente', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Success');
      const updateAvionDto: UpdateAvionDto = {
        avion_Capacidad_Pasajeros: 180,
      };
      const result = await service.update(1, updateAvionDto);
      expect(result).toEqual({
        status: 200,
        message: 'Actualizado con éxito',
      });
    });

    it('debería retornar un error si la actualización falla', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Error');
      const updateAvionDto: UpdateAvionDto = {
        avion_Capacidad_Pasajeros: 180,
      };
      const result = await service.update(1, updateAvionDto);
      expect(result).toEqual({
        status: 400,
        message: 'Error al actualizar',
      });
    });
  });

  describe('remove', () => {
    it('debería eliminar un avión exitosamente', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Success');
      const result = await service.remove(1);
      expect(result).toEqual({
        status: 200,
        message: 'Eliminado con éxito',
      });
    });

    it('debería retornar un error si la eliminación falla', async () => {
      mockTransaccionService.transaction.mockResolvedValue('Error');
      const result = await service.remove(1);
      expect(result).toEqual({
        status: 400,
        message: 'Error al eliminar',
      });
    });
  });
});
