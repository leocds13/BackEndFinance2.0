export class ValidationExeption {
	field: string;
	message: string;

	constructor(field: string, message: string) {
		this.field = field;
		this.message = message;
	}

	toString(): string {
		return this.message;
	}
}

export class ErrorExeption extends Error {
	public status: number;
	public err?: string | ValidationExeption[];

	constructor(props: Omit<ErrorExeption, keyof Error>) {
		super(props.err?.toString());

		this.status = props.status;
		this.err = props.err || "Unexpected error ocurred!";
	}
}
