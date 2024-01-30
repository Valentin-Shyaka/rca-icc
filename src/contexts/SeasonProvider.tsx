import React from "react";

interface Props {
  children: React.ReactNode;
}

const SeasonProvider = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default SeasonProvider;
