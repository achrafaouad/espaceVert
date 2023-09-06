export class Token{
    


    public constructor(private _access_token?:string,private _refresh_token?:string){
  
    }


    public get access_token() {
        return this._access_token!;
    }
    public get refresh_token() {
        return this._refresh_token!;
    }


    public set access_token(ele:string) {
        this._access_token=ele;
   }
   public set refresh_token(ele:string) {
        this._refresh_token=ele;
   }

}