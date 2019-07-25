import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): GqlModuleOptions {
        return {
            /**
             * Search for the .graphql modules and prepare the neccesary files for the same 
             */
            typePaths: ['./**/*.graphql'],
            path: '/',
            resolverValidationOptions: {
                requireResolversForResolveType: false,
            },
            definitions: {
                /**
                 * This will create a graphql.schema file in present location
                 * This will join all .prisma files and generate a single schema file
                 * Instead of interfaces it will create as classes
                 */
                path: join(process.cwd(), 'src/graphql.schema.d.ts'),
                outputAs: 'class',
            },
        };
    }
}