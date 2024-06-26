import {useScroll} from "@react-three/drei";
import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {gsap} from "gsap";
import "./index.css";

const ScrollManager = (props) => {
    const {section, onSectionChange} = props;
    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);

    data.fill.classList.add("top");

    useEffect(() => {
        gsap.to(data.el, {
            duration: 1,
            scrollTop: section * data.el.clientHeight,
            onStart: () => {
                isAnimating.current = true;
            },
            onComplete: () => {
                isAnimating.current = false;
            }
        })
    }, [section]);

    useFrame(() => {
        if (isAnimating.current) {
            lastScroll.current = data.scroll.current;
            return;
        }

        const curSection = Math.floor(data.scroll.current * data.pages);
        if (data.scroll.current > lastScroll.current && curSection === 0) {
            onSectionChange(1);
        }
        if (data.scroll.current < lastScroll.current && data.scroll.current < (1 / (data.pages - 1))) {
            onSectionChange(0);
        }
        if (data.scroll.current > 0.34 && data.scroll.current < 0.35) {
            onSectionChange(2);
        }
        if (data.scroll.current > 0.64 && data.scroll.current < 0.65) {
            onSectionChange(1);
        }
        if (data.scroll.current > 0.67 && data.scroll.current < 0.68) {
            onSectionChange(3);
        }if (data.scroll.current < 1 && data.scroll.current > 0.9) {
            onSectionChange(2);
        }

        lastScroll.current = data.scroll.current;
    })

    return null;
}

export default ScrollManager;