import { ContractId, getErcContract, getRouterContract } from "./AddressBook";
import { BigNumber, ethers } from "ethers";

export const swap = async () => {
  const router = getRouterContract(ContractId.JOE_ROUTER);
  const mim = getErcContract(ContractId.MIM);
  const sdog = getErcContract(ContractId.SDOG);
  const amountIn = BigNumber.from(4.7 * 1e9); // sdog
  const amountOutMin = BigNumber.from(1).mul(1e9).mul(1e9).mul(7000); // mim
  const path = [
    "0xde9e52f1838951e4d2bb6c59723b003c353979b6", // sdog
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", // Wavax
    "0x130966628846bfd36ff31a822705796e8cb8c18d", // mim
  ];
  const to = "0x0f892a08354198671AeDBabA8D7D9318099eD62A";
  const deadline = Date.now() + 60 * 60 * 1e3;

  try {
    console.log("swapping...");
    const tx = await router.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
      {
        gasLimit: 577467,
        gasPrice: ethers.utils.parseUnits("400.0", "gwei"),
      }
    );
    console.log("sent, waiting...", tx.hash);
    await tx.wait();
    console.log("swap complete...", tx.hash);
  } catch (e: any) {
    console.log("error");
    swap();
  }
  console.log(
    "mim balance now:",
    (await mim.balanceOf(to)).div(1e9).toNumber() / 1e9
  );
};
