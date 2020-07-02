# Challenge: Realtime Monitoring of Contract State

In this challenge you will setup an interface to monitor the Guestbook example application. This challenge assumes the use of Gitpod but can be applied to any system that supports the commands included here. This challenge was testing on macOS and Gitpod.

- [Start with the Guestbook demo](#start-with-the-guestbook-demo)
- [Setup your monitors](#setup-your-monitors)
  - [Terminal (A)](#terminal-a)
  - [Terminal (B)](#terminal-b)

## Start with the Guestbook demo

1. Open http://near.dev and find the Guestbook demo (although this will work with any application on the NEAR platform)

2. Open the Guestbook example in Gitpod and let it settle

   - You may want to open the Guestbook interface in _Preview Mode_ when prompted since this provides a smooth experience for the steps that follow

3. Open 2 new terminals: (A) and (B), and arrange them side-by-side just above the bottom terminal, replacing the README (3 terminals all together)

```text
 +------------------------------------------------------------------+
 |                    |                   |                         |
 |                    |                   |                   Login |
 |                    |                   |                         |
 |     Terminal A     |     Terminal B    |                         |
 |                    |                   |        Guestbook        |
 |                    |                   |                         |
 |                    |                   |         open in         |
 |                    |                   |                         |
 |                    |                   |       Preview Mode      |
 |                    |                   |                         |
 |                    |                   |                         |
 +----------------------------------------+                         |
 |                                        |                         |
 |             Initial Terminal           |                         |
 |                                        |                         |
 +------------------------------------------------------------------+
```

4. `brew install httpie` (takes some time, several minutes)

5. `npm i -g near-shell` (if not already installed, check with `which near` in one of the terminals)

## Setup your monitors

In each of the 2 terminals, (A) and (B), run the following commands

### Terminal (A)

To view metadata for contract account and your own user account, first save the accounts to environment variables

```sh
MY_ACCOUNT=#<your new account>
CONTRACT_ACCOUNT=#<contract account>
```

And then use them in the following `watch` command (it refreshes twice per second and colorizes the changes between refreshes)

```
watch -d -c -n .5 "near state $MY_ACCOUNT; near state $CONTRACT_ACCOUNT"
```

### Terminal (B)

To view detailed contract state in real time

First save the contract account name to an environment variable

```sh
CONTRACT_ACCOUNT=#<contract account>
```

And then use it in the following `watch` command

```sh
watch -d -c -n .5 "http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query params:='{\"request_type\": \"view_state\", \"finality\": \"final\", \"account_id\": \"$CONTRACT_ACCOUNT\", \"prefix_base64\": \"\"}' | jq --color-output '.'"
```

If things are working, you should notice that everytime you add a message to the Guestbook, the contract state grows. Note that NEAR account state is encoded in `base64`.


## Notes

The `watch` command executes a program periodically, showing output fullscreen

```
Usage:
 watch [options] command

Options:
  -b, --beep             beep if command has a non-zero exit
  -c, --color            interpret ANSI color and style sequences
  -d, --differences[=<permanent>]
                         highlight changes between updates
  -e, --errexit          exit if command has a non-zero exit
  -g, --chgexit          exit when output from command changes
  -n, --interval <secs>  seconds to wait between updates
  -p, --precise          attempt run command in precise intervals
  -t, --no-title         turn off header
  -x, --exec             pass command to exec instead of "sh -c"

 -h, --help     display this help and exit
 -v, --version  output version information and exit

For more details see watch(1).
```
