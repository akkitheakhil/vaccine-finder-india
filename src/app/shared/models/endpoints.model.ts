export interface CommonApiDataEndpoints {
  readonly endpoint: string;
  readonly queryParams?: QueryParamsModel[];
}

export interface QueryParamsModel {
  name: string,
  values: string[]
}
