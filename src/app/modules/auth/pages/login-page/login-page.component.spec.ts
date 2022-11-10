import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should returning invalid form', () => {
    //TODO: Arrange
    const mockCredentials = {
      email: '0x0x0x0x0x',
      password: '1231312312312312312312312312312'
    }
    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')
    //TODO: Act
    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)
    //TODO: Assert
    expect(component.formLogin.invalid).toBeTrue();
  });

  it('should returning valid form', () => {
    //TODO: Arrange
    const mockCredentials = {
      email: 'test@test.com',
      password: '12345678'
    }
    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')
    //TODO: Act
    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)
    //TODO: Assert
    expect(component.formLogin.valid).toBeTrue();
  });

  it('Button should have the label of "Iniciar sesión"', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Iniciar sesión')
  })

});
