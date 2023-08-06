import cn from "classnames";
import { motion } from "framer-motion";

export default function BackgroundGradient({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            className={cn("absolute -z-10 animate-fluid blur-3xl", className)}
        />
    );
}

