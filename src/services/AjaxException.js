export class AjaxException extends Error {
	//eslint-disable-next-line
	constructor(errorResponse) {
		super(errorResponse);
	}
}