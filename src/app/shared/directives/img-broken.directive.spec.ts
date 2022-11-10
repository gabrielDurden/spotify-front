import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgBrokenDirective } from './img-broken.directive';

@Component({
  template: '<img class="testing-directive" appImgBroken [src]="srcMock" >'
})
class TestComponent{
  public srcMock:any = null
}

describe('ImgBrokenDirective', () => {

  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ImgBrokenDirective
      ]
    })
    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create an instance', () => {
    const mockElement = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('TestComponent should instance correctly', () => {
    expect(component).toBeTruthy()
  })

  it('Directive should change img if not exists', (done: DoneFn) => {
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
    const beforeImgSrc = beforeImgElement.src
    component.srcMock = undefined
    setTimeout(() => {
      const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
      const afterImgSrc = beforeImgElement.src
      expect(afterImgSrc).toMatch(/\bimg-broken.png\b/)
      done()
    }, 3000)

  })

});
