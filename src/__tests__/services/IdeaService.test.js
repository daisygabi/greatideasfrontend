import React from "react";
import {IdeaService} from "../../services/IdeaService";

require('fetch-mock');

describe('IdeaService', () => {
	let subject;
	let fakeAjaxService = null;

	beforeEach(() => {
		subject = new IdeaService();
		fakeAjaxService = {get: jest.fn()};
		subject.ajaxService = fakeAjaxService;
	});

	describe('getIdeasFromMockApi', () => {
		let fakeResponse;

		beforeEach(() => {
			fakeResponse = [{id: 1, name: 'test'}, {id: 2, name: 'stuff'}];
		});

		it('makes a get request with the ajaxService', async () => {
			await subject.getIdeasFromMockApi();

			expect(fakeAjaxService.get).toBeCalledWith(`https://5c07ecd0646dca0013f87e8b.mockapi.io/flow`);
		});

		it('returns the result of the get request', async () => {
			fakeAjaxService.get.mockReturnValue(fakeResponse);

			const response = await subject.getIdeasFromMockApi();

			expect(response).toEqual({
				content: fakeResponse,
				totalPages: 1,
				pageable: {pageSize: 2},
				numberOfElements: 2,
				totalElements: 2
			});
		});
	});
});
