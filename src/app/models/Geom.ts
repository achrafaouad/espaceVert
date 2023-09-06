export class Geom{
    private _id!: any ;
    private _name!: String;
    private _geom!: String;
    private _geomavancement!: String;
    private _style!: String;
    private _avancement!: String;
    private _date_depart!: Date;
    private _date_departR!: Date;
    private _objet!: String;
    private _delais!: Date;
    public constructor(_delais?: Date,_objet?: String
        ,_date_depart?: Date
        ,_date_departR?: Date,
        _avancement?: String,_id?:any,_geom?:String,_geomavancement?:String,_name?:String,_style?:String){

}
public get geomavancement() {
    return this._geomavancement;
}

public set geomavancement(tt) {
    this.geomavancement = tt;
}
public get delais() {
    return this._delais;
}

public set delais(tt) {
    this._delais = tt;
}
public get objet() {
    return this._objet;
}

public set objet(tt) {
    this._objet = tt;
}
public get date_depart() {
    return this._date_depart;
}

public set date_depart(tt) {
    this._date_depart = tt;
}
public get date_departR() {
    return this._date_departR;
}

public set date_departR(tt) {
    this._date_departR = tt;
}
public get avancement() {
    return this._avancement;
}

public set avancement(tt) {
    this._avancement = tt;
}

public get id() {
    return this._id;
}
public get name() {
    return this._name;
}

public set id(tt) {
    this._id = tt;
}
public get geom() {
    return this._geom;
}

public set geom(tt) {
    this._geom = tt;
}
public get style() {
    return this._style;
}

public set style(tt) {
    this._style = tt;
}

public set name(tt:any) {
    this._name = tt;
}


}