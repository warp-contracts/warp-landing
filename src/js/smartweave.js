// import { waitForElm } from './utils';
// import Arweave from 'arweave';
// import { SmartWeaveWebFactory } from 'redstone-smartweave';
// const arweave = Arweave.init({
//   host: 'arweave.net',
//   port: 443,
//   protocol: 'https',
// });
// const smartweave = SmartWeaveWebFactory.memCachedBased(arweave).useRedStoneGateway().build();
// arweave.wallets.generate().then((key) => {
//   arweave.wallets.jwkToAddress(key).then(async (address) => {
//     const addressElement = await waitForElm('.address-el');
//     console.log(addressElement);
//     console.log(address);
//     addressElement.innerHTML += address;
//   });
//   const contract = smartweave.pst('-EffmpHE3FM-8OsoX6AkKgKGQICQ6uI04r9R5fpe9Ao').connect(key);

//   console.log(contract);
// });
