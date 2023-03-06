export interface Project {
    id: number;
    name: string;
    createdOn: Date;
    updatedOn: Date;
    createdById: number;
    updatedById: number;
    deletedById: number;
    deletedOn: Date;
    status: "ACTIVE";
}