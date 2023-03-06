import { MemoApproval } from "../model/memo-approval.model";
import { User } from "../model/user.model"; 
import { MemoAttachment } from "./memo-attachment.model";
import { MemoCCUser } from "./memo-ccUser.model";

export interface Ememo {
    id: number;
    addressTo: string;
    from: string;
    departmentId: number;
    companyId: number;
    projectId: number[];
    memoTypeId: number;
    memoStatusId: number;
    subject: string;
    content: string;
    executiveChairman: boolean;
    createdOn: Date;
    updatedOn: Date;
    submittedOn: Date;
    userId: number;
    // approvalId: number[];
    groupId: number[];
    
    // approvalData: MemoApproval[];
    // createdByUserId: number[];
    // attachmentData: MemoAttachment[];
    // memoCCUserData: MemoCCUser[];
    // approvalIdList: number[];
    // approvalLogic: MemoApproval[];
}