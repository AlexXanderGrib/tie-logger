[QIWI SDK](../README.md) / [Exports](../modules.md) / Logger

# Class: Logger<L\>

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

• **new Logger**<`L`\>(`name`, `levels`, `data?`, `parent?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends readonly `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `levels` | `L` |
| `data?` | `Record`<`string`, `unknown`\> |
| `parent?` | [`Logger`](Logger.md)<`L`\> |

#### Defined in

dist/esm/logger.d.ts:23

## Properties

### \_subscriptions

• `Private` `Readonly` **\_subscriptions**: `any`

#### Defined in

dist/esm/logger.d.ts:22

___

### data

• **data**: `Record`<`string`, `unknown`\>

#### Defined in

dist/esm/logger.d.ts:19

___

### levels

• `Readonly` **levels**: `L`

#### Defined in

dist/esm/logger.d.ts:18

___

### log

• `Readonly` **log**: [`LogWriter`](../modules/internal_.md#logwriter)<`L`\>

#### Defined in

dist/esm/logger.d.ts:21

___

### name

• `Readonly` **name**: `string`

#### Defined in

dist/esm/logger.d.ts:17

___

### parent

• `Optional` `Readonly` **parent**: [`Logger`](Logger.md)<`L`\>

#### Defined in

dist/esm/logger.d.ts:20

## Methods

### \_pipe

▸ `Protected` **_pipe**(`log`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `log` | [`LogObject`](../modules/internal_.md#logobject)<`L`\> \| [`LogObjectWithContext`](../modules.md#logobjectwithcontext)<`L`\> |

#### Returns

`void`

#### Defined in

dist/esm/logger.d.ts:24

___

### child

▸ **child**(`name`, `data`): [`LoggerWithParent`](../modules/internal_.md#loggerwithparent)<`L`, [`Logger`](Logger.md)<`L`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | `Record`<`string`, `unknown`\> |

#### Returns

[`LoggerWithParent`](../modules/internal_.md#loggerwithparent)<`L`, [`Logger`](Logger.md)<`L`\>\>

#### Defined in

dist/esm/logger.d.ts:25

___

### subscribe

▸ **subscribe**(...`subscriptions`): [`Unsubscribe`](../modules/internal_.md#unsubscribe)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...subscriptions` | [`Subscription`](../modules/internal_.md#subscription)<[`LogObjectWithContext`](../modules.md#logobjectwithcontext)<`L`\>\>[] |

#### Returns

[`Unsubscribe`](../modules/internal_.md#unsubscribe)

#### Defined in

dist/esm/logger.d.ts:26
