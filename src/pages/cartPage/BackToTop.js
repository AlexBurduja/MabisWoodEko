import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";


export function BackToTop(){

    const [backToTop, setBackToTop] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 700){
                setBackToTop(true)
            } else {
                setBackToTop(false)
            } 
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="scrollButtonMobile" >
            <AnimatePresence>
            {backToTop && (
                <motion.div
                initial = {{opacity: 0}}
                animate= {{opacity: 1}}
                exit = {{opacity: 0}}
                >
                <AiOutlineArrowUp onClick={scrollUp} className="scrollButton" />
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}