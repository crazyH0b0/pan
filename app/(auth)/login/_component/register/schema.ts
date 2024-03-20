import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, '用户名长度不能少于2个字符').max(50, '用户名长度不能超过50个字符'),
  password: z.string().min(2, '密码长度不能少于2个字符').max(50, '密码长度不能超过50个字符'),
  confirm: z.string().min(2, '密码长度不能少于2个字符').max(50, '密码长度不能超过50个字符'),
 
}) .refine((data) => data.password === data.confirm, {
  message: "两次密码输入不一致",
  path: ["confirm"],
});

export { formSchema }