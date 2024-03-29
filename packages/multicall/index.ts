import { Interface, Fragment } from '@ethersproject/abi'
import { CallOverrides, Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { ChainId } from '@pancakeswap/sdk'
import type { Multicallv2Typed, Multicallv3Typed } from '@pancakeswap/utils/abitype'

import multicallAbi from './Multicall.json'

export const multicallAddresses = { // TODO Multicall
  1: '',
  4: '',
  5: '',
  56: '0x9b813fF6461fF72618dc7fd9d249e7Bf02D4D050',
  97: '0x54A11C6c4dE0e9279ce5f3b39364F0F24431f6A8', 
}

export const getMulticallContract = (chainId: ChainId, provider: Provider) => {
  if (multicallAddresses[chainId]) {
    return new Contract(multicallAddresses[chainId], multicallAbi, provider)
  }
  return null
}

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

export interface MulticallOptions extends CallOverrides {
  requireSuccess?: boolean
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
interface MulticallV2Params {
  abi: any[]
  calls: Call[]
  chainId?: ChainId
  options?: MulticallOptions
  provider?: Provider
}

export interface CallV3 extends Call {
  abi: any[]
  allowFailure?: boolean
}

interface MulticallV3Params {
  calls: CallV3[]
  chainId?: ChainId
  allowFailure?: boolean
  overrides?: CallOverrides
}

export type MultiCallV2 = <T = any>(params: MulticallV2Params) => Promise<T>
export type MultiCall = <T = any>(abi: any[], calls: Call[], chainId?: ChainId) => Promise<T>

export function createMulticall<TProvider extends Provider>(
  provider: ({ chainId }: { chainId?: number | undefined }) => TProvider,
) {
  const multicall: MultiCall = async (abi: any[], calls: Call[], chainId = ChainId.BSC_TESTNET) => {
    const multi = getMulticallContract(chainId, provider({ chainId }))
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const itf = new Interface(abi)

    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    }))
    const { returnData } = await multi.callStatic.aggregate(calldata)

    const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))

    return res as any
  }

  const multicallv2: MultiCallV2 = async ({ abi, calls, chainId = ChainId.BSC_TESTNET, options, provider: _provider }) => {
    const { requireSuccess = true, ...overrides } = options || {}
    const multi = getMulticallContract(chainId, _provider || provider({ chainId }))
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const itf = new Interface(abi)

    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    }))

    const returnData = await multi.callStatic.tryAggregate(requireSuccess, calldata, overrides)
    const res = returnData.map((call: any, i: number) => {
      const [result, data] = call
      return result && data !== '0x' ? itf.decodeFunctionResult(calls[i].name, data) : null
    })

    return res as any
  }

  const multicallv3 = async ({ calls, chainId = ChainId.BSC_TESTNET, allowFailure, overrides }: MulticallV3Params) => {
    const multi = getMulticallContract(chainId, provider({ chainId }))
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const interfaceCache = new WeakMap()
    const _calls = calls.map(({ abi, address, name, params, allowFailure: _allowFailure }) => {
      let itf = interfaceCache.get(abi)
      if (!itf) {
        itf = new Interface(abi)
        interfaceCache.set(abi, itf)
      }
      if (!itf.fragments.some((fragment: Fragment) => fragment.name === name))
        console.error(`${name} missing on ${address}`)
      const callData = itf.encodeFunctionData(name, params ?? [])
      return {
        target: address.toLowerCase(),
        allowFailure: allowFailure || _allowFailure,
        callData,
      }
    })

    const result = await multi.callStatic.aggregate3(_calls, ...(overrides ? [overrides] : []))

    return result.map((call: any, i: number) => {
      const { returnData, success } = call
      if (!success || returnData === '0x') return null
      const { abi, name } = calls[i]
      const itf = interfaceCache.get(abi)
      const decoded = itf?.decodeFunctionResult(name, returnData)
      return decoded
    })
  }

  const multicallv3Typed: typeof Multicallv3Typed = async ({ calls, allowFailure, chainId, overrides }) => {
    return multicallv3({
      // @ts-ignore
      calls,
      allowFailure,
      chainId,
      overrides,
    })
  }

  const multicallv2Typed: typeof Multicallv2Typed = async ({ abi, calls, chainId, options }) => {
    return multicallv2({
      // @ts-ignore
      abi,
      // @ts-ignore
      calls,
      chainId,
      options,
    })
  }

  return {
    multicall,
    multicallv2,
    multicallv3,
    multicallv3Typed,
    multicallv2Typed,
  }
}
