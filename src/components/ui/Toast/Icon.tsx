import { IconType } from "react-icons";

interface IconProps {
  icon: IconType;
  color?: string;
  size?: number;
}

export function Icon({ icon: Icon, color = "black", size = 20 }: IconProps) {
  return <Icon color={color} size={size} />;
}
