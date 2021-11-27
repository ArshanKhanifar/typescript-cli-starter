import { ContractId, getErcContract, getPairContract } from "./AddressBook";
import { BigNumber } from "ethers";
import { swap } from "./Swapper";

export enum Denominator {
  first,
  second,
}

export const watchPrice = async (
  id: ContractId,
  denominator: Denominator = Denominator.first
) => {
  const lp = getPairContract(id);
  const token0Addr = await lp.token0();
  const token1Addr = await lp.token1();
  const token0 = getErcContract(token0Addr);
  const token1 = getErcContract(token1Addr);

  const sym0 = await token0.symbol();
  const sym1 = await token1.symbol();

  const dec0 = await token0.decimals();
  const dec1 = await token1.decimals();

  const name0 = await token0.name();
  const name1 = await token1.name();
  console.log(`watching the ${name0}-${name1} pair`);

  const convertToFloat = (amount: BigNumber, dec: number) => {
    const a = Math.floor(dec / 2);
    const b = dec - a;
    return amount.div(Math.pow(10, a)).toNumber() / Math.pow(10, b);
  };

  lp.on(
    "Swap",
    (
      addr,
      in0: BigNumber,
      in1: BigNumber,
      out0: BigNumber,
      out1: BigNumber
    ) => {
      const first = in0.isZero()
        ? convertToFloat(out0, dec0)
        : convertToFloat(in0, dec0);
      const second = in0.isZero()
        ? convertToFloat(in1, dec1)
        : convertToFloat(out1, dec1);
      const price =
        denominator === Denominator.first ? first / second : second / first;

      if (in0.isZero()) {
        console.log(`${second} ${sym1} => ${first} ${sym0}`);
      } else {
        console.log(`${first} ${sym0} => ${second} ${sym1}`);
      }
      console.log("price", price);
      if (first > 1e6 || price > 4e3) {
        console.log("SOMEONE JUST MADE A BIGASS TRANSACTION!!!", first);
        swap();
      }
    }
  );
};
