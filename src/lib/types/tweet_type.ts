import type { LikedType } from "./liked_type"
import type { UserInfoType } from './user_info'

export type TweetType = {
    id: number
    url: string
    content: string
    posted: Date
    liked: LikedType[]
    user: UserInfoType
}