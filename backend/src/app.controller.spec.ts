import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {

    it('Test Create', () => {

      let user = {
        id: 1,
        name: 'Cristian angel Puma Villalva',
        dni: 76371220
      }
      expect(appController.Create(user)).toStrictEqual({ "dni": 76371220, "id": 1, "name": "Cristian angel Puma Villalva" });
    
    });


    it('Test Reader', () => {

      let user = {
        id: 1,
        name: 'Cristian angel Puma Villalva',
        dni: 76371220
      }
      // Creamos a un usuario el cual eliminaremos.
      user = appController.Create(user);
      user = appController.Create(user);

      let users = appController.Gets()
      // Iniciamos el test.
      expect(users.length).toStrictEqual(2);

    });


    it('Test Update', () => {

      let user = {
        id: 1,
        name: 'Cristian angel Puma Villalva',
        dni: 76371220
      }
      // Creamos a un usuario el cual sera al que actualizaremos.
      user = appController.Create(user)

      user.name = 'Cristian Angel Puma Villalva';
      // Iniciamos el test.
      expect(appController.Update(user)).toStrictEqual(user);

    });


    it('Test Delete', () => {

      let user = {
        id: 1,
        name: 'Cristian angel Puma Villalva',
        dni: 76371220
      }
      // Creamos a un usuario el cual eliminaremos.
      user = appController.Create(user)
      let users = appController.Delete(user.id)
      // Iniciamos el test.
      expect(users.length).toStrictEqual(0);

    });

  });
});
