/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressDecoder,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { COUNTER_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type CreateInstruction<
  TProgram extends string = typeof COUNTER_PROGRAM_ADDRESS,
  TAccountCounter extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCounter extends string
        ? WritableSignerAccount<TAccountCounter> &
            IAccountSignerMeta<TAccountCounter>
        : TAccountCounter,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CreateInstructionData = {
  discriminator: ReadonlyUint8Array;
  authority: Address;
};

export type CreateInstructionDataArgs = { authority: Address };

export function getCreateInstructionDataEncoder(): Encoder<CreateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['authority', getAddressEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([24, 30, 200, 40, 5, 28, 7, 119]),
    })
  );
}

export function getCreateInstructionDataDecoder(): Decoder<CreateInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['authority', getAddressDecoder()],
  ]);
}

export function getCreateInstructionDataCodec(): Codec<
  CreateInstructionDataArgs,
  CreateInstructionData
> {
  return combineCodec(
    getCreateInstructionDataEncoder(),
    getCreateInstructionDataDecoder()
  );
}

export type CreateInput<
  TAccountCounter extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  counter: TransactionSigner<TAccountCounter>;
  payer: TransactionSigner<TAccountPayer>;
  systemProgram?: Address<TAccountSystemProgram>;
  authority: CreateInstructionDataArgs['authority'];
};

export function getCreateInstruction<
  TAccountCounter extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
>(
  input: CreateInput<TAccountCounter, TAccountPayer, TAccountSystemProgram>
): CreateInstruction<
  typeof COUNTER_PROGRAM_ADDRESS,
  TAccountCounter,
  TAccountPayer,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = COUNTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    counter: { value: input.counter ?? null, isWritable: true },
    payer: { value: input.payer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.counter),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getCreateInstructionDataEncoder().encode(
      args as CreateInstructionDataArgs
    ),
  } as CreateInstruction<
    typeof COUNTER_PROGRAM_ADDRESS,
    TAccountCounter,
    TAccountPayer,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedCreateInstruction<
  TProgram extends string = typeof COUNTER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    counter: TAccountMetas[0];
    payer: TAccountMetas[1];
    systemProgram: TAccountMetas[2];
  };
  data: CreateInstructionData;
};

export function parseCreateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      counter: getNextAccount(),
      payer: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getCreateInstructionDataDecoder().decode(instruction.data),
  };
}
