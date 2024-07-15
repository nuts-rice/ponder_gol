import { createConfig } from "@ponder/core";
import { parseAbiItem, narrow } from "abitype";
import { http } from "viem";

import { LlamaCoreAbi } from "./abis/LlamaCoreAbi";
import { LlamaPolicyAbi } from "./abis/LlamaPolicyAbi";
import { GolCoreAbi } from "./abis/GolCoreAbi";
import { GolAbi } from "./abis/golAbi";
const llamaFactoryEvent = parseAbiItem(
  "event LlamaInstanceCreated(address indexed deployer, string indexed name, address llamaCore, address llamaExecutor, address llamaPolicy, uint256 chainId)"
);

const golFactoryEvent = parseAbiItem(
  "event GolInstanceCreated(address indexed deployer, string indexed name, address gol, address golExecutor, address golPolicy, uint256 chainId)"
);

const golContractInterface = [
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "string", name: "board_id", type: "string" },
    ],
    outputs: [],
    name: "evolve_board",
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "address",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "price",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "board_id",
        type: "string",
        indexed: true,
        internalType: "string",
      },
    ],
    outputs: [],
    name: "new_board",
    stateMutability: "payable",
    type: "function",
  },
  {
    type: "event",
    name: "NewBoardEvent",
    inputs: [
      {
        name: "userAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "price",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],

    outputs: [
      {
        name: "Board",
        type: "tuple[][]",
        internalType: "struct Board",
        components: [
          { name: "grid", type: "tuple[][]", internalType: "CellGrid" },
          { name: "time", type: "uint256", internalType: "uint256" },
          { name: "generation", type: "uint256", internalType: "uint256" },
          {
            name: "board_id",
            type: "string",
            indexed: false,
            internalType: "string",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EvolveBoardEvent",
    inputs: [
      {
        name: "userAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "price",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "board_id",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
    outputs: [],
  },
] as const;
export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_11155111),
    },
    arbitrum: {
      chainId: 42161,
      transport: http(process.env.PONDER_RPC_URL_42161),
    },
  },
  contracts: {
    LlamaCore: {
      network: "sepolia",
      abi: LlamaCoreAbi,
      factory: {
        address: "0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB",
        event: llamaFactoryEvent,
        parameter: "llamaCore",
      },
      startBlock: 4121269,
    },
    LlamaPolicy: {
      network: "sepolia",
      abi: LlamaPolicyAbi,
      factory: {
        address: "0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB",
        event: llamaFactoryEvent,
        parameter: "llamaPolicy",
      },
      startBlock: 4121269,
    },
    Gol: {
      network: "arbitrum",
      abi: golContractInterface,
      factory: {
        address: "0xDA74E3070adC30ADBF4465176C9365878C6a9845",
        event: golFactoryEvent,
        parameter: "gol",
      },
      startBlock: 4121269,
    },
  },
});
