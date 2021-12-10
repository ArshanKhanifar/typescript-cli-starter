const main = async () => {
  console.log('hello, world!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
