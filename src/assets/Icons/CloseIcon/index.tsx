interface IconProps {
  width?: string;
  height?: string;
  color?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function CloseIcon(props: IconProps) {
  return (
    <svg
      width={props.width ?? "18"}
      height={props.height ?? "18"}
      strokeLinejoin="round"
      data-testid="geist-icon"
      viewBox="0 0 16 16"
      cursor={"pointer"}
      onClick={props.onClick}
    >
      <path
        fill="#48555D"
        d="m12.47 13.53.53.53L14.06 13l-.53-.53L9.06 8l4.47-4.47.53-.53L13 1.94l-.53.53L8 6.94 3.53 2.47 3 1.94 1.94 3l.53.53L6.94 8l-4.47 4.47-.53.53L3 14.06l.53-.53L8 9.06l4.47 4.47Z"
      />
    </svg>
  );
}
