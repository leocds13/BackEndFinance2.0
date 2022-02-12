export class Token {
	public readonly user_id: string;
	public readonly token: string;

	constructor(props: Token) {
		this.user_id = props.user_id;
		this.token = props.token;
	}
}
