import { ethers } from 'ethers';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

export function Transactional(isolationLevel?: IsolationLevel) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      
      const newContext = Object.assign(this);

      const dataSourceKey = Object.keys(newContext)
        .find(key => newContext[key] instanceof DataSource)

      const dataSourceObj = newContext[dataSourceKey] as DataSource;

      const queryRunner = dataSourceObj.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction(isolationLevel);

      for (const key of Object.keys(newContext)) {
        if (newContext[key] instanceof Repository) {
          newContext[key] = queryRunner.manager.getRepository(
            newContext[key].metadata.target,
          );
        }
      }

      try {
        const result = await originalMethod.apply(newContext, args);
        await queryRunner.commitTransaction();
        return result;
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
  }
};
