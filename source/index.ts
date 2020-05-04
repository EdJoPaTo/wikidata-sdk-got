import * as wdk from 'wikidata-sdk';
import arrayFilterUnique from 'array-filter-unique';
import got, {OptionsOfTextResponseBody as GotOptions} from 'got';

export async function searchEntities(options: {format?: 'json'} & wdk.SearchEntitiesOptions, gotOptions?: GotOptions): Promise<wdk.SearchResult[]> {
	const url = wdk.searchEntities(options);
	const body: any = await got(url, gotOptions).json();
	return body.search;
}

export async function getEntities(options: {format?: 'json'} & wdk.GetEntitiesOptions, gotOptions?: GotOptions): Promise<Record<string, wdk.Entity>> {
	const allIds = Array.isArray(options.ids) ? options.ids : [options.ids];
	const ids = allIds.filter(arrayFilterUnique());

	const saneOptions: wdk.GetEntitiesOptions = {
		...options,
		format: 'json',
		ids
	};

	const urls = wdk.getManyEntities(saneOptions);
	const responseArray = await Promise.all(
		urls.map(async o => got(o, gotOptions).json())
	);

	const entityDictionaryArray: ReadonlyArray<Record<string, wdk.Entity>> = responseArray
		.map((o: any) => o.entities);

	const entities: Record<string, wdk.Entity> = entityDictionaryArray
		.reduce((coll: Record<string, wdk.Entity>, add) => {
			const keys = Object.keys(add);
			for (const key of keys) {
				coll[key] = add[key];
			}

			return coll;
		}, {});

	return entities;
}

export async function getEntitiesSimplified(options: {format?: 'json'} & wdk.GetEntitiesOptions, gotOptions: GotOptions = {}): Promise<Record<string, wdk.EntitySimplified>> {
	const entities = await getEntities(options, gotOptions);
	return wdk.simplify.entities(entities);
}

export async function sparqlQuery(query: string, gotOptions: GotOptions = {}): Promise<wdk.SparqlResults> {
	const url = wdk.sparqlQuery(query);
	const body: any = await got(url, gotOptions).json();
	return body;
}

export async function sparqlQuerySimplified(query: string, gotOptions: GotOptions = {}): Promise<ReadonlyArray<Record<string, wdk.SparqlValueType>>> {
	const results = await sparqlQuery(query, gotOptions);
	const simplified = wdk.simplify.sparqlResults(results);
	return simplified;
}

export async function sparqlQuerySimplifiedMinified(query: string, gotOptions: GotOptions = {}): Promise<wdk.SparqlValueType[]> {
	const results = await sparqlQuery(query, gotOptions);
	const simplified = wdk.simplify.sparqlResults(results, {minimize: true});
	if (typeof simplified[0] === 'object') {
		throw new TypeError('Can not minify query. Use sparqlQuerySimplified instead!');
	}

	return simplified;
}

// For CommonJS default export support
module.exports = exports;
module.exports.default = exports;
