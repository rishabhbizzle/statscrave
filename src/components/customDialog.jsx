import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";

const CustomDialogTrigger = ({
  header,
  content,
  children,
  description,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger className={clsx("", className)}>{children}</DialogTrigger>
      <DialogContent
        className="h-screen
        block
        overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
        sm:h-[440px]
        w-full
      "
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogTrigger;
