import 'reflect-metadata';
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

      let newContext = Object.assign(this);

      const dataSourceKey = Object.keys(newContext)
        .find(key => newContext[key] instanceof DataSource)

      const dataSourceObj = newContext[dataSourceKey] as DataSource;

      const queryRunner = dataSourceObj.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction(isolationLevel);

      const redefineContext = (context: any): any => {
        for (const key of Object.keys(context)) {
          let ctxObject = context[key];

          if (Reflect.hasMetadata('self:properties_metadata', ctxObject?.constructor)) {
            context[key] = redefineContext(
              Object.assign(ctxObject)
            );
          } else if (ctxObject instanceof Repository) {
            context[key] = queryRunner.manager.getRepository(
              ctxObject.metadata.target,
            );
          }
        }
        return context;
      }
      newContext = redefineContext(newContext);

      // for (const key of Object.keys(newContext)) {
      //   let ctxObject = newContext[key];

      //   if (Reflect.hasMetadata('self:properties_metadata', ctxObject?.constructor)) {
      //     const copy = Object.assign(ctxObject);
      //   }
      //   if (ctxObject instanceof Repository) {
      //     newContext[key] = queryRunner.manager.getRepository(
      //       ctxObject.metadata.target,
      //     );
      //   }
      // }

      try {
        const result = await originalMethod.apply(newContext, args);
        await queryRunner.commitTransaction();
        return result;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }
  }
};
