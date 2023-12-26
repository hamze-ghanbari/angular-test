import { JalaliPipe } from '@shared/pipes/jalali.pipe';
import { ImageSrcPipe } from '@shared/pipes/img-src/imgSrc.pipe';
import { htmlUrls } from '@shared/helper/app_routes';
import { randomString, mockResult, mockPageListResult, mockTServiceResult } from '@shared/spec/DataGenerator';
import { getElement, contentElement, getStyleElement, getValueInput, changeInputValue, clickedElement, getAttributeContent, eventElement, changeFormValue, getAllElements } from '@shared/spec/ElementsAccessor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageLinksCreateModule } from './manage-links-create.module';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { ManageLinksCreateComponent } from './manage-links-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { setNewActivatedRoute, setSpy, mockDialog, mockBottomSheet, mockSpyByReturn, injectableDependecy, mockSpyOn } from '@shared/spec/MockDependencies';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBookDialogComponent } from '@shared/components/dialogs/confirm-book-dialog/confirm-book-dialog.component';
import { LinkService } from '@shared/service/http_services/links/link.service';
import { ConfirmBookBottomsheetComponent } from '@shared/components/bottom-sheets/confirm-book-bottomsheet/confirm-book-bottomsheet.component';
import { bookTypeEnum } from '@shared/enums/book-type-enum';
import { ConfirmCancelDialogComponent } from '@shared/components/dialogs/confirm-cancel-dialog/confirm-cancel-dialog.component';
import { ConfirmCancelBottomSheetComponent } from '@shared/components/bottom-sheets/confirm-cancel-bottom-sheet/confirm-cancel-bottom-sheet.component';
import { SearchAggregatorService } from '@shared/service/http_services/search/search-aggregator.service';
import { UrlService } from '@shared/service/http_services/links/url.service';

