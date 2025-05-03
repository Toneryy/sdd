
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model subscriptions
 * 
 */
export type subscriptions = $Result.DefaultSelection<Prisma.$subscriptionsPayload>
/**
 * Model user_subscriptions
 * 
 */
export type user_subscriptions = $Result.DefaultSelection<Prisma.$user_subscriptionsPayload>
/**
 * Model support_requests
 * 
 */
export type support_requests = $Result.DefaultSelection<Prisma.$support_requestsPayload>
/**
 * Model news
 * 
 */
export type news = $Result.DefaultSelection<Prisma.$newsPayload>
/**
 * Model promocodes
 * 
 */
export type promocodes = $Result.DefaultSelection<Prisma.$promocodesPayload>
/**
 * Model promo_usage
 * 
 */
export type promo_usage = $Result.DefaultSelection<Prisma.$promo_usagePayload>
/**
 * Model service_orders
 * 
 */
export type service_orders = $Result.DefaultSelection<Prisma.$service_ordersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptions`: Exposes CRUD operations for the **subscriptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscriptions.findMany()
    * ```
    */
  get subscriptions(): Prisma.subscriptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_subscriptions`: Exposes CRUD operations for the **user_subscriptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_subscriptions
    * const user_subscriptions = await prisma.user_subscriptions.findMany()
    * ```
    */
  get user_subscriptions(): Prisma.user_subscriptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.support_requests`: Exposes CRUD operations for the **support_requests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Support_requests
    * const support_requests = await prisma.support_requests.findMany()
    * ```
    */
  get support_requests(): Prisma.support_requestsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.news`: Exposes CRUD operations for the **news** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more News
    * const news = await prisma.news.findMany()
    * ```
    */
  get news(): Prisma.newsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promocodes`: Exposes CRUD operations for the **promocodes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promocodes
    * const promocodes = await prisma.promocodes.findMany()
    * ```
    */
  get promocodes(): Prisma.promocodesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promo_usage`: Exposes CRUD operations for the **promo_usage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promo_usages
    * const promo_usages = await prisma.promo_usage.findMany()
    * ```
    */
  get promo_usage(): Prisma.promo_usageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service_orders`: Exposes CRUD operations for the **service_orders** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Service_orders
    * const service_orders = await prisma.service_orders.findMany()
    * ```
    */
  get service_orders(): Prisma.service_ordersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    subscriptions: 'subscriptions',
    user_subscriptions: 'user_subscriptions',
    support_requests: 'support_requests',
    news: 'news',
    promocodes: 'promocodes',
    promo_usage: 'promo_usage',
    service_orders: 'service_orders'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "subscriptions" | "user_subscriptions" | "support_requests" | "news" | "promocodes" | "promo_usage" | "service_orders"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      subscriptions: {
        payload: Prisma.$subscriptionsPayload<ExtArgs>
        fields: Prisma.subscriptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscriptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscriptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findFirst: {
            args: Prisma.subscriptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscriptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findMany: {
            args: Prisma.subscriptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          create: {
            args: Prisma.subscriptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          createMany: {
            args: Prisma.subscriptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscriptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          delete: {
            args: Prisma.subscriptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          update: {
            args: Prisma.subscriptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          deleteMany: {
            args: Prisma.subscriptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscriptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscriptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          upsert: {
            args: Prisma.subscriptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptions>
          }
          groupBy: {
            args: Prisma.subscriptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscriptionsCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsCountAggregateOutputType> | number
          }
        }
      }
      user_subscriptions: {
        payload: Prisma.$user_subscriptionsPayload<ExtArgs>
        fields: Prisma.user_subscriptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_subscriptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_subscriptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>
          }
          findFirst: {
            args: Prisma.user_subscriptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_subscriptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>
          }
          findMany: {
            args: Prisma.user_subscriptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>[]
          }
          create: {
            args: Prisma.user_subscriptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>
          }
          createMany: {
            args: Prisma.user_subscriptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_subscriptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>[]
          }
          delete: {
            args: Prisma.user_subscriptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>
          }
          update: {
            args: Prisma.user_subscriptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>
          }
          deleteMany: {
            args: Prisma.user_subscriptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_subscriptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_subscriptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>[]
          }
          upsert: {
            args: Prisma.user_subscriptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_subscriptionsPayload>
          }
          aggregate: {
            args: Prisma.User_subscriptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_subscriptions>
          }
          groupBy: {
            args: Prisma.user_subscriptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_subscriptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_subscriptionsCountArgs<ExtArgs>
            result: $Utils.Optional<User_subscriptionsCountAggregateOutputType> | number
          }
        }
      }
      support_requests: {
        payload: Prisma.$support_requestsPayload<ExtArgs>
        fields: Prisma.support_requestsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.support_requestsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.support_requestsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>
          }
          findFirst: {
            args: Prisma.support_requestsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.support_requestsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>
          }
          findMany: {
            args: Prisma.support_requestsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>[]
          }
          create: {
            args: Prisma.support_requestsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>
          }
          createMany: {
            args: Prisma.support_requestsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.support_requestsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>[]
          }
          delete: {
            args: Prisma.support_requestsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>
          }
          update: {
            args: Prisma.support_requestsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>
          }
          deleteMany: {
            args: Prisma.support_requestsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.support_requestsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.support_requestsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>[]
          }
          upsert: {
            args: Prisma.support_requestsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$support_requestsPayload>
          }
          aggregate: {
            args: Prisma.Support_requestsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupport_requests>
          }
          groupBy: {
            args: Prisma.support_requestsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Support_requestsGroupByOutputType>[]
          }
          count: {
            args: Prisma.support_requestsCountArgs<ExtArgs>
            result: $Utils.Optional<Support_requestsCountAggregateOutputType> | number
          }
        }
      }
      news: {
        payload: Prisma.$newsPayload<ExtArgs>
        fields: Prisma.newsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.newsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.newsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>
          }
          findFirst: {
            args: Prisma.newsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.newsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>
          }
          findMany: {
            args: Prisma.newsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>[]
          }
          create: {
            args: Prisma.newsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>
          }
          createMany: {
            args: Prisma.newsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.newsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>[]
          }
          delete: {
            args: Prisma.newsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>
          }
          update: {
            args: Prisma.newsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>
          }
          deleteMany: {
            args: Prisma.newsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.newsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.newsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>[]
          }
          upsert: {
            args: Prisma.newsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsPayload>
          }
          aggregate: {
            args: Prisma.NewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNews>
          }
          groupBy: {
            args: Prisma.newsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.newsCountArgs<ExtArgs>
            result: $Utils.Optional<NewsCountAggregateOutputType> | number
          }
        }
      }
      promocodes: {
        payload: Prisma.$promocodesPayload<ExtArgs>
        fields: Prisma.promocodesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.promocodesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.promocodesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>
          }
          findFirst: {
            args: Prisma.promocodesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.promocodesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>
          }
          findMany: {
            args: Prisma.promocodesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>[]
          }
          create: {
            args: Prisma.promocodesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>
          }
          createMany: {
            args: Prisma.promocodesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.promocodesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>[]
          }
          delete: {
            args: Prisma.promocodesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>
          }
          update: {
            args: Prisma.promocodesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>
          }
          deleteMany: {
            args: Prisma.promocodesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.promocodesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.promocodesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>[]
          }
          upsert: {
            args: Prisma.promocodesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promocodesPayload>
          }
          aggregate: {
            args: Prisma.PromocodesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromocodes>
          }
          groupBy: {
            args: Prisma.promocodesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromocodesGroupByOutputType>[]
          }
          count: {
            args: Prisma.promocodesCountArgs<ExtArgs>
            result: $Utils.Optional<PromocodesCountAggregateOutputType> | number
          }
        }
      }
      promo_usage: {
        payload: Prisma.$promo_usagePayload<ExtArgs>
        fields: Prisma.promo_usageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.promo_usageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.promo_usageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>
          }
          findFirst: {
            args: Prisma.promo_usageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.promo_usageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>
          }
          findMany: {
            args: Prisma.promo_usageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>[]
          }
          create: {
            args: Prisma.promo_usageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>
          }
          createMany: {
            args: Prisma.promo_usageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.promo_usageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>[]
          }
          delete: {
            args: Prisma.promo_usageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>
          }
          update: {
            args: Prisma.promo_usageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>
          }
          deleteMany: {
            args: Prisma.promo_usageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.promo_usageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.promo_usageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>[]
          }
          upsert: {
            args: Prisma.promo_usageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$promo_usagePayload>
          }
          aggregate: {
            args: Prisma.Promo_usageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromo_usage>
          }
          groupBy: {
            args: Prisma.promo_usageGroupByArgs<ExtArgs>
            result: $Utils.Optional<Promo_usageGroupByOutputType>[]
          }
          count: {
            args: Prisma.promo_usageCountArgs<ExtArgs>
            result: $Utils.Optional<Promo_usageCountAggregateOutputType> | number
          }
        }
      }
      service_orders: {
        payload: Prisma.$service_ordersPayload<ExtArgs>
        fields: Prisma.service_ordersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.service_ordersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.service_ordersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>
          }
          findFirst: {
            args: Prisma.service_ordersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.service_ordersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>
          }
          findMany: {
            args: Prisma.service_ordersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>[]
          }
          create: {
            args: Prisma.service_ordersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>
          }
          createMany: {
            args: Prisma.service_ordersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.service_ordersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>[]
          }
          delete: {
            args: Prisma.service_ordersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>
          }
          update: {
            args: Prisma.service_ordersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>
          }
          deleteMany: {
            args: Prisma.service_ordersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.service_ordersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.service_ordersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>[]
          }
          upsert: {
            args: Prisma.service_ordersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_ordersPayload>
          }
          aggregate: {
            args: Prisma.Service_ordersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService_orders>
          }
          groupBy: {
            args: Prisma.service_ordersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Service_ordersGroupByOutputType>[]
          }
          count: {
            args: Prisma.service_ordersCountArgs<ExtArgs>
            result: $Utils.Optional<Service_ordersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    subscriptions?: subscriptionsOmit
    user_subscriptions?: user_subscriptionsOmit
    support_requests?: support_requestsOmit
    news?: newsOmit
    promocodes?: promocodesOmit
    promo_usage?: promo_usageOmit
    service_orders?: service_ordersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SubscriptionsCountOutputType
   */

  export type SubscriptionsCountOutputType = {
    user_subscriptions: number
    currentUsers: number
  }

  export type SubscriptionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_subscriptions?: boolean | SubscriptionsCountOutputTypeCountUser_subscriptionsArgs
    currentUsers?: boolean | SubscriptionsCountOutputTypeCountCurrentUsersArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionsCountOutputType without action
   */
  export type SubscriptionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionsCountOutputType
     */
    select?: SubscriptionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionsCountOutputType without action
   */
  export type SubscriptionsCountOutputTypeCountUser_subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_subscriptionsWhereInput
  }

  /**
   * SubscriptionsCountOutputType without action
   */
  export type SubscriptionsCountOutputTypeCountCurrentUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type PromocodesCountOutputType
   */

  export type PromocodesCountOutputType = {
    promo_usage: number
  }

  export type PromocodesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promo_usage?: boolean | PromocodesCountOutputTypeCountPromo_usageArgs
  }

  // Custom InputTypes
  /**
   * PromocodesCountOutputType without action
   */
  export type PromocodesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromocodesCountOutputType
     */
    select?: PromocodesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PromocodesCountOutputType without action
   */
  export type PromocodesCountOutputTypeCountPromo_usageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: promo_usageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    phone: string | null
    password: string | null
    subscription_id: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    phone: string | null
    password: string | null
    subscription_id: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    phone: number
    password: number
    subscription_id: number
    created_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    phone?: true
    password?: true
    subscription_id?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    phone?: true
    password?: true
    subscription_id?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    phone?: true
    password?: true
    subscription_id?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    username: string
    email: string
    phone: string | null
    password: string
    subscription_id: string | null
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    subscription_id?: boolean
    created_at?: boolean
    currentSubscription?: boolean | users$currentSubscriptionArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    subscription_id?: boolean
    created_at?: boolean
    currentSubscription?: boolean | users$currentSubscriptionArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    subscription_id?: boolean
    created_at?: boolean
    currentSubscription?: boolean | users$currentSubscriptionArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    subscription_id?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "phone" | "password" | "subscription_id" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentSubscription?: boolean | users$currentSubscriptionArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentSubscription?: boolean | users$currentSubscriptionArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentSubscription?: boolean | users$currentSubscriptionArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      currentSubscription: Prisma.$subscriptionsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      phone: string | null
      password: string
      subscription_id: string | null
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    currentSubscription<T extends users$currentSubscriptionArgs<ExtArgs> = {}>(args?: Subset<T, users$currentSubscriptionArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly phone: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly subscription_id: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.currentSubscription
   */
  export type users$currentSubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    where?: subscriptionsWhereInput
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model subscriptions
   */

  export type AggregateSubscriptions = {
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  export type SubscriptionsAvgAggregateOutputType = {
    duration_days: number | null
    price: Decimal | null
  }

  export type SubscriptionsSumAggregateOutputType = {
    duration_days: number | null
    price: Decimal | null
  }

  export type SubscriptionsMinAggregateOutputType = {
    id: string | null
    title: string | null
    duration_days: number | null
    price: Decimal | null
  }

  export type SubscriptionsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    duration_days: number | null
    price: Decimal | null
  }

  export type SubscriptionsCountAggregateOutputType = {
    id: number
    title: number
    duration_days: number
    price: number
    _all: number
  }


  export type SubscriptionsAvgAggregateInputType = {
    duration_days?: true
    price?: true
  }

  export type SubscriptionsSumAggregateInputType = {
    duration_days?: true
    price?: true
  }

  export type SubscriptionsMinAggregateInputType = {
    id?: true
    title?: true
    duration_days?: true
    price?: true
  }

  export type SubscriptionsMaxAggregateInputType = {
    id?: true
    title?: true
    duration_days?: true
    price?: true
  }

  export type SubscriptionsCountAggregateInputType = {
    id?: true
    title?: true
    duration_days?: true
    price?: true
    _all?: true
  }

  export type SubscriptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to aggregate.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscriptions
    **/
    _count?: true | SubscriptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type GetSubscriptionsAggregateType<T extends SubscriptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptions[P]>
      : GetScalarType<T[P], AggregateSubscriptions[P]>
  }




  export type subscriptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
    orderBy?: subscriptionsOrderByWithAggregationInput | subscriptionsOrderByWithAggregationInput[]
    by: SubscriptionsScalarFieldEnum[] | SubscriptionsScalarFieldEnum
    having?: subscriptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionsCountAggregateInputType | true
    _avg?: SubscriptionsAvgAggregateInputType
    _sum?: SubscriptionsSumAggregateInputType
    _min?: SubscriptionsMinAggregateInputType
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type SubscriptionsGroupByOutputType = {
    id: string
    title: string
    duration_days: number
    price: Decimal
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  type GetSubscriptionsGroupByPayload<T extends subscriptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
        }
      >
    >


  export type subscriptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    duration_days?: boolean
    price?: boolean
    user_subscriptions?: boolean | subscriptions$user_subscriptionsArgs<ExtArgs>
    currentUsers?: boolean | subscriptions$currentUsersArgs<ExtArgs>
    _count?: boolean | SubscriptionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    duration_days?: boolean
    price?: boolean
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    duration_days?: boolean
    price?: boolean
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectScalar = {
    id?: boolean
    title?: boolean
    duration_days?: boolean
    price?: boolean
  }

  export type subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "duration_days" | "price", ExtArgs["result"]["subscriptions"]>
  export type subscriptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_subscriptions?: boolean | subscriptions$user_subscriptionsArgs<ExtArgs>
    currentUsers?: boolean | subscriptions$currentUsersArgs<ExtArgs>
    _count?: boolean | SubscriptionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type subscriptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriptions"
    objects: {
      user_subscriptions: Prisma.$user_subscriptionsPayload<ExtArgs>[]
      currentUsers: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      duration_days: number
      price: Prisma.Decimal
    }, ExtArgs["result"]["subscriptions"]>
    composites: {}
  }

  type subscriptionsGetPayload<S extends boolean | null | undefined | subscriptionsDefaultArgs> = $Result.GetResult<Prisma.$subscriptionsPayload, S>

  type subscriptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionsCountAggregateInputType | true
    }

  export interface subscriptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscriptions'], meta: { name: 'subscriptions' } }
    /**
     * Find zero or one Subscriptions that matches the filter.
     * @param {subscriptionsFindUniqueArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscriptionsFindUniqueArgs>(args: SelectSubset<T, subscriptionsFindUniqueArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscriptionsFindUniqueOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscriptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscriptionsFindFirstArgs>(args?: SelectSubset<T, subscriptionsFindFirstArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscriptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscriptionsFindManyArgs>(args?: SelectSubset<T, subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriptions.
     * @param {subscriptionsCreateArgs} args - Arguments to create a Subscriptions.
     * @example
     * // Create one Subscriptions
     * const Subscriptions = await prisma.subscriptions.create({
     *   data: {
     *     // ... data to create a Subscriptions
     *   }
     * })
     * 
     */
    create<T extends subscriptionsCreateArgs>(args: SelectSubset<T, subscriptionsCreateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {subscriptionsCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscriptionsCreateManyArgs>(args?: SelectSubset<T, subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {subscriptionsCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscriptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriptions.
     * @param {subscriptionsDeleteArgs} args - Arguments to delete one Subscriptions.
     * @example
     * // Delete one Subscriptions
     * const Subscriptions = await prisma.subscriptions.delete({
     *   where: {
     *     // ... filter to delete one Subscriptions
     *   }
     * })
     * 
     */
    delete<T extends subscriptionsDeleteArgs>(args: SelectSubset<T, subscriptionsDeleteArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriptions.
     * @param {subscriptionsUpdateArgs} args - Arguments to update one Subscriptions.
     * @example
     * // Update one Subscriptions
     * const subscriptions = await prisma.subscriptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscriptionsUpdateArgs>(args: SelectSubset<T, subscriptionsUpdateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {subscriptionsDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscriptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscriptionsDeleteManyArgs>(args?: SelectSubset<T, subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscriptionsUpdateManyArgs>(args: SelectSubset<T, subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {subscriptionsUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscriptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriptions.
     * @param {subscriptionsUpsertArgs} args - Arguments to update or create a Subscriptions.
     * @example
     * // Update or create a Subscriptions
     * const subscriptions = await prisma.subscriptions.upsert({
     *   create: {
     *     // ... data to create a Subscriptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriptions we want to update
     *   }
     * })
     */
    upsert<T extends subscriptionsUpsertArgs>(args: SelectSubset<T, subscriptionsUpsertArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscriptions.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends subscriptionsCountArgs>(
      args?: Subset<T, subscriptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionsAggregateArgs>(args: Subset<T, SubscriptionsAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionsAggregateType<T>>

    /**
     * Group by Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscriptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: subscriptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscriptions model
   */
  readonly fields: subscriptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscriptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscriptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_subscriptions<T extends subscriptions$user_subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, subscriptions$user_subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    currentUsers<T extends subscriptions$currentUsersArgs<ExtArgs> = {}>(args?: Subset<T, subscriptions$currentUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscriptions model
   */
  interface subscriptionsFieldRefs {
    readonly id: FieldRef<"subscriptions", 'String'>
    readonly title: FieldRef<"subscriptions", 'String'>
    readonly duration_days: FieldRef<"subscriptions", 'Int'>
    readonly price: FieldRef<"subscriptions", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * subscriptions findUnique
   */
  export type subscriptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findUniqueOrThrow
   */
  export type subscriptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findFirst
   */
  export type subscriptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findFirstOrThrow
   */
  export type subscriptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findMany
   */
  export type subscriptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions create
   */
  export type subscriptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a subscriptions.
     */
    data: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
  }

  /**
   * subscriptions createMany
   */
  export type subscriptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriptions createManyAndReturn
   */
  export type subscriptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriptions update
   */
  export type subscriptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a subscriptions.
     */
    data: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
    /**
     * Choose, which subscriptions to update.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions updateMany
   */
  export type subscriptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
  }

  /**
   * subscriptions updateManyAndReturn
   */
  export type subscriptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
  }

  /**
   * subscriptions upsert
   */
  export type subscriptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the subscriptions to update in case it exists.
     */
    where: subscriptionsWhereUniqueInput
    /**
     * In case the subscriptions found by the `where` argument doesn't exist, create a new subscriptions with this data.
     */
    create: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
    /**
     * In case the subscriptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
  }

  /**
   * subscriptions delete
   */
  export type subscriptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter which subscriptions to delete.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions deleteMany
   */
  export type subscriptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to delete
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to delete.
     */
    limit?: number
  }

  /**
   * subscriptions.user_subscriptions
   */
  export type subscriptions$user_subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    where?: user_subscriptionsWhereInput
    orderBy?: user_subscriptionsOrderByWithRelationInput | user_subscriptionsOrderByWithRelationInput[]
    cursor?: user_subscriptionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_subscriptionsScalarFieldEnum | User_subscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions.currentUsers
   */
  export type subscriptions$currentUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * subscriptions without action
   */
  export type subscriptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
  }


  /**
   * Model user_subscriptions
   */

  export type AggregateUser_subscriptions = {
    _count: User_subscriptionsCountAggregateOutputType | null
    _min: User_subscriptionsMinAggregateOutputType | null
    _max: User_subscriptionsMaxAggregateOutputType | null
  }

  export type User_subscriptionsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    subscription_id: string | null
    start_date: Date | null
    end_date: Date | null
    active: boolean | null
  }

  export type User_subscriptionsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    subscription_id: string | null
    start_date: Date | null
    end_date: Date | null
    active: boolean | null
  }

  export type User_subscriptionsCountAggregateOutputType = {
    id: number
    user_id: number
    subscription_id: number
    start_date: number
    end_date: number
    active: number
    _all: number
  }


  export type User_subscriptionsMinAggregateInputType = {
    id?: true
    user_id?: true
    subscription_id?: true
    start_date?: true
    end_date?: true
    active?: true
  }

  export type User_subscriptionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    subscription_id?: true
    start_date?: true
    end_date?: true
    active?: true
  }

  export type User_subscriptionsCountAggregateInputType = {
    id?: true
    user_id?: true
    subscription_id?: true
    start_date?: true
    end_date?: true
    active?: true
    _all?: true
  }

  export type User_subscriptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_subscriptions to aggregate.
     */
    where?: user_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_subscriptions to fetch.
     */
    orderBy?: user_subscriptionsOrderByWithRelationInput | user_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_subscriptions
    **/
    _count?: true | User_subscriptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_subscriptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_subscriptionsMaxAggregateInputType
  }

  export type GetUser_subscriptionsAggregateType<T extends User_subscriptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_subscriptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_subscriptions[P]>
      : GetScalarType<T[P], AggregateUser_subscriptions[P]>
  }




  export type user_subscriptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_subscriptionsWhereInput
    orderBy?: user_subscriptionsOrderByWithAggregationInput | user_subscriptionsOrderByWithAggregationInput[]
    by: User_subscriptionsScalarFieldEnum[] | User_subscriptionsScalarFieldEnum
    having?: user_subscriptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_subscriptionsCountAggregateInputType | true
    _min?: User_subscriptionsMinAggregateInputType
    _max?: User_subscriptionsMaxAggregateInputType
  }

  export type User_subscriptionsGroupByOutputType = {
    id: string
    user_id: string
    subscription_id: string
    start_date: Date
    end_date: Date
    active: boolean | null
    _count: User_subscriptionsCountAggregateOutputType | null
    _min: User_subscriptionsMinAggregateOutputType | null
    _max: User_subscriptionsMaxAggregateOutputType | null
  }

  type GetUser_subscriptionsGroupByPayload<T extends user_subscriptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_subscriptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_subscriptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_subscriptionsGroupByOutputType[P]>
            : GetScalarType<T[P], User_subscriptionsGroupByOutputType[P]>
        }
      >
    >


  export type user_subscriptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    subscription_id?: boolean
    start_date?: boolean
    end_date?: boolean
    active?: boolean
    subscriptions?: boolean | subscriptionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_subscriptions"]>

  export type user_subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    subscription_id?: boolean
    start_date?: boolean
    end_date?: boolean
    active?: boolean
    subscriptions?: boolean | subscriptionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_subscriptions"]>

  export type user_subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    subscription_id?: boolean
    start_date?: boolean
    end_date?: boolean
    active?: boolean
    subscriptions?: boolean | subscriptionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_subscriptions"]>

  export type user_subscriptionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    subscription_id?: boolean
    start_date?: boolean
    end_date?: boolean
    active?: boolean
  }

  export type user_subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "subscription_id" | "start_date" | "end_date" | "active", ExtArgs["result"]["user_subscriptions"]>
  export type user_subscriptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | subscriptionsDefaultArgs<ExtArgs>
  }
  export type user_subscriptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | subscriptionsDefaultArgs<ExtArgs>
  }
  export type user_subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | subscriptionsDefaultArgs<ExtArgs>
  }

  export type $user_subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_subscriptions"
    objects: {
      subscriptions: Prisma.$subscriptionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      subscription_id: string
      start_date: Date
      end_date: Date
      active: boolean | null
    }, ExtArgs["result"]["user_subscriptions"]>
    composites: {}
  }

  type user_subscriptionsGetPayload<S extends boolean | null | undefined | user_subscriptionsDefaultArgs> = $Result.GetResult<Prisma.$user_subscriptionsPayload, S>

  type user_subscriptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_subscriptionsCountAggregateInputType | true
    }

  export interface user_subscriptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_subscriptions'], meta: { name: 'user_subscriptions' } }
    /**
     * Find zero or one User_subscriptions that matches the filter.
     * @param {user_subscriptionsFindUniqueArgs} args - Arguments to find a User_subscriptions
     * @example
     * // Get one User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_subscriptionsFindUniqueArgs>(args: SelectSubset<T, user_subscriptionsFindUniqueArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_subscriptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_subscriptionsFindUniqueOrThrowArgs} args - Arguments to find a User_subscriptions
     * @example
     * // Get one User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_subscriptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_subscriptionsFindFirstArgs} args - Arguments to find a User_subscriptions
     * @example
     * // Get one User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_subscriptionsFindFirstArgs>(args?: SelectSubset<T, user_subscriptionsFindFirstArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_subscriptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_subscriptionsFindFirstOrThrowArgs} args - Arguments to find a User_subscriptions
     * @example
     * // Get one User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_subscriptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_subscriptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.findMany()
     * 
     * // Get first 10 User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_subscriptionsWithIdOnly = await prisma.user_subscriptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_subscriptionsFindManyArgs>(args?: SelectSubset<T, user_subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_subscriptions.
     * @param {user_subscriptionsCreateArgs} args - Arguments to create a User_subscriptions.
     * @example
     * // Create one User_subscriptions
     * const User_subscriptions = await prisma.user_subscriptions.create({
     *   data: {
     *     // ... data to create a User_subscriptions
     *   }
     * })
     * 
     */
    create<T extends user_subscriptionsCreateArgs>(args: SelectSubset<T, user_subscriptionsCreateArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_subscriptions.
     * @param {user_subscriptionsCreateManyArgs} args - Arguments to create many User_subscriptions.
     * @example
     * // Create many User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_subscriptionsCreateManyArgs>(args?: SelectSubset<T, user_subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_subscriptions and returns the data saved in the database.
     * @param {user_subscriptionsCreateManyAndReturnArgs} args - Arguments to create many User_subscriptions.
     * @example
     * // Create many User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_subscriptions and only return the `id`
     * const user_subscriptionsWithIdOnly = await prisma.user_subscriptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_subscriptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_subscriptions.
     * @param {user_subscriptionsDeleteArgs} args - Arguments to delete one User_subscriptions.
     * @example
     * // Delete one User_subscriptions
     * const User_subscriptions = await prisma.user_subscriptions.delete({
     *   where: {
     *     // ... filter to delete one User_subscriptions
     *   }
     * })
     * 
     */
    delete<T extends user_subscriptionsDeleteArgs>(args: SelectSubset<T, user_subscriptionsDeleteArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_subscriptions.
     * @param {user_subscriptionsUpdateArgs} args - Arguments to update one User_subscriptions.
     * @example
     * // Update one User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_subscriptionsUpdateArgs>(args: SelectSubset<T, user_subscriptionsUpdateArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_subscriptions.
     * @param {user_subscriptionsDeleteManyArgs} args - Arguments to filter User_subscriptions to delete.
     * @example
     * // Delete a few User_subscriptions
     * const { count } = await prisma.user_subscriptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_subscriptionsDeleteManyArgs>(args?: SelectSubset<T, user_subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_subscriptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_subscriptionsUpdateManyArgs>(args: SelectSubset<T, user_subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_subscriptions and returns the data updated in the database.
     * @param {user_subscriptionsUpdateManyAndReturnArgs} args - Arguments to update many User_subscriptions.
     * @example
     * // Update many User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_subscriptions and only return the `id`
     * const user_subscriptionsWithIdOnly = await prisma.user_subscriptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_subscriptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_subscriptions.
     * @param {user_subscriptionsUpsertArgs} args - Arguments to update or create a User_subscriptions.
     * @example
     * // Update or create a User_subscriptions
     * const user_subscriptions = await prisma.user_subscriptions.upsert({
     *   create: {
     *     // ... data to create a User_subscriptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_subscriptions we want to update
     *   }
     * })
     */
    upsert<T extends user_subscriptionsUpsertArgs>(args: SelectSubset<T, user_subscriptionsUpsertArgs<ExtArgs>>): Prisma__user_subscriptionsClient<$Result.GetResult<Prisma.$user_subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_subscriptionsCountArgs} args - Arguments to filter User_subscriptions to count.
     * @example
     * // Count the number of User_subscriptions
     * const count = await prisma.user_subscriptions.count({
     *   where: {
     *     // ... the filter for the User_subscriptions we want to count
     *   }
     * })
    **/
    count<T extends user_subscriptionsCountArgs>(
      args?: Subset<T, user_subscriptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_subscriptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_subscriptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_subscriptionsAggregateArgs>(args: Subset<T, User_subscriptionsAggregateArgs>): Prisma.PrismaPromise<GetUser_subscriptionsAggregateType<T>>

    /**
     * Group by User_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_subscriptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_subscriptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: user_subscriptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_subscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_subscriptions model
   */
  readonly fields: user_subscriptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_subscriptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_subscriptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends subscriptionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, subscriptionsDefaultArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_subscriptions model
   */
  interface user_subscriptionsFieldRefs {
    readonly id: FieldRef<"user_subscriptions", 'String'>
    readonly user_id: FieldRef<"user_subscriptions", 'String'>
    readonly subscription_id: FieldRef<"user_subscriptions", 'String'>
    readonly start_date: FieldRef<"user_subscriptions", 'DateTime'>
    readonly end_date: FieldRef<"user_subscriptions", 'DateTime'>
    readonly active: FieldRef<"user_subscriptions", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * user_subscriptions findUnique
   */
  export type user_subscriptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which user_subscriptions to fetch.
     */
    where: user_subscriptionsWhereUniqueInput
  }

  /**
   * user_subscriptions findUniqueOrThrow
   */
  export type user_subscriptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which user_subscriptions to fetch.
     */
    where: user_subscriptionsWhereUniqueInput
  }

  /**
   * user_subscriptions findFirst
   */
  export type user_subscriptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which user_subscriptions to fetch.
     */
    where?: user_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_subscriptions to fetch.
     */
    orderBy?: user_subscriptionsOrderByWithRelationInput | user_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_subscriptions.
     */
    cursor?: user_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_subscriptions.
     */
    distinct?: User_subscriptionsScalarFieldEnum | User_subscriptionsScalarFieldEnum[]
  }

  /**
   * user_subscriptions findFirstOrThrow
   */
  export type user_subscriptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which user_subscriptions to fetch.
     */
    where?: user_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_subscriptions to fetch.
     */
    orderBy?: user_subscriptionsOrderByWithRelationInput | user_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_subscriptions.
     */
    cursor?: user_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_subscriptions.
     */
    distinct?: User_subscriptionsScalarFieldEnum | User_subscriptionsScalarFieldEnum[]
  }

  /**
   * user_subscriptions findMany
   */
  export type user_subscriptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which user_subscriptions to fetch.
     */
    where?: user_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_subscriptions to fetch.
     */
    orderBy?: user_subscriptionsOrderByWithRelationInput | user_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_subscriptions.
     */
    cursor?: user_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_subscriptions.
     */
    skip?: number
    distinct?: User_subscriptionsScalarFieldEnum | User_subscriptionsScalarFieldEnum[]
  }

  /**
   * user_subscriptions create
   */
  export type user_subscriptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_subscriptions.
     */
    data: XOR<user_subscriptionsCreateInput, user_subscriptionsUncheckedCreateInput>
  }

  /**
   * user_subscriptions createMany
   */
  export type user_subscriptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_subscriptions.
     */
    data: user_subscriptionsCreateManyInput | user_subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_subscriptions createManyAndReturn
   */
  export type user_subscriptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to create many user_subscriptions.
     */
    data: user_subscriptionsCreateManyInput | user_subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_subscriptions update
   */
  export type user_subscriptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_subscriptions.
     */
    data: XOR<user_subscriptionsUpdateInput, user_subscriptionsUncheckedUpdateInput>
    /**
     * Choose, which user_subscriptions to update.
     */
    where: user_subscriptionsWhereUniqueInput
  }

  /**
   * user_subscriptions updateMany
   */
  export type user_subscriptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_subscriptions.
     */
    data: XOR<user_subscriptionsUpdateManyMutationInput, user_subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which user_subscriptions to update
     */
    where?: user_subscriptionsWhereInput
    /**
     * Limit how many user_subscriptions to update.
     */
    limit?: number
  }

  /**
   * user_subscriptions updateManyAndReturn
   */
  export type user_subscriptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to update user_subscriptions.
     */
    data: XOR<user_subscriptionsUpdateManyMutationInput, user_subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which user_subscriptions to update
     */
    where?: user_subscriptionsWhereInput
    /**
     * Limit how many user_subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_subscriptions upsert
   */
  export type user_subscriptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_subscriptions to update in case it exists.
     */
    where: user_subscriptionsWhereUniqueInput
    /**
     * In case the user_subscriptions found by the `where` argument doesn't exist, create a new user_subscriptions with this data.
     */
    create: XOR<user_subscriptionsCreateInput, user_subscriptionsUncheckedCreateInput>
    /**
     * In case the user_subscriptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_subscriptionsUpdateInput, user_subscriptionsUncheckedUpdateInput>
  }

  /**
   * user_subscriptions delete
   */
  export type user_subscriptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter which user_subscriptions to delete.
     */
    where: user_subscriptionsWhereUniqueInput
  }

  /**
   * user_subscriptions deleteMany
   */
  export type user_subscriptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_subscriptions to delete
     */
    where?: user_subscriptionsWhereInput
    /**
     * Limit how many user_subscriptions to delete.
     */
    limit?: number
  }

  /**
   * user_subscriptions without action
   */
  export type user_subscriptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_subscriptions
     */
    select?: user_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_subscriptions
     */
    omit?: user_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_subscriptionsInclude<ExtArgs> | null
  }


  /**
   * Model support_requests
   */

  export type AggregateSupport_requests = {
    _count: Support_requestsCountAggregateOutputType | null
    _min: Support_requestsMinAggregateOutputType | null
    _max: Support_requestsMaxAggregateOutputType | null
  }

  export type Support_requestsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    description: string | null
    status: string | null
    created_at: Date | null
  }

  export type Support_requestsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    description: string | null
    status: string | null
    created_at: Date | null
  }

  export type Support_requestsCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    description: number
    status: number
    created_at: number
    _all: number
  }


  export type Support_requestsMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    description?: true
    status?: true
    created_at?: true
  }

  export type Support_requestsMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    description?: true
    status?: true
    created_at?: true
  }

  export type Support_requestsCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    description?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type Support_requestsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which support_requests to aggregate.
     */
    where?: support_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of support_requests to fetch.
     */
    orderBy?: support_requestsOrderByWithRelationInput | support_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: support_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` support_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` support_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned support_requests
    **/
    _count?: true | Support_requestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Support_requestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Support_requestsMaxAggregateInputType
  }

  export type GetSupport_requestsAggregateType<T extends Support_requestsAggregateArgs> = {
        [P in keyof T & keyof AggregateSupport_requests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupport_requests[P]>
      : GetScalarType<T[P], AggregateSupport_requests[P]>
  }




  export type support_requestsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: support_requestsWhereInput
    orderBy?: support_requestsOrderByWithAggregationInput | support_requestsOrderByWithAggregationInput[]
    by: Support_requestsScalarFieldEnum[] | Support_requestsScalarFieldEnum
    having?: support_requestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Support_requestsCountAggregateInputType | true
    _min?: Support_requestsMinAggregateInputType
    _max?: Support_requestsMaxAggregateInputType
  }

  export type Support_requestsGroupByOutputType = {
    id: string
    user_id: string
    title: string
    description: string | null
    status: string | null
    created_at: Date | null
    _count: Support_requestsCountAggregateOutputType | null
    _min: Support_requestsMinAggregateOutputType | null
    _max: Support_requestsMaxAggregateOutputType | null
  }

  type GetSupport_requestsGroupByPayload<T extends support_requestsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Support_requestsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Support_requestsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Support_requestsGroupByOutputType[P]>
            : GetScalarType<T[P], Support_requestsGroupByOutputType[P]>
        }
      >
    >


  export type support_requestsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["support_requests"]>

  export type support_requestsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["support_requests"]>

  export type support_requestsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["support_requests"]>

  export type support_requestsSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type support_requestsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "description" | "status" | "created_at", ExtArgs["result"]["support_requests"]>

  export type $support_requestsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "support_requests"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      title: string
      description: string | null
      status: string | null
      created_at: Date | null
    }, ExtArgs["result"]["support_requests"]>
    composites: {}
  }

  type support_requestsGetPayload<S extends boolean | null | undefined | support_requestsDefaultArgs> = $Result.GetResult<Prisma.$support_requestsPayload, S>

  type support_requestsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<support_requestsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Support_requestsCountAggregateInputType | true
    }

  export interface support_requestsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['support_requests'], meta: { name: 'support_requests' } }
    /**
     * Find zero or one Support_requests that matches the filter.
     * @param {support_requestsFindUniqueArgs} args - Arguments to find a Support_requests
     * @example
     * // Get one Support_requests
     * const support_requests = await prisma.support_requests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends support_requestsFindUniqueArgs>(args: SelectSubset<T, support_requestsFindUniqueArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Support_requests that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {support_requestsFindUniqueOrThrowArgs} args - Arguments to find a Support_requests
     * @example
     * // Get one Support_requests
     * const support_requests = await prisma.support_requests.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends support_requestsFindUniqueOrThrowArgs>(args: SelectSubset<T, support_requestsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Support_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {support_requestsFindFirstArgs} args - Arguments to find a Support_requests
     * @example
     * // Get one Support_requests
     * const support_requests = await prisma.support_requests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends support_requestsFindFirstArgs>(args?: SelectSubset<T, support_requestsFindFirstArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Support_requests that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {support_requestsFindFirstOrThrowArgs} args - Arguments to find a Support_requests
     * @example
     * // Get one Support_requests
     * const support_requests = await prisma.support_requests.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends support_requestsFindFirstOrThrowArgs>(args?: SelectSubset<T, support_requestsFindFirstOrThrowArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Support_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {support_requestsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Support_requests
     * const support_requests = await prisma.support_requests.findMany()
     * 
     * // Get first 10 Support_requests
     * const support_requests = await prisma.support_requests.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const support_requestsWithIdOnly = await prisma.support_requests.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends support_requestsFindManyArgs>(args?: SelectSubset<T, support_requestsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Support_requests.
     * @param {support_requestsCreateArgs} args - Arguments to create a Support_requests.
     * @example
     * // Create one Support_requests
     * const Support_requests = await prisma.support_requests.create({
     *   data: {
     *     // ... data to create a Support_requests
     *   }
     * })
     * 
     */
    create<T extends support_requestsCreateArgs>(args: SelectSubset<T, support_requestsCreateArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Support_requests.
     * @param {support_requestsCreateManyArgs} args - Arguments to create many Support_requests.
     * @example
     * // Create many Support_requests
     * const support_requests = await prisma.support_requests.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends support_requestsCreateManyArgs>(args?: SelectSubset<T, support_requestsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Support_requests and returns the data saved in the database.
     * @param {support_requestsCreateManyAndReturnArgs} args - Arguments to create many Support_requests.
     * @example
     * // Create many Support_requests
     * const support_requests = await prisma.support_requests.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Support_requests and only return the `id`
     * const support_requestsWithIdOnly = await prisma.support_requests.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends support_requestsCreateManyAndReturnArgs>(args?: SelectSubset<T, support_requestsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Support_requests.
     * @param {support_requestsDeleteArgs} args - Arguments to delete one Support_requests.
     * @example
     * // Delete one Support_requests
     * const Support_requests = await prisma.support_requests.delete({
     *   where: {
     *     // ... filter to delete one Support_requests
     *   }
     * })
     * 
     */
    delete<T extends support_requestsDeleteArgs>(args: SelectSubset<T, support_requestsDeleteArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Support_requests.
     * @param {support_requestsUpdateArgs} args - Arguments to update one Support_requests.
     * @example
     * // Update one Support_requests
     * const support_requests = await prisma.support_requests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends support_requestsUpdateArgs>(args: SelectSubset<T, support_requestsUpdateArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Support_requests.
     * @param {support_requestsDeleteManyArgs} args - Arguments to filter Support_requests to delete.
     * @example
     * // Delete a few Support_requests
     * const { count } = await prisma.support_requests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends support_requestsDeleteManyArgs>(args?: SelectSubset<T, support_requestsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Support_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {support_requestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Support_requests
     * const support_requests = await prisma.support_requests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends support_requestsUpdateManyArgs>(args: SelectSubset<T, support_requestsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Support_requests and returns the data updated in the database.
     * @param {support_requestsUpdateManyAndReturnArgs} args - Arguments to update many Support_requests.
     * @example
     * // Update many Support_requests
     * const support_requests = await prisma.support_requests.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Support_requests and only return the `id`
     * const support_requestsWithIdOnly = await prisma.support_requests.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends support_requestsUpdateManyAndReturnArgs>(args: SelectSubset<T, support_requestsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Support_requests.
     * @param {support_requestsUpsertArgs} args - Arguments to update or create a Support_requests.
     * @example
     * // Update or create a Support_requests
     * const support_requests = await prisma.support_requests.upsert({
     *   create: {
     *     // ... data to create a Support_requests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Support_requests we want to update
     *   }
     * })
     */
    upsert<T extends support_requestsUpsertArgs>(args: SelectSubset<T, support_requestsUpsertArgs<ExtArgs>>): Prisma__support_requestsClient<$Result.GetResult<Prisma.$support_requestsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Support_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {support_requestsCountArgs} args - Arguments to filter Support_requests to count.
     * @example
     * // Count the number of Support_requests
     * const count = await prisma.support_requests.count({
     *   where: {
     *     // ... the filter for the Support_requests we want to count
     *   }
     * })
    **/
    count<T extends support_requestsCountArgs>(
      args?: Subset<T, support_requestsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Support_requestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Support_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Support_requestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Support_requestsAggregateArgs>(args: Subset<T, Support_requestsAggregateArgs>): Prisma.PrismaPromise<GetSupport_requestsAggregateType<T>>

    /**
     * Group by Support_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {support_requestsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends support_requestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: support_requestsGroupByArgs['orderBy'] }
        : { orderBy?: support_requestsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, support_requestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupport_requestsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the support_requests model
   */
  readonly fields: support_requestsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for support_requests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__support_requestsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the support_requests model
   */
  interface support_requestsFieldRefs {
    readonly id: FieldRef<"support_requests", 'String'>
    readonly user_id: FieldRef<"support_requests", 'String'>
    readonly title: FieldRef<"support_requests", 'String'>
    readonly description: FieldRef<"support_requests", 'String'>
    readonly status: FieldRef<"support_requests", 'String'>
    readonly created_at: FieldRef<"support_requests", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * support_requests findUnique
   */
  export type support_requestsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * Filter, which support_requests to fetch.
     */
    where: support_requestsWhereUniqueInput
  }

  /**
   * support_requests findUniqueOrThrow
   */
  export type support_requestsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * Filter, which support_requests to fetch.
     */
    where: support_requestsWhereUniqueInput
  }

  /**
   * support_requests findFirst
   */
  export type support_requestsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * Filter, which support_requests to fetch.
     */
    where?: support_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of support_requests to fetch.
     */
    orderBy?: support_requestsOrderByWithRelationInput | support_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for support_requests.
     */
    cursor?: support_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` support_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` support_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of support_requests.
     */
    distinct?: Support_requestsScalarFieldEnum | Support_requestsScalarFieldEnum[]
  }

  /**
   * support_requests findFirstOrThrow
   */
  export type support_requestsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * Filter, which support_requests to fetch.
     */
    where?: support_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of support_requests to fetch.
     */
    orderBy?: support_requestsOrderByWithRelationInput | support_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for support_requests.
     */
    cursor?: support_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` support_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` support_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of support_requests.
     */
    distinct?: Support_requestsScalarFieldEnum | Support_requestsScalarFieldEnum[]
  }

  /**
   * support_requests findMany
   */
  export type support_requestsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * Filter, which support_requests to fetch.
     */
    where?: support_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of support_requests to fetch.
     */
    orderBy?: support_requestsOrderByWithRelationInput | support_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing support_requests.
     */
    cursor?: support_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` support_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` support_requests.
     */
    skip?: number
    distinct?: Support_requestsScalarFieldEnum | Support_requestsScalarFieldEnum[]
  }

  /**
   * support_requests create
   */
  export type support_requestsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * The data needed to create a support_requests.
     */
    data: XOR<support_requestsCreateInput, support_requestsUncheckedCreateInput>
  }

  /**
   * support_requests createMany
   */
  export type support_requestsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many support_requests.
     */
    data: support_requestsCreateManyInput | support_requestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * support_requests createManyAndReturn
   */
  export type support_requestsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * The data used to create many support_requests.
     */
    data: support_requestsCreateManyInput | support_requestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * support_requests update
   */
  export type support_requestsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * The data needed to update a support_requests.
     */
    data: XOR<support_requestsUpdateInput, support_requestsUncheckedUpdateInput>
    /**
     * Choose, which support_requests to update.
     */
    where: support_requestsWhereUniqueInput
  }

  /**
   * support_requests updateMany
   */
  export type support_requestsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update support_requests.
     */
    data: XOR<support_requestsUpdateManyMutationInput, support_requestsUncheckedUpdateManyInput>
    /**
     * Filter which support_requests to update
     */
    where?: support_requestsWhereInput
    /**
     * Limit how many support_requests to update.
     */
    limit?: number
  }

  /**
   * support_requests updateManyAndReturn
   */
  export type support_requestsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * The data used to update support_requests.
     */
    data: XOR<support_requestsUpdateManyMutationInput, support_requestsUncheckedUpdateManyInput>
    /**
     * Filter which support_requests to update
     */
    where?: support_requestsWhereInput
    /**
     * Limit how many support_requests to update.
     */
    limit?: number
  }

  /**
   * support_requests upsert
   */
  export type support_requestsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * The filter to search for the support_requests to update in case it exists.
     */
    where: support_requestsWhereUniqueInput
    /**
     * In case the support_requests found by the `where` argument doesn't exist, create a new support_requests with this data.
     */
    create: XOR<support_requestsCreateInput, support_requestsUncheckedCreateInput>
    /**
     * In case the support_requests was found with the provided `where` argument, update it with this data.
     */
    update: XOR<support_requestsUpdateInput, support_requestsUncheckedUpdateInput>
  }

  /**
   * support_requests delete
   */
  export type support_requestsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
    /**
     * Filter which support_requests to delete.
     */
    where: support_requestsWhereUniqueInput
  }

  /**
   * support_requests deleteMany
   */
  export type support_requestsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which support_requests to delete
     */
    where?: support_requestsWhereInput
    /**
     * Limit how many support_requests to delete.
     */
    limit?: number
  }

  /**
   * support_requests without action
   */
  export type support_requestsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the support_requests
     */
    select?: support_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the support_requests
     */
    omit?: support_requestsOmit<ExtArgs> | null
  }


  /**
   * Model news
   */

  export type AggregateNews = {
    _count: NewsCountAggregateOutputType | null
    _min: NewsMinAggregateOutputType | null
    _max: NewsMaxAggregateOutputType | null
  }

  export type NewsMinAggregateOutputType = {
    id: string | null
    title: string | null
    body: string | null
    created_at: Date | null
  }

  export type NewsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    body: string | null
    created_at: Date | null
  }

  export type NewsCountAggregateOutputType = {
    id: number
    title: number
    body: number
    created_at: number
    _all: number
  }


  export type NewsMinAggregateInputType = {
    id?: true
    title?: true
    body?: true
    created_at?: true
  }

  export type NewsMaxAggregateInputType = {
    id?: true
    title?: true
    body?: true
    created_at?: true
  }

  export type NewsCountAggregateInputType = {
    id?: true
    title?: true
    body?: true
    created_at?: true
    _all?: true
  }

  export type NewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which news to aggregate.
     */
    where?: newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of news to fetch.
     */
    orderBy?: newsOrderByWithRelationInput | newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned news
    **/
    _count?: true | NewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsMaxAggregateInputType
  }

  export type GetNewsAggregateType<T extends NewsAggregateArgs> = {
        [P in keyof T & keyof AggregateNews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNews[P]>
      : GetScalarType<T[P], AggregateNews[P]>
  }




  export type newsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: newsWhereInput
    orderBy?: newsOrderByWithAggregationInput | newsOrderByWithAggregationInput[]
    by: NewsScalarFieldEnum[] | NewsScalarFieldEnum
    having?: newsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsCountAggregateInputType | true
    _min?: NewsMinAggregateInputType
    _max?: NewsMaxAggregateInputType
  }

  export type NewsGroupByOutputType = {
    id: string
    title: string
    body: string | null
    created_at: Date | null
    _count: NewsCountAggregateOutputType | null
    _min: NewsMinAggregateOutputType | null
    _max: NewsMaxAggregateOutputType | null
  }

  type GetNewsGroupByPayload<T extends newsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsGroupByOutputType[P]>
            : GetScalarType<T[P], NewsGroupByOutputType[P]>
        }
      >
    >


  export type newsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["news"]>

  export type newsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["news"]>

  export type newsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["news"]>

  export type newsSelectScalar = {
    id?: boolean
    title?: boolean
    body?: boolean
    created_at?: boolean
  }

  export type newsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "body" | "created_at", ExtArgs["result"]["news"]>

  export type $newsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "news"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      body: string | null
      created_at: Date | null
    }, ExtArgs["result"]["news"]>
    composites: {}
  }

  type newsGetPayload<S extends boolean | null | undefined | newsDefaultArgs> = $Result.GetResult<Prisma.$newsPayload, S>

  type newsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<newsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsCountAggregateInputType | true
    }

  export interface newsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['news'], meta: { name: 'news' } }
    /**
     * Find zero or one News that matches the filter.
     * @param {newsFindUniqueArgs} args - Arguments to find a News
     * @example
     * // Get one News
     * const news = await prisma.news.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends newsFindUniqueArgs>(args: SelectSubset<T, newsFindUniqueArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one News that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {newsFindUniqueOrThrowArgs} args - Arguments to find a News
     * @example
     * // Get one News
     * const news = await prisma.news.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends newsFindUniqueOrThrowArgs>(args: SelectSubset<T, newsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first News that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsFindFirstArgs} args - Arguments to find a News
     * @example
     * // Get one News
     * const news = await prisma.news.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends newsFindFirstArgs>(args?: SelectSubset<T, newsFindFirstArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first News that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsFindFirstOrThrowArgs} args - Arguments to find a News
     * @example
     * // Get one News
     * const news = await prisma.news.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends newsFindFirstOrThrowArgs>(args?: SelectSubset<T, newsFindFirstOrThrowArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more News that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all News
     * const news = await prisma.news.findMany()
     * 
     * // Get first 10 News
     * const news = await prisma.news.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsWithIdOnly = await prisma.news.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends newsFindManyArgs>(args?: SelectSubset<T, newsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a News.
     * @param {newsCreateArgs} args - Arguments to create a News.
     * @example
     * // Create one News
     * const News = await prisma.news.create({
     *   data: {
     *     // ... data to create a News
     *   }
     * })
     * 
     */
    create<T extends newsCreateArgs>(args: SelectSubset<T, newsCreateArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many News.
     * @param {newsCreateManyArgs} args - Arguments to create many News.
     * @example
     * // Create many News
     * const news = await prisma.news.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends newsCreateManyArgs>(args?: SelectSubset<T, newsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many News and returns the data saved in the database.
     * @param {newsCreateManyAndReturnArgs} args - Arguments to create many News.
     * @example
     * // Create many News
     * const news = await prisma.news.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many News and only return the `id`
     * const newsWithIdOnly = await prisma.news.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends newsCreateManyAndReturnArgs>(args?: SelectSubset<T, newsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a News.
     * @param {newsDeleteArgs} args - Arguments to delete one News.
     * @example
     * // Delete one News
     * const News = await prisma.news.delete({
     *   where: {
     *     // ... filter to delete one News
     *   }
     * })
     * 
     */
    delete<T extends newsDeleteArgs>(args: SelectSubset<T, newsDeleteArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one News.
     * @param {newsUpdateArgs} args - Arguments to update one News.
     * @example
     * // Update one News
     * const news = await prisma.news.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends newsUpdateArgs>(args: SelectSubset<T, newsUpdateArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more News.
     * @param {newsDeleteManyArgs} args - Arguments to filter News to delete.
     * @example
     * // Delete a few News
     * const { count } = await prisma.news.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends newsDeleteManyArgs>(args?: SelectSubset<T, newsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more News.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many News
     * const news = await prisma.news.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends newsUpdateManyArgs>(args: SelectSubset<T, newsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more News and returns the data updated in the database.
     * @param {newsUpdateManyAndReturnArgs} args - Arguments to update many News.
     * @example
     * // Update many News
     * const news = await prisma.news.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more News and only return the `id`
     * const newsWithIdOnly = await prisma.news.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends newsUpdateManyAndReturnArgs>(args: SelectSubset<T, newsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one News.
     * @param {newsUpsertArgs} args - Arguments to update or create a News.
     * @example
     * // Update or create a News
     * const news = await prisma.news.upsert({
     *   create: {
     *     // ... data to create a News
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the News we want to update
     *   }
     * })
     */
    upsert<T extends newsUpsertArgs>(args: SelectSubset<T, newsUpsertArgs<ExtArgs>>): Prisma__newsClient<$Result.GetResult<Prisma.$newsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of News.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsCountArgs} args - Arguments to filter News to count.
     * @example
     * // Count the number of News
     * const count = await prisma.news.count({
     *   where: {
     *     // ... the filter for the News we want to count
     *   }
     * })
    **/
    count<T extends newsCountArgs>(
      args?: Subset<T, newsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a News.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsAggregateArgs>(args: Subset<T, NewsAggregateArgs>): Prisma.PrismaPromise<GetNewsAggregateType<T>>

    /**
     * Group by News.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends newsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: newsGroupByArgs['orderBy'] }
        : { orderBy?: newsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, newsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the news model
   */
  readonly fields: newsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for news.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__newsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the news model
   */
  interface newsFieldRefs {
    readonly id: FieldRef<"news", 'String'>
    readonly title: FieldRef<"news", 'String'>
    readonly body: FieldRef<"news", 'String'>
    readonly created_at: FieldRef<"news", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * news findUnique
   */
  export type newsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * Filter, which news to fetch.
     */
    where: newsWhereUniqueInput
  }

  /**
   * news findUniqueOrThrow
   */
  export type newsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * Filter, which news to fetch.
     */
    where: newsWhereUniqueInput
  }

  /**
   * news findFirst
   */
  export type newsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * Filter, which news to fetch.
     */
    where?: newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of news to fetch.
     */
    orderBy?: newsOrderByWithRelationInput | newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for news.
     */
    cursor?: newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of news.
     */
    distinct?: NewsScalarFieldEnum | NewsScalarFieldEnum[]
  }

  /**
   * news findFirstOrThrow
   */
  export type newsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * Filter, which news to fetch.
     */
    where?: newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of news to fetch.
     */
    orderBy?: newsOrderByWithRelationInput | newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for news.
     */
    cursor?: newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of news.
     */
    distinct?: NewsScalarFieldEnum | NewsScalarFieldEnum[]
  }

  /**
   * news findMany
   */
  export type newsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * Filter, which news to fetch.
     */
    where?: newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of news to fetch.
     */
    orderBy?: newsOrderByWithRelationInput | newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing news.
     */
    cursor?: newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` news.
     */
    skip?: number
    distinct?: NewsScalarFieldEnum | NewsScalarFieldEnum[]
  }

  /**
   * news create
   */
  export type newsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * The data needed to create a news.
     */
    data: XOR<newsCreateInput, newsUncheckedCreateInput>
  }

  /**
   * news createMany
   */
  export type newsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many news.
     */
    data: newsCreateManyInput | newsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * news createManyAndReturn
   */
  export type newsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * The data used to create many news.
     */
    data: newsCreateManyInput | newsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * news update
   */
  export type newsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * The data needed to update a news.
     */
    data: XOR<newsUpdateInput, newsUncheckedUpdateInput>
    /**
     * Choose, which news to update.
     */
    where: newsWhereUniqueInput
  }

  /**
   * news updateMany
   */
  export type newsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update news.
     */
    data: XOR<newsUpdateManyMutationInput, newsUncheckedUpdateManyInput>
    /**
     * Filter which news to update
     */
    where?: newsWhereInput
    /**
     * Limit how many news to update.
     */
    limit?: number
  }

  /**
   * news updateManyAndReturn
   */
  export type newsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * The data used to update news.
     */
    data: XOR<newsUpdateManyMutationInput, newsUncheckedUpdateManyInput>
    /**
     * Filter which news to update
     */
    where?: newsWhereInput
    /**
     * Limit how many news to update.
     */
    limit?: number
  }

  /**
   * news upsert
   */
  export type newsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * The filter to search for the news to update in case it exists.
     */
    where: newsWhereUniqueInput
    /**
     * In case the news found by the `where` argument doesn't exist, create a new news with this data.
     */
    create: XOR<newsCreateInput, newsUncheckedCreateInput>
    /**
     * In case the news was found with the provided `where` argument, update it with this data.
     */
    update: XOR<newsUpdateInput, newsUncheckedUpdateInput>
  }

  /**
   * news delete
   */
  export type newsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
    /**
     * Filter which news to delete.
     */
    where: newsWhereUniqueInput
  }

  /**
   * news deleteMany
   */
  export type newsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which news to delete
     */
    where?: newsWhereInput
    /**
     * Limit how many news to delete.
     */
    limit?: number
  }

  /**
   * news without action
   */
  export type newsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the news
     */
    select?: newsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the news
     */
    omit?: newsOmit<ExtArgs> | null
  }


  /**
   * Model promocodes
   */

  export type AggregatePromocodes = {
    _count: PromocodesCountAggregateOutputType | null
    _avg: PromocodesAvgAggregateOutputType | null
    _sum: PromocodesSumAggregateOutputType | null
    _min: PromocodesMinAggregateOutputType | null
    _max: PromocodesMaxAggregateOutputType | null
  }

  export type PromocodesAvgAggregateOutputType = {
    discount: number | null
    min_subscription_months: number | null
  }

  export type PromocodesSumAggregateOutputType = {
    discount: number | null
    min_subscription_months: number | null
  }

  export type PromocodesMinAggregateOutputType = {
    id: string | null
    code: string | null
    discount: number | null
    min_subscription_months: number | null
    expires_at: Date | null
  }

  export type PromocodesMaxAggregateOutputType = {
    id: string | null
    code: string | null
    discount: number | null
    min_subscription_months: number | null
    expires_at: Date | null
  }

  export type PromocodesCountAggregateOutputType = {
    id: number
    code: number
    discount: number
    min_subscription_months: number
    expires_at: number
    _all: number
  }


  export type PromocodesAvgAggregateInputType = {
    discount?: true
    min_subscription_months?: true
  }

  export type PromocodesSumAggregateInputType = {
    discount?: true
    min_subscription_months?: true
  }

  export type PromocodesMinAggregateInputType = {
    id?: true
    code?: true
    discount?: true
    min_subscription_months?: true
    expires_at?: true
  }

  export type PromocodesMaxAggregateInputType = {
    id?: true
    code?: true
    discount?: true
    min_subscription_months?: true
    expires_at?: true
  }

  export type PromocodesCountAggregateInputType = {
    id?: true
    code?: true
    discount?: true
    min_subscription_months?: true
    expires_at?: true
    _all?: true
  }

  export type PromocodesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which promocodes to aggregate.
     */
    where?: promocodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promocodes to fetch.
     */
    orderBy?: promocodesOrderByWithRelationInput | promocodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: promocodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promocodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promocodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned promocodes
    **/
    _count?: true | PromocodesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromocodesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromocodesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromocodesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromocodesMaxAggregateInputType
  }

  export type GetPromocodesAggregateType<T extends PromocodesAggregateArgs> = {
        [P in keyof T & keyof AggregatePromocodes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromocodes[P]>
      : GetScalarType<T[P], AggregatePromocodes[P]>
  }




  export type promocodesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: promocodesWhereInput
    orderBy?: promocodesOrderByWithAggregationInput | promocodesOrderByWithAggregationInput[]
    by: PromocodesScalarFieldEnum[] | PromocodesScalarFieldEnum
    having?: promocodesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromocodesCountAggregateInputType | true
    _avg?: PromocodesAvgAggregateInputType
    _sum?: PromocodesSumAggregateInputType
    _min?: PromocodesMinAggregateInputType
    _max?: PromocodesMaxAggregateInputType
  }

  export type PromocodesGroupByOutputType = {
    id: string
    code: string
    discount: number
    min_subscription_months: number | null
    expires_at: Date | null
    _count: PromocodesCountAggregateOutputType | null
    _avg: PromocodesAvgAggregateOutputType | null
    _sum: PromocodesSumAggregateOutputType | null
    _min: PromocodesMinAggregateOutputType | null
    _max: PromocodesMaxAggregateOutputType | null
  }

  type GetPromocodesGroupByPayload<T extends promocodesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromocodesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromocodesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromocodesGroupByOutputType[P]>
            : GetScalarType<T[P], PromocodesGroupByOutputType[P]>
        }
      >
    >


  export type promocodesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    discount?: boolean
    min_subscription_months?: boolean
    expires_at?: boolean
    promo_usage?: boolean | promocodes$promo_usageArgs<ExtArgs>
    _count?: boolean | PromocodesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promocodes"]>

  export type promocodesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    discount?: boolean
    min_subscription_months?: boolean
    expires_at?: boolean
  }, ExtArgs["result"]["promocodes"]>

  export type promocodesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    discount?: boolean
    min_subscription_months?: boolean
    expires_at?: boolean
  }, ExtArgs["result"]["promocodes"]>

  export type promocodesSelectScalar = {
    id?: boolean
    code?: boolean
    discount?: boolean
    min_subscription_months?: boolean
    expires_at?: boolean
  }

  export type promocodesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "discount" | "min_subscription_months" | "expires_at", ExtArgs["result"]["promocodes"]>
  export type promocodesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promo_usage?: boolean | promocodes$promo_usageArgs<ExtArgs>
    _count?: boolean | PromocodesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type promocodesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type promocodesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $promocodesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "promocodes"
    objects: {
      promo_usage: Prisma.$promo_usagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      discount: number
      min_subscription_months: number | null
      expires_at: Date | null
    }, ExtArgs["result"]["promocodes"]>
    composites: {}
  }

  type promocodesGetPayload<S extends boolean | null | undefined | promocodesDefaultArgs> = $Result.GetResult<Prisma.$promocodesPayload, S>

  type promocodesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<promocodesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromocodesCountAggregateInputType | true
    }

  export interface promocodesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['promocodes'], meta: { name: 'promocodes' } }
    /**
     * Find zero or one Promocodes that matches the filter.
     * @param {promocodesFindUniqueArgs} args - Arguments to find a Promocodes
     * @example
     * // Get one Promocodes
     * const promocodes = await prisma.promocodes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends promocodesFindUniqueArgs>(args: SelectSubset<T, promocodesFindUniqueArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Promocodes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {promocodesFindUniqueOrThrowArgs} args - Arguments to find a Promocodes
     * @example
     * // Get one Promocodes
     * const promocodes = await prisma.promocodes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends promocodesFindUniqueOrThrowArgs>(args: SelectSubset<T, promocodesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promocodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promocodesFindFirstArgs} args - Arguments to find a Promocodes
     * @example
     * // Get one Promocodes
     * const promocodes = await prisma.promocodes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends promocodesFindFirstArgs>(args?: SelectSubset<T, promocodesFindFirstArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promocodes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promocodesFindFirstOrThrowArgs} args - Arguments to find a Promocodes
     * @example
     * // Get one Promocodes
     * const promocodes = await prisma.promocodes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends promocodesFindFirstOrThrowArgs>(args?: SelectSubset<T, promocodesFindFirstOrThrowArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promocodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promocodesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promocodes
     * const promocodes = await prisma.promocodes.findMany()
     * 
     * // Get first 10 Promocodes
     * const promocodes = await prisma.promocodes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promocodesWithIdOnly = await prisma.promocodes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends promocodesFindManyArgs>(args?: SelectSubset<T, promocodesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Promocodes.
     * @param {promocodesCreateArgs} args - Arguments to create a Promocodes.
     * @example
     * // Create one Promocodes
     * const Promocodes = await prisma.promocodes.create({
     *   data: {
     *     // ... data to create a Promocodes
     *   }
     * })
     * 
     */
    create<T extends promocodesCreateArgs>(args: SelectSubset<T, promocodesCreateArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Promocodes.
     * @param {promocodesCreateManyArgs} args - Arguments to create many Promocodes.
     * @example
     * // Create many Promocodes
     * const promocodes = await prisma.promocodes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends promocodesCreateManyArgs>(args?: SelectSubset<T, promocodesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Promocodes and returns the data saved in the database.
     * @param {promocodesCreateManyAndReturnArgs} args - Arguments to create many Promocodes.
     * @example
     * // Create many Promocodes
     * const promocodes = await prisma.promocodes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Promocodes and only return the `id`
     * const promocodesWithIdOnly = await prisma.promocodes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends promocodesCreateManyAndReturnArgs>(args?: SelectSubset<T, promocodesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Promocodes.
     * @param {promocodesDeleteArgs} args - Arguments to delete one Promocodes.
     * @example
     * // Delete one Promocodes
     * const Promocodes = await prisma.promocodes.delete({
     *   where: {
     *     // ... filter to delete one Promocodes
     *   }
     * })
     * 
     */
    delete<T extends promocodesDeleteArgs>(args: SelectSubset<T, promocodesDeleteArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Promocodes.
     * @param {promocodesUpdateArgs} args - Arguments to update one Promocodes.
     * @example
     * // Update one Promocodes
     * const promocodes = await prisma.promocodes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends promocodesUpdateArgs>(args: SelectSubset<T, promocodesUpdateArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Promocodes.
     * @param {promocodesDeleteManyArgs} args - Arguments to filter Promocodes to delete.
     * @example
     * // Delete a few Promocodes
     * const { count } = await prisma.promocodes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends promocodesDeleteManyArgs>(args?: SelectSubset<T, promocodesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promocodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promocodesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promocodes
     * const promocodes = await prisma.promocodes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends promocodesUpdateManyArgs>(args: SelectSubset<T, promocodesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promocodes and returns the data updated in the database.
     * @param {promocodesUpdateManyAndReturnArgs} args - Arguments to update many Promocodes.
     * @example
     * // Update many Promocodes
     * const promocodes = await prisma.promocodes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Promocodes and only return the `id`
     * const promocodesWithIdOnly = await prisma.promocodes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends promocodesUpdateManyAndReturnArgs>(args: SelectSubset<T, promocodesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Promocodes.
     * @param {promocodesUpsertArgs} args - Arguments to update or create a Promocodes.
     * @example
     * // Update or create a Promocodes
     * const promocodes = await prisma.promocodes.upsert({
     *   create: {
     *     // ... data to create a Promocodes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promocodes we want to update
     *   }
     * })
     */
    upsert<T extends promocodesUpsertArgs>(args: SelectSubset<T, promocodesUpsertArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Promocodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promocodesCountArgs} args - Arguments to filter Promocodes to count.
     * @example
     * // Count the number of Promocodes
     * const count = await prisma.promocodes.count({
     *   where: {
     *     // ... the filter for the Promocodes we want to count
     *   }
     * })
    **/
    count<T extends promocodesCountArgs>(
      args?: Subset<T, promocodesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromocodesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promocodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromocodesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromocodesAggregateArgs>(args: Subset<T, PromocodesAggregateArgs>): Prisma.PrismaPromise<GetPromocodesAggregateType<T>>

    /**
     * Group by Promocodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promocodesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends promocodesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: promocodesGroupByArgs['orderBy'] }
        : { orderBy?: promocodesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, promocodesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromocodesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the promocodes model
   */
  readonly fields: promocodesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for promocodes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__promocodesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promo_usage<T extends promocodes$promo_usageArgs<ExtArgs> = {}>(args?: Subset<T, promocodes$promo_usageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the promocodes model
   */
  interface promocodesFieldRefs {
    readonly id: FieldRef<"promocodes", 'String'>
    readonly code: FieldRef<"promocodes", 'String'>
    readonly discount: FieldRef<"promocodes", 'Int'>
    readonly min_subscription_months: FieldRef<"promocodes", 'Int'>
    readonly expires_at: FieldRef<"promocodes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * promocodes findUnique
   */
  export type promocodesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * Filter, which promocodes to fetch.
     */
    where: promocodesWhereUniqueInput
  }

  /**
   * promocodes findUniqueOrThrow
   */
  export type promocodesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * Filter, which promocodes to fetch.
     */
    where: promocodesWhereUniqueInput
  }

  /**
   * promocodes findFirst
   */
  export type promocodesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * Filter, which promocodes to fetch.
     */
    where?: promocodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promocodes to fetch.
     */
    orderBy?: promocodesOrderByWithRelationInput | promocodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for promocodes.
     */
    cursor?: promocodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promocodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promocodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of promocodes.
     */
    distinct?: PromocodesScalarFieldEnum | PromocodesScalarFieldEnum[]
  }

  /**
   * promocodes findFirstOrThrow
   */
  export type promocodesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * Filter, which promocodes to fetch.
     */
    where?: promocodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promocodes to fetch.
     */
    orderBy?: promocodesOrderByWithRelationInput | promocodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for promocodes.
     */
    cursor?: promocodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promocodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promocodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of promocodes.
     */
    distinct?: PromocodesScalarFieldEnum | PromocodesScalarFieldEnum[]
  }

  /**
   * promocodes findMany
   */
  export type promocodesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * Filter, which promocodes to fetch.
     */
    where?: promocodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promocodes to fetch.
     */
    orderBy?: promocodesOrderByWithRelationInput | promocodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing promocodes.
     */
    cursor?: promocodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promocodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promocodes.
     */
    skip?: number
    distinct?: PromocodesScalarFieldEnum | PromocodesScalarFieldEnum[]
  }

  /**
   * promocodes create
   */
  export type promocodesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * The data needed to create a promocodes.
     */
    data: XOR<promocodesCreateInput, promocodesUncheckedCreateInput>
  }

  /**
   * promocodes createMany
   */
  export type promocodesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many promocodes.
     */
    data: promocodesCreateManyInput | promocodesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * promocodes createManyAndReturn
   */
  export type promocodesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * The data used to create many promocodes.
     */
    data: promocodesCreateManyInput | promocodesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * promocodes update
   */
  export type promocodesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * The data needed to update a promocodes.
     */
    data: XOR<promocodesUpdateInput, promocodesUncheckedUpdateInput>
    /**
     * Choose, which promocodes to update.
     */
    where: promocodesWhereUniqueInput
  }

  /**
   * promocodes updateMany
   */
  export type promocodesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update promocodes.
     */
    data: XOR<promocodesUpdateManyMutationInput, promocodesUncheckedUpdateManyInput>
    /**
     * Filter which promocodes to update
     */
    where?: promocodesWhereInput
    /**
     * Limit how many promocodes to update.
     */
    limit?: number
  }

  /**
   * promocodes updateManyAndReturn
   */
  export type promocodesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * The data used to update promocodes.
     */
    data: XOR<promocodesUpdateManyMutationInput, promocodesUncheckedUpdateManyInput>
    /**
     * Filter which promocodes to update
     */
    where?: promocodesWhereInput
    /**
     * Limit how many promocodes to update.
     */
    limit?: number
  }

  /**
   * promocodes upsert
   */
  export type promocodesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * The filter to search for the promocodes to update in case it exists.
     */
    where: promocodesWhereUniqueInput
    /**
     * In case the promocodes found by the `where` argument doesn't exist, create a new promocodes with this data.
     */
    create: XOR<promocodesCreateInput, promocodesUncheckedCreateInput>
    /**
     * In case the promocodes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<promocodesUpdateInput, promocodesUncheckedUpdateInput>
  }

  /**
   * promocodes delete
   */
  export type promocodesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
    /**
     * Filter which promocodes to delete.
     */
    where: promocodesWhereUniqueInput
  }

  /**
   * promocodes deleteMany
   */
  export type promocodesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which promocodes to delete
     */
    where?: promocodesWhereInput
    /**
     * Limit how many promocodes to delete.
     */
    limit?: number
  }

  /**
   * promocodes.promo_usage
   */
  export type promocodes$promo_usageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    where?: promo_usageWhereInput
    orderBy?: promo_usageOrderByWithRelationInput | promo_usageOrderByWithRelationInput[]
    cursor?: promo_usageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Promo_usageScalarFieldEnum | Promo_usageScalarFieldEnum[]
  }

  /**
   * promocodes without action
   */
  export type promocodesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promocodes
     */
    select?: promocodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promocodes
     */
    omit?: promocodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promocodesInclude<ExtArgs> | null
  }


  /**
   * Model promo_usage
   */

  export type AggregatePromo_usage = {
    _count: Promo_usageCountAggregateOutputType | null
    _min: Promo_usageMinAggregateOutputType | null
    _max: Promo_usageMaxAggregateOutputType | null
  }

  export type Promo_usageMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    promocode_id: string | null
    used_at: Date | null
  }

  export type Promo_usageMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    promocode_id: string | null
    used_at: Date | null
  }

  export type Promo_usageCountAggregateOutputType = {
    id: number
    user_id: number
    promocode_id: number
    used_at: number
    _all: number
  }


  export type Promo_usageMinAggregateInputType = {
    id?: true
    user_id?: true
    promocode_id?: true
    used_at?: true
  }

  export type Promo_usageMaxAggregateInputType = {
    id?: true
    user_id?: true
    promocode_id?: true
    used_at?: true
  }

  export type Promo_usageCountAggregateInputType = {
    id?: true
    user_id?: true
    promocode_id?: true
    used_at?: true
    _all?: true
  }

  export type Promo_usageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which promo_usage to aggregate.
     */
    where?: promo_usageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promo_usages to fetch.
     */
    orderBy?: promo_usageOrderByWithRelationInput | promo_usageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: promo_usageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promo_usages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promo_usages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned promo_usages
    **/
    _count?: true | Promo_usageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Promo_usageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Promo_usageMaxAggregateInputType
  }

  export type GetPromo_usageAggregateType<T extends Promo_usageAggregateArgs> = {
        [P in keyof T & keyof AggregatePromo_usage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromo_usage[P]>
      : GetScalarType<T[P], AggregatePromo_usage[P]>
  }




  export type promo_usageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: promo_usageWhereInput
    orderBy?: promo_usageOrderByWithAggregationInput | promo_usageOrderByWithAggregationInput[]
    by: Promo_usageScalarFieldEnum[] | Promo_usageScalarFieldEnum
    having?: promo_usageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Promo_usageCountAggregateInputType | true
    _min?: Promo_usageMinAggregateInputType
    _max?: Promo_usageMaxAggregateInputType
  }

  export type Promo_usageGroupByOutputType = {
    id: string
    user_id: string
    promocode_id: string
    used_at: Date | null
    _count: Promo_usageCountAggregateOutputType | null
    _min: Promo_usageMinAggregateOutputType | null
    _max: Promo_usageMaxAggregateOutputType | null
  }

  type GetPromo_usageGroupByPayload<T extends promo_usageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Promo_usageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Promo_usageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Promo_usageGroupByOutputType[P]>
            : GetScalarType<T[P], Promo_usageGroupByOutputType[P]>
        }
      >
    >


  export type promo_usageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    promocode_id?: boolean
    used_at?: boolean
    promocodes?: boolean | promocodesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promo_usage"]>

  export type promo_usageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    promocode_id?: boolean
    used_at?: boolean
    promocodes?: boolean | promocodesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promo_usage"]>

  export type promo_usageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    promocode_id?: boolean
    used_at?: boolean
    promocodes?: boolean | promocodesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promo_usage"]>

  export type promo_usageSelectScalar = {
    id?: boolean
    user_id?: boolean
    promocode_id?: boolean
    used_at?: boolean
  }

  export type promo_usageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "promocode_id" | "used_at", ExtArgs["result"]["promo_usage"]>
  export type promo_usageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promocodes?: boolean | promocodesDefaultArgs<ExtArgs>
  }
  export type promo_usageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promocodes?: boolean | promocodesDefaultArgs<ExtArgs>
  }
  export type promo_usageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promocodes?: boolean | promocodesDefaultArgs<ExtArgs>
  }

  export type $promo_usagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "promo_usage"
    objects: {
      promocodes: Prisma.$promocodesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      promocode_id: string
      used_at: Date | null
    }, ExtArgs["result"]["promo_usage"]>
    composites: {}
  }

  type promo_usageGetPayload<S extends boolean | null | undefined | promo_usageDefaultArgs> = $Result.GetResult<Prisma.$promo_usagePayload, S>

  type promo_usageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<promo_usageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Promo_usageCountAggregateInputType | true
    }

  export interface promo_usageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['promo_usage'], meta: { name: 'promo_usage' } }
    /**
     * Find zero or one Promo_usage that matches the filter.
     * @param {promo_usageFindUniqueArgs} args - Arguments to find a Promo_usage
     * @example
     * // Get one Promo_usage
     * const promo_usage = await prisma.promo_usage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends promo_usageFindUniqueArgs>(args: SelectSubset<T, promo_usageFindUniqueArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Promo_usage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {promo_usageFindUniqueOrThrowArgs} args - Arguments to find a Promo_usage
     * @example
     * // Get one Promo_usage
     * const promo_usage = await prisma.promo_usage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends promo_usageFindUniqueOrThrowArgs>(args: SelectSubset<T, promo_usageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promo_usage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promo_usageFindFirstArgs} args - Arguments to find a Promo_usage
     * @example
     * // Get one Promo_usage
     * const promo_usage = await prisma.promo_usage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends promo_usageFindFirstArgs>(args?: SelectSubset<T, promo_usageFindFirstArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promo_usage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promo_usageFindFirstOrThrowArgs} args - Arguments to find a Promo_usage
     * @example
     * // Get one Promo_usage
     * const promo_usage = await prisma.promo_usage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends promo_usageFindFirstOrThrowArgs>(args?: SelectSubset<T, promo_usageFindFirstOrThrowArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promo_usages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promo_usageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promo_usages
     * const promo_usages = await prisma.promo_usage.findMany()
     * 
     * // Get first 10 Promo_usages
     * const promo_usages = await prisma.promo_usage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promo_usageWithIdOnly = await prisma.promo_usage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends promo_usageFindManyArgs>(args?: SelectSubset<T, promo_usageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Promo_usage.
     * @param {promo_usageCreateArgs} args - Arguments to create a Promo_usage.
     * @example
     * // Create one Promo_usage
     * const Promo_usage = await prisma.promo_usage.create({
     *   data: {
     *     // ... data to create a Promo_usage
     *   }
     * })
     * 
     */
    create<T extends promo_usageCreateArgs>(args: SelectSubset<T, promo_usageCreateArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Promo_usages.
     * @param {promo_usageCreateManyArgs} args - Arguments to create many Promo_usages.
     * @example
     * // Create many Promo_usages
     * const promo_usage = await prisma.promo_usage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends promo_usageCreateManyArgs>(args?: SelectSubset<T, promo_usageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Promo_usages and returns the data saved in the database.
     * @param {promo_usageCreateManyAndReturnArgs} args - Arguments to create many Promo_usages.
     * @example
     * // Create many Promo_usages
     * const promo_usage = await prisma.promo_usage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Promo_usages and only return the `id`
     * const promo_usageWithIdOnly = await prisma.promo_usage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends promo_usageCreateManyAndReturnArgs>(args?: SelectSubset<T, promo_usageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Promo_usage.
     * @param {promo_usageDeleteArgs} args - Arguments to delete one Promo_usage.
     * @example
     * // Delete one Promo_usage
     * const Promo_usage = await prisma.promo_usage.delete({
     *   where: {
     *     // ... filter to delete one Promo_usage
     *   }
     * })
     * 
     */
    delete<T extends promo_usageDeleteArgs>(args: SelectSubset<T, promo_usageDeleteArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Promo_usage.
     * @param {promo_usageUpdateArgs} args - Arguments to update one Promo_usage.
     * @example
     * // Update one Promo_usage
     * const promo_usage = await prisma.promo_usage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends promo_usageUpdateArgs>(args: SelectSubset<T, promo_usageUpdateArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Promo_usages.
     * @param {promo_usageDeleteManyArgs} args - Arguments to filter Promo_usages to delete.
     * @example
     * // Delete a few Promo_usages
     * const { count } = await prisma.promo_usage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends promo_usageDeleteManyArgs>(args?: SelectSubset<T, promo_usageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promo_usages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promo_usageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promo_usages
     * const promo_usage = await prisma.promo_usage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends promo_usageUpdateManyArgs>(args: SelectSubset<T, promo_usageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promo_usages and returns the data updated in the database.
     * @param {promo_usageUpdateManyAndReturnArgs} args - Arguments to update many Promo_usages.
     * @example
     * // Update many Promo_usages
     * const promo_usage = await prisma.promo_usage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Promo_usages and only return the `id`
     * const promo_usageWithIdOnly = await prisma.promo_usage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends promo_usageUpdateManyAndReturnArgs>(args: SelectSubset<T, promo_usageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Promo_usage.
     * @param {promo_usageUpsertArgs} args - Arguments to update or create a Promo_usage.
     * @example
     * // Update or create a Promo_usage
     * const promo_usage = await prisma.promo_usage.upsert({
     *   create: {
     *     // ... data to create a Promo_usage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promo_usage we want to update
     *   }
     * })
     */
    upsert<T extends promo_usageUpsertArgs>(args: SelectSubset<T, promo_usageUpsertArgs<ExtArgs>>): Prisma__promo_usageClient<$Result.GetResult<Prisma.$promo_usagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Promo_usages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promo_usageCountArgs} args - Arguments to filter Promo_usages to count.
     * @example
     * // Count the number of Promo_usages
     * const count = await prisma.promo_usage.count({
     *   where: {
     *     // ... the filter for the Promo_usages we want to count
     *   }
     * })
    **/
    count<T extends promo_usageCountArgs>(
      args?: Subset<T, promo_usageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Promo_usageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promo_usage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Promo_usageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Promo_usageAggregateArgs>(args: Subset<T, Promo_usageAggregateArgs>): Prisma.PrismaPromise<GetPromo_usageAggregateType<T>>

    /**
     * Group by Promo_usage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {promo_usageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends promo_usageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: promo_usageGroupByArgs['orderBy'] }
        : { orderBy?: promo_usageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, promo_usageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromo_usageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the promo_usage model
   */
  readonly fields: promo_usageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for promo_usage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__promo_usageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promocodes<T extends promocodesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, promocodesDefaultArgs<ExtArgs>>): Prisma__promocodesClient<$Result.GetResult<Prisma.$promocodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the promo_usage model
   */
  interface promo_usageFieldRefs {
    readonly id: FieldRef<"promo_usage", 'String'>
    readonly user_id: FieldRef<"promo_usage", 'String'>
    readonly promocode_id: FieldRef<"promo_usage", 'String'>
    readonly used_at: FieldRef<"promo_usage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * promo_usage findUnique
   */
  export type promo_usageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * Filter, which promo_usage to fetch.
     */
    where: promo_usageWhereUniqueInput
  }

  /**
   * promo_usage findUniqueOrThrow
   */
  export type promo_usageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * Filter, which promo_usage to fetch.
     */
    where: promo_usageWhereUniqueInput
  }

  /**
   * promo_usage findFirst
   */
  export type promo_usageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * Filter, which promo_usage to fetch.
     */
    where?: promo_usageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promo_usages to fetch.
     */
    orderBy?: promo_usageOrderByWithRelationInput | promo_usageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for promo_usages.
     */
    cursor?: promo_usageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promo_usages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promo_usages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of promo_usages.
     */
    distinct?: Promo_usageScalarFieldEnum | Promo_usageScalarFieldEnum[]
  }

  /**
   * promo_usage findFirstOrThrow
   */
  export type promo_usageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * Filter, which promo_usage to fetch.
     */
    where?: promo_usageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promo_usages to fetch.
     */
    orderBy?: promo_usageOrderByWithRelationInput | promo_usageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for promo_usages.
     */
    cursor?: promo_usageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promo_usages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promo_usages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of promo_usages.
     */
    distinct?: Promo_usageScalarFieldEnum | Promo_usageScalarFieldEnum[]
  }

  /**
   * promo_usage findMany
   */
  export type promo_usageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * Filter, which promo_usages to fetch.
     */
    where?: promo_usageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of promo_usages to fetch.
     */
    orderBy?: promo_usageOrderByWithRelationInput | promo_usageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing promo_usages.
     */
    cursor?: promo_usageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` promo_usages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` promo_usages.
     */
    skip?: number
    distinct?: Promo_usageScalarFieldEnum | Promo_usageScalarFieldEnum[]
  }

  /**
   * promo_usage create
   */
  export type promo_usageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * The data needed to create a promo_usage.
     */
    data: XOR<promo_usageCreateInput, promo_usageUncheckedCreateInput>
  }

  /**
   * promo_usage createMany
   */
  export type promo_usageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many promo_usages.
     */
    data: promo_usageCreateManyInput | promo_usageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * promo_usage createManyAndReturn
   */
  export type promo_usageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * The data used to create many promo_usages.
     */
    data: promo_usageCreateManyInput | promo_usageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * promo_usage update
   */
  export type promo_usageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * The data needed to update a promo_usage.
     */
    data: XOR<promo_usageUpdateInput, promo_usageUncheckedUpdateInput>
    /**
     * Choose, which promo_usage to update.
     */
    where: promo_usageWhereUniqueInput
  }

  /**
   * promo_usage updateMany
   */
  export type promo_usageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update promo_usages.
     */
    data: XOR<promo_usageUpdateManyMutationInput, promo_usageUncheckedUpdateManyInput>
    /**
     * Filter which promo_usages to update
     */
    where?: promo_usageWhereInput
    /**
     * Limit how many promo_usages to update.
     */
    limit?: number
  }

  /**
   * promo_usage updateManyAndReturn
   */
  export type promo_usageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * The data used to update promo_usages.
     */
    data: XOR<promo_usageUpdateManyMutationInput, promo_usageUncheckedUpdateManyInput>
    /**
     * Filter which promo_usages to update
     */
    where?: promo_usageWhereInput
    /**
     * Limit how many promo_usages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * promo_usage upsert
   */
  export type promo_usageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * The filter to search for the promo_usage to update in case it exists.
     */
    where: promo_usageWhereUniqueInput
    /**
     * In case the promo_usage found by the `where` argument doesn't exist, create a new promo_usage with this data.
     */
    create: XOR<promo_usageCreateInput, promo_usageUncheckedCreateInput>
    /**
     * In case the promo_usage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<promo_usageUpdateInput, promo_usageUncheckedUpdateInput>
  }

  /**
   * promo_usage delete
   */
  export type promo_usageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
    /**
     * Filter which promo_usage to delete.
     */
    where: promo_usageWhereUniqueInput
  }

  /**
   * promo_usage deleteMany
   */
  export type promo_usageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which promo_usages to delete
     */
    where?: promo_usageWhereInput
    /**
     * Limit how many promo_usages to delete.
     */
    limit?: number
  }

  /**
   * promo_usage without action
   */
  export type promo_usageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the promo_usage
     */
    select?: promo_usageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the promo_usage
     */
    omit?: promo_usageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: promo_usageInclude<ExtArgs> | null
  }


  /**
   * Model service_orders
   */

  export type AggregateService_orders = {
    _count: Service_ordersCountAggregateOutputType | null
    _min: Service_ordersMinAggregateOutputType | null
    _max: Service_ordersMaxAggregateOutputType | null
  }

  export type Service_ordersMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    operator_id: string | null
    service_desc: string | null
    status: string | null
    created_at: Date | null
  }

  export type Service_ordersMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    operator_id: string | null
    service_desc: string | null
    status: string | null
    created_at: Date | null
  }

  export type Service_ordersCountAggregateOutputType = {
    id: number
    user_id: number
    operator_id: number
    service_desc: number
    status: number
    created_at: number
    _all: number
  }


  export type Service_ordersMinAggregateInputType = {
    id?: true
    user_id?: true
    operator_id?: true
    service_desc?: true
    status?: true
    created_at?: true
  }

  export type Service_ordersMaxAggregateInputType = {
    id?: true
    user_id?: true
    operator_id?: true
    service_desc?: true
    status?: true
    created_at?: true
  }

  export type Service_ordersCountAggregateInputType = {
    id?: true
    user_id?: true
    operator_id?: true
    service_desc?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type Service_ordersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_orders to aggregate.
     */
    where?: service_ordersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_orders to fetch.
     */
    orderBy?: service_ordersOrderByWithRelationInput | service_ordersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: service_ordersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned service_orders
    **/
    _count?: true | Service_ordersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Service_ordersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Service_ordersMaxAggregateInputType
  }

  export type GetService_ordersAggregateType<T extends Service_ordersAggregateArgs> = {
        [P in keyof T & keyof AggregateService_orders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService_orders[P]>
      : GetScalarType<T[P], AggregateService_orders[P]>
  }




  export type service_ordersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_ordersWhereInput
    orderBy?: service_ordersOrderByWithAggregationInput | service_ordersOrderByWithAggregationInput[]
    by: Service_ordersScalarFieldEnum[] | Service_ordersScalarFieldEnum
    having?: service_ordersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Service_ordersCountAggregateInputType | true
    _min?: Service_ordersMinAggregateInputType
    _max?: Service_ordersMaxAggregateInputType
  }

  export type Service_ordersGroupByOutputType = {
    id: string
    user_id: string
    operator_id: string | null
    service_desc: string
    status: string | null
    created_at: Date | null
    _count: Service_ordersCountAggregateOutputType | null
    _min: Service_ordersMinAggregateOutputType | null
    _max: Service_ordersMaxAggregateOutputType | null
  }

  type GetService_ordersGroupByPayload<T extends service_ordersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Service_ordersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Service_ordersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Service_ordersGroupByOutputType[P]>
            : GetScalarType<T[P], Service_ordersGroupByOutputType[P]>
        }
      >
    >


  export type service_ordersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    operator_id?: boolean
    service_desc?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["service_orders"]>

  export type service_ordersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    operator_id?: boolean
    service_desc?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["service_orders"]>

  export type service_ordersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    operator_id?: boolean
    service_desc?: boolean
    status?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["service_orders"]>

  export type service_ordersSelectScalar = {
    id?: boolean
    user_id?: boolean
    operator_id?: boolean
    service_desc?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type service_ordersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "operator_id" | "service_desc" | "status" | "created_at", ExtArgs["result"]["service_orders"]>

  export type $service_ordersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "service_orders"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      operator_id: string | null
      service_desc: string
      status: string | null
      created_at: Date | null
    }, ExtArgs["result"]["service_orders"]>
    composites: {}
  }

  type service_ordersGetPayload<S extends boolean | null | undefined | service_ordersDefaultArgs> = $Result.GetResult<Prisma.$service_ordersPayload, S>

  type service_ordersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<service_ordersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Service_ordersCountAggregateInputType | true
    }

  export interface service_ordersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['service_orders'], meta: { name: 'service_orders' } }
    /**
     * Find zero or one Service_orders that matches the filter.
     * @param {service_ordersFindUniqueArgs} args - Arguments to find a Service_orders
     * @example
     * // Get one Service_orders
     * const service_orders = await prisma.service_orders.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends service_ordersFindUniqueArgs>(args: SelectSubset<T, service_ordersFindUniqueArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service_orders that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {service_ordersFindUniqueOrThrowArgs} args - Arguments to find a Service_orders
     * @example
     * // Get one Service_orders
     * const service_orders = await prisma.service_orders.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends service_ordersFindUniqueOrThrowArgs>(args: SelectSubset<T, service_ordersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_ordersFindFirstArgs} args - Arguments to find a Service_orders
     * @example
     * // Get one Service_orders
     * const service_orders = await prisma.service_orders.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends service_ordersFindFirstArgs>(args?: SelectSubset<T, service_ordersFindFirstArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_orders that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_ordersFindFirstOrThrowArgs} args - Arguments to find a Service_orders
     * @example
     * // Get one Service_orders
     * const service_orders = await prisma.service_orders.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends service_ordersFindFirstOrThrowArgs>(args?: SelectSubset<T, service_ordersFindFirstOrThrowArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Service_orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_ordersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Service_orders
     * const service_orders = await prisma.service_orders.findMany()
     * 
     * // Get first 10 Service_orders
     * const service_orders = await prisma.service_orders.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const service_ordersWithIdOnly = await prisma.service_orders.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends service_ordersFindManyArgs>(args?: SelectSubset<T, service_ordersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service_orders.
     * @param {service_ordersCreateArgs} args - Arguments to create a Service_orders.
     * @example
     * // Create one Service_orders
     * const Service_orders = await prisma.service_orders.create({
     *   data: {
     *     // ... data to create a Service_orders
     *   }
     * })
     * 
     */
    create<T extends service_ordersCreateArgs>(args: SelectSubset<T, service_ordersCreateArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Service_orders.
     * @param {service_ordersCreateManyArgs} args - Arguments to create many Service_orders.
     * @example
     * // Create many Service_orders
     * const service_orders = await prisma.service_orders.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends service_ordersCreateManyArgs>(args?: SelectSubset<T, service_ordersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Service_orders and returns the data saved in the database.
     * @param {service_ordersCreateManyAndReturnArgs} args - Arguments to create many Service_orders.
     * @example
     * // Create many Service_orders
     * const service_orders = await prisma.service_orders.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Service_orders and only return the `id`
     * const service_ordersWithIdOnly = await prisma.service_orders.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends service_ordersCreateManyAndReturnArgs>(args?: SelectSubset<T, service_ordersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service_orders.
     * @param {service_ordersDeleteArgs} args - Arguments to delete one Service_orders.
     * @example
     * // Delete one Service_orders
     * const Service_orders = await prisma.service_orders.delete({
     *   where: {
     *     // ... filter to delete one Service_orders
     *   }
     * })
     * 
     */
    delete<T extends service_ordersDeleteArgs>(args: SelectSubset<T, service_ordersDeleteArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service_orders.
     * @param {service_ordersUpdateArgs} args - Arguments to update one Service_orders.
     * @example
     * // Update one Service_orders
     * const service_orders = await prisma.service_orders.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends service_ordersUpdateArgs>(args: SelectSubset<T, service_ordersUpdateArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Service_orders.
     * @param {service_ordersDeleteManyArgs} args - Arguments to filter Service_orders to delete.
     * @example
     * // Delete a few Service_orders
     * const { count } = await prisma.service_orders.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends service_ordersDeleteManyArgs>(args?: SelectSubset<T, service_ordersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_ordersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Service_orders
     * const service_orders = await prisma.service_orders.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends service_ordersUpdateManyArgs>(args: SelectSubset<T, service_ordersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_orders and returns the data updated in the database.
     * @param {service_ordersUpdateManyAndReturnArgs} args - Arguments to update many Service_orders.
     * @example
     * // Update many Service_orders
     * const service_orders = await prisma.service_orders.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Service_orders and only return the `id`
     * const service_ordersWithIdOnly = await prisma.service_orders.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends service_ordersUpdateManyAndReturnArgs>(args: SelectSubset<T, service_ordersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service_orders.
     * @param {service_ordersUpsertArgs} args - Arguments to update or create a Service_orders.
     * @example
     * // Update or create a Service_orders
     * const service_orders = await prisma.service_orders.upsert({
     *   create: {
     *     // ... data to create a Service_orders
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service_orders we want to update
     *   }
     * })
     */
    upsert<T extends service_ordersUpsertArgs>(args: SelectSubset<T, service_ordersUpsertArgs<ExtArgs>>): Prisma__service_ordersClient<$Result.GetResult<Prisma.$service_ordersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Service_orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_ordersCountArgs} args - Arguments to filter Service_orders to count.
     * @example
     * // Count the number of Service_orders
     * const count = await prisma.service_orders.count({
     *   where: {
     *     // ... the filter for the Service_orders we want to count
     *   }
     * })
    **/
    count<T extends service_ordersCountArgs>(
      args?: Subset<T, service_ordersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Service_ordersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service_orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Service_ordersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Service_ordersAggregateArgs>(args: Subset<T, Service_ordersAggregateArgs>): Prisma.PrismaPromise<GetService_ordersAggregateType<T>>

    /**
     * Group by Service_orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_ordersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends service_ordersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: service_ordersGroupByArgs['orderBy'] }
        : { orderBy?: service_ordersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, service_ordersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetService_ordersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the service_orders model
   */
  readonly fields: service_ordersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for service_orders.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__service_ordersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the service_orders model
   */
  interface service_ordersFieldRefs {
    readonly id: FieldRef<"service_orders", 'String'>
    readonly user_id: FieldRef<"service_orders", 'String'>
    readonly operator_id: FieldRef<"service_orders", 'String'>
    readonly service_desc: FieldRef<"service_orders", 'String'>
    readonly status: FieldRef<"service_orders", 'String'>
    readonly created_at: FieldRef<"service_orders", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * service_orders findUnique
   */
  export type service_ordersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * Filter, which service_orders to fetch.
     */
    where: service_ordersWhereUniqueInput
  }

  /**
   * service_orders findUniqueOrThrow
   */
  export type service_ordersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * Filter, which service_orders to fetch.
     */
    where: service_ordersWhereUniqueInput
  }

  /**
   * service_orders findFirst
   */
  export type service_ordersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * Filter, which service_orders to fetch.
     */
    where?: service_ordersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_orders to fetch.
     */
    orderBy?: service_ordersOrderByWithRelationInput | service_ordersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_orders.
     */
    cursor?: service_ordersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_orders.
     */
    distinct?: Service_ordersScalarFieldEnum | Service_ordersScalarFieldEnum[]
  }

  /**
   * service_orders findFirstOrThrow
   */
  export type service_ordersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * Filter, which service_orders to fetch.
     */
    where?: service_ordersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_orders to fetch.
     */
    orderBy?: service_ordersOrderByWithRelationInput | service_ordersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_orders.
     */
    cursor?: service_ordersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_orders.
     */
    distinct?: Service_ordersScalarFieldEnum | Service_ordersScalarFieldEnum[]
  }

  /**
   * service_orders findMany
   */
  export type service_ordersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * Filter, which service_orders to fetch.
     */
    where?: service_ordersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_orders to fetch.
     */
    orderBy?: service_ordersOrderByWithRelationInput | service_ordersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing service_orders.
     */
    cursor?: service_ordersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_orders.
     */
    skip?: number
    distinct?: Service_ordersScalarFieldEnum | Service_ordersScalarFieldEnum[]
  }

  /**
   * service_orders create
   */
  export type service_ordersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * The data needed to create a service_orders.
     */
    data: XOR<service_ordersCreateInput, service_ordersUncheckedCreateInput>
  }

  /**
   * service_orders createMany
   */
  export type service_ordersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many service_orders.
     */
    data: service_ordersCreateManyInput | service_ordersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * service_orders createManyAndReturn
   */
  export type service_ordersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * The data used to create many service_orders.
     */
    data: service_ordersCreateManyInput | service_ordersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * service_orders update
   */
  export type service_ordersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * The data needed to update a service_orders.
     */
    data: XOR<service_ordersUpdateInput, service_ordersUncheckedUpdateInput>
    /**
     * Choose, which service_orders to update.
     */
    where: service_ordersWhereUniqueInput
  }

  /**
   * service_orders updateMany
   */
  export type service_ordersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update service_orders.
     */
    data: XOR<service_ordersUpdateManyMutationInput, service_ordersUncheckedUpdateManyInput>
    /**
     * Filter which service_orders to update
     */
    where?: service_ordersWhereInput
    /**
     * Limit how many service_orders to update.
     */
    limit?: number
  }

  /**
   * service_orders updateManyAndReturn
   */
  export type service_ordersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * The data used to update service_orders.
     */
    data: XOR<service_ordersUpdateManyMutationInput, service_ordersUncheckedUpdateManyInput>
    /**
     * Filter which service_orders to update
     */
    where?: service_ordersWhereInput
    /**
     * Limit how many service_orders to update.
     */
    limit?: number
  }

  /**
   * service_orders upsert
   */
  export type service_ordersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * The filter to search for the service_orders to update in case it exists.
     */
    where: service_ordersWhereUniqueInput
    /**
     * In case the service_orders found by the `where` argument doesn't exist, create a new service_orders with this data.
     */
    create: XOR<service_ordersCreateInput, service_ordersUncheckedCreateInput>
    /**
     * In case the service_orders was found with the provided `where` argument, update it with this data.
     */
    update: XOR<service_ordersUpdateInput, service_ordersUncheckedUpdateInput>
  }

  /**
   * service_orders delete
   */
  export type service_ordersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
    /**
     * Filter which service_orders to delete.
     */
    where: service_ordersWhereUniqueInput
  }

  /**
   * service_orders deleteMany
   */
  export type service_ordersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_orders to delete
     */
    where?: service_ordersWhereInput
    /**
     * Limit how many service_orders to delete.
     */
    limit?: number
  }

  /**
   * service_orders without action
   */
  export type service_ordersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_orders
     */
    select?: service_ordersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_orders
     */
    omit?: service_ordersOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    phone: 'phone',
    password: 'password',
    subscription_id: 'subscription_id',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SubscriptionsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    duration_days: 'duration_days',
    price: 'price'
  };

  export type SubscriptionsScalarFieldEnum = (typeof SubscriptionsScalarFieldEnum)[keyof typeof SubscriptionsScalarFieldEnum]


  export const User_subscriptionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    subscription_id: 'subscription_id',
    start_date: 'start_date',
    end_date: 'end_date',
    active: 'active'
  };

  export type User_subscriptionsScalarFieldEnum = (typeof User_subscriptionsScalarFieldEnum)[keyof typeof User_subscriptionsScalarFieldEnum]


  export const Support_requestsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    description: 'description',
    status: 'status',
    created_at: 'created_at'
  };

  export type Support_requestsScalarFieldEnum = (typeof Support_requestsScalarFieldEnum)[keyof typeof Support_requestsScalarFieldEnum]


  export const NewsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    body: 'body',
    created_at: 'created_at'
  };

  export type NewsScalarFieldEnum = (typeof NewsScalarFieldEnum)[keyof typeof NewsScalarFieldEnum]


  export const PromocodesScalarFieldEnum: {
    id: 'id',
    code: 'code',
    discount: 'discount',
    min_subscription_months: 'min_subscription_months',
    expires_at: 'expires_at'
  };

  export type PromocodesScalarFieldEnum = (typeof PromocodesScalarFieldEnum)[keyof typeof PromocodesScalarFieldEnum]


  export const Promo_usageScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    promocode_id: 'promocode_id',
    used_at: 'used_at'
  };

  export type Promo_usageScalarFieldEnum = (typeof Promo_usageScalarFieldEnum)[keyof typeof Promo_usageScalarFieldEnum]


  export const Service_ordersScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    operator_id: 'operator_id',
    service_desc: 'service_desc',
    status: 'status',
    created_at: 'created_at'
  };

  export type Service_ordersScalarFieldEnum = (typeof Service_ordersScalarFieldEnum)[keyof typeof Service_ordersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    phone?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    subscription_id?: UuidNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    currentSubscription?: XOR<SubscriptionsNullableScalarRelationFilter, subscriptionsWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    subscription_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    currentSubscription?: subscriptionsOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    username?: StringFilter<"users"> | string
    phone?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    subscription_id?: UuidNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    currentSubscription?: XOR<SubscriptionsNullableScalarRelationFilter, subscriptionsWhereInput> | null
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    subscription_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    phone?: StringNullableWithAggregatesFilter<"users"> | string | null
    password?: StringWithAggregatesFilter<"users"> | string
    subscription_id?: UuidNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type subscriptionsWhereInput = {
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    id?: UuidFilter<"subscriptions"> | string
    title?: StringFilter<"subscriptions"> | string
    duration_days?: IntFilter<"subscriptions"> | number
    price?: DecimalFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string
    user_subscriptions?: User_subscriptionsListRelationFilter
    currentUsers?: UsersListRelationFilter
  }

  export type subscriptionsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    duration_days?: SortOrder
    price?: SortOrder
    user_subscriptions?: user_subscriptionsOrderByRelationAggregateInput
    currentUsers?: usersOrderByRelationAggregateInput
  }

  export type subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    title?: StringFilter<"subscriptions"> | string
    duration_days?: IntFilter<"subscriptions"> | number
    price?: DecimalFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string
    user_subscriptions?: User_subscriptionsListRelationFilter
    currentUsers?: UsersListRelationFilter
  }, "id">

  export type subscriptionsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    duration_days?: SortOrder
    price?: SortOrder
    _count?: subscriptionsCountOrderByAggregateInput
    _avg?: subscriptionsAvgOrderByAggregateInput
    _max?: subscriptionsMaxOrderByAggregateInput
    _min?: subscriptionsMinOrderByAggregateInput
    _sum?: subscriptionsSumOrderByAggregateInput
  }

  export type subscriptionsScalarWhereWithAggregatesInput = {
    AND?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    OR?: subscriptionsScalarWhereWithAggregatesInput[]
    NOT?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"subscriptions"> | string
    title?: StringWithAggregatesFilter<"subscriptions"> | string
    duration_days?: IntWithAggregatesFilter<"subscriptions"> | number
    price?: DecimalWithAggregatesFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string
  }

  export type user_subscriptionsWhereInput = {
    AND?: user_subscriptionsWhereInput | user_subscriptionsWhereInput[]
    OR?: user_subscriptionsWhereInput[]
    NOT?: user_subscriptionsWhereInput | user_subscriptionsWhereInput[]
    id?: UuidFilter<"user_subscriptions"> | string
    user_id?: UuidFilter<"user_subscriptions"> | string
    subscription_id?: UuidFilter<"user_subscriptions"> | string
    start_date?: DateTimeFilter<"user_subscriptions"> | Date | string
    end_date?: DateTimeFilter<"user_subscriptions"> | Date | string
    active?: BoolNullableFilter<"user_subscriptions"> | boolean | null
    subscriptions?: XOR<SubscriptionsScalarRelationFilter, subscriptionsWhereInput>
  }

  export type user_subscriptionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    subscription_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    active?: SortOrderInput | SortOrder
    subscriptions?: subscriptionsOrderByWithRelationInput
  }

  export type user_subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: user_subscriptionsWhereInput | user_subscriptionsWhereInput[]
    OR?: user_subscriptionsWhereInput[]
    NOT?: user_subscriptionsWhereInput | user_subscriptionsWhereInput[]
    user_id?: UuidFilter<"user_subscriptions"> | string
    subscription_id?: UuidFilter<"user_subscriptions"> | string
    start_date?: DateTimeFilter<"user_subscriptions"> | Date | string
    end_date?: DateTimeFilter<"user_subscriptions"> | Date | string
    active?: BoolNullableFilter<"user_subscriptions"> | boolean | null
    subscriptions?: XOR<SubscriptionsScalarRelationFilter, subscriptionsWhereInput>
  }, "id">

  export type user_subscriptionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    subscription_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    active?: SortOrderInput | SortOrder
    _count?: user_subscriptionsCountOrderByAggregateInput
    _max?: user_subscriptionsMaxOrderByAggregateInput
    _min?: user_subscriptionsMinOrderByAggregateInput
  }

  export type user_subscriptionsScalarWhereWithAggregatesInput = {
    AND?: user_subscriptionsScalarWhereWithAggregatesInput | user_subscriptionsScalarWhereWithAggregatesInput[]
    OR?: user_subscriptionsScalarWhereWithAggregatesInput[]
    NOT?: user_subscriptionsScalarWhereWithAggregatesInput | user_subscriptionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"user_subscriptions"> | string
    user_id?: UuidWithAggregatesFilter<"user_subscriptions"> | string
    subscription_id?: UuidWithAggregatesFilter<"user_subscriptions"> | string
    start_date?: DateTimeWithAggregatesFilter<"user_subscriptions"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"user_subscriptions"> | Date | string
    active?: BoolNullableWithAggregatesFilter<"user_subscriptions"> | boolean | null
  }

  export type support_requestsWhereInput = {
    AND?: support_requestsWhereInput | support_requestsWhereInput[]
    OR?: support_requestsWhereInput[]
    NOT?: support_requestsWhereInput | support_requestsWhereInput[]
    id?: UuidFilter<"support_requests"> | string
    user_id?: UuidFilter<"support_requests"> | string
    title?: StringFilter<"support_requests"> | string
    description?: StringNullableFilter<"support_requests"> | string | null
    status?: StringNullableFilter<"support_requests"> | string | null
    created_at?: DateTimeNullableFilter<"support_requests"> | Date | string | null
  }

  export type support_requestsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type support_requestsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: support_requestsWhereInput | support_requestsWhereInput[]
    OR?: support_requestsWhereInput[]
    NOT?: support_requestsWhereInput | support_requestsWhereInput[]
    user_id?: UuidFilter<"support_requests"> | string
    title?: StringFilter<"support_requests"> | string
    description?: StringNullableFilter<"support_requests"> | string | null
    status?: StringNullableFilter<"support_requests"> | string | null
    created_at?: DateTimeNullableFilter<"support_requests"> | Date | string | null
  }, "id">

  export type support_requestsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: support_requestsCountOrderByAggregateInput
    _max?: support_requestsMaxOrderByAggregateInput
    _min?: support_requestsMinOrderByAggregateInput
  }

  export type support_requestsScalarWhereWithAggregatesInput = {
    AND?: support_requestsScalarWhereWithAggregatesInput | support_requestsScalarWhereWithAggregatesInput[]
    OR?: support_requestsScalarWhereWithAggregatesInput[]
    NOT?: support_requestsScalarWhereWithAggregatesInput | support_requestsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"support_requests"> | string
    user_id?: UuidWithAggregatesFilter<"support_requests"> | string
    title?: StringWithAggregatesFilter<"support_requests"> | string
    description?: StringNullableWithAggregatesFilter<"support_requests"> | string | null
    status?: StringNullableWithAggregatesFilter<"support_requests"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"support_requests"> | Date | string | null
  }

  export type newsWhereInput = {
    AND?: newsWhereInput | newsWhereInput[]
    OR?: newsWhereInput[]
    NOT?: newsWhereInput | newsWhereInput[]
    id?: UuidFilter<"news"> | string
    title?: StringFilter<"news"> | string
    body?: StringNullableFilter<"news"> | string | null
    created_at?: DateTimeNullableFilter<"news"> | Date | string | null
  }

  export type newsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type newsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: newsWhereInput | newsWhereInput[]
    OR?: newsWhereInput[]
    NOT?: newsWhereInput | newsWhereInput[]
    title?: StringFilter<"news"> | string
    body?: StringNullableFilter<"news"> | string | null
    created_at?: DateTimeNullableFilter<"news"> | Date | string | null
  }, "id">

  export type newsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: newsCountOrderByAggregateInput
    _max?: newsMaxOrderByAggregateInput
    _min?: newsMinOrderByAggregateInput
  }

  export type newsScalarWhereWithAggregatesInput = {
    AND?: newsScalarWhereWithAggregatesInput | newsScalarWhereWithAggregatesInput[]
    OR?: newsScalarWhereWithAggregatesInput[]
    NOT?: newsScalarWhereWithAggregatesInput | newsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"news"> | string
    title?: StringWithAggregatesFilter<"news"> | string
    body?: StringNullableWithAggregatesFilter<"news"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"news"> | Date | string | null
  }

  export type promocodesWhereInput = {
    AND?: promocodesWhereInput | promocodesWhereInput[]
    OR?: promocodesWhereInput[]
    NOT?: promocodesWhereInput | promocodesWhereInput[]
    id?: UuidFilter<"promocodes"> | string
    code?: StringFilter<"promocodes"> | string
    discount?: IntFilter<"promocodes"> | number
    min_subscription_months?: IntNullableFilter<"promocodes"> | number | null
    expires_at?: DateTimeNullableFilter<"promocodes"> | Date | string | null
    promo_usage?: Promo_usageListRelationFilter
  }

  export type promocodesOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    discount?: SortOrder
    min_subscription_months?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    promo_usage?: promo_usageOrderByRelationAggregateInput
  }

  export type promocodesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: promocodesWhereInput | promocodesWhereInput[]
    OR?: promocodesWhereInput[]
    NOT?: promocodesWhereInput | promocodesWhereInput[]
    discount?: IntFilter<"promocodes"> | number
    min_subscription_months?: IntNullableFilter<"promocodes"> | number | null
    expires_at?: DateTimeNullableFilter<"promocodes"> | Date | string | null
    promo_usage?: Promo_usageListRelationFilter
  }, "id" | "code">

  export type promocodesOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    discount?: SortOrder
    min_subscription_months?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    _count?: promocodesCountOrderByAggregateInput
    _avg?: promocodesAvgOrderByAggregateInput
    _max?: promocodesMaxOrderByAggregateInput
    _min?: promocodesMinOrderByAggregateInput
    _sum?: promocodesSumOrderByAggregateInput
  }

  export type promocodesScalarWhereWithAggregatesInput = {
    AND?: promocodesScalarWhereWithAggregatesInput | promocodesScalarWhereWithAggregatesInput[]
    OR?: promocodesScalarWhereWithAggregatesInput[]
    NOT?: promocodesScalarWhereWithAggregatesInput | promocodesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"promocodes"> | string
    code?: StringWithAggregatesFilter<"promocodes"> | string
    discount?: IntWithAggregatesFilter<"promocodes"> | number
    min_subscription_months?: IntNullableWithAggregatesFilter<"promocodes"> | number | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"promocodes"> | Date | string | null
  }

  export type promo_usageWhereInput = {
    AND?: promo_usageWhereInput | promo_usageWhereInput[]
    OR?: promo_usageWhereInput[]
    NOT?: promo_usageWhereInput | promo_usageWhereInput[]
    id?: UuidFilter<"promo_usage"> | string
    user_id?: UuidFilter<"promo_usage"> | string
    promocode_id?: UuidFilter<"promo_usage"> | string
    used_at?: DateTimeNullableFilter<"promo_usage"> | Date | string | null
    promocodes?: XOR<PromocodesScalarRelationFilter, promocodesWhereInput>
  }

  export type promo_usageOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    promocode_id?: SortOrder
    used_at?: SortOrderInput | SortOrder
    promocodes?: promocodesOrderByWithRelationInput
  }

  export type promo_usageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: promo_usageWhereInput | promo_usageWhereInput[]
    OR?: promo_usageWhereInput[]
    NOT?: promo_usageWhereInput | promo_usageWhereInput[]
    user_id?: UuidFilter<"promo_usage"> | string
    promocode_id?: UuidFilter<"promo_usage"> | string
    used_at?: DateTimeNullableFilter<"promo_usage"> | Date | string | null
    promocodes?: XOR<PromocodesScalarRelationFilter, promocodesWhereInput>
  }, "id">

  export type promo_usageOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    promocode_id?: SortOrder
    used_at?: SortOrderInput | SortOrder
    _count?: promo_usageCountOrderByAggregateInput
    _max?: promo_usageMaxOrderByAggregateInput
    _min?: promo_usageMinOrderByAggregateInput
  }

  export type promo_usageScalarWhereWithAggregatesInput = {
    AND?: promo_usageScalarWhereWithAggregatesInput | promo_usageScalarWhereWithAggregatesInput[]
    OR?: promo_usageScalarWhereWithAggregatesInput[]
    NOT?: promo_usageScalarWhereWithAggregatesInput | promo_usageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"promo_usage"> | string
    user_id?: UuidWithAggregatesFilter<"promo_usage"> | string
    promocode_id?: UuidWithAggregatesFilter<"promo_usage"> | string
    used_at?: DateTimeNullableWithAggregatesFilter<"promo_usage"> | Date | string | null
  }

  export type service_ordersWhereInput = {
    AND?: service_ordersWhereInput | service_ordersWhereInput[]
    OR?: service_ordersWhereInput[]
    NOT?: service_ordersWhereInput | service_ordersWhereInput[]
    id?: UuidFilter<"service_orders"> | string
    user_id?: UuidFilter<"service_orders"> | string
    operator_id?: UuidNullableFilter<"service_orders"> | string | null
    service_desc?: StringFilter<"service_orders"> | string
    status?: StringNullableFilter<"service_orders"> | string | null
    created_at?: DateTimeNullableFilter<"service_orders"> | Date | string | null
  }

  export type service_ordersOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    operator_id?: SortOrderInput | SortOrder
    service_desc?: SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type service_ordersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: service_ordersWhereInput | service_ordersWhereInput[]
    OR?: service_ordersWhereInput[]
    NOT?: service_ordersWhereInput | service_ordersWhereInput[]
    user_id?: UuidFilter<"service_orders"> | string
    operator_id?: UuidNullableFilter<"service_orders"> | string | null
    service_desc?: StringFilter<"service_orders"> | string
    status?: StringNullableFilter<"service_orders"> | string | null
    created_at?: DateTimeNullableFilter<"service_orders"> | Date | string | null
  }, "id">

  export type service_ordersOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    operator_id?: SortOrderInput | SortOrder
    service_desc?: SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: service_ordersCountOrderByAggregateInput
    _max?: service_ordersMaxOrderByAggregateInput
    _min?: service_ordersMinOrderByAggregateInput
  }

  export type service_ordersScalarWhereWithAggregatesInput = {
    AND?: service_ordersScalarWhereWithAggregatesInput | service_ordersScalarWhereWithAggregatesInput[]
    OR?: service_ordersScalarWhereWithAggregatesInput[]
    NOT?: service_ordersScalarWhereWithAggregatesInput | service_ordersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"service_orders"> | string
    user_id?: UuidWithAggregatesFilter<"service_orders"> | string
    operator_id?: UuidNullableWithAggregatesFilter<"service_orders"> | string | null
    service_desc?: StringWithAggregatesFilter<"service_orders"> | string
    status?: StringNullableWithAggregatesFilter<"service_orders"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"service_orders"> | Date | string | null
  }

  export type usersCreateInput = {
    id?: string
    username: string
    email: string
    phone?: string | null
    password: string
    created_at?: Date | string | null
    currentSubscription?: subscriptionsCreateNestedOneWithoutCurrentUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    phone?: string | null
    password: string
    subscription_id?: string | null
    created_at?: Date | string | null
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentSubscription?: subscriptionsUpdateOneWithoutCurrentUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    subscription_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateManyInput = {
    id?: string
    username: string
    email: string
    phone?: string | null
    password: string
    subscription_id?: string | null
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    subscription_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type subscriptionsCreateInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsCreateNestedManyWithoutSubscriptionsInput
    currentUsers?: usersCreateNestedManyWithoutCurrentSubscriptionInput
  }

  export type subscriptionsUncheckedCreateInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsUncheckedCreateNestedManyWithoutSubscriptionsInput
    currentUsers?: usersUncheckedCreateNestedManyWithoutCurrentSubscriptionInput
  }

  export type subscriptionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsUpdateManyWithoutSubscriptionsNestedInput
    currentUsers?: usersUpdateManyWithoutCurrentSubscriptionNestedInput
  }

  export type subscriptionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsUncheckedUpdateManyWithoutSubscriptionsNestedInput
    currentUsers?: usersUncheckedUpdateManyWithoutCurrentSubscriptionNestedInput
  }

  export type subscriptionsCreateManyInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type subscriptionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type subscriptionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type user_subscriptionsCreateInput = {
    id?: string
    user_id: string
    start_date: Date | string
    end_date: Date | string
    active?: boolean | null
    subscriptions: subscriptionsCreateNestedOneWithoutUser_subscriptionsInput
  }

  export type user_subscriptionsUncheckedCreateInput = {
    id?: string
    user_id: string
    subscription_id: string
    start_date: Date | string
    end_date: Date | string
    active?: boolean | null
  }

  export type user_subscriptionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subscriptions?: subscriptionsUpdateOneRequiredWithoutUser_subscriptionsNestedInput
  }

  export type user_subscriptionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    subscription_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type user_subscriptionsCreateManyInput = {
    id?: string
    user_id: string
    subscription_id: string
    start_date: Date | string
    end_date: Date | string
    active?: boolean | null
  }

  export type user_subscriptionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type user_subscriptionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    subscription_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type support_requestsCreateInput = {
    id?: string
    user_id: string
    title: string
    description?: string | null
    status?: string | null
    created_at?: Date | string | null
  }

  export type support_requestsUncheckedCreateInput = {
    id?: string
    user_id: string
    title: string
    description?: string | null
    status?: string | null
    created_at?: Date | string | null
  }

  export type support_requestsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type support_requestsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type support_requestsCreateManyInput = {
    id?: string
    user_id: string
    title: string
    description?: string | null
    status?: string | null
    created_at?: Date | string | null
  }

  export type support_requestsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type support_requestsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type newsCreateInput = {
    id?: string
    title: string
    body?: string | null
    created_at?: Date | string | null
  }

  export type newsUncheckedCreateInput = {
    id?: string
    title: string
    body?: string | null
    created_at?: Date | string | null
  }

  export type newsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type newsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type newsCreateManyInput = {
    id?: string
    title: string
    body?: string | null
    created_at?: Date | string | null
  }

  export type newsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type newsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promocodesCreateInput = {
    id?: string
    code: string
    discount: number
    min_subscription_months?: number | null
    expires_at?: Date | string | null
    promo_usage?: promo_usageCreateNestedManyWithoutPromocodesInput
  }

  export type promocodesUncheckedCreateInput = {
    id?: string
    code: string
    discount: number
    min_subscription_months?: number | null
    expires_at?: Date | string | null
    promo_usage?: promo_usageUncheckedCreateNestedManyWithoutPromocodesInput
  }

  export type promocodesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discount?: IntFieldUpdateOperationsInput | number
    min_subscription_months?: NullableIntFieldUpdateOperationsInput | number | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    promo_usage?: promo_usageUpdateManyWithoutPromocodesNestedInput
  }

  export type promocodesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discount?: IntFieldUpdateOperationsInput | number
    min_subscription_months?: NullableIntFieldUpdateOperationsInput | number | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    promo_usage?: promo_usageUncheckedUpdateManyWithoutPromocodesNestedInput
  }

  export type promocodesCreateManyInput = {
    id?: string
    code: string
    discount: number
    min_subscription_months?: number | null
    expires_at?: Date | string | null
  }

  export type promocodesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discount?: IntFieldUpdateOperationsInput | number
    min_subscription_months?: NullableIntFieldUpdateOperationsInput | number | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promocodesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discount?: IntFieldUpdateOperationsInput | number
    min_subscription_months?: NullableIntFieldUpdateOperationsInput | number | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promo_usageCreateInput = {
    id?: string
    user_id: string
    used_at?: Date | string | null
    promocodes: promocodesCreateNestedOneWithoutPromo_usageInput
  }

  export type promo_usageUncheckedCreateInput = {
    id?: string
    user_id: string
    promocode_id: string
    used_at?: Date | string | null
  }

  export type promo_usageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    promocodes?: promocodesUpdateOneRequiredWithoutPromo_usageNestedInput
  }

  export type promo_usageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    promocode_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promo_usageCreateManyInput = {
    id?: string
    user_id: string
    promocode_id: string
    used_at?: Date | string | null
  }

  export type promo_usageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promo_usageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    promocode_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type service_ordersCreateInput = {
    id?: string
    user_id: string
    operator_id?: string | null
    service_desc: string
    status?: string | null
    created_at?: Date | string | null
  }

  export type service_ordersUncheckedCreateInput = {
    id?: string
    user_id: string
    operator_id?: string | null
    service_desc: string
    status?: string | null
    created_at?: Date | string | null
  }

  export type service_ordersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    operator_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_desc?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type service_ordersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    operator_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_desc?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type service_ordersCreateManyInput = {
    id?: string
    user_id: string
    operator_id?: string | null
    service_desc: string
    status?: string | null
    created_at?: Date | string | null
  }

  export type service_ordersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    operator_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_desc?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type service_ordersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    operator_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_desc?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubscriptionsNullableScalarRelationFilter = {
    is?: subscriptionsWhereInput | null
    isNot?: subscriptionsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    subscription_id?: SortOrder
    created_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    subscription_id?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    subscription_id?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type User_subscriptionsListRelationFilter = {
    every?: user_subscriptionsWhereInput
    some?: user_subscriptionsWhereInput
    none?: user_subscriptionsWhereInput
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type user_subscriptionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subscriptionsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    duration_days?: SortOrder
    price?: SortOrder
  }

  export type subscriptionsAvgOrderByAggregateInput = {
    duration_days?: SortOrder
    price?: SortOrder
  }

  export type subscriptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    duration_days?: SortOrder
    price?: SortOrder
  }

  export type subscriptionsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    duration_days?: SortOrder
    price?: SortOrder
  }

  export type subscriptionsSumOrderByAggregateInput = {
    duration_days?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SubscriptionsScalarRelationFilter = {
    is?: subscriptionsWhereInput
    isNot?: subscriptionsWhereInput
  }

  export type user_subscriptionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    subscription_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    active?: SortOrder
  }

  export type user_subscriptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    subscription_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    active?: SortOrder
  }

  export type user_subscriptionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    subscription_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    active?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type support_requestsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type support_requestsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type support_requestsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type newsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
  }

  export type newsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
  }

  export type newsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    created_at?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Promo_usageListRelationFilter = {
    every?: promo_usageWhereInput
    some?: promo_usageWhereInput
    none?: promo_usageWhereInput
  }

  export type promo_usageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type promocodesCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    discount?: SortOrder
    min_subscription_months?: SortOrder
    expires_at?: SortOrder
  }

  export type promocodesAvgOrderByAggregateInput = {
    discount?: SortOrder
    min_subscription_months?: SortOrder
  }

  export type promocodesMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    discount?: SortOrder
    min_subscription_months?: SortOrder
    expires_at?: SortOrder
  }

  export type promocodesMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    discount?: SortOrder
    min_subscription_months?: SortOrder
    expires_at?: SortOrder
  }

  export type promocodesSumOrderByAggregateInput = {
    discount?: SortOrder
    min_subscription_months?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PromocodesScalarRelationFilter = {
    is?: promocodesWhereInput
    isNot?: promocodesWhereInput
  }

  export type promo_usageCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    promocode_id?: SortOrder
    used_at?: SortOrder
  }

  export type promo_usageMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    promocode_id?: SortOrder
    used_at?: SortOrder
  }

  export type promo_usageMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    promocode_id?: SortOrder
    used_at?: SortOrder
  }

  export type service_ordersCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    operator_id?: SortOrder
    service_desc?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type service_ordersMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    operator_id?: SortOrder
    service_desc?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type service_ordersMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    operator_id?: SortOrder
    service_desc?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type subscriptionsCreateNestedOneWithoutCurrentUsersInput = {
    create?: XOR<subscriptionsCreateWithoutCurrentUsersInput, subscriptionsUncheckedCreateWithoutCurrentUsersInput>
    connectOrCreate?: subscriptionsCreateOrConnectWithoutCurrentUsersInput
    connect?: subscriptionsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type subscriptionsUpdateOneWithoutCurrentUsersNestedInput = {
    create?: XOR<subscriptionsCreateWithoutCurrentUsersInput, subscriptionsUncheckedCreateWithoutCurrentUsersInput>
    connectOrCreate?: subscriptionsCreateOrConnectWithoutCurrentUsersInput
    upsert?: subscriptionsUpsertWithoutCurrentUsersInput
    disconnect?: subscriptionsWhereInput | boolean
    delete?: subscriptionsWhereInput | boolean
    connect?: subscriptionsWhereUniqueInput
    update?: XOR<XOR<subscriptionsUpdateToOneWithWhereWithoutCurrentUsersInput, subscriptionsUpdateWithoutCurrentUsersInput>, subscriptionsUncheckedUpdateWithoutCurrentUsersInput>
  }

  export type user_subscriptionsCreateNestedManyWithoutSubscriptionsInput = {
    create?: XOR<user_subscriptionsCreateWithoutSubscriptionsInput, user_subscriptionsUncheckedCreateWithoutSubscriptionsInput> | user_subscriptionsCreateWithoutSubscriptionsInput[] | user_subscriptionsUncheckedCreateWithoutSubscriptionsInput[]
    connectOrCreate?: user_subscriptionsCreateOrConnectWithoutSubscriptionsInput | user_subscriptionsCreateOrConnectWithoutSubscriptionsInput[]
    createMany?: user_subscriptionsCreateManySubscriptionsInputEnvelope
    connect?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
  }

  export type usersCreateNestedManyWithoutCurrentSubscriptionInput = {
    create?: XOR<usersCreateWithoutCurrentSubscriptionInput, usersUncheckedCreateWithoutCurrentSubscriptionInput> | usersCreateWithoutCurrentSubscriptionInput[] | usersUncheckedCreateWithoutCurrentSubscriptionInput[]
    connectOrCreate?: usersCreateOrConnectWithoutCurrentSubscriptionInput | usersCreateOrConnectWithoutCurrentSubscriptionInput[]
    createMany?: usersCreateManyCurrentSubscriptionInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type user_subscriptionsUncheckedCreateNestedManyWithoutSubscriptionsInput = {
    create?: XOR<user_subscriptionsCreateWithoutSubscriptionsInput, user_subscriptionsUncheckedCreateWithoutSubscriptionsInput> | user_subscriptionsCreateWithoutSubscriptionsInput[] | user_subscriptionsUncheckedCreateWithoutSubscriptionsInput[]
    connectOrCreate?: user_subscriptionsCreateOrConnectWithoutSubscriptionsInput | user_subscriptionsCreateOrConnectWithoutSubscriptionsInput[]
    createMany?: user_subscriptionsCreateManySubscriptionsInputEnvelope
    connect?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutCurrentSubscriptionInput = {
    create?: XOR<usersCreateWithoutCurrentSubscriptionInput, usersUncheckedCreateWithoutCurrentSubscriptionInput> | usersCreateWithoutCurrentSubscriptionInput[] | usersUncheckedCreateWithoutCurrentSubscriptionInput[]
    connectOrCreate?: usersCreateOrConnectWithoutCurrentSubscriptionInput | usersCreateOrConnectWithoutCurrentSubscriptionInput[]
    createMany?: usersCreateManyCurrentSubscriptionInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type user_subscriptionsUpdateManyWithoutSubscriptionsNestedInput = {
    create?: XOR<user_subscriptionsCreateWithoutSubscriptionsInput, user_subscriptionsUncheckedCreateWithoutSubscriptionsInput> | user_subscriptionsCreateWithoutSubscriptionsInput[] | user_subscriptionsUncheckedCreateWithoutSubscriptionsInput[]
    connectOrCreate?: user_subscriptionsCreateOrConnectWithoutSubscriptionsInput | user_subscriptionsCreateOrConnectWithoutSubscriptionsInput[]
    upsert?: user_subscriptionsUpsertWithWhereUniqueWithoutSubscriptionsInput | user_subscriptionsUpsertWithWhereUniqueWithoutSubscriptionsInput[]
    createMany?: user_subscriptionsCreateManySubscriptionsInputEnvelope
    set?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    disconnect?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    delete?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    connect?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    update?: user_subscriptionsUpdateWithWhereUniqueWithoutSubscriptionsInput | user_subscriptionsUpdateWithWhereUniqueWithoutSubscriptionsInput[]
    updateMany?: user_subscriptionsUpdateManyWithWhereWithoutSubscriptionsInput | user_subscriptionsUpdateManyWithWhereWithoutSubscriptionsInput[]
    deleteMany?: user_subscriptionsScalarWhereInput | user_subscriptionsScalarWhereInput[]
  }

  export type usersUpdateManyWithoutCurrentSubscriptionNestedInput = {
    create?: XOR<usersCreateWithoutCurrentSubscriptionInput, usersUncheckedCreateWithoutCurrentSubscriptionInput> | usersCreateWithoutCurrentSubscriptionInput[] | usersUncheckedCreateWithoutCurrentSubscriptionInput[]
    connectOrCreate?: usersCreateOrConnectWithoutCurrentSubscriptionInput | usersCreateOrConnectWithoutCurrentSubscriptionInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutCurrentSubscriptionInput | usersUpsertWithWhereUniqueWithoutCurrentSubscriptionInput[]
    createMany?: usersCreateManyCurrentSubscriptionInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutCurrentSubscriptionInput | usersUpdateWithWhereUniqueWithoutCurrentSubscriptionInput[]
    updateMany?: usersUpdateManyWithWhereWithoutCurrentSubscriptionInput | usersUpdateManyWithWhereWithoutCurrentSubscriptionInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type user_subscriptionsUncheckedUpdateManyWithoutSubscriptionsNestedInput = {
    create?: XOR<user_subscriptionsCreateWithoutSubscriptionsInput, user_subscriptionsUncheckedCreateWithoutSubscriptionsInput> | user_subscriptionsCreateWithoutSubscriptionsInput[] | user_subscriptionsUncheckedCreateWithoutSubscriptionsInput[]
    connectOrCreate?: user_subscriptionsCreateOrConnectWithoutSubscriptionsInput | user_subscriptionsCreateOrConnectWithoutSubscriptionsInput[]
    upsert?: user_subscriptionsUpsertWithWhereUniqueWithoutSubscriptionsInput | user_subscriptionsUpsertWithWhereUniqueWithoutSubscriptionsInput[]
    createMany?: user_subscriptionsCreateManySubscriptionsInputEnvelope
    set?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    disconnect?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    delete?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    connect?: user_subscriptionsWhereUniqueInput | user_subscriptionsWhereUniqueInput[]
    update?: user_subscriptionsUpdateWithWhereUniqueWithoutSubscriptionsInput | user_subscriptionsUpdateWithWhereUniqueWithoutSubscriptionsInput[]
    updateMany?: user_subscriptionsUpdateManyWithWhereWithoutSubscriptionsInput | user_subscriptionsUpdateManyWithWhereWithoutSubscriptionsInput[]
    deleteMany?: user_subscriptionsScalarWhereInput | user_subscriptionsScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutCurrentSubscriptionNestedInput = {
    create?: XOR<usersCreateWithoutCurrentSubscriptionInput, usersUncheckedCreateWithoutCurrentSubscriptionInput> | usersCreateWithoutCurrentSubscriptionInput[] | usersUncheckedCreateWithoutCurrentSubscriptionInput[]
    connectOrCreate?: usersCreateOrConnectWithoutCurrentSubscriptionInput | usersCreateOrConnectWithoutCurrentSubscriptionInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutCurrentSubscriptionInput | usersUpsertWithWhereUniqueWithoutCurrentSubscriptionInput[]
    createMany?: usersCreateManyCurrentSubscriptionInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutCurrentSubscriptionInput | usersUpdateWithWhereUniqueWithoutCurrentSubscriptionInput[]
    updateMany?: usersUpdateManyWithWhereWithoutCurrentSubscriptionInput | usersUpdateManyWithWhereWithoutCurrentSubscriptionInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type subscriptionsCreateNestedOneWithoutUser_subscriptionsInput = {
    create?: XOR<subscriptionsCreateWithoutUser_subscriptionsInput, subscriptionsUncheckedCreateWithoutUser_subscriptionsInput>
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUser_subscriptionsInput
    connect?: subscriptionsWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type subscriptionsUpdateOneRequiredWithoutUser_subscriptionsNestedInput = {
    create?: XOR<subscriptionsCreateWithoutUser_subscriptionsInput, subscriptionsUncheckedCreateWithoutUser_subscriptionsInput>
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUser_subscriptionsInput
    upsert?: subscriptionsUpsertWithoutUser_subscriptionsInput
    connect?: subscriptionsWhereUniqueInput
    update?: XOR<XOR<subscriptionsUpdateToOneWithWhereWithoutUser_subscriptionsInput, subscriptionsUpdateWithoutUser_subscriptionsInput>, subscriptionsUncheckedUpdateWithoutUser_subscriptionsInput>
  }

  export type promo_usageCreateNestedManyWithoutPromocodesInput = {
    create?: XOR<promo_usageCreateWithoutPromocodesInput, promo_usageUncheckedCreateWithoutPromocodesInput> | promo_usageCreateWithoutPromocodesInput[] | promo_usageUncheckedCreateWithoutPromocodesInput[]
    connectOrCreate?: promo_usageCreateOrConnectWithoutPromocodesInput | promo_usageCreateOrConnectWithoutPromocodesInput[]
    createMany?: promo_usageCreateManyPromocodesInputEnvelope
    connect?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
  }

  export type promo_usageUncheckedCreateNestedManyWithoutPromocodesInput = {
    create?: XOR<promo_usageCreateWithoutPromocodesInput, promo_usageUncheckedCreateWithoutPromocodesInput> | promo_usageCreateWithoutPromocodesInput[] | promo_usageUncheckedCreateWithoutPromocodesInput[]
    connectOrCreate?: promo_usageCreateOrConnectWithoutPromocodesInput | promo_usageCreateOrConnectWithoutPromocodesInput[]
    createMany?: promo_usageCreateManyPromocodesInputEnvelope
    connect?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type promo_usageUpdateManyWithoutPromocodesNestedInput = {
    create?: XOR<promo_usageCreateWithoutPromocodesInput, promo_usageUncheckedCreateWithoutPromocodesInput> | promo_usageCreateWithoutPromocodesInput[] | promo_usageUncheckedCreateWithoutPromocodesInput[]
    connectOrCreate?: promo_usageCreateOrConnectWithoutPromocodesInput | promo_usageCreateOrConnectWithoutPromocodesInput[]
    upsert?: promo_usageUpsertWithWhereUniqueWithoutPromocodesInput | promo_usageUpsertWithWhereUniqueWithoutPromocodesInput[]
    createMany?: promo_usageCreateManyPromocodesInputEnvelope
    set?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    disconnect?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    delete?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    connect?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    update?: promo_usageUpdateWithWhereUniqueWithoutPromocodesInput | promo_usageUpdateWithWhereUniqueWithoutPromocodesInput[]
    updateMany?: promo_usageUpdateManyWithWhereWithoutPromocodesInput | promo_usageUpdateManyWithWhereWithoutPromocodesInput[]
    deleteMany?: promo_usageScalarWhereInput | promo_usageScalarWhereInput[]
  }

  export type promo_usageUncheckedUpdateManyWithoutPromocodesNestedInput = {
    create?: XOR<promo_usageCreateWithoutPromocodesInput, promo_usageUncheckedCreateWithoutPromocodesInput> | promo_usageCreateWithoutPromocodesInput[] | promo_usageUncheckedCreateWithoutPromocodesInput[]
    connectOrCreate?: promo_usageCreateOrConnectWithoutPromocodesInput | promo_usageCreateOrConnectWithoutPromocodesInput[]
    upsert?: promo_usageUpsertWithWhereUniqueWithoutPromocodesInput | promo_usageUpsertWithWhereUniqueWithoutPromocodesInput[]
    createMany?: promo_usageCreateManyPromocodesInputEnvelope
    set?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    disconnect?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    delete?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    connect?: promo_usageWhereUniqueInput | promo_usageWhereUniqueInput[]
    update?: promo_usageUpdateWithWhereUniqueWithoutPromocodesInput | promo_usageUpdateWithWhereUniqueWithoutPromocodesInput[]
    updateMany?: promo_usageUpdateManyWithWhereWithoutPromocodesInput | promo_usageUpdateManyWithWhereWithoutPromocodesInput[]
    deleteMany?: promo_usageScalarWhereInput | promo_usageScalarWhereInput[]
  }

  export type promocodesCreateNestedOneWithoutPromo_usageInput = {
    create?: XOR<promocodesCreateWithoutPromo_usageInput, promocodesUncheckedCreateWithoutPromo_usageInput>
    connectOrCreate?: promocodesCreateOrConnectWithoutPromo_usageInput
    connect?: promocodesWhereUniqueInput
  }

  export type promocodesUpdateOneRequiredWithoutPromo_usageNestedInput = {
    create?: XOR<promocodesCreateWithoutPromo_usageInput, promocodesUncheckedCreateWithoutPromo_usageInput>
    connectOrCreate?: promocodesCreateOrConnectWithoutPromo_usageInput
    upsert?: promocodesUpsertWithoutPromo_usageInput
    connect?: promocodesWhereUniqueInput
    update?: XOR<XOR<promocodesUpdateToOneWithWhereWithoutPromo_usageInput, promocodesUpdateWithoutPromo_usageInput>, promocodesUncheckedUpdateWithoutPromo_usageInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type subscriptionsCreateWithoutCurrentUsersInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsCreateNestedManyWithoutSubscriptionsInput
  }

  export type subscriptionsUncheckedCreateWithoutCurrentUsersInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsUncheckedCreateNestedManyWithoutSubscriptionsInput
  }

  export type subscriptionsCreateOrConnectWithoutCurrentUsersInput = {
    where: subscriptionsWhereUniqueInput
    create: XOR<subscriptionsCreateWithoutCurrentUsersInput, subscriptionsUncheckedCreateWithoutCurrentUsersInput>
  }

  export type subscriptionsUpsertWithoutCurrentUsersInput = {
    update: XOR<subscriptionsUpdateWithoutCurrentUsersInput, subscriptionsUncheckedUpdateWithoutCurrentUsersInput>
    create: XOR<subscriptionsCreateWithoutCurrentUsersInput, subscriptionsUncheckedCreateWithoutCurrentUsersInput>
    where?: subscriptionsWhereInput
  }

  export type subscriptionsUpdateToOneWithWhereWithoutCurrentUsersInput = {
    where?: subscriptionsWhereInput
    data: XOR<subscriptionsUpdateWithoutCurrentUsersInput, subscriptionsUncheckedUpdateWithoutCurrentUsersInput>
  }

  export type subscriptionsUpdateWithoutCurrentUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsUpdateManyWithoutSubscriptionsNestedInput
  }

  export type subscriptionsUncheckedUpdateWithoutCurrentUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user_subscriptions?: user_subscriptionsUncheckedUpdateManyWithoutSubscriptionsNestedInput
  }

  export type user_subscriptionsCreateWithoutSubscriptionsInput = {
    id?: string
    user_id: string
    start_date: Date | string
    end_date: Date | string
    active?: boolean | null
  }

  export type user_subscriptionsUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    user_id: string
    start_date: Date | string
    end_date: Date | string
    active?: boolean | null
  }

  export type user_subscriptionsCreateOrConnectWithoutSubscriptionsInput = {
    where: user_subscriptionsWhereUniqueInput
    create: XOR<user_subscriptionsCreateWithoutSubscriptionsInput, user_subscriptionsUncheckedCreateWithoutSubscriptionsInput>
  }

  export type user_subscriptionsCreateManySubscriptionsInputEnvelope = {
    data: user_subscriptionsCreateManySubscriptionsInput | user_subscriptionsCreateManySubscriptionsInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutCurrentSubscriptionInput = {
    id?: string
    username: string
    email: string
    phone?: string | null
    password: string
    created_at?: Date | string | null
  }

  export type usersUncheckedCreateWithoutCurrentSubscriptionInput = {
    id?: string
    username: string
    email: string
    phone?: string | null
    password: string
    created_at?: Date | string | null
  }

  export type usersCreateOrConnectWithoutCurrentSubscriptionInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCurrentSubscriptionInput, usersUncheckedCreateWithoutCurrentSubscriptionInput>
  }

  export type usersCreateManyCurrentSubscriptionInputEnvelope = {
    data: usersCreateManyCurrentSubscriptionInput | usersCreateManyCurrentSubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type user_subscriptionsUpsertWithWhereUniqueWithoutSubscriptionsInput = {
    where: user_subscriptionsWhereUniqueInput
    update: XOR<user_subscriptionsUpdateWithoutSubscriptionsInput, user_subscriptionsUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<user_subscriptionsCreateWithoutSubscriptionsInput, user_subscriptionsUncheckedCreateWithoutSubscriptionsInput>
  }

  export type user_subscriptionsUpdateWithWhereUniqueWithoutSubscriptionsInput = {
    where: user_subscriptionsWhereUniqueInput
    data: XOR<user_subscriptionsUpdateWithoutSubscriptionsInput, user_subscriptionsUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type user_subscriptionsUpdateManyWithWhereWithoutSubscriptionsInput = {
    where: user_subscriptionsScalarWhereInput
    data: XOR<user_subscriptionsUpdateManyMutationInput, user_subscriptionsUncheckedUpdateManyWithoutSubscriptionsInput>
  }

  export type user_subscriptionsScalarWhereInput = {
    AND?: user_subscriptionsScalarWhereInput | user_subscriptionsScalarWhereInput[]
    OR?: user_subscriptionsScalarWhereInput[]
    NOT?: user_subscriptionsScalarWhereInput | user_subscriptionsScalarWhereInput[]
    id?: UuidFilter<"user_subscriptions"> | string
    user_id?: UuidFilter<"user_subscriptions"> | string
    subscription_id?: UuidFilter<"user_subscriptions"> | string
    start_date?: DateTimeFilter<"user_subscriptions"> | Date | string
    end_date?: DateTimeFilter<"user_subscriptions"> | Date | string
    active?: BoolNullableFilter<"user_subscriptions"> | boolean | null
  }

  export type usersUpsertWithWhereUniqueWithoutCurrentSubscriptionInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutCurrentSubscriptionInput, usersUncheckedUpdateWithoutCurrentSubscriptionInput>
    create: XOR<usersCreateWithoutCurrentSubscriptionInput, usersUncheckedCreateWithoutCurrentSubscriptionInput>
  }

  export type usersUpdateWithWhereUniqueWithoutCurrentSubscriptionInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutCurrentSubscriptionInput, usersUncheckedUpdateWithoutCurrentSubscriptionInput>
  }

  export type usersUpdateManyWithWhereWithoutCurrentSubscriptionInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutCurrentSubscriptionInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    id?: UuidFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    phone?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    subscription_id?: UuidNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
  }

  export type subscriptionsCreateWithoutUser_subscriptionsInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
    currentUsers?: usersCreateNestedManyWithoutCurrentSubscriptionInput
  }

  export type subscriptionsUncheckedCreateWithoutUser_subscriptionsInput = {
    id?: string
    title: string
    duration_days: number
    price: Decimal | DecimalJsLike | number | string
    currentUsers?: usersUncheckedCreateNestedManyWithoutCurrentSubscriptionInput
  }

  export type subscriptionsCreateOrConnectWithoutUser_subscriptionsInput = {
    where: subscriptionsWhereUniqueInput
    create: XOR<subscriptionsCreateWithoutUser_subscriptionsInput, subscriptionsUncheckedCreateWithoutUser_subscriptionsInput>
  }

  export type subscriptionsUpsertWithoutUser_subscriptionsInput = {
    update: XOR<subscriptionsUpdateWithoutUser_subscriptionsInput, subscriptionsUncheckedUpdateWithoutUser_subscriptionsInput>
    create: XOR<subscriptionsCreateWithoutUser_subscriptionsInput, subscriptionsUncheckedCreateWithoutUser_subscriptionsInput>
    where?: subscriptionsWhereInput
  }

  export type subscriptionsUpdateToOneWithWhereWithoutUser_subscriptionsInput = {
    where?: subscriptionsWhereInput
    data: XOR<subscriptionsUpdateWithoutUser_subscriptionsInput, subscriptionsUncheckedUpdateWithoutUser_subscriptionsInput>
  }

  export type subscriptionsUpdateWithoutUser_subscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentUsers?: usersUpdateManyWithoutCurrentSubscriptionNestedInput
  }

  export type subscriptionsUncheckedUpdateWithoutUser_subscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration_days?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentUsers?: usersUncheckedUpdateManyWithoutCurrentSubscriptionNestedInput
  }

  export type promo_usageCreateWithoutPromocodesInput = {
    id?: string
    user_id: string
    used_at?: Date | string | null
  }

  export type promo_usageUncheckedCreateWithoutPromocodesInput = {
    id?: string
    user_id: string
    used_at?: Date | string | null
  }

  export type promo_usageCreateOrConnectWithoutPromocodesInput = {
    where: promo_usageWhereUniqueInput
    create: XOR<promo_usageCreateWithoutPromocodesInput, promo_usageUncheckedCreateWithoutPromocodesInput>
  }

  export type promo_usageCreateManyPromocodesInputEnvelope = {
    data: promo_usageCreateManyPromocodesInput | promo_usageCreateManyPromocodesInput[]
    skipDuplicates?: boolean
  }

  export type promo_usageUpsertWithWhereUniqueWithoutPromocodesInput = {
    where: promo_usageWhereUniqueInput
    update: XOR<promo_usageUpdateWithoutPromocodesInput, promo_usageUncheckedUpdateWithoutPromocodesInput>
    create: XOR<promo_usageCreateWithoutPromocodesInput, promo_usageUncheckedCreateWithoutPromocodesInput>
  }

  export type promo_usageUpdateWithWhereUniqueWithoutPromocodesInput = {
    where: promo_usageWhereUniqueInput
    data: XOR<promo_usageUpdateWithoutPromocodesInput, promo_usageUncheckedUpdateWithoutPromocodesInput>
  }

  export type promo_usageUpdateManyWithWhereWithoutPromocodesInput = {
    where: promo_usageScalarWhereInput
    data: XOR<promo_usageUpdateManyMutationInput, promo_usageUncheckedUpdateManyWithoutPromocodesInput>
  }

  export type promo_usageScalarWhereInput = {
    AND?: promo_usageScalarWhereInput | promo_usageScalarWhereInput[]
    OR?: promo_usageScalarWhereInput[]
    NOT?: promo_usageScalarWhereInput | promo_usageScalarWhereInput[]
    id?: UuidFilter<"promo_usage"> | string
    user_id?: UuidFilter<"promo_usage"> | string
    promocode_id?: UuidFilter<"promo_usage"> | string
    used_at?: DateTimeNullableFilter<"promo_usage"> | Date | string | null
  }

  export type promocodesCreateWithoutPromo_usageInput = {
    id?: string
    code: string
    discount: number
    min_subscription_months?: number | null
    expires_at?: Date | string | null
  }

  export type promocodesUncheckedCreateWithoutPromo_usageInput = {
    id?: string
    code: string
    discount: number
    min_subscription_months?: number | null
    expires_at?: Date | string | null
  }

  export type promocodesCreateOrConnectWithoutPromo_usageInput = {
    where: promocodesWhereUniqueInput
    create: XOR<promocodesCreateWithoutPromo_usageInput, promocodesUncheckedCreateWithoutPromo_usageInput>
  }

  export type promocodesUpsertWithoutPromo_usageInput = {
    update: XOR<promocodesUpdateWithoutPromo_usageInput, promocodesUncheckedUpdateWithoutPromo_usageInput>
    create: XOR<promocodesCreateWithoutPromo_usageInput, promocodesUncheckedCreateWithoutPromo_usageInput>
    where?: promocodesWhereInput
  }

  export type promocodesUpdateToOneWithWhereWithoutPromo_usageInput = {
    where?: promocodesWhereInput
    data: XOR<promocodesUpdateWithoutPromo_usageInput, promocodesUncheckedUpdateWithoutPromo_usageInput>
  }

  export type promocodesUpdateWithoutPromo_usageInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discount?: IntFieldUpdateOperationsInput | number
    min_subscription_months?: NullableIntFieldUpdateOperationsInput | number | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promocodesUncheckedUpdateWithoutPromo_usageInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discount?: IntFieldUpdateOperationsInput | number
    min_subscription_months?: NullableIntFieldUpdateOperationsInput | number | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_subscriptionsCreateManySubscriptionsInput = {
    id?: string
    user_id: string
    start_date: Date | string
    end_date: Date | string
    active?: boolean | null
  }

  export type usersCreateManyCurrentSubscriptionInput = {
    id?: string
    username: string
    email: string
    phone?: string | null
    password: string
    created_at?: Date | string | null
  }

  export type user_subscriptionsUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type user_subscriptionsUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type user_subscriptionsUncheckedUpdateManyWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type usersUpdateWithoutCurrentSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateWithoutCurrentSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyWithoutCurrentSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promo_usageCreateManyPromocodesInput = {
    id?: string
    user_id: string
    used_at?: Date | string | null
  }

  export type promo_usageUpdateWithoutPromocodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promo_usageUncheckedUpdateWithoutPromocodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type promo_usageUncheckedUpdateManyWithoutPromocodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}