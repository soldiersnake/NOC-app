import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    Server.start();
    // console.log(envs);

}