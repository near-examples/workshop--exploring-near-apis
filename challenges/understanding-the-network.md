## Building the Network

0. Network options

   - MainNet: launched April 2020!
   - TestNet
   - BetaNet
   - DevNet
   - LocalNet

1. Standing up a docker node

   - nearup

2. Standing up a binary node

   - cloning and building nearcore
   - nearup

3. Standing up a custom node
   - cloning, editing and building nearcore
   -

## Modifying the Network

1. Creating accounts
2. Deploying contracts
3. Sending transactions

## Monitoring the Network

1. Observing accounts
2. Observing the network

### Exploring Sample dApps

**Tools**

- NEAR Shell

  - near-api-js
    - JSON RPC API
      - monitoring contract account state
      - monitoring user account state
      - monitoring blockchain

- NEAR Explorer

  - near-api-js
    - JSON RPC API
      - monitoring blockchain

- Insomniac, HTTPie, curl
  - JSON RPC API

#### Case 1: User sends standard message

CONTRACT_ACCOUNT=dev-1588684583975
watch -d -c -n .5 near state $CONTRACT_ACCOUNT
watch -d -c -n .5 "http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query params:='{\"request_type\": \"view_state\", \"finality\": \"final\", \"account_id\": \"$CONTRACT_ACCOUNT\", \"prefix_base64\": \"\"}' | jq --color-output"

http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=status params:='{}'
