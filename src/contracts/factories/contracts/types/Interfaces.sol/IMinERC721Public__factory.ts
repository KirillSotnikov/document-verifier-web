/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IMinERC721Public,
  IMinERC721PublicInterface,
} from "../../../../contracts/types/Interfaces.sol/IMinERC721Public";

const _abi = [
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
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct ReadPublicCapsuleParams",
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
                name: "revealMessageHash",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "unlockTimestamp",
                type: "uint256",
              },
            ],
            internalType: "struct PublicCapsuleParams",
            name: "data",
            type: "tuple",
          },
          {
            internalType: "enum CapsuleStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct PublicCapsuleData",
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
] as const;

export class IMinERC721Public__factory {
  static readonly abi = _abi;
  static createInterface(): IMinERC721PublicInterface {
    return new Interface(_abi) as IMinERC721PublicInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IMinERC721Public {
    return new Contract(address, _abi, runner) as unknown as IMinERC721Public;
  }
}
