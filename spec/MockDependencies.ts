import { HttpBaseService } from '@shared/service/base_services/http_base.service';
import { HttpClient } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

export function setSpy(config: SpyConfigModel) {
    const result = {};
    for (const mock in config) {
        result[mock] = jasmine.createSpyObj(mock, config[mock].methods, config[mock].properties!);
    }
    return result;
}

export function mockSpyOn(object, methodName: string | string[]) {
    let result: any = {};
    let obj: any = null;
    obj = TestBed.inject(object);
    if (Array.isArray(methodName)) {
        for (let i = 0; i < methodName.length; i++) {
            result[methodName[i]] = spyOn(obj, methodName[i]);
        }
    } else {
        result[methodName] = spyOn(obj, methodName);
    }
    return result;
}

export function mockSpyByReturn(object, methodName: string, returnValue: any) {
    let obj: any = TestBed.inject(object);
    spyOn(obj, methodName)
        .and
        .returnValue(returnValue);

    return obj;
}

export function mockDialog(returnValue: boolean = true) {
    let dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open')
        .and
        .returnValue({ afterClosed: () => of(returnValue) } as any);

    return dialog;
}

export function mockBottomSheet(returnValue: boolean = true) {
    let bottomSheet = TestBed.inject(MatBottomSheet);
    spyOn(bottomSheet, 'open')
        .and
        .returnValue({ afterDismissed: () => of(returnValue) } as any);

    return bottomSheet;
}

export function injectableDependecy(object: {}) {
    let result: any = {};
    for (let item in object) {
        result[item] = TestBed.inject(object[item]);
    }
    return result;
}

export function httpClientMock() {
    return jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete', 'patch']);
}

export function setNewActivatedRoute(spy, property: string): jasmine.Spy{
  return  (Object.getOwnPropertyDescriptor(spy, property)!.get as jasmine.Spy<() => Observable<any>>);
}

interface SpyModel {
    methods: string[],
    properties?: any
}

interface SpyConfigModel {
    [spy: string]: SpyModel
}

