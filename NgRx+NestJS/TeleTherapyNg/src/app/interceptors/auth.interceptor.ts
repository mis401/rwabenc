import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { UserState } from "../store/user/user.state";
import { selectToken } from "../store/user/user.selector";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { logout } from "../store/user/user.actions";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private store: Store<UserState>) {}  
    
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token = "";
        this.store.select(selectToken).subscribe(t => token = t ?? "");
       
        
        const authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
        return next.handle(authReq);
    }
}