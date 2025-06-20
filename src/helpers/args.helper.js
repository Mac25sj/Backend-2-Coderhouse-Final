import { Command } from "commander";
const args = new Command()
  args.option("--mode <mode>", "Ambiente de prueba", "dev")
;

args.parse();
export default args.opts();
