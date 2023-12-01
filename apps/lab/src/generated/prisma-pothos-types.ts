/* eslint-disable */
import type { Prisma, Poem, PoemKeywords, Keyword, Post, User, Account, Session, VerificationToken } from "@prisma/client";
export default interface PrismaTypes {
    Poem: {
        Name: "Poem";
        Shape: Poem;
        Include: Prisma.PoemInclude;
        Select: Prisma.PoemSelect;
        OrderBy: Prisma.PoemOrderByWithRelationInput;
        WhereUnique: Prisma.PoemWhereUniqueInput;
        Where: Prisma.PoemWhereInput;
        Create: {};
        Update: {};
        RelationName: "keywords";
        ListRelations: "keywords";
        Relations: {
            keywords: {
                Shape: PoemKeywords[];
                Name: "PoemKeywords";
            };
        };
    };
    PoemKeywords: {
        Name: "PoemKeywords";
        Shape: PoemKeywords;
        Include: Prisma.PoemKeywordsInclude;
        Select: Prisma.PoemKeywordsSelect;
        OrderBy: Prisma.PoemKeywordsOrderByWithRelationInput;
        WhereUnique: Prisma.PoemKeywordsWhereUniqueInput;
        Where: Prisma.PoemKeywordsWhereInput;
        Create: {};
        Update: {};
        RelationName: "poem" | "keyword";
        ListRelations: never;
        Relations: {
            poem: {
                Shape: Poem;
                Name: "Poem";
            };
            keyword: {
                Shape: Keyword;
                Name: "Keyword";
            };
        };
    };
    Keyword: {
        Name: "Keyword";
        Shape: Keyword;
        Include: Prisma.KeywordInclude;
        Select: Prisma.KeywordSelect;
        OrderBy: Prisma.KeywordOrderByWithRelationInput;
        WhereUnique: Prisma.KeywordWhereUniqueInput;
        Where: Prisma.KeywordWhereInput;
        Create: {};
        Update: {};
        RelationName: "poems";
        ListRelations: "poems";
        Relations: {
            poems: {
                Shape: PoemKeywords[];
                Name: "PoemKeywords";
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: "author";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User | null;
                Name: "User";
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "accounts" | "sessions" | "Post";
        ListRelations: "accounts" | "sessions" | "Post";
        Relations: {
            accounts: {
                Shape: Account[];
                Name: "Account";
            };
            sessions: {
                Shape: Session[];
                Name: "Session";
            };
            Post: {
                Shape: Post[];
                Name: "Post";
            };
        };
    };
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}