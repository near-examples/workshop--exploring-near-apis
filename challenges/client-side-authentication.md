# Challenge: Client-side Authentication with NEAR

In this challenge you will setup a simple playground in your browser that lets you connect to the NEAR network, authenticate using NEAR Wallet and interact with a small piece `near-api-js`

- [Setup your playground](#setup-your-playground)
- [Verify your setup](#verify-your-setup)
  - [Test 1: Do you you have a reference to near-api-js?](#test-1-do-you-you-have-a-reference-to-near-api-js)
  - [Test 2: Do you have a connection to the NEAR network?](#test-2-do-you-have-a-connection-to-the-near-network)
  - [Test 3: Do you have a reference to a wallet object?](#test-3-do-you-have-a-reference-to-a-wallet-object)
- [Sign in using NEAR Wallet](#sign-in-using-near-wallet)
- [Use the account](#use-the-account)

## Setup your playground

Open the file `challenges/apps/playground/index.html` in a browser

**Don't use the filesystem** (you should not see `file://` in the beginning of the URL in your browser)

- If you're using VSCode you can use the [LiveServer plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and right click on the `index.html` file to open with LiveServer
- If you prefer Node.js, the incantation is `npx serve .`
- If you prefer Python, the incantation is `python -m SimpleHTTPServer 8000`

## Verify your setup

Verify your playground is ready for maximum velocity fun -- try copying and pasting each of the following snippets into the browser's developer console:

### Test 1: Do you you have a reference to near-api-js?

Use `near-api-js` to generate a new keypair (no network connection is needed for this part)

```js
const keypair = nearApi.utils.KeyPair.fromRandom("ed25519");
console.log("public key: ", keypair.publicKey.toString());
console.warn("private key: ", keypair.secretKey);
```

**You'll know it worked** if you see a public key starting with `ed25519:` and a longer private key in the console.

```text
public key:   ed25519:2SNxoAeqRdmmSN4yxL7JwQgbmX7Xtw6ut59sEWn8LVTy
private key:  5RbTpitV6yDXji8i42S8tguM8kjBaye39gWoyYnvZHdYXjdkX3vvrXYh92hZ1tcKDNMT53EDugm82o
```

The private key appears yellow as a reminder to you that this is sensitive data. _Private keys are the source of truth in cryptographic identity schemes._

### Test 2: Do you have a connection to the NEAR network?

Try using `near-api-js` to inspect the state of the blockchain

```js
const networkStatus = await near.connection.provider.status();
const blockchainProgress = networkStatus.sync_info;
console.table(blockchainProgress);
```

You should see something like a table of key-value pairs including `latest_block_hash` and `latest_block_time`

### Test 3: Do you have a reference to a wallet object?

Try using it to confirm whether or not you are signed in.

```js
wallet.isSignedIn(); // => false
wallet.getAccountId(); // => ""
```

## Sign in using NEAR Wallet

Sign into NEAR Wallet right from your console

```js
// FYI, this is the method signature
// async requestSignIn(contractId: string, title: string, successUrl: string, failureUrl: string)
await wallet.requestSignIn(null, "near-api-js client-side challenge");
```

You should be immediately redirected to NEAR Wallet.

You'll know it worked when you land on the NEAR Wallet website, either being prompted to create a new account (if you've never logged into NEAR using the same web browser) or being prompted to authorize "near-api-js client-side challenge" on your account.

## Use the account

Explore the account state

```js
let account = await near.account(wallet.getAccountId());
let state = await account.state();
console.table(state);
```

And authorized apps

```js
let account = await near.account(wallet.getAccountId()); // this line is repeated here in case of browser refresh
let details = await account.getAccountDetails();
console.table(details.authorizedApps);
```
