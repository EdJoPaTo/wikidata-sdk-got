# wikidata-sdk-got

[![NPM Version](https://img.shields.io/npm/v/wikidata-sdk-got.svg)](https://www.npmjs.com/package/wikidata-sdk-got)
[![node](https://img.shields.io/node/v/wikidata-sdk-got.svg)](https://www.npmjs.com/package/wikidata-sdk-got)

> Run `wikidata-sdk` requests from Node.js without handling URLs

The Node.js environment evolved since this library was first released.
Bot Node.js and `wikidata-sdk` made improvements which ends up making this library obsolete.
`wikidata-sdk` is now `wikibase-sdk` and features native TypeScript types.
Also, Node.js 16 and newer offer the [global `fetch()` Method](https://nodejs.org/api/globals.html#fetch) like browsers do to do web requests in a simple manner.

Tldr: Use `wikibase-sdk` with `fetch`.

## Install

```bash
npm install wikidata-sdk-got
```

## Usage

```ts
import * as wdkGot from 'wikidata-sdk-got';

await wdkGot.sparqlQuerySimplifiedMinified(
  'SELECT * WHERE { ?item wdt:P50 wd:Q42. } LIMIT 3'
);
//=> ['Q721', 'Q25169', 'Q187655']
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
