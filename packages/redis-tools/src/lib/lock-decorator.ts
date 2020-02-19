import { createLoggerWithFileContext } from '../util/log'
import { LockFactory } from './lock-factory'
import { withLock } from './lock'
import { LockError } from './errors'

const log = createLoggerWithFileContext(__filename)

type LockDecoratorFunction = (lockKey: string, lockTtlSeconds: number) => Function

/**
 * Build a lock decorator function
 *
 * @param lockFactory The lock factory to use for the generated decorator
 */
export function buildLockDecorator(lockFactory: LockFactory): LockDecoratorFunction {
  /**
   * A decorator factory for decorators that wrap a methods with a lock
   *
   * @param lockKey The key to use when creating the lock
   * @param lockTtlSeconds The lock TTL
   */
  return function(lockKey: string, lockTtlSeconds: number) {
    return function(_target: Record<string, any>, methodName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
      const originalFunction = propertyDesciptor.value

      propertyDesciptor.value = async function(this: any, ...args: any[]) {
        // Create the lock
        const lock = lockFactory.createLock(lockKey, lockTtlSeconds)
        // Bind "this" to the callback
        const boundOriginalFunction = originalFunction.bind(this)
        try {
          log.debug(`Attempting to acquire lock in decorator for key ${lock.getLockKey()}`, { methodName })
          return await withLock(lock, boundOriginalFunction)(...args)
        } catch (e) {
          throw new LockError(`Error acquiring lock in decorator for key ${lock.getLockKey()}: ${e.message}`, e)
        }
      }

      return propertyDesciptor
    }
  }
}
