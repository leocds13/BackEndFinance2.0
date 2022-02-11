export interface ITokenProvider {
	assing(id: string): Promise<string>;
	verify(token: string): Promise<string | void>;
}
