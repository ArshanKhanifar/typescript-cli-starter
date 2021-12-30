import { ethers } from "ethers";
import { config } from "dotenv";

const main = async () => {
  config();
  const { PROVIDER, MY_ADDRESS } = process.env;
  if (!PROVIDER) {
    throw new Error("No provider");
  }
  if (!MY_ADDRESS) {
    throw new Error("No address");
  }
  const provider = ethers.getDefaultProvider(PROVIDER);
  const balanceWei = await provider.getBalance(MY_ADDRESS);
  const balance = ethers.utils.formatEther(balanceWei);
  console.log(`hello, world! Your eth balance is: ${balance}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
