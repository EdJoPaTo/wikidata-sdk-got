export type Property = 'info' | 'sitelinks' | 'sitelinks/urls' | 'aliases' | 'labels' | 'descriptions' | 'claims' | 'datatype';
export type SearchType = 'item' | 'property' | 'lexeme' | 'form' | 'sense';
export type UrlResultFormat = 'json';

export interface GetEntitiesOptions {
	readonly ids: string | readonly string[];
	readonly languages?: string | readonly string[];
	readonly props?: Property | readonly Property[];
	readonly format?: UrlResultFormat;
}

export interface SearchEntitiesOptions {
	readonly search: string;
	readonly language?: string;
	readonly limit?: number;
	readonly format?: UrlResultFormat;
	readonly uselang?: string;
	readonly type?: SearchType;
}

export type ClaimSimplified = unknown;

export interface EntitySimplified {
	readonly type: string;
	readonly id: string;

	// Info
	readonly modified?: string;

	readonly aliases?: Readonly<Record<string, readonly string[]>>;
	readonly claims?: Readonly<Record<string, readonly ClaimSimplified[]>>;
	readonly descriptions?: Readonly<Record<string, string>>;
	readonly labels?: Readonly<Record<string, string>>;
	readonly sitelinks?: Readonly<Record<string, string>>;
}
