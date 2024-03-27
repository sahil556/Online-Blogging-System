export interface Comment {
    id: string;
    comment: string;
    userEmail: string;
    parentId : string | null;
    createdAt: string;
    postId: string;
}
