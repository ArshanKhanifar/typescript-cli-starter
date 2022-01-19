import { logger } from "./utils/logger";

const main = async () => {
  logger.info("hello, world!");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
