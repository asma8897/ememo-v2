export interface User {
    id: number;
    uid: string;
    name: string;
    email: string;
    password: string;
    departmentId: number;
    companyId: number;
    jobTitle: string;
    createdOn: Date;
    updatedOn: Date;
    createdById: number;
    updatedById: number;
    deletedById: number;
    deletedOn: Date;
    status: "ACTIVE";
    groupId: number[];
}