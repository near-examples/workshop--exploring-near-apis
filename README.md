![Near, Inc. logo](https://near.org/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311)

# NEAR Protocol Workshop :: Exploring NEAR Protocol APIs

This workshop includes several activities:

- a [**client-side playground**](#activityclient-side-playground) to better understand how `near-api-js` works
- a [**console-based challenge**](#activityhello-near-shell) to practice using NEAR Shell to manage keys, create accounts and deploy contracts
- a [**monitoring challenge**](#activityrealtime-dapp-monitoring-hack) to apply lessons about `near-api-js` and `JSON RPC API` into a single interface

**Prerequisites**

If you're already comfortable with JavaScript, the command line and JSON RPC APIs then this should be a breeze. If you're unfamiliar with the NEAR APIs and have limited or no experience with our network then this workshop will be very helpful. If you have no programming experience then this workshop will be challenging for you -- find someone to pair with so you can stay motivated and productive.

**Companion Presentation**

This hands-on workshop is paired with a presentation called [Hello, NEAR APIs](https://docs.google.com/presentation/d/1hD643Pfg4moFUBFNpAyiMJe2oFYQQuBjKAHg2Rq41kQ) which helps set the context for this work and clarifies a few key mental models.

Before diving into this workshop, have a look at the slides linked above.

**Orientation**

If you're totally new to NEAR you can [start here](https://docs.near.org/docs/concepts/new-to-near) with a high level overview.

NEAR Protocol (aka "NEAR") is a public peer-to-peer key-value database. Public as in open to everyone for reading anything and writing what you are allowed to. Write permissions are defined by access keys so only the owner of the data can give permissions to modify data they own.

Manipulation of data is controlled by stored procedures (smart contracts) executing as [WebAssembly (Wasm)](https://webassembly.org) which means they can be implemented in any programming language that compiles to Wasm (ie. Rust, AssemblyScript, Kotlin, C, C++, Nim, Zig, etc). Currently only the first two languages are supported for development on the NEAR platform.

_We will not be building dApps around any of these contracts since our focus is on learning AssemblyScript. Almost all of the contract code presented in this workshop is also running on [live examples](https://near.dev) where you will also find the frontend code that relies on these contracts._

## Environment Setup

### Using Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/near-examples/workshop--exploring-near-apis)

### Local Setup

1. clone this repo locally
2. run `yarn` to install dependencies

## Available commands

### Building contracts

- `yarn build` builds all contracts
- `yarn clean` deletes the `out` folder containing built contracts

You can filter any of the tests by a specific contract name by appending the contract name

```text
yarn build greeting
```

### Testing contracts

- `yarn test:all` runs all tests for all contracts
- `yarn test:unit` runs only unit tests for all contracts
- `yarn test:simulate:runtime` runs only simulation tests for all contracts

You can filter any of the **unit tests** by a specific contract name by appending `-f <contract name>` to the command above, for example

```
yarn test:unit -f greeting
```

See `package.json` for more detail about these and other scripts.

You will find the following folder structure in this repository. Some files have been omitted for clarity

```text
README.md
│
├── bin
│   ├── decode-state
│   ├── deploy-contract
│   ├── transcode
│   └── wasm-to-codehash
│
├── challenges
│   ├── client-side-authentication.md
│   └── managing-keys-with-near-shell.md
│
└── contracts
    ├── 01.greeting
    ├── 02.counter
    ├── 03.guestbook
    ├── 04.cross-contract-calls
    └── compile.js
```

_Note the projects are ordered by increasing complexity so lower numbers roughly implies "easier to understand"._

## Fundamentals of NEAR Protocol

### Accounts

A few points are worth noting early about how accounts work on NEAR since they're likely different from other blockchain account naming systems you've worked with.

- Accounts are human readable names and may represent either a user, a contract or both.
  - Account names follow a DNS naming pattern segmented by periods (`.`)
    - Account IDs have a minimum length of 2 characters
    - NEAR deducts a recurrent tax from the account balance for short account IDs (up to 10 characters) with an exponentially decreasing rate based on length.
    - All accounts on a specific network end in the name of the network (ie. one of `mainnet`, `testnet`, `betanet`)
    - It is reasonable to create your user account as `username.testnet` and deploy contracts as sub-accounts (`guestbook.username.testnet`, `v2.guestbook.username.testnet`, etc)
  - Accounts maintain their own storage
    - Storage includes the account name, contract code (if a contract is deployed to the account) and any state storage
    - Rent is deducted from an account's balance of NEAR tokens
  - Each account may have 1 and only 1 contract deployed to its storage.
    - An account **without** a contract will report a `code_hash` of `11111111111111111111111111111111`
    - An account **with** a contract will report a `code_hash` of some value that is unique to the compiled `.wasm` of that contract
    - Subsequent deployments overwrite contract code _without_ affecting storage (except for the `STATE` key which holds the contract code)

_You can read [more about accounts here](https://docs.near.org/docs/concepts/account)_

## Contracts

- Contracts must be deployed to one (or more) specific account(s)

  - For a family of contracts, account names can be scoped as `contract1.myapp`, `contract2.myapp`

- To call methods on deployed contracts we have a choice of tools and interfaces
  - RPC ([see here](https://docs.near.org/docs/interaction/rpc))
  - `near-api-js` ([see here](https://near.github.io/near-api-js/classes/_account_.account.html#functioncall))
  - `NEAR Shell` ([see here](https://docs.near.org/docs/tools/near-cli))

## Activity::Client-Side Playground

> **_Instructions_**
>
> Open the [challenge page](challenges/client-side-authentication.md) and step through the instructions
>
> Keep your own notes. Time permitting, we will share and discuss your findings and answer questions at the end of the activity.

`near-api-js` (our JavaScript API) wraps the NEAR JSON RPC API and exposes NEAR Wallet authentication. This challenge explores the bare minimum setup needed to connect to NEAR using `near-api-js` and authentication using NEAR Wallet.

## Activity::Hello, NEAR Shell!

> **_Instructions_**
>
> Open the [challenge page](challenges/managing-keys-with-near-shell.md) and step through the instructions
>
> Keep your own notes. Time permitting, we will share and discuss your findings and answer questions at the end of the activity.

NEAR Shell serves as a console Swiss army knife with the ability to manage accounts, contracts and more. This challenge walks through installing NEAR Shell before using it to create accounts, deploy contracts and test them on the network.

## Activity::Realtime dApp Monitoring Hack

> **_Instructions_**
>
> Open the [challenge page](challenges/realtime-monitoring-of-dapps.md) and step through the instructions
>
> Keep your own notes. Time permitting, we will share and discuss your findings and answer questions at the end of the activity.

NEAR's JSON RPC API provides a number of methods that make it easy for developers to query the network. Combining these methods with the `watch` command lets us refresh at regular intervals and create a realtime monitor for our dApps

## Getting Help

If you find yourself stuck with any of this, feel free to reach out to us via the following links:

- [near.org / help](http://near.org/help)
- [near.chat](http://near.chat)
- [documentation](http://docs.near.org)
