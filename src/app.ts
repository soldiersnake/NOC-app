import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';

(async () => {
    main();
})();

async function main() {
    MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();
    // console.log(newLog);
    // const logs = await LogModel.find();
    // console.log(logs);



    Server.start();
}