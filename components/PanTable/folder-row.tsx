import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";
import { FcFolder } from "react-icons/fc";

const FolderRow = ({ row }: { row: Row<any> }) => {
  const router = useRouter();

  return (
    <div>
      <div className="capitalize" onClick={() => router.push("/list/2")}>
        <FcFolder size={30} />
      </div>
    </div>
  );
};

export default FolderRow;
