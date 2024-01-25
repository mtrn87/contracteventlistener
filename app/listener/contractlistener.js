const { ethers } = require("ethers");

const CONTRACT_ABI = require("../abi/usdt.json");
const ADDRESS_TO_LISTEN = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const WS_PROVIDER = new ethers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/e3MD9Jhb5V4v6lkH2_mCksr2m8-ISvIQ");

/**
 * Check events on ERC20
 * https://eips.ethereum.org/EIPS/eip-20
 */
async function listenTransferOnAddress() {

  try {
    console.log("Connecting Websocket:", WS_PROVIDER.websocket.url);
    console.log("Listening on address:", ADDRESS_TO_LISTEN);

    let contract = new ethers.Contract(ADDRESS_TO_LISTEN, CONTRACT_ABI, WS_PROVIDER);
    
    contract.on("Transfer", (from, to, value, event) => {

      let info = {
        from: from,
        to: to,
        value: ethers.formatUnits(value, 6),
        data: event,
      };
      console.log(info);

      console.log("WS Aberto readyState -> ", WS_PROVIDER.websocket.readyState);
    });
    
  } catch (err) {
    console.error('ERROR:', err);
  }
}

module.exports = {
  listenTransferOnAddress
};