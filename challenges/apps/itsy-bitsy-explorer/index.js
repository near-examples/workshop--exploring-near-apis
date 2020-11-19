const NEAR_ENDPOINT = "https://rpc.betanet.near.org";

document.addEventListener("DOMContentLoaded", () => {
  const qs = document.querySelector.bind(document);
  const output = qs("#response");

  setTimeout(async () => {
    let { blocks, validators, chain_id, version, build } = await getData(
      "header"
    );
    qs("#blocks").innerText = blocks;
    qs("#validators").innerText = validators;
    qs("#chain_id").innerText = chain_id;
    qs("#version").innerText = version;
    qs("#build").innerText = build;
  }, 1000);

  qs("#rpc-method").addEventListener("change", (event) => {
    let request;

    switch (event.target.value) {
      case "status":
        request = getRequest("status");
        break;
      case "block":
        request = getRequest(
          "block",
          "5ian19bsTxBL1YCMNg95xNMpkk4UCPWiD1qqcoPmd449"
        );
        break;
      case "chunk":
        request = getRequest(
          "chunk",
          "BoWLBQSUX8d8HBr6t16WNZNRCYQqsyNo4p78zC794Tgr"
        );
        break;
      case "validators":
        request = getRequest(
          "validators",
          "5ian19bsTxBL1YCMNg95xNMpkk4UCPWiD1qqcoPmd449"
        );
        break;
      case "gas_price":
        request = getRequest(
          "gas_price",
          "5ian19bsTxBL1YCMNg95xNMpkk4UCPWiD1qqcoPmd449"
        );
        break;
    }

    sendJsonRpcRequest(NEAR_ENDPOINT, request)
      .then((data) => (output.innerText = JSON.stringify(data, null, 2)))
      .then(() => hljs.highlightBlock(output));
  });
});

/**
 * Send request to NEAR network
 * @param {string} url
 * @param {object} data
 */
async function sendJsonRpcRequest(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

async function getData(field) {
  let data;
  switch (field) {
    case "header":
      data = await sendJsonRpcRequest(NEAR_ENDPOINT, getRequest("status"));
      return {
        blocks: data.result.sync_info.latest_block_height.toLocaleString(
          "en-US"
        ),
        validators: data.result.validators.length.toLocaleString("en-US"),
        chain_id: data.result.chain_id,
        version: data.result.version.version,
        build: data.result.version.build,
      };
    default:
      console.log(`[${field}] unsupported`);
  }
}

/**
 * Get properly formatted request object to send to the network
 * @param {string} method
 * @param {string} params
 */
function getRequest(method, params) {
  let request = {
    jsonrpc: "2.0",
    id: "idontcare",
  };

  switch (method) {
    case "status":
      Object.assign(request, { method });
      break;
    case "block":
      // assert(params.length = 1, "The [block] method requires block_height as integer or block_hash as string")
      Object.assign(request, { method });
      Object.assign(request, { params: [params] });
      break;
    case "chunk":
      // assert(params.length = 1, "The [block] method requires block_height as integer or block_hash as string")
      Object.assign(request, { method });
      Object.assign(request, { params: [params] });
      break;
    case "validators":
      Object.assign(request, { method });
      Object.assign(request, { params: [params] });
      break;
    case "gas_price":
      // assert(params.length = 1, "The [block] method requires block_height as integer or block_hash as string")
      Object.assign(request, { method });
      Object.assign(request, { params: [params] });
      break;
  }

  return request;
}
