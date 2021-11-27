## The LP Scalpoor
This is a slightly-better-maintained version of price_watchoor.

# Installation
```
git clone https://github.com/arshankhanifar/lp_scalpoor
cd lp_scalpoor
yarn
```

# Watching Price: Kinton
Just start the watchoooooor:
```
yarn start
```

# Watching Price: General
1. Find the address of the pair.
2. Make sure the `RPCAddressBook` has your [network](./src/Network.ts#L23)'s address. If not add it.
3. Make sure the `NetworkAddressBook` has both ur tokens and the pair's address. If not add it. 
4. Change [setup](./src/AddressBook.ts#L77) to select your network as default network.
5. Change [main](./src/App.ts#L9) to call `watchPrice` with your pair's `ContractId`. 
 For example for `aRome/Frax` you can do something like this:
```
async function main() {
  await watchPrice(ContractId.AROME_FRAX);
}
```
6. Start the watchoooooor.
```
yarn start
```
