const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');

async function main() {
  // Our code will go here
  const web3 = new Web3('http://localhost:8545');
  const loader = setupLoader({ provider: web3 }).web3;

  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const address = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601';
  const box = loader.fromArtifact('Box', address);

  const [ owner ] = accounts;
  await box.methods.store(42).send({ from: owner, gas: 50000, gasPrice: 1e6 });

  const value = await box.methods.retrieve().call();
  console.log('Box value is', value);
}

main();