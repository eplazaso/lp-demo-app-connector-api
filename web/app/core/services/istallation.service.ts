import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";

@Injectable()
export class InstallationService extends HttpService {

  public istallationSubject = new Subject<any>();
  public app_list;
  public headers = {};
  public brandId = "";

  constructor(private authenticationService: AuthenticationService,protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);
    this.brandId = this.authenticationService.getUser().brandId;
    this.headers = {'headers':
      {
      'Authorization': `Bearer ${this.authenticationService.getBearerToken()}`,
      }
    };
  }

  public getAppListList() {
    this.doGet(`http://${environment.umsDomain}/installation/${this.brandId}`, this.headers).subscribe(data => {
      console.log(data);
      this.app_list = data;
      this.loadingService.stopLoading();
      this.istallationSubject.next('GET_APP_LIST');
    }, error => {
      this.errorResponse(error);
    });
  }

  public installApp() {
    this.doGet(`http://${environment.umsDomain}/installation/${this.brandId}`, this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.istallationSubject.next('INSTALL_APP');
    }, error => {
      this.errorResponse(error);
    });
  }


  public updateApp(appId: string) {
    this.doGet(`http://${environment.umsDomain}/installation/${this.brandId}/${appId}`, this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.istallationSubject.next('UPDATE_APP');
    }, error => {
      this.errorResponse(error);
    });
  }

}