import * as wdk from 'wikidata-sdk';

/* eslint @typescript-eslint/no-require-imports: "warn" */
/* eslint @typescript-eslint/no-var-requires: "warn" */
const got = require('got');

interface Dictionary<T> {
	[key: string]: T;
}

export async function searchEntities(options: {format: 'xml'} & wdk.SearchEntitiesOptions, gotOptions?: any): Promise<string>;
export async function searchEntities(options: {format?: 'json'} & wdk.SearchEntitiesOptions, gotOptions?: any): Promise<{search: wdk.SearchResult[]}>;

export async function searchEntities(options: wdk.SearchEntitiesOptions, gotOptions: any = {}): Promise<string | {search: wdk.SearchResult[]}> {
	const url = wdk.searchEntities(options);
	gotOptions.json = !options.format || options.format === 'json';
	const {body} = await got(url, gotOptions);
	return body;
}

export async function getEntities(options: {format: 'xml'} & wdk.GetEntitiesOptions, gotOptions?: any): Promise<string>;
export async function getEntities(options: {format?: 'json'} & wdk.GetEntitiesOptions, gotOptions?: any): Promise<{entities: Dictionary<wdk.Entity>}>;

export async function getEntities(options: wdk.GetEntitiesOptions, gotOptions: any = {}): Promise<string | {entities: Dictionary<wdk.Entity>}> {
	if (!options.format || options.format === 'json') {
		const urls = wdk.getManyEntities(options);
		const responseArr = await Promise.all(
			urls.map(o => got(o, {...gotOptions, json: true}))
		);

		const entityDictArr: ReadonlyArray<Dictionary<wdk.Entity>> = responseArr
			.map(o => o.body.entities);

		const entities: Dictionary<wdk.Entity> = entityDictArr
			.reduce((coll: Dictionary<wdk.Entity>, add) => {
				const keys = Object.keys(add);
				for (const key of keys) {
					coll[key] = add[key];
				}

				return coll;
			}, {});

		return {entities};
	}

	const url = wdk.getEntities(options);
	const {body} = await got(url, gotOptions);
	return body;
}

export async function getEntitiesSimplified(options: {format?: 'json'} & wdk.GetEntitiesOptions, gotOptions: any = {}): Promise<Dictionary<wdk.EntitySimplified>> {
	const {entities} = await getEntities(options, gotOptions);
	return wdk.simplify.entities(entities);
}

export async function sparqlQuery(query: string, gotOptions: any = {}): Promise<wdk.SparqlResults> {
	const url = wdk.sparqlQuery(query);
	gotOptions.json = true;
	const {body} = await got(url, gotOptions);
	return body;
}

export async function sparqlQuerySimplified(query: string, gotOptions: any = {}): Promise<ReadonlyArray<Dictionary<wdk.SparqlValueType>>> {
	const results = await sparqlQuery(query, gotOptions);
	const simplified = wdk.simplify.sparqlResults(results);
	return simplified;
}

export async function sparqlQuerySimplifiedMinified(query: string, gotOptions: any = {}): Promise<wdk.SparqlValueType[]> {
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
