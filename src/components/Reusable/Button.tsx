import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import clsx from "clsx";

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
}
const Button = ({ onClick, icon: Icon, label, loading = false, className = "", rounded = false, tooltipMessage = "" }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={onClick} className={clsx("flex items-center justify-center gap-1 font-bold text-white hover:opacity-90", className, rounded && "rounded")}>
            {Icon && (loading ? <Icon className="animate-spin" /> : <Icon />)}
            {label && <span className="hidden lg:inline">{loading ? label.replace(/Save Document/, "Saving") : label}</span>}
          </button>
        </TooltipTrigger>
        {tooltipMessage !== "" && (
          <TooltipContent>
            <p className="text-white text-[12px] md:text-[14px] px-2 rounded shadow h-[24px] bg-black flex items-center">{tooltipMessage}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Button;
