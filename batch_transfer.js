const { ApiPromise, WsProvider } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');
require('log-timestamp');
const config = require('./config.json');

const sleep = () => new Promise((res, rej) => setTimeout(res, 20 * 1000));

async function main () {
  await cryptoWaitReady();

  const wsProvider = new WsProvider(config.WsProvider);
  const api = await ApiPromise.create({ provider: wsProvider });

  const keyring = new Keyring({ type: 'sr25519', ss58Format: config.ss58Format });
  const alice = keyring.addFromMnemonic(config.Mnemonics);
  console.log(alice.address);

  for (i = 0;i < config.addresses.length; i++) {
      const transfer = api.tx.balances.transfer(config.addresses[i], config.amount);
      const hash = await transfer.signAndSend(alice);
      console.log(`${i+1} tx, to address: ${config.addresses[i]}, hash: ${hash.toHex()}`);

      await sleep();
  }
}

main().catch(console.error).finally(() => process.exit());
