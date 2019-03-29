# wikidata-sdk-got

[![NPM Version](https://img.shields.io/npm/v/wikidata-sdk-got.svg)](https://www.npmjs.com/package/wikidata-sdk-got)
[![node](https://img.shields.io/node/v/wikidata-sdk-got.svg)](https://www.npmjs.com/package/wikidata-sdk-got)
[![Build Status](https://travis-ci.com/EdJoPaTo/wikidata-sdk-got.svg?branch=master)](https://travis-ci.com/EdJoPaTo/wikidata-sdk-got)
[![Dependency Status](https://david-dm.org/EdJoPaTo/wikidata-sdk-got/status.svg)](https://david-dm.org/EdJoPaTo/wikidata-sdk-got)
[![Peer Dependency Status](https://david-dm.org/EdJoPaTo/wikidata-sdk-got/peer-status.svg)](https://david-dm.org/EdJoPaTo/wikidata-sdk-got?type=peer)
[![Dev Dependency Status](https://david-dm.org/EdJoPaTo/wikidata-sdk-got/dev-status.svg)](https://david-dm.org/EdJoPaTo/wikidata-sdk-got?type=dev)

> Run wikidata-sdk requests from NodeJS without handling urls

When working with Wikidata you can use [maxlath/wikidata-sdk](https://github.com/maxlath/wikidata-sdk).
In order to stay small and useable on all platforms wikidata-sdk does not do requests on its own.

Why not use [sindresorhus/got](https://github.com/sindresorhus/got#options) for it?
As the code is the same all the time, this can be abstracted as it is done here 😎


## Install

```
$ npm install wikidata-sdk wikidata-sdk-got
```


## Usage

```js
const wdkGot = require('wikidata-sdk-got');

await wdkGot.sparqlQuerySimplified('SELECT * WHERE { ?item wdt:P31 wd:Q5. } LIMIT 3');
//=> ['Q23', 'Q42', 'Q76']
```


```ts
import * as wdkGot from 'wikidata-sdk-got';

await wdkGot.sparqlQuerySimplified('SELECT * WHERE { ?item wdt:P31 wd:Q5. } LIMIT 3');
//=> ['Q23', 'Q42', 'Q76']
```

## API

Check out [maxlath/wikidata-sdk](https://github.com/maxlath/wikidata-sdk) in general.

Not everything is present yet.
Open an Issue or Pull Request in order to add whats missing.

### getEntities(options, [gotOptions])
### getEntitiesSimplified(options, [gotOptions])

Different methods for different simplification levels.

#### options

See [wikidata-sdk Docs](https://github.com/maxlath/wikidata-sdk/blob/master/docs/get_entities.md#by-ids)

#### gotOptions

Type: `Object`

See [sindresorhus/got](https://github.com/sindresorhus/got#options) for this one.

Consider [Caching](https://github.com/sindresorhus/got#cache).


### searchEntities(options, [gotOptions])

#### options

See [wikidata-sdk Docs](https://github.com/maxlath/wikidata-sdk/blob/master/docs/search_entities.md#search-entities)

#### gotOptions

Type: `Object`

See [sindresorhus/got](https://github.com/sindresorhus/got#options) for this one.

Consider [Caching](https://github.com/sindresorhus/got#cache).


### sparqlQuery(query, [gotOptions])
### sparqlQuerySimplified(query, [gotOptions])
### sparqlQuerySimplifiedMinified(query, [gotOptions])

Different methods for different simplification levels.

#### query

Type: `string`

SparQL Query to be run.

#### gotOptions

Type: `Object`

See [sindresorhus/got](https://github.com/sindresorhus/got#options) for this one.

Consider [Caching](https://github.com/sindresorhus/got#cache).


## License

MIT © [Edgar Toll](https://edjopato.de)
