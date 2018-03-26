import { Injectable } from "@angular/core";
import { ToasterService, Toast } from 'angular2-toaster';

@Injectable()

export class Messages {
    //private toastr = new ToasterService();

    constructor(private toastr: ToasterService) {

    }

    public readonly Errormessage: string = 'Error Occured';
    public readonly AddSuccessMessage: string = 'Added Successfully';
    public readonly EditSuccessMessage: string = 'Edited Successfully';
    public readonly DeleteSuccessMessage: string = 'Deleted Successfully';
    public readonly DuplicateErrormessage: string = 'Already exists';
    public readonly MaxLengthexceedsErrormessage: string = 'Max Length exceeds';
    public test: string = "test";

    public showMessage(message: string) {
        let toast: Toast = {
            type: 'success',
            body: message,
            showCloseButton: true
        };
        this.toastr.pop(toast);
    }

}