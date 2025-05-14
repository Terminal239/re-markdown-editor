import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ComponentType<IconProps>;
  label?: string;
  loading?: boolean;
  className?: string;
  rounded?: boolean;
  tooltipMessage?: string;
  disabled?: boolean;
}
const Button = ({
  onClick,
  icon: Icon,
  label,
  loading = false,
  className = "",
  rounded = false,
  tooltipMessage = "",
  disabled = false,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            disabled={disabled}
            onClick={onClick}
            className={clsx(
              "flex items-center justify-center gap-1 font-bold text-white hover:opacity-90",
              className,
              rounded && "rounded",
            )}
          >
            {Icon && (loading ? <Icon className="animate-spin" /> : <Icon />)}
            {label && (
              <span className="hidden lg:inline">
                {loading ? label.replace(/Save Document/, "Saving") : label}
              </span>
            )}
          </button>
        </TooltipTrigger>
        {tooltipMessage !== "" && (
          <TooltipContent>
            <p className="flex h-[24px] items-center rounded bg-black px-2 text-[12px] text-white shadow md:text-[14px]">
              {tooltipMessage}
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Button;
