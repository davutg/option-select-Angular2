import {Pipe} from 'angular2/core';

@Pipe({
  name: 'trim'
})

export class TrimPipe {
  transform(item, [param]) { 
                if (!item)
                    return;
                if (item.length > param)
                    return item.substring(0, param) + "...";

                return item;
  }
}
