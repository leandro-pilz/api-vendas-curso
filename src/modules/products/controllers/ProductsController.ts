import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import FindOneProductService from '../services/FindOneProductService';
import CreateProductSevice from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleProductService';

export default class ProductsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();

    const products = await listProductService.execute();

    return response.json(products);
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOneProductService = new FindOneProductService();

    const product = await findOneProductService.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductSevice = new CreateProductSevice();

    const product = await createProductSevice.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });

    return response.status(204).json();
  }
}
