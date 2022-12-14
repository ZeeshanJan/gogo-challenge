/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace GogoLibrary {
  export type GogoStakerStruct = {
    staked: PromiseOrValue<boolean>;
    stakerAddress: PromiseOrValue<string>;
    stakedAmount: PromiseOrValue<BigNumberish>;
    stakedSince: PromiseOrValue<BigNumberish>;
  };

  export type GogoStakerStructOutput = [
    boolean,
    string,
    BigNumber,
    BigNumber
  ] & {
    staked: boolean;
    stakerAddress: string;
    stakedAmount: BigNumber;
    stakedSince: BigNumber;
  };
}

export interface GogoStakingAppInterface extends utils.Interface {
  functions: {
    "calculateCompound(address)": FunctionFragment;
    "devAddress()": FunctionFragment;
    "getLatestPrice()": FunctionFragment;
    "getStakingInfo(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rewardDuration()": FunctionFragment;
    "setDevUSDCAddress(address)": FunctionFragment;
    "stakeETH()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unstakeETH()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "calculateCompound"
      | "devAddress"
      | "getLatestPrice"
      | "getStakingInfo"
      | "owner"
      | "renounceOwnership"
      | "rewardDuration"
      | "setDevUSDCAddress"
      | "stakeETH"
      | "transferOwnership"
      | "unstakeETH"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculateCompound",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "devAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setDevUSDCAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "stakeETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakeETH",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateCompound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "devAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLatestPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDevUSDCAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakeETH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unstakeETH", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface GogoStakingApp extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GogoStakingAppInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    calculateCompound(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { earnedRewards: BigNumber }>;

    devAddress(overrides?: CallOverrides): Promise<[string]>;

    getLatestPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getStakingInfo(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [GogoLibrary.GogoStakerStructOutput] & {
        stakerInfo: GogoLibrary.GogoStakerStructOutput;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rewardDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    setDevUSDCAddress(
      devUSDCAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stakeETH(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unstakeETH(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  calculateCompound(
    stakerAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  devAddress(overrides?: CallOverrides): Promise<string>;

  getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getStakingInfo(
    stakerAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<GogoLibrary.GogoStakerStructOutput>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rewardDuration(overrides?: CallOverrides): Promise<BigNumber>;

  setDevUSDCAddress(
    devUSDCAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stakeETH(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unstakeETH(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    calculateCompound(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    devAddress(overrides?: CallOverrides): Promise<string>;

    getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getStakingInfo(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<GogoLibrary.GogoStakerStructOutput>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rewardDuration(overrides?: CallOverrides): Promise<BigNumber>;

    setDevUSDCAddress(
      devUSDCAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeETH(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unstakeETH(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    calculateCompound(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    devAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getStakingInfo(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rewardDuration(overrides?: CallOverrides): Promise<BigNumber>;

    setDevUSDCAddress(
      devUSDCAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stakeETH(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unstakeETH(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateCompound(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    devAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLatestPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getStakingInfo(
      stakerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rewardDuration(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setDevUSDCAddress(
      devUSDCAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stakeETH(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unstakeETH(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
