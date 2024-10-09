import { UseCaseError } from 'src/core/errors/use-case-error'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`${resource} already exists.`)
  }
}
