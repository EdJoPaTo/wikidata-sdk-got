import {SearchResult, Entity, SparqlResults, SparqlValueType} from 'wikibase-types';
import arrayFilterUnique from 'array-filter-unique';
import got, {OptionsOfTextResponseBody as GotOptions} from 'got';

import {SearchEntitiesOptions, GetEntitiesOptions, EntitySimplified} from './wikibase-sdk-types';

export * from './wikibase-sdk-types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const wdk = require('wikidata-sdk');

export async function searchEntities(options: SearchEntitiesOptions, gotOptions?: GotOptions): Promise<readonly SearchResult[]> {
	const url = wdk.searchEntities(options);
	const body: any = await got(url, gotOptions).json();
	return body.search;
}

export async function getEntities(options: GetEntitiesOptions, gotOptions?: GotOptions): Promise<Record<string, Entity>> {
	const allIds = Array.isArray(options.ids) ? options.ids : [options.ids];
	const ids = allIds.filter(arrayFilterUnique());

	const saneOptions: GetEntitiesOptions = {
		...options,
		format: 'json',
		ids,
	};

	const urls = wdk.getManyEntities(saneOptions) as readonly string[];
	const responseArray = await Promise.all(
		urls.map(async o => got(o, gotOptions).json()),
	);

	const entityDictionaryArray = responseArray
		.map((o: any) => o.entities as Readonly<Record<string, Entity>>);

	const entities: Record<string, Entity> = {};
	for (const entry of entityDictionaryArray) {
		for (const [key, value] of Object.entries(entry)) {
			entities[key] = value;
		}
	}

	return entities;
}

export async function getEntitiesSimplified(options: GetEntitiesOptions, gotOptions: Readonly<GotOptions> = {}): Promise<Record<string, EntitySimplified>> {
	const entities = await getEntities(options, gotOptions);
	return wdk.simplify.entities(entities);
}

export async function sparqlQuery(query: string, gotOptions: Readonly<GotOptions> = {}): Promise<SparqlResults> {
	const url = wdk.sparqlQuery(query);
	const body: any = await got(url, gotOptions).json();
	return body;
}

export async function sparqlQuerySimplified(query: string, gotOptions: Readonly<GotOptions> = {}): Promise<ReadonlyArray<Record<string, SparqlValueType>>> {
	const results = await sparqlQuery(query, gotOptions);
	const simplified = wdk.simplify.sparqlResults(results);
	return simplified;
}

export async function sparqlQuerySimplifiedMinified(query: string, gotOptions: Readonly<GotOptions> = {}): Promise<readonly SparqlValueType[]> {
	const results = await sparqlQuery(query, gotOptions);
	const simplified = wdk.simplify.sparqlResults(results, {minimize: true});
	if (typeof simplified[0] === 'object') {
		throw new TypeError('Can not minify query. Use sparqlQuerySimplified instead!');
	}

	return simplified;
}
