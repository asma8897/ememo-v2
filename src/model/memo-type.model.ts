export interface MemoType {
    id: number;
    name: string;
    departmentId: number;
    createdOn: Date;
    updatedOn: Date;
    createdById: number;
    updatedById: number;
    deletedById: number;
    deletedOn: Date;
    status: "ACTIVE";
}