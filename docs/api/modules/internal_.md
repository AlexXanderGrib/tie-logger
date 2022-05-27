[QIWI SDK](../README.md) / [Exports](../modules.md) / <internal\>

# Namespace: <internal\>

## Table of contents

### Type aliases

- [LogLevelsDefaults](internal_.md#loglevelsdefaults)
- [LogObject](internal_.md#logobject)
- [LogWriter](internal_.md#logwriter)
- [LoggerWithParent](internal_.md#loggerwithparent)
- [Subscription](internal_.md#subscription)
- [Unsubscribe](internal_.md#unsubscribe)

## Type aliases

### LogLevelsDefaults

Ƭ **LogLevelsDefaults**<`L`\>: `L` extends readonly [] ? [`defaultLevels`](../modules.md#defaultlevels-1) : `L`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](../modules.md#loglevels) |

#### Defined in

dist/esm/levels.d.ts:4

___

### LogObject

Ƭ **LogObject**<`L`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](../modules.md#loglevels) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Record`<`string`, `any`\> |
| `level` | `L`[`number`] |
| `message` | { `parts`: `unknown`[] ; `plain`: `string` ; `template`: `string`  } |
| `message.parts` | `unknown`[] |
| `message.plain` | `string` |
| `message.template` | `string` |
| `time` | `Date` |

#### Defined in

dist/esm/writer.d.ts:10

___

### LogWriter

Ƭ **LogWriter**<`L`\>: { readonly [key in L[number]]: Function }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](../modules.md#loglevels) |

#### Defined in

dist/esm/writer.d.ts:2

___

### LoggerWithParent

Ƭ **LoggerWithParent**<`Lv`, `Pr`\>: [`Logger`](../classes/Logger.md)<`Lv`\> & { `parent`: `Pr`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Lv` | extends [`LogLevels`](../modules.md#loglevels) |
| `Pr` | extends [`Logger`](../classes/Logger.md)<`Lv`\> = [`Logger`](../classes/Logger.md)<`Lv`\> |

#### Defined in

dist/esm/logger.d.ts:13

___

### Subscription

Ƭ **Subscription**<`T`\>: (`value`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

#### Defined in

dist/esm/logger.d.ts:10

___

### Unsubscribe

Ƭ **Unsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

dist/esm/logger.d.ts:11
