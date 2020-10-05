import AjaxService from "./AjaxService";

export class IdeaService {

	getAjaxService() {
		if (!this.ajaxService) {
			this.ajaxService = new AjaxService();
		}
		return this.ajaxService;
	}

	addNewIdea(bodyData) {
		return this.getAjaxService().post('/idea/', bodyData);
	}

	getIdeas(pageSize, pageNo) {
		return this.getAjaxService().get(`idea/?pageSize=` + pageSize + `&pageNo=` + pageNo);
	}

	async getIdeasFromMockApi() {
		const ideas = await this.getAjaxService().get(`https://5c07ecd0646dca0013f87e8b.mockapi.io/flow`);
		if (ideas !== undefined) {
			return {
				content: ideas,
				totalPages: 1,
				pageable: {pageSize: ideas.length},
				numberOfElements: ideas.length,
				totalElements: ideas.length
			}
		}
		return ideas;
	}
}
