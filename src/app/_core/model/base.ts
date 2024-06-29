export class BaseEntity {
    createdBy: any;
    createdDate: Date;
    updatedBy: any;
    updatedDate: Date;

    constructor() {
        this.createdBy = '';
        this.createdDate = new Date();
        this.updatedBy = '';
        this.updatedDate = new Date();
    }
}

export interface BaseEntity {
    createdBy: any;
    createdDate: Date;
    updatedBy: any;
    updatedDate: Date;
}


export interface ReponseObject {

}