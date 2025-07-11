/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type DocumentMetadataStruct = {
  documentHash: BytesLike;
  timestamp: BigNumberish;
  owner: AddressLike;
  documentName: string;
};

export type DocumentMetadataStructOutput = [
  documentHash: string,
  timestamp: bigint,
  owner: string,
  documentName: string
] & {
  documentHash: string;
  timestamp: bigint;
  owner: string;
  documentName: string;
};

export type DocumentRegisterParamsStruct = {
  documentHash: BytesLike;
  documentName: string;
};

export type DocumentRegisterParamsStructOutput = [
  documentHash: string,
  documentName: string
] & { documentHash: string; documentName: string };

export interface DocumentVerifierInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "documents"
      | "getUserDocuments"
      | "registerDocument"
      | "updateDocumentName"
      | "userDocuments"
      | "verifyDocument"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "DocumentRegistered"): EventFragment;

  encodeFunctionData(
    functionFragment: "documents",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserDocuments",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerDocument",
    values: [DocumentRegisterParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDocumentName",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "userDocuments",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyDocument",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "documents", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserDocuments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerDocument",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDocumentName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userDocuments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyDocument",
    data: BytesLike
  ): Result;
}

export namespace DocumentRegisteredEvent {
  export type InputTuple = [
    documentHash: BytesLike,
    timestamp: BigNumberish,
    owner: AddressLike,
    documentName: string
  ];
  export type OutputTuple = [
    documentHash: string,
    timestamp: bigint,
    owner: string,
    documentName: string
  ];
  export interface OutputObject {
    documentHash: string;
    timestamp: bigint;
    owner: string;
    documentName: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface DocumentVerifier extends BaseContract {
  connect(runner?: ContractRunner | null): DocumentVerifier;
  waitForDeployment(): Promise<this>;

  interface: DocumentVerifierInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  documents: TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, bigint, string, string] & {
        documentHash: string;
        timestamp: bigint;
        owner: string;
        documentName: string;
      }
    ],
    "view"
  >;

  getUserDocuments: TypedContractMethod<
    [_user: AddressLike],
    [DocumentMetadataStructOutput[]],
    "view"
  >;

  registerDocument: TypedContractMethod<
    [_params: DocumentRegisterParamsStruct],
    [void],
    "nonpayable"
  >;

  updateDocumentName: TypedContractMethod<
    [_documentHash: BytesLike, _newName: string],
    [void],
    "nonpayable"
  >;

  userDocuments: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [string],
    "view"
  >;

  verifyDocument: TypedContractMethod<
    [_documentHash: BytesLike],
    [DocumentMetadataStructOutput],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "documents"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, bigint, string, string] & {
        documentHash: string;
        timestamp: bigint;
        owner: string;
        documentName: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserDocuments"
  ): TypedContractMethod<
    [_user: AddressLike],
    [DocumentMetadataStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "registerDocument"
  ): TypedContractMethod<
    [_params: DocumentRegisterParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateDocumentName"
  ): TypedContractMethod<
    [_documentHash: BytesLike, _newName: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "userDocuments"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifyDocument"
  ): TypedContractMethod<
    [_documentHash: BytesLike],
    [DocumentMetadataStructOutput],
    "view"
  >;

  getEvent(
    key: "DocumentRegistered"
  ): TypedContractEvent<
    DocumentRegisteredEvent.InputTuple,
    DocumentRegisteredEvent.OutputTuple,
    DocumentRegisteredEvent.OutputObject
  >;

  filters: {
    "DocumentRegistered(bytes32,uint256,address,string)": TypedContractEvent<
      DocumentRegisteredEvent.InputTuple,
      DocumentRegisteredEvent.OutputTuple,
      DocumentRegisteredEvent.OutputObject
    >;
    DocumentRegistered: TypedContractEvent<
      DocumentRegisteredEvent.InputTuple,
      DocumentRegisteredEvent.OutputTuple,
      DocumentRegisteredEvent.OutputObject
    >;
  };
}