fdescribe('ManageLinksCreateComponent', () => {
  let component: ManageLinksCreateComponent;
  let fixture: ComponentFixture<ManageLinksCreateComponent>;
  let spy;
  let inject;
  let bookListModel = {
    seriesNumber: 'number',
    serieNumber: 'number',
    averageRate: 'number',
    reviewCount: 'number',
    hasPhoto: 'boolean',
    id: 'string',
    name: 'string',
    isbn: 'string',
    pageCount: 'number',
    description: 'string',
    authors: [
      {
        id: 'string',
        type: 'string',
        name: 'string',
        fullName: 'string',
      }
    ]
  };
  let linkModel = {
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
          fullName: 'string'
        }
      ],
    },
  };

  beforeEach(async () => {
    spy = setSpy({
      Router: { methods: ['navigate'] },
      ActivatedRoute: { methods: [], properties: { queryParams: of(undefined) } },
    });
    await TestBed.configureTestingModule({
      declarations: [ManageLinksCreateComponent],
      imports: [ManageLinksCreateModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormBuilder,
        ImageSrcPipe,
        JalaliPipe,
        {
          provide: Router, useValue: spy['Router']
        },
        {
          provide: ActivatedRoute, useValue: spy['ActivatedRoute']
        },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ManageLinksCreateComponent);
    setNewActivatedRoute(spy['ActivatedRoute'], 'queryParams').and.returnValue(of(undefined));
    component = fixture.componentInstance;
    fixture.detectChanges();
    inject = injectableDependecy({
      imgPipe: ImageSrcPipe,
      jalaliPipe: JalaliPipe
    });
  });

  it('1# should create', () => {
    expect(component).toBeTruthy();
  });

  it('2# TEST_ngclass_section', () => {
    expect(component.isMobile).toBeFalse();
    expect(getElement(fixture, 'section.section')).not.toHaveClass('p-2');

    component.isMobile = true;
    fixture.detectChanges();
    expect(getElement(fixture, 'section.section')).toHaveClass('p-2');
  });

  it('3# TEST_search_step_title_SHOULD_craete', () => {
    expect(component.step).toEqual('');
    expect(getElement(fixture, '#search-step-title')).not.toBeTruthy();

    component.step = 'search';
    fixture.detectChanges();
    expect(getElement(fixture, '#search-step-title')).toBeTruthy();

    component.step = 'add';
    fixture.detectChanges();
    expect(getElement(fixture, '#search-step-title')).not.toBeTruthy();
  });

  it('4# TEST_search_step_title_content', () => {
    component.step = 'search';
    fixture.detectChanges();
    expect(contentElement(fixture, '#search-step-title').trim()).toEqual('جستجوی کتاب');
  });

  it('5# TEST_add_step_title_SHOULD_create', () => {
    expect(component.step).toEqual('');
    expect(getElement(fixture, '#add-step-title')).not.toBeTruthy();

    component.step = 'add';
    fixture.detectChanges();
    expect(getElement(fixture, '#add-step-title')).toBeTruthy();
  });

  it('6# TEST_add_step_title_content', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(component.linkId).toEqual('');
    expect(contentElement(fixture, '#add-step-title').trim()).toEqual('ثبت لینک');

    component.linkId = randomString();
    fixture.detectChanges();
    expect(contentElement(fixture, '#add-step-title').trim()).toEqual('ویرایش لینک');
  });

  it('7# TEST_search_box_SHOULD_create', () => {
    expect(component.step).toEqual('');
    expect(getElement(fixture, '.search-box')).not.toBeTruthy();

    component.step = 'search';
    fixture.detectChanges();
    expect(getElement(fixture, '.search-box')).toBeTruthy();

    component.step = 'add';
    fixture.detectChanges();
    expect(getElement(fixture, '.search-box')).not.toBeTruthy();
  });

  it('8# TEST_ngStyle_search_icon', () => {
    component.step = 'search';
    fixture.detectChanges();
    expect(getValueInput(fixture, '#search-input').length).toEqual(0);
    expect(getStyleElement(fixture, '#search-icon').display).toEqual('flex');

    changeInputValue(fixture, '#search-input', randomString());
    expect(getStyleElement(fixture, '#search-icon').display).toEqual('none');
  });

  it('9# TEST_ngStyle_reset_icon', () => {
    component.step = 'search';
    fixture.detectChanges();
    expect(getValueInput(fixture, '#search-input').length).toEqual(0);
    expect(getStyleElement(fixture, '#reset-icon').display).toEqual('none');

    changeInputValue(fixture, '#search-input', randomString());
    expect(getStyleElement(fixture, '#reset-icon').display).toEqual('flex');
  });

  it('10# TEST_reset_icon_clickEvent', () => {
    component.step = 'search';
    fixture.detectChanges();
    let value = randomString();
    changeInputValue(fixture, '#search-input', value);
    expect(getValueInput(fixture, '#search-input')).toEqual(value);

    clickedElement(fixture, '#reset-icon');
    expect(getValueInput(fixture, '#search-input')).toEqual('');
  });

  it('11# TEST_search_input_attributes(placeholder, readonly, type)', () => {
    component.step = 'search';
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, '#search-input', ['placeholder', 'readonly', 'type']);
    expect(attributes.placeholder).toEqual('نام کتاب را جستجو کنید');
    expect(attributes.type).toEqual('text');
    expect(component.isSubmit).toBeFalse();
    // ? readonly is false
    expect(attributes.readonly).toBeNull();

    component.isSubmit = true;
    fixture.detectChanges();
    // ? readonly is true
    expect(getAttributeContent(fixture, '#search-input', 'readonly')).toEqual('');
  });

  it('12# TEST_search_inputEvent', () => {
    let value = randomString();
    component.step = 'search';
    fixture.detectChanges();
    changeInputValue(fixture, '#search-input', value);
    expect(component.searchValue).toEqual(value);
    expect(component.loading).toBeTrue();

    changeInputValue(fixture, '#search-input', '');
    expect(component.searchValue).toBeNull();
    expect(component.books).toEqual([]);
    expect(component.loading).toBeFalse();


    expect(spy['Router'].navigate).toHaveBeenCalledWith([htmlUrls.link_create], { queryParams: { search: component.searchValue } });
  });

  it('13# TEST_search_book_step_SHOULD_create', () => {
    expect(component.step).toEqual('');
    expect(getElement(fixture, 'main.search-book-step')).not.toBeTruthy();

    component.step = 'search';
    fixture.detectChanges();
    expect(getElement(fixture, 'main.search-book-step')).toBeTruthy();

    component.step = 'add';
    fixture.detectChanges();
    expect(getElement(fixture, 'main.search-book-step')).not.toBeTruthy();


  });

  it('14# TEST_ngclass_search_book_step', () => {
    component.step = 'search';
    fixture.detectChanges();
    expect(component.books).toEqual([]);
    expect(getElement(fixture, 'main.search-book-step')).not.toHaveClass('mt-8');

    component.books = mockResult(bookListModel, 5);
    fixture.detectChanges();
    expect(getElement(fixture, 'main.search-book-step')).toHaveClass('mt-8');
  });

  it('15# TEST_search_result_book_SHOULD_create', () => {
    component.step = 'search';
    fixture.detectChanges();
    
    expect(component.loading).toEqual(false);
    expect(component.books).toEqual([]);
    expect(getElement(fixture, '.search-result-book')).not.toBeTruthy();

    component.loading = true;
    component.books = mockResult(bookListModel, 5);
    fixture.detectChanges();
    expect(getElement(fixture, '.search-result-book')).not.toBeTruthy();

    component.loading = false;
    fixture.detectChanges();
    expect(getElement(fixture, '.search-result-book')).toBeTruthy();
  });

  it('16# TEST_book_img_box_clickEvent', () => {
    component.step = 'search';
    let response = mockPageListResult(linkModel, 5, { hasError: false });
    let linkService = mockSpyByReturn(LinkService, 'getAllLinks', of(response))
    component.books = mockResult(bookListModel, 5);
    fixture.detectChanges();
    let dialog = mockDialog();
    let bottomSheet = mockBottomSheet();
    clickedElement(fixture, '.book-img-box');
    expect(component.isMobile).toBeFalse();
    expect(dialog.open).toHaveBeenCalledWith(ConfirmBookDialogComponent, {
      panelClass: 'confirm-book',
      data: component.books[0],
      width: '518px',
      height: '228px'
    });

    component.isMobile = true;
    clickedElement(fixture, '.book-img-box');
    fixture.detectChanges();
    expect(bottomSheet.open).toHaveBeenCalledWith(ConfirmBookBottomsheetComponent as any, {
      data: component.books[0]
    });

    expect(component.step).toEqual('add');
    expect(component.selectedBook).toEqual(component.books[0]);
    expect(component.links).toEqual(response.result.items);
    expect(linkService.getAllLinks).toHaveBeenCalled();
  });

  it('17# TEST_book_img_attributes(src, alt, width, height, onerror)', () => {
    component.step = 'search';
    component.books = mockResult(bookListModel, 5);
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, '.book-img-box > img.book-img', ['src', 'alt', 'width', 'height', 'onerror']);
    expect(attributes.src).toEqual(inject.imgPipe.transform(component.books[0].id, 2));
    expect(attributes.alt).toEqual(component.books[0].name);
    expect(attributes.width).toEqual('80px');
    expect(attributes.height).toEqual('120px');
    expect(attributes.onerror).toEqual("this.src='../../../../../assets/Images/no-photo-result.jpeg'");
  });

  it('18# TEST_search_skeleton_SHOULD_create', () => {
    expect(component.loading).toBeFalse();
    expect(component.step).not.toEqual('search');
    expect(getElement(fixture, '#search-skeleton')).not.toBeTruthy();

    component.loading = true;
    component.step = 'search';
    fixture.detectChanges();
    expect(getElement(fixture, '#search-skeleton')).toBeTruthy();
  });

  it('19# TEST_link_not_exist_SHOULD_create', () => {
    component.step = 'search';
    fixture.detectChanges();
    expect(component.books).toHaveSize(0);
    expect(getElement(fixture, '#not-link')).toBeTruthy();

    component.books = mockResult(bookListModel, 5);
    fixture.detectChanges();
    expect(getElement(fixture, '#not-link')).not.toBeTruthy();
  });

  it('20# TEST_link_not_exist_content', () => {
    component.step = 'search';
    fixture.detectChanges();
    expect(contentElement(fixture, '#not-link > span').trim()).toEqual('پس از جستجو، کتاب های مرتبط با آن برای شما نمایش داده می شود');
  });

  it('21# TEST_add_step_SHOULD_craete', () => {
    expect(component.step).toEqual('');
    expect(getElement(fixture, ' main.main')).not.toBeTruthy();

    component.step = 'add';
    fixture.detectChanges();
    expect(getElement(fixture, ' main.main')).toBeTruthy();
  });

  it('22# TEST_selected_book_img_attributes(src, alt, width, height, onerror)', () => {
    component.step = 'add';
    component.selectedBook = mockResult(bookListModel, 1);
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, '#img-selected', ['src', 'alt', 'width', 'height', 'onerror']);
    expect(attributes.src).toEqual(inject.imgPipe.transform(component.selectedBook.id, 2));
    expect(attributes.alt).toEqual(component.selectedBook.name);
    expect(attributes.width).toEqual('80px');
    expect(attributes.height).toEqual('120px');
    expect(attributes.onerror).toEqual("this.src='../../../../../assets/Images/no-photo-result.jpeg'");
  });

  it('23# TEST_cancel_book_selected_clickEvent', () => {
    component.step = 'add';
    component.selectedBook = mockResult(bookListModel, 1);
    fixture.detectChanges();
    clickedElement(fixture, '#cancel-book-selected');
    expect(component.step).toEqual('search');
    expect(component.linkForm.controls['link'].value).toEqual('');
    expect(component.linkForm.controls['price'].value).toEqual('');
    expect(component.linkForm.controls['bookType'].value).toEqual('1');
    expect(component.linkForm.controls['status'].value).toEqual('true');
    expect(spy['Router'].navigate).not.toHaveBeenCalledWith(htmlUrls.link);

    component.linkId = randomString();
    clickedElement(fixture, '#cancel-book-selected');
    expect(spy['Router'].navigate).toHaveBeenCalledWith([htmlUrls.link]);
  });

  it('24# TEST_label_link_attribute(for)', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(getAttributeContent(fixture, '#link-box > label', 'for')).toEqual(getAttributeContent(fixture, '#link-box > input', 'id'));
  });

  it('25# TEST_input_link_attributes(readonly, type, formControlName)', () => {
    component.step = 'add';
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, '#link-box > input', ['readonly', 'type', 'formControlName']);
    expect(attributes.type).toEqual('text');
    expect(attributes.formControlName).toEqual('link');
    expect(component.isSubmit).toBeFalse();
    expect(attributes.readonly).toBeNull();

    component.isSubmit = true;
    fixture.detectChanges();
    expect(getAttributeContent(fixture, '#link-box > input', 'readonly')).toEqual('');
  });

  it('26# TEST_error_link_SHOULD_create', () => {
    component.step = 'add';
    fixture.detectChanges();
    // ? set dirty
    component.linkForm.controls.link.markAsDirty({ onlySelf: true });
    expect(getElement(fixture, '#link-box > div > span')).not.toBeTruthy();
    // ? set pattern error
    changeFormValue(fixture, component.linkForm, { link: 'fvbkj' })
    expect(getElement(fixture, '#link-box > div > span')).toBeTruthy();
  });

  it('27# TEST_ngclass_book_type_box', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(component.isMobile).toBeFalse();
    expect(getElement(fixture, '#book-type-box')).not.toHaveClass('mt-5');

    component.isMobile = true;
    fixture.detectChanges();
    expect(getElement(fixture, '#book-type-box')).toHaveClass('mt-5');
  });

  it('28# TEST_select_box_option(value & content)', () => {
    component.step = 'add';
    fixture.detectChanges();
    let elements = getAllElements(fixture, '#book-type-box > select > option');
    // ? value
    expect(+elements[0].nativeElement.value).toEqual(bookTypeEnum.Paper);
    expect(+elements[1].nativeElement.value).toEqual(bookTypeEnum.Electronic);
    expect(+elements[2].nativeElement.value).toEqual(bookTypeEnum.Audio);
    // ? content
    expect(elements[0].nativeElement.textContent.trim()).toEqual('کاغذی');
    expect(elements[1].nativeElement.textContent.trim()).toEqual('الکترونیکی');
    expect(elements[2].nativeElement.textContent.trim()).toEqual('صوتی');
  });

  it('29# TEST_ngclass_price_box', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(component.isMobile).toBeFalse();
    expect(getElement(fixture, '#price-box')).not.toHaveClass('mt-5');

    component.isMobile = true;
    fixture.detectChanges();
    expect(getElement(fixture, '#price-box')).toHaveClass('mt-5');
  });

  it('30# TEST_label_price_attribute(for)', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(getAttributeContent(fixture, '#price-box > label', 'for')).toEqual(getAttributeContent(fixture, '#price', 'id'));
  });

  it('31# TEST_price_input_attributes(type, min, formControlName, readonly)', () => {
    component.step = 'add';
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, '#price', ['type', 'min', 'formControlName', 'readonly']);
    expect(attributes.type).toEqual('number');
    expect(attributes.min).toEqual('0');
    expect(attributes.formControlName).toEqual('price');
    expect(component.isSubmit).toBeFalse()
    expect(attributes.readonly).toBeNull();

    component.isSubmit = true;
    fixture.detectChanges();
    expect(getAttributeContent(fixture, '#price', 'readonly')).toEqual('');
  });

  it('32# TEST_button_form_attributes(type, disabled)', () => {
    component.step = 'add';
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, 'div.form-box > form button', ['type', 'disabled']);
    expect(attributes.type).toEqual('submit');
    expect(component.linkForm.invalid).toBeTrue();
    expect(attributes.disabled).toEqual('');

    changeFormValue(fixture, component.linkForm, { link: 'https:behkhaan.ir', bookType: 1, status: true, price: '200000' })
    expect(getAttributeContent(fixture, 'div.form-box > form button', 'disabled')).toBeNull();
  });

  it('33# TEST_loading_button_SHOULD_create', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(component.loadingBtn).toBeFalse();
    expect(getElement(fixture, '#loading-btn')).not.toBeTruthy();

    component.loadingBtn = true;
    fixture.detectChanges();
    expect(getElement(fixture, '#loading-btn')).toBeTruthy();
  });

  it('34# TEST_button_content_SHOULD_create_and_content', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(component.loadingBtn).toBeFalse();
    expect(component.linkId).toEqual('');
    expect(getElement(fixture, '#create-content')).toBeTruthy();
    expect(contentElement(fixture, '#create-content').trim()).toEqual('ذخیره');
    expect(getElement(fixture, '#edit-content')).not.toBeTruthy();

    component.linkId = randomString();
    fixture.detectChanges();
    expect(getElement(fixture, '#create-content')).not.toBeTruthy();
    expect(getElement(fixture, '#edit-content')).toBeTruthy();
    expect(contentElement(fixture, '#edit-content').trim()).toEqual('ویرایش');

  });

  it('35# TEST_show_all_links_SHOULD_create', () => {
    component.step = 'add';
    fixture.detectChanges();
    expect(component.links).toEqual([]);
    expect(getElement(fixture, '.table-link')).not.toBeTruthy();

    component.links = mockResult(linkModel, 5);
    fixture.detectChanges();
    expect(getElement(fixture, '.table-link')).toBeTruthy();
  });

  it('36# TEST_link_name_attributes(dir, href, target)', () => {
    component.step = 'add';
    component.links = mockResult(linkModel, 5);
    fixture.detectChanges();
    let attributes = getAttributeContent(fixture, 'table .link-name', ['dir', 'href', 'target']);
    expect(attributes.dir).toEqual('ltr');
    expect(attributes.href).toEqual(component.links[0].link);
    expect(attributes.target).toEqual('_blank');
  });

  it('37# TEST_book_type_SHOULD_create_and_content', () => {
    component.step = 'add';
    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper });
    fixture.detectChanges();
    expect(getElement(fixture, '.book-type')).toBeTruthy();

    expect(contentElement(fixture, '.book-type > span').trim()).toEqual('کاغذی');
  });

  it('38# TEST_is_deleted_and_not_deleted_SHOULD_create_and_content', () => {
    component.step = 'add';
    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper, isDeleted: false });
    fixture.detectChanges();
    expect(getElement(fixture, '.is-deleted')).not.toBeTruthy();
    expect(getElement(fixture, '.not-deleted')).toBeTruthy();
    expect(contentElement(fixture, '.not-deleted').trim()).toEqual('فعال');

    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper, isDeleted: true });
    fixture.detectChanges();
    expect(getElement(fixture, '.not-deleted')).not.toBeTruthy();
    expect(getElement(fixture, '.is-deleted')).toBeTruthy();
    expect(contentElement(fixture, '.is-deleted').trim()).toEqual('غیرفعال');
  });

  it('39# TEST_craeted_at_format', () => {
    component.step = 'add';
    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper, isDeleted: false });
    fixture.detectChanges();
    expect(contentElement(fixture, '.created-at').trim()).toEqual(inject.jalaliPipe.transform(component.links[0].createdAt));
  });

  it('40# TEST_remove_btn_SHOULD_create', () => {
    component.step = 'add';
    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper, isDeleted: true });
    fixture.detectChanges();
    expect(getElement(fixture, '.remove-btn')).not.toBeTruthy();

    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper, isDeleted: false });
    fixture.detectChanges();
    expect(getElement(fixture, '.remove-btn')).toBeTruthy();

  });

  it('41# TEST_remove_btn_clickEvent', () => {
    let response = mockResult({
      result: 'string',
      message: 'string',
      error: null,
      refrenceId: 'string',
      hasError: 'boolean'
    }, 1, { hasError: false });
    let linkService = mockSpyByReturn(LinkService, 'deleteShopUrl', of(response));
    component.step = 'add';
    component.links = mockResult(linkModel, 5, { bookType: bookTypeEnum.Paper, isDeleted: false });
    fixture.detectChanges();
    let dialog = mockDialog();
    let bottomSheet = mockBottomSheet();
    clickedElement(fixture, '.remove-btn');

    expect(component.isMobile).toBeFalse();
    expect(dialog.open).toHaveBeenCalledWith(ConfirmCancelDialogComponent, {
      data: {
        config: {
          mainTitle: 'آیا از حذف این لینک اطمینان دارید؟',
          caption: '',
        }
      },
      width: '339px',
      height: '245px',
    });

    component.isMobile = true;
    clickedElement(fixture, '.remove-btn');
    fixture.detectChanges();
    expect(bottomSheet.open).toHaveBeenCalledWith(ConfirmCancelBottomSheetComponent as any, {
      data: {
        config: {
          mainTitle: 'آیا از حذف این لینک اطمینان دارید؟',
          caption: '',
        }
      }
    });

    expect(linkService.deleteShopUrl).toHaveBeenCalledWith(component.links[0].id);
    expect(component.links[0].isDeleted).toBeTrue();
  });

  it('42# TEST_searchBookPublisher_function', () => {
    let response = mockPageListResult(bookListModel, 5, { hasError: false });
    let searchService = mockSpyByReturn(SearchAggregatorService, 'getByPublisherId', of(response));
    component.searchValue = randomString();
    component.searchBookPublisher();

    expect(searchService.getByPublisherId).toHaveBeenCalledWith(component.getUserInfo.publisherId, component.termFilterModel);
    expect(component.books).toEqual(response.result.items);
    expect(component.loading).toBeFalse();
  });

  it('43# TEST_searchBookShop_function', () => {
    let response = mockTServiceResult({
      books: mockResult({
        indexFrom: 'number',
        pageIndex: 'number',
        pageSize: 'number',
        totalCount: 'number',
        totalPages: 'number',
        items: bookListModel,
        hasPreviousPage: 'boolean',
        hasNextPage: 'boolean',
      })
    }, { hasError: false, error: null });
    let searchService = mockSpyByReturn(SearchAggregatorService, 'searchAggregated', of(response));
    component.searchValue = randomString();
    component.searchBookShop();
    expect(searchService.searchAggregated).toHaveBeenCalledWith(component.searchAggregateModel);
    expect(component.books).toEqual(response.result.books.items);
    expect(component.loading).toBeFalse();
  });

  it('44# TEST_getByIdShop_function', () => {
    let response = mockTServiceResult(linkModel, { hasError: false });
    let urlService = mockSpyByReturn(UrlService, 'getByIdShop', of(response));
    component.getByIdShop();
    expect(urlService.getByIdShop).toHaveBeenCalledWith(component.linkId);
    expect(component.linkForm.value.link).toEqual(response.result.link);
    expect(component.linkForm.value.bookType).toEqual(response.result.bookType);
    expect(component.linkForm.value.status).toEqual(response.result.isVisibled);
    expect(component.linkForm.value.price).toEqual(response.result.price);
  });

  it('45# TEST_createLink_function', () => {
    let response = mockResult({
      result: 'string',
      message: 'string',
      error: null,
      refrenceId: 'string',
      hasError: 'boolean'
    }, 1, { hasError: false });
    let linkService = mockSpyByReturn(LinkService, 'createShopUrl', of(response));
    let updateLinkService = mockSpyByReturn(LinkService, 'updateShopUrl', of(response));;
    expect(component.linkId).toEqual('');
    component.createLink();
    expect(linkService.createShopUrl).toHaveBeenCalledWith(component.linkModel);

    component.linkId = randomString();
    component.createLink();
    fixture.detectChanges();
    expect(updateLinkService.updateShopUrl).toHaveBeenCalledWith(component.linkModel);
    expect(spy['Router'].navigate).toHaveBeenCalledWith([htmlUrls.link]);
    expect(component.loadingBtn).toEqual(false);
  });

  it('46# TEST_oninit_function_with_queryParam_SEARCH', () => {
    let response = mockTServiceResult({
      books: mockResult({
        indexFrom: 'number',
        pageIndex: 'number',
        pageSize: 'number',
        totalCount: 'number',
        totalPages: 'number',
        items: bookListModel,
        hasPreviousPage: 'boolean',
        hasNextPage: 'boolean',
      })
    }, { hasError: false, error: null });
    let searchService = mockSpyByReturn(SearchAggregatorService, 'searchAggregated', of(response));
    setNewActivatedRoute(spy['ActivatedRoute'], 'queryParams').and.returnValue(of({search : 'textSearch'}));
    component.ngOnInit();
    expect(component.searchValue).toEqual('textSearch');
    expect(component.termFilterModel.searchTerm).toEqual(component.searchValue);
    expect(component.isPublisher).toBeFalse();
    expect(searchService.searchAggregated).toHaveBeenCalled();

  });

  it('47# TEST_oninit_function_with_queryParam_LINKID', () => {
    let response = mockTServiceResult(linkModel, { hasError: false });
    let urlService = mockSpyByReturn(UrlService, 'getByIdShop', of(response));
    setNewActivatedRoute(spy['ActivatedRoute'], 'queryParams').and.returnValue(of({linkId : 'linkId'}));
    component.ngOnInit(); 
    expect(component.step).toEqual('add');
    expect(urlService.getByIdShop).toHaveBeenCalled();
  });
});
