const { cryptoWaitReady, mnemonicGenerate } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');
require('log-timestamp');
const config = require('./config.json');

async function main () {
    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519', ss58Format: config.ss58Format });

    const mnemonic = mnemonicGenerate();

    console.log(mnemonic);

    const sp = keyring.createFromUri(mnemonic, { name: 'sr25519' });

    console.log(sp.address);
}

main().catch(console.error).finally(() => process.exit());
