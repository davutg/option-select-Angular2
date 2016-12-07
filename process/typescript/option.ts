import {TextValue} from './textValue';

export interface Option {
    Header: string;
    Options:TextValue[];
    selection?:any;
}
