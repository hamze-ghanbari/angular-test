import { httpClientMock, mockSpyByReturn } from '@shared/spec/MockDependencies';
import { SearchFilterModel } from '@shared/models/search-filter-model';
import { of } from 'rxjs';
import { LinkService } from '@shared/service/http_services/links/link.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockPageListResult, mockResult, randomString } from '@shared/spec/DataGenerator';
import { HttpClient } from '@angular/common/http';

fdescribe("Links Service", () => {


    let mockUrlModelRequest = {
        mediumDetail: {
            id: 'string',
            title: 'string',
            baseUrl: 'string',
            isDeleted: 'boolean',
            isVisibled: 'boolean',
            createdAt: 'date',
        },
        id: 'string',
        isDeleted: 'boolean',
        isVisibled: 'boolean',
        bookId: 'string',
        medium: 'string',
        shopId: 'string',
        link: 'string',
        shortLink: 'string',
        viewCount: 'number',
        order: 'number',
        isActive: 'boolean',
        price: 'number',
        bookType: 'number',
        createdAt: 'date',
    }

    let mockTServiceResultResponse = {
        result: 'string',
        message: 'string',
        error: 'string',
        hasError: 'boolean',
        refrenceId: 'string',
    };

    let mockLinkModelResponse = {
        id: 'string',
        isDeleted: 'boolean',
        isVisibled: 'boolean',
        bookId: 'string',
        medium: 'string',
        shopId: 'string',
        link: 'string',
        shortLink: 'string',
        viewCount: 'number',
        order: 'number',
        isActive: 'boolean',
        price: 'number',
        bookType: 'number',
        createdAt: 'Date',
        mediumDetail: {
            id: 'string',
            title: 'string',
            baseUrl: 'string',
            isDeleted: 'boolean',
            isVisibled: 'boolean',
            createdAt: 'Date',
        },
        bookDetail: {
            seriesNumber: 'number',
            averageRate: 'number',
            reviewCount: 'number',
            id: 'string',
            name: 'string',
            isbn: 'string',
            pageCount: 'number',
            description: 'string',
            hasPhoto: 'boolean',
            authors: [
                {
                    id: 'string',
                    type: 'string',
                    name: 'string',
                    fullName: 'string',
                }
            ]
        }
    };
    let service: LinkService;
    let httpClientSpy = httpClientMock();
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ], 
            providers : [
              {provide : HttpClient, useValue : httpClientSpy}
            ]
          });
      
          service = TestBed.inject(LinkService);
      
    });

    it("1# TEST_call_reateShopUrl_SHOULD_return_TserviceResult<string>_with_hasError_FALSE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: false, error: null });
    //   service = mockSpyByReturn(LinkService, 'createShopUrl', of(response)); 
    httpClientSpy.post.and.returnValue(of(response));

        let requestBody = mockResult(mockUrlModelRequest);
        service.createShopUrl(requestBody).subscribe(res => {
            expect(res.result).toBeInstanceOf(String);
            expect(res).toEqual(response);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

       expect(httpClientSpy.post).toHaveBeenCalledWith(service['apiUrl']+ '/CreateShopUrl', requestBody);

    });

    it("2# TEST_call_reateShopUrl_SHOULD_return_TserviceResult<string>_with_hasError_TRUE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: true, result: null });
        httpClientSpy.post.and.returnValue(of(response));

        let requestBody = mockResult(mockUrlModelRequest);
        service.createShopUrl(requestBody).subscribe(res => {
            expect(res).toEqual(response);
            expect(res.hasError).toBeTrue();
            expect(res.result).toBeNull();
            expect(res.error).not.toBeNull();
        });

       expect(httpClientSpy.post).toHaveBeenCalledWith(service['apiUrl']+ '/CreateShopUrl', requestBody);

    });

    it("3# TEST_call_etAllLinks_SHOULD_return_PageList<LinkModel>_with_hasError_FALSE", () => {
        let response = mockPageListResult(mockLinkModelResponse, 5, { hasError: false, error: null, totalCount: 5 });
        // service = mockSpyByReturn(LinkService, 'getAllLinks', of(response))
        httpClientSpy.post.and.returnValue(of(response)); 

        let bodyRequest: SearchFilterModel = new SearchFilterModel();
        service.getAllLinks(bodyRequest).subscribe(res => {
            expect(res.result).toBeInstanceOf(Object);
            expect(res.result.items).toBeInstanceOf(Array);
            expect(res).toEqual(response);
            expect(res.result.items).toHaveSize(5);
            expect(res.result.items).not.toBe([]);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

        expect(httpClientSpy.post).toHaveBeenCalledWith(service['apiUrl']+ '/GetShopUrlByFilter', bodyRequest);
    });

    it("4# TEST_call_etAllLinks_SHOULD_return_PageList<LinkModel>_with_hasError_TRUE", () => {
        let response = mockPageListResult(mockLinkModelResponse, 0, { hasError: true });
        httpClientSpy.post.and.returnValue(of(response));

        let bodyRequest: SearchFilterModel = new SearchFilterModel();
        service.getAllLinks(bodyRequest).subscribe(res => {
            expect(res.result).toBeInstanceOf(Object);
            expect(res.result.items).toBeInstanceOf(Array);
            expect(res).toEqual(response);
            expect(res.result.items).toHaveSize(0);
            expect(res.result.items).toEqual([]);
            expect(res.hasError).toBeTrue();
            expect(res.error).not.toBeNull();
        });

        expect(httpClientSpy.post).toHaveBeenCalledWith(service['apiUrl']+ '/GetShopUrlByFilter', bodyRequest);
    });

    it("5# TEST_call_etAllLinksByOrder_SHOULD_return_PageList<LinkModel>_with_hasError_FALSE", () => {
        let response = mockPageListResult(mockLinkModelResponse, 5, { hasError: false, error: null, totalCount: 5 });
        // service = mockSpyByReturn(LinkService, 'getAllLinks', of(response))
        httpClientSpy.post.and.returnValue(of(response)); 

        let bodyRequest: SearchFilterModel = new SearchFilterModel();
        service.getAllLinksByOrder(bodyRequest).subscribe(res => {
            expect(res.result).toBeInstanceOf(Object);
            expect(res.result.items).toBeInstanceOf(Array);
            expect(res).toEqual(response);
            expect(res.result.items).toHaveSize(5);
            expect(res.result.items).not.toBe([]);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

        expect(httpClientSpy.post).toHaveBeenCalledWith(service['apiUrl']+ '/GetOrderedShopUrlByFilter', bodyRequest);
    });

    it("6# TEST_call_etAllLinksByOrder_SHOULD_return_PageList<LinkModel>_with_hasError_TRUE", () => {
        let response = mockPageListResult(mockLinkModelResponse, 0, { hasError: true });
        httpClientSpy.post.and.returnValue(of(response));

        let bodyRequest: SearchFilterModel = new SearchFilterModel();
        service.getAllLinksByOrder(bodyRequest).subscribe(res => {
            expect(res.result).toBeInstanceOf(Object);
            expect(res.result.items).toBeInstanceOf(Array);
            expect(res).toEqual(response);
            expect(res.result.items).toHaveSize(0);
            expect(res.result.items).toEqual([]);
            expect(res.hasError).toBeTrue();
            expect(res.error).not.toBeNull();
        });

        expect(httpClientSpy.post).toHaveBeenCalledWith(service['apiUrl']+ '/GetOrderedShopUrlByFilter', bodyRequest);
    });

    it("7# TEST_call_pdateShopUrl_SHOULD_return_TserviceResult<string>_with_hasError_FALSE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: false, error: null });
        // service = mockSpyByReturn(LinkService, 'updateShopUrl', of(response));  
        httpClientSpy.put.and.returnValue(of(response));

        let requestBody = mockResult(mockUrlModelRequest);
        service.updateShopUrl(requestBody).subscribe(res => {
            expect(res.result).toBeInstanceOf(String);
            expect(res).toEqual(response);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

          expect(httpClientSpy.put).toHaveBeenCalledWith(service['apiUrl']+ '/UpdateShopUrl', requestBody);
    });

    it("8# TEST_call_pdateShopUrl_SHOULD_return_TserviceResult<string>_with_hasError_TRUE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: true, result: null });
        httpClientSpy.put.and.returnValue(of(response));

        let requestBody = mockResult(mockUrlModelRequest);
        service.updateShopUrl(requestBody).subscribe(res => {
            expect(res).toEqual(response);
            expect(res.hasError).toBeTrue();
            expect(res.result).toBeNull();
            expect(res.error).not.toBeNull();
        });

          expect(httpClientSpy.put).toHaveBeenCalledWith(service['apiUrl']+ '/UpdateShopUrl', requestBody);
    });

    it("9# TEST_call_eleteShopUrl_SHOULD_return_TserviceResult<string>_with_hasError_FALSE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: false, error: null });
        // service = mockSpyByReturn(LinkService, 'deleteShopUrl', of(response)); 
        httpClientSpy.delete.and.returnValue(of(response));  

        let linkId = randomString();
        service.deleteShopUrl(linkId).subscribe(res => {
            expect(res.result).toBeInstanceOf(String);
            expect(res).toEqual(response);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

        expect(httpClientSpy.delete).toHaveBeenCalledWith(service['apiUrl']+ `/DeleteShopUrl/${linkId}`,);
    });

    it("10# TEST_call_eleteShopUrl_SHOULD_return_TserviceResult<string>_with_hasError_TRUE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: true, result: null });
        httpClientSpy.delete.and.returnValue(of(response));  

        let linkId = randomString();
        service.deleteShopUrl(linkId).subscribe(res => {
            expect(res).toEqual(response);
            expect(res.hasError).toBeTrue();
            expect(res.result).toBeNull();
            expect(res.error).not.toBeNull();
        });

        expect(httpClientSpy.delete).toHaveBeenCalledWith(service['apiUrl']+ `/DeleteShopUrl/${linkId}`,);
    });

    it("11# TEST_call_isibleLink_SHOULD_return_TserviceResult<string>_with_hasError_FALSE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: false, error: null });
        // service = mockSpyByReturn(LinkService, 'visibleLink', of(response));  
        httpClientSpy.put.and.returnValue(of(response));  

        let linkId = randomString();
        service.visibleLink(linkId).subscribe(res => {
            expect(res.result).toBeInstanceOf(String);
            expect(res).toEqual(response);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

        expect(httpClientSpy.put).toHaveBeenCalledWith(service['apiUrl']+ `/Visible/${linkId}`, null);
    });

    it("12# TEST_call_isibleLink_SHOULD_return_TserviceResult<string>_with_hasError_TRUE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: true, result: null });
        httpClientSpy.put.and.returnValue(of(response)); 

        let linkId = randomString();
        service.visibleLink(linkId).subscribe(res => {
            expect(res).toEqual(response);
            expect(res.hasError).toBeTrue();
            expect(res.result).toBeNull();
            expect(res.error).not.toBeNull();
        });

        expect(httpClientSpy.put).toHaveBeenCalledWith(service['apiUrl']+ `/Visible/${linkId}`, null);
    });

    it("13# TEST_call_nVisibleLink_SHOULD_return_TserviceResult<string>_with_hasError_FALSE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: false, error: null });
        httpClientSpy.put.and.returnValue(of(response));  

        let linkId = randomString();
        service.inVisibleLink(linkId).subscribe(res => {
            expect(res.result).toBeInstanceOf(String);
            expect(res).toEqual(response);
            expect(res.hasError).toBeFalse();
            expect(res.result).not.toBeNull();
            expect(res.error).toBeNull();
        });

        expect(httpClientSpy.put).toHaveBeenCalledWith(service['apiUrl']+ `/InVisible/${linkId}`, null);
    });

    it("14# TEST_call_nVisibleLink_SHOULD_return_TserviceResult<string>_with_hasError_TRUE", () => {
        let response = mockResult(mockTServiceResultResponse, 1, { hasError: true, result: null });
        // service = mockSpyByReturn(LinkService, 'inVisibleLink', of(response)); 
        httpClientSpy.put.and.returnValue(of(response)); 

        let linkId = randomString();
        service.inVisibleLink(linkId).subscribe(res => {
            expect(res).toEqual(response);
            expect(res.hasError).toBeTrue();
            expect(res.result).toBeNull();
            expect(res.error).not.toBeNull();
        });

        expect(httpClientSpy.put).toHaveBeenCalledWith(service['apiUrl']+ `/InVisible/${linkId}`, null);
    });

});