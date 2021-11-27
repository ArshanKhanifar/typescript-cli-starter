import { config } from "dotenv";
import { ContractId, setup } from "./AddressBook";
import { watchPrice } from "./PriceWatchoor";

config();
setup();

async function main() {
  await watchPrice(ContractId.AROME_FRAX);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
