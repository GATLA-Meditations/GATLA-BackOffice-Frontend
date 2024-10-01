interface IconProps {
    width?: string;
    height?: string;
    color?: string;
    onClick?: () => void;
    active?: boolean;
}

export const LeftArrowIcon = (props: IconProps) => {
    return (
        <svg
            width={props.width ?? '24'}
            height={props.height ?? '24'}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
        >
            <path
                d="M15 18L9 12L15 6"
                stroke={props.color ?? 'black'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
