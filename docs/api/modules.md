[QIWI SDK](README.md) / Exports

# QIWI SDK

## Table of contents

### Namespaces

- [&lt;internal\&gt;](modules/internal_.md)

### Classes

- [Logger](classes/Logger.md)

### Type aliases

- [LogLevels](modules.md#loglevels)
- [LogObjectWithContext](modules.md#logobjectwithcontext)
- [LogSubscription](modules.md#logsubscription)
- [defaultLevels](modules.md#defaultlevels)

### Variables

- [defaultLevels](modules.md#defaultlevels-1)

### Functions

- [filter](modules.md#filter)
- [logLevels](modules.md#loglevels-1)

## Type aliases

### LogLevels

Ƭ **LogLevels**: readonly `string`[]

#### Defined in

dist/esm/levels.d.ts:3

___

### LogObjectWithContext

Ƭ **LogObjectWithContext**<`L`\>: [`LogObject`](modules/internal_.md#logobject)<`L`\> & { `context`: { `name`: `string` ; `path`: `string`[]  } ; `origin`: [`Logger`](classes/Logger.md)<`L`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](modules.md#loglevels) |

#### Defined in

dist/esm/logger.d.ts:3

___

### LogSubscription

Ƭ **LogSubscription**<`L`\>: [`Subscription`](modules/internal_.md#subscription)<[`LogObjectWithContext`](modules.md#logobjectwithcontext)<`L`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends [`LogLevels`](modules.md#loglevels) |

#### Defined in

dist/esm/logger.d.ts:12

___

### defaultLevels

Ƭ **defaultLevels**: typeof [`defaultLevels`](modules.md#defaultlevels-1)

#### Defined in

dist/esm/levels.d.ts:2

## Variables

### defaultLevels

• `Const` **defaultLevels**: readonly [``"verbose"``, ``"debug"``, ``"info"``, ``"warn"``, ``"error"``, ``"fatal"``]

#### Defined in

dist/esm/levels.d.ts:1

## Functions

### filter

▸ **filter**<`L`\>(`filter`, `level`, `subscription`): [`LogSubscription`](modules.md#logsubscription)<`L`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends readonly `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | ``">"`` \| ``"<"`` \| ``"="`` \| ``">="`` \| ``"<="`` |
| `level` | `L`[`number`] |
| `subscription` | [`LogSubscription`](modules.md#logsubscription)<`L`\> |

#### Returns

[`LogSubscription`](modules.md#logsubscription)<`L`\>

#### Defined in

dist/esm/logger.d.ts:28

___

### logLevels

▸ **logLevels**<`L`\>(...`levels`): [`LogLevelsDefaults`](modules/internal_.md#loglevelsdefaults)<`L`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends readonly `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...levels` | `L` |

#### Returns

[`LogLevelsDefaults`](modules/internal_.md#loglevelsdefaults)<`L`\>

#### Defined in

dist/esm/levels.d.ts:5
