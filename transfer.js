const { ApiPromise, WsProvider } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');
require('log-timestamp');
const config = require('./config.json');

async function main () {
  await cryptoWaitReady();

  const wsProvider = new WsProvider(config.WsProvider);
  const api = await ApiPromise.create({ provider: wsProvider });

  const keyring = new Keyring({ type: 'sr25519', ss58Format: config.ss58Format });
  const alice = keyring.addFromMnemonic(config.Mnemonics);
  console.log(alice.address);

  const transfer = api.tx.balances.transfer(config.BOB, 100_000_000);
  const hash = await transfer.signAndSend(alice);
  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());
