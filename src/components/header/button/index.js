import React from "react";

const shapes = { circle: "rounded-[50%]", round: "rounded-[18px]" };
const variants = {
  outline: {
    blue_A700_cyan_300:
      "blue_A700_cyan_300_border border-2 border-solid text-blue_gray-900",
  },
  fill: {
    cyan_300: "bg-cyan-300 text-blue_gray-900",
    white_A700_19: "bg-white-A700_19",
  },
};
const sizes = { xs: "p-1.5", sm: "p-[9px]", md: "p-3.5", lg: "p-5" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "md",
  variant = "outline",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};


export { Button };
