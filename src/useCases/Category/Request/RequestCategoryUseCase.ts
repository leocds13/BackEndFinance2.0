import { Category } from "../../../entities/Category";
import { ErrorExeption } from "../../../entities/ErrorExeption";
import { ICategoryRepository } from "../../../repositories/Category/ICategoryRepository";
import { IUseCase } from "../../IUseCase";
import { IRequestCategoryRequestDTO } from "./RequestCategoryDTO";

export class RequestCategoryUseCase implements IUseCase {
	constructor(private categoryRepository: ICategoryRepository) {}

	async execute(data: IRequestCategoryRequestDTO): Promise<Category[]> {
		let categs =
			(await this.categoryRepository.findByUserId(data.user_id)) || [];

		if (data.name) {
			categs = categs.filter((val) =>
				RegExp(data.name?.toLowerCase() || "").test(
					val.name.toLowerCase()
				)
			);
		}

		if (data.description) {
			categs = categs.filter((val) =>
				RegExp(data.description?.toLowerCase() || "").test(
					val.description ? val.description.toLowerCase() : "" // O campo pose ser null
				)
			);
		}

		if (categs.length === 0) {
			throw new ErrorExeption({
				status: 400,
				err: "No categories found!",
			});
		}

		return categs;
	}
}
