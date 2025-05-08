"use client";

import { ClientButtonProps } from "@/interfaces/ui-components-interface";

import { Button } from "@/components/ui/button";

const ClientButton = ({
  className,
  onClickHandler,
  children,
}: ClientButtonProps) => {
  return (
    <Button className={className} onClick={onClickHandler}>
      {children}
    </Button>
  );
};

export default ClientButton;
