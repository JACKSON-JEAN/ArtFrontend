import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

const NextArrowIcon = FaChevronRight as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const PrevArrowIcon = FaChevronLeft as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <div
      className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border p-0.5 cursor-pointer text-xl text-red-950 hover:text-red-900 z-10"
      onClick={onClick}
    >
      <NextArrowIcon />
    </div>
  );
  
  // Custom prev arrow
export  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <div
      className="absolute top-1/2 -left-3 bg-white border p-0.5 transform -translate-y-1/2 cursor-pointer text-xl text-red-950 hover:text-red-900 z-10"
      onClick={onClick}
    >
      <PrevArrowIcon />
    </div>
  );