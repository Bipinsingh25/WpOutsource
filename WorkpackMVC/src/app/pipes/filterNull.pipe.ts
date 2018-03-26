import { Designation } from './../models/designation';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FilterNull' })
export class FilterNullPipe implements PipeTransform {
    transform(degns: Designation[]) {
        debugger;
        return degns.filter(desn => desn.DesignationID !== null && desn.DesignationName !== null)
    }
}