import { Company } from "./company.model";
import { Department } from "./department.model";
import { Project } from "./project.model";

export interface ClientModel {
    id?: number;
    name: string;
    companies: Company[];
    departments: Department[];
    projects: Project[];
    memoType: string[];
    memoRunningNo: number;
}