const Web3 = require("web3");
const fs = require("fs");
require("dotenv").config();

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);
//account address not Primary key
const tester = "0x67B335873E3b99A3a5df97A80e91C87620F431c9";

const abi = JSON.parse(
  fs.readFileSync("DonationToken_sol_DonationToken.abi", "utf-8")
);
const bytecode = fs.readFileSync(
  "DonationToken_sol_DonationToken.bin",
  "utf-8"
);
const contract = new web3.eth.Contract(abi);

const deployParams = {
  data: "0x" + bytecode,
  arguments: ["Donation Token", "DON"],
};

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
console.log(process.env.PRIVATE_KEY.length);
const options = {
  from: tester,
  gas: 3000000,
  gasPrice: web3.utils.toWei("20", "gwei"),
};

contract
  .deploy(deployParams)
  .send(options)
  .on("receipt", function (receipt) {
    console.log("Contract deployed at:", receipt.contractAddress);
  });
