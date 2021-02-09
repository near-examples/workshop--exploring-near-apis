# Challenge: Managing keys with NEAR Shell

In this challenge you will authorize NEAR Shell to use to your (new or existing) account via NEAR Wallet.

Note that the pattern `<???>` is meant to represent the unique portion of your account name on the NEAR network to make this challenge easier to follow.

- [Challenge: Managing keys with NEAR Shell](#challenge-managing-keys-with-near-shell)
  - [Manage a single account](#manage-a-single-account)
    - [Login using NEAR Shell](#login-using-near-shell)
    - [Explore the account state](#explore-the-account-state)
    - [Explore the account access keys](#explore-the-account-access-keys)
  - [Manage sub-accounts](#manage-sub-accounts)
    - [Create a sub account](#create-a-sub-account)
    - [Deploy and test a contract](#deploy-and-test-a-contract)

## Manage a single account

Visit the [documentation for NEAR Shell](https://docs.near.org/docs/tools/near-cli) and install it locally.

_Using Gitpod?_

- This step is already done for you. You can jump to logging in.

```sh
npm i -g near-shell
```

### Login using NEAR Shell

Login with NEAR Shell to authorize it for `FullAccess` use with a new or existing NEAR account. You must create an account in this step if you don't already have one

_Using Gitpod?_

- Click **Open Preview** button (will appear in the middle of 3 blue buttons)

```sh
near login
```

Follow the prompts until you see something like this in your terminal

```text
Which account did you authorize for use with NEAR Shell?
Enter it here (if not redirected automatically):
Logged in as [ <???>.testnet ] with public key [ ed25519:Hyxp7i... ] successfully
```

At this point one of two things has happened depending on the contents of the folder where you ran `near login`.

**(A) If you were in a project** created using `create-near-app` for example ([see here for more details](https://docs.near.org/docs/quick-start/create-near-app)) then you will have a `neardev` subfolder with the private key providing full access to the account you just authorized for use with NEAR Shell

```text
neardev
└── default
    └── <???>.testnet.json
```

**(B) Otherwise** you will find a folder called `~/.near-credentials` in your home directory

```text
/Users/<???>/.near-credentials
└── default
    └── <???>.testnet.json
```

_Using Gitpod?_

Try the command `tree ~/.near-credentials/` to see your credentials

```
/home/gitpod/.near-credentials/
└── default
    └── <???>.testnet.json
```


### Explore the account state

_Using Gitpod?_
- Find and replace all instances of `<???>` on this page for a smooth workflow

_(These steps explore publicly available information for all accounts. We included them **after** login in case you just created a **new** account for yourself)_

View state on **any** account

```sh
near state <???>.testnet
```

You should see something like this, although your `block_height` and `block_hash` will be different

```js
{
  amount: '100000000000000000000000000',
  locked: '0',
  code_hash: '11111111111111111111111111111111',
  storage_usage: 182,
  storage_paid_at: 0,
  block_height: 2440833,
  block_hash: 'CU4ab5yAN5HYoakRDNiN4ERVRwYRNjiJaTGgrmkSF8yF',
  formattedAmount: '100'
}
```

If the account has a contract deployed to it, you will see a different `code_hash` that represents the sha256 digest of the contract Wasm code encoded as base58. See the file `bin/wasm-to-codehash` in this repository for Python code that calculates the code_hash given a path to a compiled contract file.

```js
{
  amount: '99999999948684219965170000',
  locked: '0',
  code_hash: '5KjqNZMPuZZoCuyYc1eHbBLCvCC9c1bh5NLvv3HsVcKH',  // <-- this will be different depending on the deployed contract
  storage_usage: 42513,                                       // <-- this includes deployed contract code and state stored by the account
  storage_paid_at: 0,
  block_height: 2440809,
  block_hash: '6kU6huk1YQ8SRNPVLTk71dFpDeg2sE9aWPH21HcWbzrR',
  formattedAmount: '99.99999994868421996517'
}
```

### Explore the account access keys

View access keys on **any** account

```sh
near keys <???>.testnet
```

You should see something like this representing an account with a single `FullAccess` key, the same one that NEAR Shell has been authorized to use and is now in your filesystem in either the local `neardev` folder or the global `~/.near-credentials` folder.

```js
[
  {
    public_key: "ed25519:GBut2CEV6wDmbeU4c6GjZjwZ52EepTSpiss72pfsG75g",
    access_key: { nonce: 0, permission: "FullAccess" },
  },
];
```

If the account was used to authorize an example app like Greeting or Counter available at http://near.dev then it will also have `FunctionCall` access keys

```js
[
  {
    public_key: "ed25519:CwSDTCU4HnpyqnphpWtjHSEYo16FaNZucWUs6Sgfy8Hn",
    access_key: { nonce: 0, permission: "FullAccess" },
  },
  {
    public_key: "ed25519:BNpJnLdbGY2PuXRL9jCxG6pzpLF1fR2iWcbuWymTDL37",
    access_key: {
      nonce: 0,
      permission: {
        // this is a restricted key for limited use by an application
        FunctionCall: {
          allowance: "10000000000000000000000",
          receiver_id: "null",
          method_names: [],
        },
      },
    },
  },
];
```

**A brief aside about `nonce` values**

In both examples of the access keys above, `FullAccess` keys and `FunctionCall` access keys, there is a `nonce` associated with each key which tracks how many times it has been used. This helps the NEAR runtime distinguish between transactions and avoid processing duplicate transactions. [See this page for more detail](https://nomicon.io/ChainSpec/Transactions.html#transaction-ordering-example-using-pool-iterator) about how NEAR uses `nonce` values.

## Manage sub-accounts

When working with contracts, you will create sub-accounts on your main account. These sub accounts are created using NEAR Shell

### Create a sub account

Let's create a new account that is controlled your main account. But let's do this in the context of deploying a contract

```bash
near create_account greeting.<???>.testnet --master-account <???>.testnet --helper-url https://helper.testnet.near.org
```

### Deploy and test a contract

**First build** one of the contracts from the root folder of the repository

```sh
yarn build greeting
```

**Then deploy** the contract

- We assume you already created `greeting.<???>.testnet` in a previous step

```text
near deploy --wasm-file out/greeting.wasm --account-id greeting.<???>.testnet
```

**Finally test** one of the contract methods: `sayMyName()`

```text
near call greeting.<???>.testnet sayMyName --account-id <???>.testnet
```

_Expected outcome_

```text
Scheduling a call: greeting.<???>.testnet.sayMyName()
[greeting.<???>.testnet]: sayMyName() was called
'Hello, <???>.testnet!'
```

**And cleanup** by deleting the contract account\*\*

```text
near delete greeting.<???>.testnet <???>.testnet
```

_Expected outcome_

```text
Deleting account. Account id: greeting.<???>.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, beneficiary: <???>.testnet
Account greeting.<???>.testnet for network "default" was deleted.
```
