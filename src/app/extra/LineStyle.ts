
export class LineStyle{
    


    public constructor(private _text?:String,private _align?:String,private _baseline?:String,private _rotation?:String,private _font?:String,private _weight?:String,private _placement?:String,private _maxangle?:String,private _overflow?:boolean,private _size?:String,private _height?:String,private _offsetX?:String,private _offsetY?:String,private _color?:String,private _outline?:String,private _outlineWidth?:String,private _maxreso?:String){
  
    }

    public get text() {
        return this._text!;
    }
    public get align() {
        return this._align!;
    }
    public get baseline() {
        return this._baseline!;
    }
    public get font() {
        return this._font!;
    }
 
    public get weight() {
        return this._weight!;
    }
    public get placement() {
        return this._placement!;
    }
    public get maxangle() {
        return this._maxangle!;
    }
    public get size() {
        return this._size!;
    }
    public get overflow() {
        return this._overflow!;
    }
    public get height() {
        return this._height!;
    }
    public get offsetY() {
        return this._offsetY!;
    }
    public get color() {
        return this._color!;
    }
    public get outline() {
        return this._outline!;
    }
    public get outlineWidth() {
        return this._outlineWidth!;
    }
    public get maxreso() {
        return this._maxreso!;
    }
    public get offsetX() {
        return this._offsetX!;
    }
    public get rotation() {
        return this._rotation!;
    }

    public set text(ele:String) {
        this._text=ele;
   }
   public set align(ele:String) {
        this._align=ele;
   }
   public set baseline(ele:String) {
        this._baseline=ele;
   }
   public set font(ele:String) {
        this._font=ele;
   }

   public set weight(ele:String) {
        this._weight=ele;
   }
   public set placement(ele:String) {
        this._placement=ele;
   }
   public set maxangle(ele:String) {
        this._maxangle=ele;
   }
   public set size(ele:String) {
        this._size=ele;
   }
   public set overflow(ele:boolean) {
        this._overflow=ele;
   }
   public set height(ele:String) {
        this._height=ele;
   }
   public set offsetY(ele:String) {
        this._offsetY=ele;
   }
   public set color(ele:String) {
        this._color=ele;
   }
   public set outline(ele:String) {
        this._outline=ele;
   }
   public set outlineWidth(ele:String) {
        this._outlineWidth=ele;
   }
   public set maxreso(ele:String) {
        this._maxreso=ele;
   }
   public set offsetX(ele:String) {
        this._offsetX=ele;
   }
   public set rotation(ele:String) {
        this._rotation=ele;
   }


   public get getObjStyle(){
       return {
        text: this._text,
        align : this._align,
        baseline : this._baseline,
        rotation : this._rotation,
        font : this._font,
        weight : this._weight,
        placement : this._placement,
        maxangle : this._maxangle,
        overflow : this._overflow,
        size : this._size,
        height : this._height,
        offsetX : this._offsetX,
        offsetY : this._offsetY,
        color :this._color,
        outline : this._outline,
        outlineWidth : this._outlineWidth,
        maxreso : this._maxreso,
       }
   }
    
}

