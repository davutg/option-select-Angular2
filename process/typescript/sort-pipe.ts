import { Pipe } from "angular2/core";

@Pipe({
  name: "sort"
})
export class SortPipe {
transform(array: Array<any>, propertyName:string): Array<any> {
    array.sort((a: any, b: any) => {
            if(propertyName!=null)
            {
                
            if(exceptionList.indexOf(a[propertyName])>-1)
                return -1;
                
              if (a[propertyName] < b[propertyName]) {
                return -1;
              } else if (a[propertyName] > b[propertyName]) {
                return 1;
              } else {
                return 0;
              }
            }else
            {
             if(exceptionList.indexOf(a)>-1)
               return -1;
                
              if (a < b) {
                return -1;
              } else if (a > b) {
                return 1;
              } else {
                return 0;
              }
            }
    });
    return array;
  }
}

var exceptionList=["n/a","'n/a'",'none']