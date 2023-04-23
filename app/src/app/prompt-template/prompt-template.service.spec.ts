import { TestBed } from '@angular/core/testing';

import { PromptTemplateService } from './prompt-template.service';

describe('PromptTemplateService', () => {
  let service: PromptTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
