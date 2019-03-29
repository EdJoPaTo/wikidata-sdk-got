import test from 'ava';

import {
	getEntities,
	getEntitiesSimplified,
	searchEntities,
	sparqlQuery,
	sparqlQuerySimplified,
	sparqlQuerySimplifiedMinified
} from '../source';

test('readme example', async t => {
	const result = await sparqlQuerySimplified(`SELECT ?item ?itemLabel WHERE {
	?item wdt:P31 wd:Q5.
	SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} LIMIT 3`);
	t.log(result);
	t.deepEqual(result[0], {
		item: {
			label: 'George Washington',
			value: 'Q23'
		}
	});
});

const EXAMPLE_QUERY = `SELECT ?item ?itemLabel ?lifeExpectancy ?officialName ?whatever
WHERE {
  BIND (wd:Q183 as ?item)
  ?item wdt:P2250 ?lifeExpectancy.
  ?item wdt:P1448 ?officialName.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`;

test('search', async t => {
	const {search} = await searchEntities({
		search: 'Q7796408',
		language: 'de'
	});
	t.log(search);
	t.is(search.length, 1);
	const result = search[0];
	t.is(result.id, 'Q7796408');
});

test('search xml', async t => {
	const search = await searchEntities({
		search: 'Q7796408',
		language: 'de',
		format: 'xml'
	});
	t.log(search);
	t.is(typeof search, 'string');
	t.truthy(search);
});

test('entities', async t => {
	const {entities} = await getEntities({
		ids: ['Q42', 'P31'],
		languages: 'en',
		props: 'labels'
	});
	t.log(entities.P31);
	t.log(entities.Q42);

	if (!entities.Q42.labels) {
		t.fail('labels missing');
		return;
	}

	t.log(entities.Q42.labels.en);
	t.is(entities.Q42.labels.en.language, 'en');
	t.truthy(entities.Q42.labels.en.value);
});

test('entities xml', async t => {
	const entities = await getEntities({
		ids: ['Q42', 'P31'],
		languages: 'en',
		props: 'labels',
		format: 'xml'
	});
	t.log(entities);
	t.is(typeof entities, 'string');
	t.truthy(entities);
});

test('entities simplified', async t => {
	const entities = await getEntitiesSimplified({
		ids: ['Q42', 'P31'],
		languages: 'en',
		props: 'labels'
	});
	t.log(entities.P31);
	t.log(entities.Q42);

	if (!entities.Q42.labels) {
		t.fail('labels missing');
		return;
	}

	t.log(entities.Q42.labels.en);
	t.truthy(entities.Q42.labels.en);
});

test('sparql', async t => {
	const result = await sparqlQuery(EXAMPLE_QUERY);
	t.log(result);
	t.log(result.results.bindings);
	t.truthy(result);
});

test('sparql simplified', async t => {
	const results = await sparqlQuerySimplified(EXAMPLE_QUERY);
	t.log(results);
	t.true(Array.isArray(results));
	const entry = results[0];
	t.deepEqual(entry.item, {
		label: 'Germany',
		value: 'Q183'
	});
	t.is(typeof entry.lifeExpectancy, 'number');
	t.is(typeof entry.officialName, 'string');
	t.is(entry.whatever, undefined);
});

test('sparql simplified minimized', async t => {
	const results = await sparqlQuerySimplifiedMinified('SELECT ?item WHERE {BIND (wd:Q183 as ?item)}');
	t.log(results);
	t.deepEqual(results, ['Q183']);
});

test('sparql simplified minimized fails with not minimizable', async t => {
	await t.throwsAsync(() => sparqlQuerySimplifiedMinified(EXAMPLE_QUERY), 'Can not minify query. Use sparqlQuerySimplified instead!');
});
