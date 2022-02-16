import { Category } from "../../../entities/Category";
import { ErrorExeption } from "../../../entities/ErrorExeption";
import { ICategoryRepository } from "../../../repositories/Category/ICategoryRepository";
import { IUseCase } from "../../IUseCase";
import { ICreateCategoryRequestDTO } from "./CreateCategoryDTO";

export class CreateCategoryUseCase implements IUseCase {
	constructor(private categoryRepository: ICategoryRepository) {}

	async execute(data: ICreateCategoryRequestDTO): Promise<any> {
		const categAlreadyExists = await this.categoryRepository.findByName(
			data.user.id,
			data.categ.name
		);

		if (categAlreadyExists) {
			throw new ErrorExeption({
				status: 400,
				err: "Category name already exists!",
			});
		}

		const categ = new Category({
			...data.categ,
			user_id: data.user.id,
		});

		await this.categoryRepository.save(categ);
	}
}
