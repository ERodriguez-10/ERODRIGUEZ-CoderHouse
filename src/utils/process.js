import { Command } from "commander";

const program = new Command();

program
  .name("bookify-backend")
  .description("CLI to start up the backend services")
  .version("1.0.0");

program
  .option("-p <port>", "Server port", 8080)
  .option("--mode <mode>", "Enviroment", "dev")
  .option("-u <user>", "Logged user", "No user is logged");

program.parse();

process.on("exit", (code) => {
  console.log("Exit code process: " + code);
});

/*
process.on("uncaughtException", (exception) => {
  console.log("Something went wrong! Unhandled exception: " + exception);
});
*/

export default program;
