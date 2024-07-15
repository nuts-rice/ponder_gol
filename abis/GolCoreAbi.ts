export const GolCoreAbi = [
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
