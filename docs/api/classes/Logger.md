[TIE Logger](../README.md) / [Exports](../modules.md) / Logger

# Class: Logger\<L\>

**`Export`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](../modules.md#loglevels) |

## Table of contents

### Constructors

- [constructor](Logger.md#constructor)

### Properties

- [\_subscriptions](Logger.md#_subscriptions)
- [data](Logger.md#data)
- [levels](Logger.md#levels)
- [log](Logger.md#log)
- [name](Logger.md#name)
- [parent](Logger.md#parent)

### Methods

- [\_pipe](Logger.md#_pipe)
- [child](Logger.md#child)
- [subscribe](Logger.md#subscribe)

## Constructors

### constructor

• **new Logger**\<`L`\>(`name`, `levels`, `data?`, `parent?`): [`Logger`](Logger.md)\<`L`\>

Creates an instance of Logger.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](../modules.md#loglevels) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `levels` | `L` |
| `data?` | `Record`\<`string`, `unknown`\> |
| `parent?` | [`Logger`](Logger.md)\<`L`\> |

#### Returns

[`Logger`](Logger.md)\<`L`\>

**`Memberof`**

Logger

#### Defined in

dist/esm/logger.d.ts:38

## Properties

### \_subscriptions

• `Private` `Readonly` **\_subscriptions**: `any`

#### Defined in

dist/esm/logger.d.ts:29

___

### data

• **data**: `Record`\<`string`, `unknown`\>

#### Defined in

dist/esm/logger.d.ts:26

___

### levels

• `Readonly` **levels**: `L`

#### Defined in

dist/esm/logger.d.ts:25

___

### log

• `Readonly` **log**: [`LogWriter`](../modules/internal_.md#logwriter)\<`L`\>

#### Defined in

dist/esm/logger.d.ts:28

___

### name

• `Readonly` **name**: `string`

#### Defined in

dist/esm/logger.d.ts:24

___

### parent

• `Optional` `Readonly` **parent**: [`Logger`](Logger.md)\<`L`\>

#### Defined in

dist/esm/logger.d.ts:27

## Methods

### \_pipe

▸ **_pipe**(`log`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `log` | [`LogObject`](../modules/internal_.md#logobject)\<`L`\> \| [`LogObjectWithContext`](../modules.md#logobjectwithcontext)\<`L`\> |

#### Returns

`void`

**`Memberof`**

Logger

#### Defined in

dist/esm/logger.d.ts:46

___

### child

▸ **child**(`name`, `data?`): [`LoggerWithParent`](../modules/internal_.md#loggerwithparent)\<`L`, [`Logger`](Logger.md)\<`L`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data?` | `Record`\<`string`, `unknown`\> |

#### Returns

[`LoggerWithParent`](../modules/internal_.md#loggerwithparent)\<`L`, [`Logger`](Logger.md)\<`L`\>\>

{LoggerWithParent<L, this>}

**`Memberof`**

Logger

#### Defined in

dist/esm/logger.d.ts:55

___

### subscribe

▸ **subscribe**(`...subscriptions`): [`Unsubscribe`](../modules/internal_.md#unsubscribe)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...subscriptions` | [`Subscription`](../modules/internal_.md#subscription)\<[`LogObjectWithContext`](../modules.md#logobjectwithcontext)\<`L`\>\>[] |

#### Returns

[`Unsubscribe`](../modules/internal_.md#unsubscribe)

{Unsubscribe}

**`Memberof`**

Logger

#### Defined in

dist/esm/logger.d.ts:63
