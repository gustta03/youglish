/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BcryptHashAdapter } from '@/infra/cryptography/hasher'
import { TokenGenerator } from '@/infra/cryptography/token-generator'
import { AddAccountRepository } from '@/infra/repositories/user/user-repository'
import env from '@/main/config/env'
import { AddAccountUseCase } from '@/usecases/add-account'
import { EmailValidator } from '@/utils/email-validator'

export const makeAddAccountUseCase = () => {
  const addAccountRepository = new AddAccountRepository()
  const hasher = new BcryptHashAdapter(10)
  const emailVerify = new EmailValidator()
  const generateToken = new TokenGenerator(env.jwtSecret)
  return new AddAccountUseCase(addAccountRepository, emailVerify, hasher, generateToken)
}
