export interface Department {
    id: number;
    name: string;
    createdOn: Date;
    updatedOn: Date;
    status: "ACTIVE";
    createdById: number;
    updatedById: number;
    deletedById: number;
    deletedOn: Date;
}