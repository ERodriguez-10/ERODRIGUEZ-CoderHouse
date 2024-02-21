import { Command } from "commander";

const program = new Command();

program
  .name("bookify-backend")
  .description("CLI to start up the backend services")
  .version("1.0.0");

program
  .option("-p <port>", "Server port", 8080)
  .option("-d", "Variable for debug", "false")
  .option("--persist <mode>", "Persistance mode", "mongodb")
  .option("--mode <mode>", "Enviroment mode", "dev")
  .option("-u <user>", "Logged user", "No user is logged");

program.parse();

console.log("[Server-info]: Environment Mode Option:", program.opts().mode);
console.log("[Server-info]: Persistence Mode Option:", program.opts().persist);

process.on("exit", (code) => {
  console.log("Exit code process: " + code);
});

/* COMMENT THIS LINE IN DEV MODE */
/*process.on("uncaughtException", (exception) => {
  console.log("Something went wrong! Unhandled exception: " + exception);
});*/

export default program;
