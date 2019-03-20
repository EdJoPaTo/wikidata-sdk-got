# wikidata-sdk-got [![Build Status](https://travis-ci.com/EdJoPaTo/wikidata-sdk-got.svg?branch=master)](https://travis-ci.com/EdJoPaTo/wikidata-sdk-got)

> Run wikidata-sdk requests without handling urls

When working with Wikidata you can use [maxlath/wikidata-sdk](https://github.com/maxlath/wikidata-sdk).
In order to keep small wikidata-sdk does not do requests on its own.

Why not use [sindresorhus/got](https://github.com/sindresorhus/got#options) for it and abstract that from you?


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

### wikidataSparqlQuery(query, [gotOptions])

#### query

Type: `string`

SparQL Query to be run.

#### gotOptions

Type: `Object`

See [sindresorhus/got](https://github.com/sindresorhus/got#options) for this one.

Consider [Caching](https://github.com/sindresorhus/got#cache).


## License

MIT © [Edgar Toll](https://edjopato.de)
