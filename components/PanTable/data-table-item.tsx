"use client"
import React from 'react'
import { FcFolder } from 'react-icons/fc'

import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { Folder } from '@/store/use-folder'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from '../ui/button'

const DataTableItem = ({folder, isChecked, onChange}
  :{folder: Folder, isChecked: boolean,onChange:(checked: boolean, folder: Folder)=>void}) => {
    const [mounted , setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null  // 防止水合错误， 服务端渲染的时候并不能获取用户的theme
    return (
    <ContextMenu>
      <ContextMenuTrigger className='w-[120px] '>
      <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger>
        <div key={folder.id}
        className={
         cn("relative group transition duration-75 cursor-pointer pb-3 rounded-xl hover:bg-[#f5f5f5] hover:dark:bg-[#262626] flex flex-col items-center",
         isChecked && "bg-[#f5f5f5] dark:bg-[#262626] "
         )
         }>
      <Checkbox
      className={cn("absolute top-5 left-3   border-2 hidden group-hover:block", isChecked && 'block')}
       checked={isChecked}
       onCheckedChange={(checked: boolean) => onChange(checked, folder)}
       />
       <FcFolder size={120}/> 
       <div className="w-[115px] flex flex-col items-center">
       <span className="text-base w-full text-center line-clamp-2 overflow-hidden text-ellipsis break-words">{folder.fileName}</span>
       <span className="text-xs text-muted-foreground">{folder.createdAt}</span>
       </div>
       </div>

        </TooltipTrigger>
    
        <TooltipContent  side='top'>
          <p>{folder.fileName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    
      
    </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
            <ContextMenuItem inset>
              Download
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
              Bookmark
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
     
          
            <ContextMenuSeparator />
            <ContextMenuItem inset>
              Rename
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuCheckboxItem>Move</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value="pedro">
            
              <ContextMenuRadioItem value="pedro">
                Details
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm">
              <p className='text-rose-500'>Delete</p> 
              
              </ContextMenuRadioItem>
              
            </ContextMenuRadioGroup>
          </ContextMenuContent>
    </ContextMenu>
    
      )
    //   return (
//   <TooltipProvider delayDuration={300}>
//   <Tooltip>
//     <TooltipTrigger>
// <ContextMenu>
//   <ContextMenuTrigger>
//     <div key={folder.id}
//     className={
//      cn("relative group transition duration-75 cursor-pointer pb-3 rounded-xl hover:bg-[#f5f5f5] hover:dark:bg-[#262626] flex flex-col items-center",
//      isChecked && "bg-[#f5f5f5] dark:bg-[#262626] "
//      )
//      }>
//   <Checkbox
//   className={cn("absolute top-5 left-3   border-2 hidden group-hover:block", isChecked && 'block')}
//    checked={isChecked}
//    onCheckedChange={(checked: boolean) => onChange(checked, folder)}
//    />
//    <FcFolder size={120}/> 
//    <div className="w-[115px] flex flex-col items-center">
//    <span className="text-base w-full text-center line-clamp-2 overflow-hidden text-ellipsis break-words">{folder.fileName}</span>
//    <span className="text-xs text-muted-foreground">{folder.createdAt}</span>
//    </div>
//    </div>
//   </ContextMenuTrigger>
//   <ContextMenuContent className="w-64">
//         <ContextMenuItem inset>
//           Back
//           <ContextMenuShortcut>⌘[</ContextMenuShortcut>
//         </ContextMenuItem>
//         <ContextMenuItem inset disabled>
//           Forward
//           <ContextMenuShortcut>⌘]</ContextMenuShortcut>
//         </ContextMenuItem>
//         <ContextMenuItem inset>
//           Reload
//           <ContextMenuShortcut>⌘R</ContextMenuShortcut>
//         </ContextMenuItem>
//         <ContextMenuSub>
//           <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
//           <ContextMenuSubContent className="w-48">
//             <ContextMenuItem>
//               Save Page As...
//               <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
//             </ContextMenuItem>
//             <ContextMenuItem>Create Shortcut...</ContextMenuItem>
//             <ContextMenuItem>Name Window...</ContextMenuItem>
//             <ContextMenuSeparator />
//             <ContextMenuItem>Developer Tools</ContextMenuItem>
//           </ContextMenuSubContent>
//         </ContextMenuSub>
//         <ContextMenuSeparator />
//         <ContextMenuCheckboxItem checked>
//           Show Bookmarks Bar
//           <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
//         </ContextMenuCheckboxItem>
//         <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
//         <ContextMenuSeparator />
//         <ContextMenuRadioGroup value="pedro">
//           <ContextMenuLabel inset>People</ContextMenuLabel>
//           <ContextMenuSeparator />
//           <ContextMenuRadioItem value="pedro">
//             Pedro Duarte
//           </ContextMenuRadioItem>
//           <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
//         </ContextMenuRadioGroup>
//       </ContextMenuContent>
// </ContextMenu>
//     </TooltipTrigger>

//     <TooltipContent  side='top'>
//       <p>{folder.fileName}</p>
//     </TooltipContent>
//   </Tooltip>
// </TooltipProvider>

  


//   )
}

export default DataTableItem