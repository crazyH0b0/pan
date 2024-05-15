'use client';
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  LineChart,
  ListFilter,
  Loader,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { File, Pan, User } from '@prisma/client';
import { FcFile, FcImageFile, FcVideoFile } from 'react-icons/fc';
import { handleDeleteFileByHDFS } from '@/actions/manage-file';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { deleteUserAction, disableUserAction } from '@/actions/manage-user';

export interface UserTableProps {
  data: (File & {
    pan: Pan & {
      user: User;
    };
  })[];
  users: User[];
}
// TODO: Table 搜索加上 loading
const UserTable = ({ data, users }: UserTableProps) => {
  const [currentTab, setCurrentTab] = React.useState('user');
  const status = useFormStatus();
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  });

  const inputValue = React.useRef('');
  const router = useRouter();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    inputValue.current = searchValue;
  };
  const handleKeyPress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/pan/settings?keyword=${inputValue.current}`);
  };

  // TODO:加上节流处理
  const onSwitch = async (username: string, on: boolean) => {
    disableUserAction(username, on);
  };

  const onDelete = async function name(username: string, userId: string) {
    try {
      await deleteUserAction(username, userId);
      toast.warning('用户删除成功~');
    } catch (error) {
      toast.error('用户删除失败~');
    }
  };
  // 非客户端
  if (!hydrated) {
    return <></>;
  }

  return (
    <div className="flex  w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-12 overscroll-y-auto">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

            <form onSubmit={handleKeyPress}>
              <Input
                type="search"
                placeholder="搜索..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                onChange={handleSearchChange}
              />
            </form>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="files" onValueChange={(tab) => setCurrentTab(tab)}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="files">用户文件</TabsTrigger>
                <TabsTrigger value="users">用户管理</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="files">
              <Card>
                <CardContent className="h-[500px] overflow-y-scroll">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>文件名</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead className="hidden md:table-cell">发布人</TableHead>
                        {/* <TableHead className="hidden md:table-cell">大小</TableHead> */}
                        <TableHead className="hidden md:table-cell">上传时间</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.length > 0 ? (
                        data.map((file) => {
                          // 将日期字符串转换为 Date 对象
                          const dateStr = file.createdAt;
                          const date = new Date(dateStr);

                          // 使用 date-fns 的 format 函数将日期格式化为 "YYYY/MM/DD HH:mm" 格式
                          const formattedDate = format(date, 'yyyy/MM/dd HH:mm');

                          return (
                            <TableRow key={file.fileId} suppressHydrationWarning>
                              <TableCell className="hidden sm:table-cell">
                                {(file.type === 'jpg' || file.type === 'png') && <FcImageFile size={64} />}
                                {(file.type === 'txt' ||
                                  file.type === 'md' ||
                                  file.type === 'pdf' ||
                                  file.type === 'doc') && <FcFile size={64} />}
                                {file.type === 'mp4' && <FcVideoFile size={64} />}
                              </TableCell>
                              <TableCell className="font-medium">{file.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{file.type}</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{file.pan.user.username}</TableCell>
                              {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
                              <TableCell className="hidden md:table-cell">{formattedDate}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>操作</DropdownMenuLabel>
                                    <DropdownMenuItem>下载</DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={async () => {
                                        try {
                                          const res = await handleDeleteFileByHDFS(file.fileId, file.name, file.panId);
                                          toast.success('删除成功~');
                                        } catch (error) {
                                          toast.error('删除失败~');
                                        }
                                      }}
                                    >
                                      删除
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <>无数据</>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    <div className="text-xs text-muted-foreground">
                      共有<strong>{data.length}</strong>条
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardContent className="h-[500px] overflow-y-scroll">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>用户名</TableHead>
                        <TableHead>启用</TableHead>
                        {/* <TableHead className="hidden md:table-cell">大小</TableHead> */}
                        <TableHead className="hidden md:table-cell">操作</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length > 0 ? (
                        users.map((user) => {
                          return (
                            <TableRow key={user.id}>
                              <TableCell className="hidden sm:table-cell  items-center">
                                <Image
                                  width={30}
                                  height={30}
                                  alt="Avatar"
                                  src={`https://api.dicebear.com/8.x/notionists/svg?seed=${Math.random()}
    `}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{user.username}</TableCell>
                              <TableCell>
                                <Switch onCheckedChange={(value) => onSwitch(user.username, value)} />
                              </TableCell>
                              {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>操作</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onDelete(user.username, user.id)}>
                                      删除
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <>无数据</>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    <div className="text-xs text-muted-foreground">
                      共有<strong>{data.length}</strong>条
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserTable;
