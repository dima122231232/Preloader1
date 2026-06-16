"use client";

import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin( SplitText, CustomEase);

CustomEase.create("hop", "0.5, .5, 0.1, 1");
CustomEase.create("open", ".15, 1, .25, 1");
import "./Preloader.css";

const Preloader = () => {
    const preloaderRef = useRef(null);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const waitForFonts = async () => {
            try {
                await document.fonts.ready;
                const customFonts = ["Aeonik"];

                const fontCheckPromises = customFonts.map((fontFamily) => {
                    return document.fonts.check(`16px ${fontFamily}`);
                });

                await Promise.all(fontCheckPromises);

                await new Promise((resolve) => setTimeout(resolve, 100));

                return true;
            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 200));

                return true;
            }
        };
        const initializeAnimation = async () => {
            await waitForFonts();

            const split = SplitText.create(".preloader__main-text", {
                type: "chars",
            });

            gsap.set(".preloader__main-text , .preloader-images .img",{opacity:1})
            gsap.to(".preloader-images .img:first-child", {
                filter: "blur(0px)",
                duration:.6,delay:.2
            });

            // const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            // const offset = 6 * rem;
            const messages = gsap.utils.toArray(".preloader-messages p");
            const widths = Array.from(messages).map((el) =>
                el.getBoundingClientRect().width
            );        
            const Mainwidth = document.querySelector('.preloader__main-text').getBoundingClientRect().width + 8;    
            
            
            gsap.set(".preloader__line-bg",{clipPath: `polygon(${Mainwidth-4}px 0%, ${Mainwidth-4}px 0%, ${Mainwidth-4}px 100%, ${Mainwidth-4}px 100%)`});
            const tl = gsap.timeline({ delay: .25 });

            tl.to(split.chars, {
                opacity: 1,
                duration: 0.001,
                stagger: 0.035,
                ease: "none",
            })
            .to(".preloader__line-bg",{
                clipPath: `polygon(${Mainwidth-4}px 0%, ${widths[3] + Mainwidth}px 0%, ${widths[3]+ Mainwidth}px 100%, ${Mainwidth-4}px 100%)`,
                delay:.1,
                duration:.6,
                ease:"hop"
            })
            .to({}, { duration: .6 });

            const images = gsap.utils.toArray(".preloader-images .img");
            const colors = [
                "rgba(240, 252, 252, 1)",
                "rgba(220, 255, 110, 1)",
                "rgba(188, 255, 242, 1)",
                "rgba(255, 240, 129, 1)"
            ];
            for(let i = messages.length; i > 0; i--){
                tl.to(".preloader-messages p",{y:`-${i-1}rem`,ease:"open",duration:1})
                .to(images[messages.length - i], {
                    // clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    opacity:0,
                    scale:1.1,
                    filter:"blur(50px)",
                    duration: .6,
                    ease:"open"
                },"<")
                .to(".preloader__line-bg",{
                    clipPath: `polygon(${Mainwidth-4}px 0%, ${widths[i-1] + Mainwidth}px 0%, ${widths[i-1]+ Mainwidth}px 100%, ${Mainwidth-4}px 100%)`,
                },"<")
                .to(".preloader__line-bg",{
                    backgroundColor:colors[i - 2],
                    duration:.2
                },"<")
                .to({}, { duration: .4 });
            }
            tl.to(".preloader__line-bg",{
                clipPath: `polygon(0rem 0%, ${widths[0] + Mainwidth}px 0%, ${widths[0]+ Mainwidth}px 100%, 0rem 100%)`,
                duration:.6,
                ease:"open"
            },"-=.6")
            .to(".preloader-header",{
                clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration:.6,
                ease:"open"
            })
            .to(images[4],{
                opacity:0,
                scale:1.1,
                filter:"blur(50px)",
                duration:.6,
                ease:"open"
            },"<")
            .to(".logo",{
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                duration:.6,
                ease:"open"

            },"-=.5")
            .to(images[5],{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration:1,
                ease:"open",
                delay:.6
            })
            .to(".logo",{
                top:"10%",
                duration:1.2,
                ease:"open"

            },"<")
            .to(".logo svg path ",{
                fill:"#000",
                duration:1,

            },"<")

        }
        initializeAnimation();

    }, []);

    if (!showPreloader) return null;

    return (
        <>
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-images">
                <div className="img"><img src="/preloader/1.jpg" alt="preloader-images" /></div>
                <div className="img"><img src="/preloader/2.jpg" alt="preloader-images" /></div>
                <div className="img"><img src="/preloader/3.jpg" alt="preloader-images" /></div>
                <div className="img"><img src="/preloader/4.jpg" alt="preloader-images" /></div>
                <div className="img"><img src="/preloader/5.jpg" alt="preloader-images" /></div>
                <div className="img"><img src="/preloader/6.png" alt="preloader-images" /></div>
            </div>

            <div className="preloader-header">
                <div className="preloader-line">
                    <p className="preloader__main-text">imagination is</p>
                    <div className="preloader-messages">
                        <p> our operating system</p>
                        <p> radical collaboration</p>
                        <p> future of healthcare</p>
                        <p> scientific breakthrough</p>
                    </div>
                    <div className="preloader__line-bg"></div>
                </div>
            </div>  

            <div className="logo">
                <svg width="111" height="23" viewBox="0 0 111 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.33493H2.76727V17.1125H0V0.33493Z" fill="#F0FCFC"/>
                    <path d="M48.476 4.84016H50.7382V16.6085C50.7382 19.9406 48.8612 22.0489 44.4333 22.0489C41.161 22.0489 38.8743 20.5387 38.6335 17.7826H41.2809C41.5939 19.149 42.7971 19.9406 44.6253 19.9406C46.8875 19.9406 48.163 18.8616 48.163 16.5135V15.147C47.3449 16.3697 46.0695 17.1602 44.1436 17.1602C40.7991 17.1602 38.3193 14.8353 38.3193 10.9283C38.3193 7.02137 40.798 4.69644 44.1436 4.69644C46.0684 4.69644 47.3926 5.53443 48.1863 6.75715L48.4749 4.84016H48.476ZM48.0242 10.977C48.0242 8.56027 46.337 7.05564 44.5077 7.05564C42.1278 7.05564 40.6604 8.56138 40.6715 10.9305C40.6837 13.7109 42.5885 14.7579 44.5077 14.7579C46.3237 14.7579 48.0242 13.7541 48.0242 10.9781V10.977Z" fill="#F0FCFC"/>
                    <path d="M52.4219 1.55769C52.4219 0.646736 53.1201 0 54.0103 0C54.9005 0 55.5987 0.646736 55.5987 1.55769C55.5987 2.46865 54.9005 3.11539 54.0103 3.11539C53.1201 3.11539 52.4219 2.46754 52.4219 1.55769ZM52.6861 4.84001H55.2846V17.1114H52.6861V4.84001Z" fill="#F0FCFC"/>
                    <path d="M69.1514 11.0002C69.1514 7.21374 71.5823 4.69644 75.2154 4.69644C78.8485 4.69644 81.1595 6.94951 81.2317 10.5447C81.2317 10.8565 81.2072 11.1914 81.1595 11.5275H71.8709V11.6956C71.9431 13.7806 73.2662 15.147 75.312 15.147C76.9004 15.147 78.0559 14.3566 78.4167 12.9901H81.0152C80.5823 15.4112 78.5132 17.2564 75.4563 17.2564C71.5823 17.2564 69.1514 14.7634 69.1514 11.0013V11.0002ZM78.5366 9.63374C78.2679 7.96107 77.0525 7.07223 75.2398 7.05454C73.4216 7.03796 72.1639 7.96107 71.9675 9.63374H78.5377H78.5366Z" fill="#F0FCFC"/>
                    <path d="M82.3232 8.72389C82.3232 3.61855 85.4757 0.191406 90.4574 0.191406C94.3081 0.191406 97.0753 2.49202 97.6281 6.03966H94.7643C94.2104 3.93031 92.6231 2.61252 90.3364 2.61252C87.1352 2.61252 85.1627 5.12871 85.1627 8.72389C85.1627 12.3191 87.0874 14.8353 90.2643 14.8353C92.5987 14.8353 94.2115 13.5407 94.741 11.4081H97.6048C97.0753 14.9558 94.2115 17.2564 90.2887 17.2564C85.3791 17.2564 82.3232 13.8779 82.3232 8.72389Z" fill="#F0FCFC"/>
                    <path d="M98.4395 10.9759C98.4395 7.23695 100.966 4.69644 104.72 4.69644C108.474 4.69644 111 7.23695 111 10.9759C111 14.7148 108.474 17.2553 104.72 17.2553C100.966 17.2553 98.4395 14.7391 98.4395 10.9759ZM108.354 10.9759C108.354 8.60339 106.91 7.05454 104.72 7.05454C102.53 7.05454 101.11 8.60228 101.11 10.9759C101.11 13.3494 102.53 15.0508 104.72 15.0508C106.91 15.0508 108.354 13.3494 108.354 10.9759Z" fill="#F0FCFC"/>
                    <path d="M62.4421 4.74048C59.2941 4.74601 57.0508 6.83878 57.0508 9.92763V17.1125H59.7404V10.0979C59.7404 8.66069 60.3686 7.07094 62.4543 7.05546C64.5501 7.03888 65.1439 8.6618 65.1439 10.0979V17.1125H67.8335V9.92763C67.8335 6.83878 65.589 4.7449 62.441 4.74048H62.4421Z" fill="#F0FCFC"/>
                    <path d="M9.81553 4.7182C11.4473 4.7182 12.8603 5.32182 13.8382 6.3378C14.8162 5.32182 16.2292 4.7182 17.8609 4.7182C17.8654 4.7182 17.8698 4.7182 17.8742 4.7182C17.8787 4.7182 17.882 4.7182 17.8853 4.7182C17.973 4.7182 18.0596 4.72041 18.1451 4.72373C18.1562 4.72373 18.1673 4.72483 18.1784 4.72594C18.2439 4.72926 18.3083 4.73368 18.3726 4.7381C19.2362 4.80222 20.021 5.02996 20.697 5.39479C22.2788 6.24936 23.2645 7.85901 23.2645 9.90646V17.0913H20.5749V10.0767C20.5749 8.63952 19.9755 7.02544 17.8853 7.05529C15.7952 7.08625 15.1958 8.63952 15.1958 10.0767V17.0913H12.4818L12.5062 16.8956V9.88213C12.5062 8.49359 11.8957 7.02213 9.79222 7.05529C7.71538 7.08846 7.10265 8.63952 7.10265 10.0767V17.0913H4.41309V9.90646C4.41309 6.81318 6.66309 4.7182 9.81775 4.7182H9.81553Z" fill="#F0FCFC"/>
                    <path d="M37.1046 10.7909C37.0036 7.36926 34.2796 4.7182 30.8153 4.7182C27.3509 4.7182 24.5215 7.47097 24.5215 10.9866C24.5215 14.5021 27.2854 17.2549 30.8153 17.2549C32.2283 17.2549 33.5182 16.8127 34.5582 16.0576V17.0935H37.1091V10.7798L37.1046 10.7898V10.7909ZM30.8153 14.9012C28.6108 14.9012 26.8847 13.1821 26.8847 10.9866C26.8847 8.79098 28.6108 7.05529 30.8153 7.05529C33.0198 7.05529 34.7458 8.79098 34.7458 10.9866C34.7458 13.1821 33.0198 14.9012 30.8153 14.9012Z" fill="#F0FCFC"/>
                </svg>
            </div>       
        </div>
        </>
    );
};

export default Preloader;