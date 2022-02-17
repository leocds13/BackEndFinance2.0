import { ErrorExeption } from "../../../entities/ErrorExeption";
import { ICategoryRepository } from "../../../repositories/Category/ICategoryRepository";
import { IUseCase } from "../../IUseCase";
import { IUpdateCategoryRequestDTO } from "./UpdateCategoryDTO";

export class UpdateCategoryUseCase implements IUseCase {
	constructor(private categoryRepository: ICategoryRepository) {}

	async execute(data: IUpdateCategoryRequestDTO): Promise<void> {
		const categ = await this.categoryRepository.findById(data.categ_id);

		if (!categ) {
			throw new ErrorExeption({
				status: 400,
				err: "Category not found!",
			});
		}

		if (categ.user_id !== data.user.id) {
			throw new ErrorExeption({
				status: 403,
				err: "You can't update other users categories!",
			});
		}

		await this.categoryRepository.update({ ...data.payload, id: data.categ_id });
	}
}
