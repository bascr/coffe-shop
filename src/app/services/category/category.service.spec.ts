import { Category } from 'src/app/models/category.model';
import { of } from 'rxjs';
import categories from '../../../assets/db/categories.json';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  
  let httpClientSpy: { get: jasmine.Spy };
  let service: CategoryService;

  beforeEach(() => {
    
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CategoryService(httpClientSpy as any);
  });

  it('service CategoryService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCategories - local request', (done: DoneFn) => {
    
    const expectedCategories: Category[] = categories;

    httpClientSpy.get.and.returnValue(of(expectedCategories));

    service.getCategories().subscribe( data => {
      expect(data).toEqual(expectedCategories, 'Failed getting expected categories');
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'One request is required');
    
  });

});
