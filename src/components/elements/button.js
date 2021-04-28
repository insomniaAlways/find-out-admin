import React from "react";
import { Button as SemanticButton } from "semantic-ui-react";

const Button = (props) => {
  const { isPositive, label, onClick, className, size } = props;
  return (
    <SemanticButton positive={isPositive} onClick={onClick} className={className} size={size}>
      {label}
    </SemanticButton>
  );
};

export default Button;
