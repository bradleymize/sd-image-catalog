import {Component, OnInit} from '@angular/core';
import {KeywordService} from "./keyword.service";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'app-keyword-browser',
  templateUrl: './keyword-browser.component.html',
  styleUrls: ['./keyword-browser.component.sass']
})
export class KeywordBrowserComponent implements OnInit {
  private keywordListSubject = new ReplaySubject(1);
  keywordList$: Observable<any> = this.keywordListSubject.asObservable();

  selectedKeyword: any;
  private positiveKeywordUsageSubject = new ReplaySubject(1);
  positiveKeywordUsage$: Observable<any> = this.positiveKeywordUsageSubject.asObservable();
  private negativeKeywordUsageSubject = new ReplaySubject(1);
  negativeKeywordUsage$: Observable<any> = this.negativeKeywordUsageSubject.asObservable();

  constructor(private keywordService: KeywordService) {
  }

  ngOnInit(): void {
    this.keywordService.list().subscribe({
      next: res => {
        console.log(res);
        this.keywordListSubject.next(res);
      },
      error: res => {
        console.error(res);
      }
    });
  }

  selectKeyword(item: any) {
    this.selectedKeyword = item;
    this.keywordService.get(item.id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.positiveKeywordUsageSubject.next(res.filter((i:any) => i.type === 'positive'));
        this.negativeKeywordUsageSubject.next(res.filter((i:any) => i.type === 'negative'));
      },
      error: res => {
        console.error(res);
      }
    });
  }
}
