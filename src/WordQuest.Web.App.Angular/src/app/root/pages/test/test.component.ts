import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private readonly _http: HttpClient) { }

  public go(): void {
    this._http
      .get("https://localhost:44313/api/Categories")
      .subscribe(
        response => alert(response),
        error => alert(error));
  }

  ngOnInit(): void {
  }

}
