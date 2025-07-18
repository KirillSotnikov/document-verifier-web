/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  PrivateCapsuleERC721,
  PrivateCapsuleERC721Interface,
} from "../../../contracts/collection/PrivateCapsuleERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "adminAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "readKey",
            type: "string",
          },
        ],
        internalType: "struct ReadPrivateCapsuleParams",
        name: "readParams",
        type: "tuple",
      },
    ],
    name: "getCapsuleMetadata",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "message",
                type: "string",
              },
              {
                internalType: "bytes32",
                name: "readMessageHash",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "revealMessageHash",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "unlockTimestamp",
                type: "uint256",
              },
            ],
            internalType: "struct PrivateCapsuleParams",
            name: "data",
            type: "tuple",
          },
          {
            internalType: "enum CapsuleStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct PrivateCapsuleData",
        name: "result",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_metadataSourceAddress",
        type: "address",
      },
    ],
    name: "setMetadataSource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f5ffd5b506040516117a43803806117a483398101604081905261002e91610122565b60408051808201825260128152715072697661746554696d6543617073756c6560701b602080830191909152825180840190935260048352635052544360e01b9083015282918181846001600160a01b0381166100a457604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b6100ad816100d3565b5060016100ba83826101e7565b5060026100c782826101e7565b505050505050506102a1565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f60208284031215610132575f5ffd5b81516001600160a01b0381168114610148575f5ffd5b9392505050565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061017757607f821691505b60208210810361019557634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156101e257805f5260205f20601f840160051c810160208510156101c05750805b601f840160051c820191505b818110156101df575f81556001016101cc565b50505b505050565b81516001600160401b038111156102005761020061014f565b6102148161020e8454610163565b8461019b565b6020601f821160018114610246575f831561022f5750848201515b5f19600385901b1c1916600184901b1784556101df565b5f84815260208120601f198516915b828110156102755787850151825560209485019460019092019101610255565b508482101561029257868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b6114f6806102ae5f395ff3fe608060405234801561000f575f5ffd5b5060043610610127575f3560e01c80638da5cb5b116100a9578063b88d4fde1161006e578063b88d4fde1461026e578063c87b56dd14610281578063cb3c7ae114610294578063e985e9c5146102b4578063f2fde38b146102c7575f5ffd5b80638da5cb5b1461021d5780638edec0741461022d57806394bf804d1461024057806395d89b4114610253578063a22cb4651461025b575f5ffd5b806342842e0e116100ef57806342842e0e146101bb57806342966c68146101ce5780636352211e146101e157806370a08231146101f4578063715018a614610215575f5ffd5b806301ffc9a71461012b57806306fdde0314610153578063081812fc14610168578063095ea7b31461019357806323b872dd146101a8575b5f5ffd5b61013e610139366004610edf565b6102da565b60405190151581526020015b60405180910390f35b61015b61032b565b60405161014a9190610f28565b61017b610176366004610f3a565b6103bb565b6040516001600160a01b03909116815260200161014a565b6101a66101a1366004610f6c565b6103e2565b005b6101a66101b6366004610f94565b6103f1565b6101a66101c9366004610f94565b610409565b6101a66101dc366004610f3a565b610423565b61017b6101ef366004610f3a565b610437565b610207610202366004610fce565b610441565b60405190815260200161014a565b6101a661048b565b5f546001600160a01b031661017b565b6101a661023b366004610fce565b61049e565b6101a661024e366004610fe7565b6104c8565b61015b6104da565b6101a6610269366004611011565b6104e9565b6101a661027c36600461113d565b6104f4565b61015b61028f366004610f3a565b610512565b6102a76102a23660046111b4565b610583565b60405161014a9190611240565b61013e6102c23660046112b4565b6105fc565b6101a66102d5366004610fce565b610629565b5f6001600160e01b031982166380ac58cd60e01b148061030a57506001600160e01b03198216635b5e139f60e01b145b8061032557506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606001805461033a906112dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610366906112dc565b80156103b15780601f10610388576101008083540402835291602001916103b1565b820191905f5260205f20905b81548152906001019060200180831161039457829003601f168201915b5050505050905090565b5f6103c582610663565b505f828152600560205260409020546001600160a01b0316610325565b6103ed82823361069b565b5050565b6103f96106a8565b6104048383836106d4565b505050565b61040483838360405180602001604052805f8152506104f4565b61042b6106a8565b610434816106ee565b50565b5f61032582610663565b5f6001600160a01b038216610470576040516322718ad960e21b81525f60048201526024015b60405180910390fd5b506001600160a01b03165f9081526004602052604090205490565b6104936106a8565b61049c5f6106f7565b565b6104a66106a8565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b6104d06106a8565b6103ed8282610746565b60606002805461033a906112dc565b6103ed338383610750565b6104ff8484846103f1565b61050c33858585856107ee565b50505050565b606061051d82610663565b505f61053360408051602081019091525f815290565b90505f8151116105515760405180602001604052805f81525061057c565b8061055b84610916565b60405160200161056c92919061132b565b6040516020818303038152906040525b9392505050565b61058b610e8c565b60075460405163f84ca90b60e01b81526001600160a01b039091169063f84ca90b906105bb90859060040161133f565b5f60405180830381865afa1580156105d5573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526103259190810190611371565b6001600160a01b039182165f90815260066020908152604080832093909416825291909152205460ff1690565b6106316106a8565b6001600160a01b03811661065a57604051631e4fbdf760e01b81525f6004820152602401610467565b610434816106f7565b5f818152600360205260408120546001600160a01b03168061032557604051637e27328960e01b815260048101849052602401610467565b61040483838360016109a6565b5f546001600160a01b0316331461049c5760405163118cdaa760e01b8152336004820152602401610467565b61040483838360405180602001604052805f815250610aaa565b61043481610ab5565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6103ed8183610aed565b6001600160a01b03821661078257604051630b61174360e31b81526001600160a01b0383166004820152602401610467565b6001600160a01b038381165f81815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b1561090f57604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610830908890889087908790600401611469565b6020604051808303815f875af192505050801561086a575060408051601f3d908101601f19168201909252610867918101906114a5565b60015b6108d1573d808015610897576040519150601f19603f3d011682016040523d82523d5f602084013e61089c565b606091505b5080515f036108c957604051633250574960e11b81526001600160a01b0385166004820152602401610467565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b1461090d57604051633250574960e11b81526001600160a01b0385166004820152602401610467565b505b5050505050565b60605f61092283610b4e565b60010190505f8167ffffffffffffffff8111156109415761094161104a565b6040519080825280601f01601f19166020018201604052801561096b576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461097557509392505050565b80806109ba57506001600160a01b03821615155b15610a7b575f6109c984610663565b90506001600160a01b038316158015906109f55750826001600160a01b0316816001600160a01b031614155b8015610a085750610a0681846105fc565b155b15610a315760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610467565b8115610a795783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b50505f90815260056020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b6104ff848484610c25565b5f610ac15f835f610cd2565b90506001600160a01b0381166103ed57604051637e27328960e01b815260048101839052602401610467565b6001600160a01b038216610b1657604051633250574960e11b81525f6004820152602401610467565b5f610b2283835f610cd2565b90506001600160a01b03811615610404576040516339e3563760e11b81525f6004820152602401610467565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610b8c5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610bb8576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610bd657662386f26fc10000830492506010015b6305f5e1008310610bee576305f5e100830492506008015b6127108310610c0257612710830492506004015b60648310610c14576064830492506002015b600a83106103255760010192915050565b6001600160a01b038216610c4e57604051633250574960e11b81525f6004820152602401610467565b5f610c5a83835f610cd2565b90506001600160a01b038116610c8657604051637e27328960e01b815260048101839052602401610467565b836001600160a01b0316816001600160a01b03161461050c576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610467565b5f828152600360205260408120546001600160a01b0390811690831615610cfe57610cfe818486610dc4565b6001600160a01b03811615610d3857610d195f855f5f6109a6565b6001600160a01b0381165f90815260046020526040902080545f190190555b6001600160a01b03851615610d66576001600160a01b0385165f908152600460205260409020805460010190555b5f8481526003602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b610dcf838383610e28565b610404576001600160a01b038316610dfd57604051637e27328960e01b815260048101829052602401610467565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610467565b5f6001600160a01b03831615801590610e845750826001600160a01b0316846001600160a01b03161480610e615750610e6184846105fc565b80610e8457505f828152600560205260409020546001600160a01b038481169116145b949350505050565b6040518060400160405280610ebf6040518060800160405280606081526020015f81526020015f81526020015f81525090565b81526020015f905290565b6001600160e01b031981168114610434575f5ffd5b5f60208284031215610eef575f5ffd5b813561057c81610eca565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b602081525f61057c6020830184610efa565b5f60208284031215610f4a575f5ffd5b5035919050565b80356001600160a01b0381168114610f67575f5ffd5b919050565b5f5f60408385031215610f7d575f5ffd5b610f8683610f51565b946020939093013593505050565b5f5f5f60608486031215610fa6575f5ffd5b610faf84610f51565b9250610fbd60208501610f51565b929592945050506040919091013590565b5f60208284031215610fde575f5ffd5b61057c82610f51565b5f5f60408385031215610ff8575f5ffd5b8235915061100860208401610f51565b90509250929050565b5f5f60408385031215611022575f5ffd5b61102b83610f51565b91506020830135801515811461103f575f5ffd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b6040805190810167ffffffffffffffff811182821017156110815761108161104a565b60405290565b6040516080810167ffffffffffffffff811182821017156110815761108161104a565b604051601f8201601f1916810167ffffffffffffffff811182821017156110d3576110d361104a565b604052919050565b5f67ffffffffffffffff8211156110f4576110f461104a565b50601f01601f191660200190565b5f61111461110f846110db565b6110aa565b9050828152838383011115611127575f5ffd5b828260208301375f602084830101529392505050565b5f5f5f5f60808587031215611150575f5ffd5b61115985610f51565b935061116760208601610f51565b925060408501359150606085013567ffffffffffffffff811115611189575f5ffd5b8501601f81018713611199575f5ffd5b6111a887823560208401611102565b91505092959194509250565b5f602082840312156111c4575f5ffd5b813567ffffffffffffffff8111156111da575f5ffd5b8201604081850312156111eb575f5ffd5b6111f361105e565b81358152602082013567ffffffffffffffff811115611210575f5ffd5b80830192505084601f830112611224575f5ffd5b61123385833560208501611102565b6020820152949350505050565b602081525f82516040602084015280516080606085015261126460e0850182610efa565b905060208201516080850152604082015160a0850152606082015160c085015260208501519150600282106112a757634e487b7160e01b5f52602160045260245ffd5b6040939093015250919050565b5f5f604083850312156112c5575f5ffd5b6112ce83610f51565b915061100860208401610f51565b600181811c908216806112f057607f821691505b60208210810361130e57634e487b7160e01b5f52602260045260245ffd5b50919050565b5f81518060208401855e5f93019283525090919050565b5f610e846113398386611314565b84611314565b60208152815160208201525f6020830151604080840152610e846060840182610efa565b805160028110610f67575f5ffd5b5f60208284031215611381575f5ffd5b815167ffffffffffffffff811115611397575f5ffd5b8201604081850312156113a8575f5ffd5b6113b061105e565b815167ffffffffffffffff8111156113c6575f5ffd5b8201608081870312156113d7575f5ffd5b6113df611087565b815167ffffffffffffffff8111156113f5575f5ffd5b8201601f81018813611405575f5ffd5b805161141361110f826110db565b818152896020838501011115611427575f5ffd5b8160208401602083015e5f6020928201830152835283810151838201526040808501519084015260609384015193830193909352508252611233908301611363565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f9061149b90830184610efa565b9695505050505050565b5f602082840312156114b5575f5ffd5b815161057c81610eca56fea2646970667358221220ae7d40a17a6f193cade97cc1b4190b446760501322ab56078a1a089b397cc48d64736f6c634300081c0033";

type PrivateCapsuleERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PrivateCapsuleERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PrivateCapsuleERC721__factory extends ContractFactory {
  constructor(...args: PrivateCapsuleERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    adminAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(adminAddress, overrides || {});
  }
  override deploy(
    adminAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(adminAddress, overrides || {}) as Promise<
      PrivateCapsuleERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PrivateCapsuleERC721__factory {
    return super.connect(runner) as PrivateCapsuleERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PrivateCapsuleERC721Interface {
    return new Interface(_abi) as PrivateCapsuleERC721Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PrivateCapsuleERC721 {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PrivateCapsuleERC721;
  }
}
