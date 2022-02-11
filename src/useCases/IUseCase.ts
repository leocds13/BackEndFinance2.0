export interface IUseCase {
    execute(data?:any): Promise<void>
}