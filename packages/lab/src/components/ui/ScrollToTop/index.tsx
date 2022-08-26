import { useEffect, useState } from "react";
import { ScrollUpContainer } from "./styles";
import { getScroll } from "@/utils/getWindow";
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = (event: any) => {
        const offsetFromTop = getScroll(event.target, true);

        if (!showScroll && offsetFromTop > 350) {
            setShowScroll(true);
        } else if (offsetFromTop <= 350) {
            setShowScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => {
            window.removeEventListener("scroll", checkScrollTop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollUp = () => {
        const element = document.getElementById("intro") as HTMLDivElement;
        element.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    return (
        <div className={styles.container} onClick={scrollUp} show={showScroll}>
            Top
        </div>
    );
};

export default ScrollToTop;
