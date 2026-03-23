import { MongoDatabase } from "./data/mongo";
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

    Server.start();
}