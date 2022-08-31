import web3NoAccount from "./web3";
import factory from "./factoryAbi.json";
import factoryvariable from "./factoryVariableAbi.json";
import StakeBnbToBnb from "./stakeBnbtoBnbAbi.json";
import StakeBnbToToken from "./stakeBnbforTokenAbi.json";
import StakeTokenToBnb from "./stakeTokentoBnbAbi.json";
import StakeTokenToToken from "./stakeTokentoTokenAbi.json";

import VStakeBnbToBnb from "./vstakeBnbforBnbAbi.json";
import VStakeBnbToToken from "./vstakeBnbforTokenAbi.json";
import VStakeTokenToBnb from "./vStaketokenforBnbAbi.json";
import VStakeTokenToToken from "./vStakeTokenforTokenAbi.json";
import TOKENT from "./tokenAbi.json";

// return instance of contract
// isko jidr import kren gy udr contract ky sary functions call kr skty
const getContract = (abi, address, web3) => {
  const _web3 = web3 ?? web3NoAccount;
  // console.log('_web3',_web3);
  return new _web3.eth.Contract(abi, address);
};

export const getFactoryContract = (address, web3) => {
  return getContract(factory, address, web3);
};

export const getFactoryVariableContract = (address, web3) => {
  return getContract(factoryvariable, address, web3);
};

export const getStakeBNBtoBNB = (address, web3) => {
  return getContract(StakeBnbToBnb, address, web3);
};

export const getStakeBNBtoToken = (address, web3) => {
  return getContract(StakeBnbToToken, address, web3);
};

export const getStakeTokentoToken = (address, web3) => {
  return getContract(StakeTokenToToken, address, web3);
};

export const getStakeTokentoBNB = (address, web3) => {
  return getContract(StakeTokenToBnb, address, web3);
};



export const vgetStakeBNBtoBNB = (address, web3) => {
  return getContract(VStakeBnbToBnb, address, web3);
};

export const vgetStakeBNBtoToken = (address, web3) => {
  return getContract(VStakeBnbToToken, address, web3);
};

export const vgetStakeTokentoToken = (address, web3) => {
  return getContract(VStakeTokenToToken, address, web3);
};

export const vgetStakeTokentoBNB = (address, web3) => {
  return getContract(VStakeTokenToBnb, address, web3);
};

export const getTokenApprove = (address, web3) => {
  return getContract(TOKENT, address, web3);
};
