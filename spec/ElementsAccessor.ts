import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';

export function getDebugElement(fixture: ComponentFixture<any>, selector: string): DebugElement{
    return fixture.debugElement.query(By.css(selector));
}

export function submitForm(fixture: ComponentFixture<any>, selector: string): void{
    getDebugElement(fixture, selector).triggerEventHandler('ngSubmit', null);
}

export function eventElement(fixture: ComponentFixture<any>, selector: string, event : string, parameters : any = null): void{
    getDebugElement(fixture, selector).triggerEventHandler(event, parameters);
}

export function getElement(fixture: ComponentFixture<any>, selector: string): any {
    return fixture.debugElement.query(By.css(selector))?.nativeElement;
}

export function getAllElements(fixture: ComponentFixture<any>, selector: string): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
}

export function clickedElement(fixture: ComponentFixture<any>, selector: string): void {
    getElement(fixture, selector).click();
}

export function getAllClasses(fixture: ComponentFixture<any>, selector: string): string {
    let allClass = fixture.debugElement.query(By.css(selector)).classes;
    let classList = Object.keys(allClass);
    return classList.join(' ');
}

export function classElement(element : DebugElement, className: string): boolean{
    return !!element.classes[className];
}

export function getTagName(fixture: ComponentFixture<any>, selector: string): string {
    return fixture.debugElement.query(By.css(selector)).name;
}

export function contentElement(fixture: ComponentFixture<any>, selector: string): any {
    return getElement(fixture, selector)?.textContent;
}

export function getAttributeContent(fixture: ComponentFixture<any>, selector: string, attribute: string | string[]): any {
    let element = getElement(fixture, selector);
    let attributes = {};
    if (Array.isArray(attribute)) {
        attribute.forEach(attr => {
            attributes[attr] = element.getAttribute(attr);
        });
        return attributes;
    }
    else {
        return element.getAttribute(attribute);
    }

}

export function getStyleElement(fixture: ComponentFixture<any>, selector: string){
    let allStyles: any = {};
    let attributeStyle = getAttributeContent(fixture, selector, 'style');
    for(let i = 0; i < attributeStyle.split('; ').length; i++){
        allStyles[attributeStyle.split('; ')[i].split(':')[0]] =  attributeStyle.split('; ')[i].split(':')[1].split(';')[0].trim('');
    }
 
    return allStyles;
}

export function changeInputValue(fixture: ComponentFixture<any>, selector: string, value: any): void {
    let element = getElement(fixture, selector);
    element.value = value;
    element.dispatchEvent(new Event('input'));
    fixture.detectChanges();
}

export function getValueInput(fixture: ComponentFixture<any>, selector: string){
    return getElement(fixture, selector)?.value;
}
 
export function changeFormValue(fixture: ComponentFixture<any>, formName: FormGroup, values: {}): void{
    let valueKeys = Object.keys(values);
    let formKeys = Object.keys(formName.value);
    for(let i = 0; i < formKeys.length; i++){
        if(formName.value.hasOwnProperty(valueKeys[i])){
            formName.controls[valueKeys[i]].setValue(values[valueKeys[i]]);
        }
    }
    fixture.detectChanges();
}

