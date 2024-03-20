import { z } from "zod"

export const formSchema = z.object({
  username: z.string().min(2,'用户名长度不能少于2个字符').max(50, '用户名长度不能超过50个字符'),
  password: z.string().min(2, '密码长度不能少于2个字符').max(50, '密码长度不能超过50个字符'),
})