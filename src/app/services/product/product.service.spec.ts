import { Product } from 'src/app/models/product.model';
import { of } from 'rxjs';
import products from '../../../assets/db/products.json'; 
import { ProductService } from './product.service';

describe('ProductService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let service: ProductService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductService(httpClientSpy as any);
  });

  it('service ProductService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get products - local request', (done: DoneFn) => {

    const expectedProducts: Product[] = products;

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    service.getProducts().subscribe(data => {
      expect(data).toEqual(expectedProducts, 'Failed getting expected categories');
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'One request is required');      

  });

});
