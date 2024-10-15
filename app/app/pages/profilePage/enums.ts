export enum EFormFields {
  SessionId = "sessionId",
}

export enum EAddLikeFormFields {
  SessionId = "sessionId",
  LikedUserId = "likedUserId",
  Message = "message",
  Username = "username",
}

export enum EUpdateLikeFormFields {
  Id = "id",
  IsCancel = "isCancel",
  LikedUserId = "likedUserId",
}

export enum ECancelLikeFormFields {
  Id = "id",
  IsCancel = "isCancel",
  LikedUserId = "likedUserId",
}
