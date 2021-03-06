import dynamic from "next/dynamic"
import { useState, useEffect, useRef, useContext } from 'react'
import anime from 'animejs/lib/anime.min.js'
import s from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'
import { MenuBarContext } from '../context/MenuBarContext'
import { copyToClipboard } from '../util/actions'
import { useInfoStatus } from '../util/hooks'

const BottomMenuContainer = dynamic(
    () => {
        return import('../components/BottomMenuContainer')
    },
    { ssr: false }
)

const Hire = () => {
    const animArr = [
        {text: "Oh, hi there...", time: 0},
        {text: "I develop custom websites and applications", time: 890},
        {text: "I'm currently accepting freelance work", time: 3420},
        {text: "Contact me at glazer.nicholas@gmail.com", time: 5700},
    ]

    const [isToggle, setToggle] = useContext(MenuBarContext)
    const [infoStatus, setInfoStatus] = useInfoStatus()

    const timelineRef = useRef(null)
    const lettersRef = useRef(null)

    // useState hooks
    const [animationProgress, setAnimationProgress] = useState('0%')
    const [animationFinished, setAnimationFinished] = useState(false)
    const [animationRestarted, setAnimationRestarted] = useState(false)

    useEffect(() => {
        // Letters animation
        let updates = 0
        lettersRef.current = anime({
            targets: '.letter',
            opacity: [0, 1],
            easing: `easeOutExpo`,
            duration: 1,
            delay: anime.stagger(60),
            update: (anim) => {
                setAnimationProgress(`${Math.round(anim.progress)}%`)
            },
            begin: (anim) => {
                setAnimationFinished(false)
                setAnimationRestarted(false)
            },
            complete: (anim) => {
                setAnimationFinished(true)
                setAnimationRestarted(false)
                !isToggle ? setToggle(true) : null
            }
        })
        //Cursor animation
        animArr.forEach((a, i) => {
            // Cursor, row, num timeline animation
            timelineRef.current = anime
                .timeline({})
            // cursor x position on active row
                .add({
                    targets: `.cursor-${i}`,
                    easing: `steps(${a.text.length})`,
                    duration: a.text.length * 60,
                    translateX: [0, document.querySelector(`.text-${i}`).getBoundingClientRect().width + 4],
                }, a.time)
            // cursor ending visibilty
                .add({
                    targets: `.cursor-${i}`,
                    duration: 300,
                    easing: `easeOutExpo`,
                    opacity: () => i !== animArr.length - 1 ? [1, 0] : 1
                })
            // Numbers animation
            // active number visible
                .add({
                    targets: `.num-${i}`,
                    easing: `easeOutExpo`,
                    duration: 1,
                    opacity: [0, 1]
                }, a.time)
            //active number color
                .add({
                    targets: `.num-${i}`,
                    easing: `easeInExpo`,
                    duration: () => i !== animArr.length - 1 ? a.text.length * 75 : 0,
                    color: () => i !== animArr.length - 1 ? ["#fff", "#64645e"] : "#fff"
                }, a.time)
            // Row animation
            // active row visible
                .add({
                    targets: `.roww-${i}`,
                    easing: `easeOutExpo`,
                    duration: 1,
                    opacity: [0, 1]
                }, a.time)
            // active row color
                .add({
                    targets: `.roww-${i}`,
                    easing: `easeInExpo`,
                    backgroundColor: () => i !== animArr.length - 1 ? ["#303131", "#222323"] : "#303131",
                    duration: () => i !== animArr.length - 1 ? a.text.length * 75 : 0,
                }, a.time)

            return () => {
                console.log('finished inside animation')
            }
        })
    }, [animationRestarted])

    return (
        <Wrapper>
          <UpperContainer>
            {
                animArr.map((item, i) => (
                    <RowWrapper key={i} className={`roww-${i}`} >
                      <NumbersWrapper>
                        <PositionNumber className={`num-${i}`}>{i + 1}</PositionNumber>
                      </NumbersWrapper>
                      <h2>
                        <TextWrapper className={`text-wrapper-${i}`}>
                          <Cursor style={{width: '2px'}} className={`cursor cursor-${i}`}/>
                          <Text
                            className={`text text-${i}`}
                            style={{cursor: `${i === animArr.length -1 ? 'pointer' : 'default'}`}}
                            onClick={() => i === animArr.length -1 ? copyToClipboard('glazer.nicholas@gmail.com', setInfoStatus) : null}
                          >
                            {
                                item.text.split('').map((x,i) => <span key={i} className='letter'>{x}</span>)
                            }
                          </Text>
                        </TextWrapper>
                      </h2>
                    </RowWrapper>
                ))
            }
          </UpperContainer>
          <BottomMenuContainer
            animationFinished={animationFinished}
            animationProgress={animationProgress}
            setAnimationRestarted={setAnimationRestarted}
            timelineRef={timelineRef}
            lettersRef={lettersRef}
          />
        </Wrapper>
    )
}

// Wrappers
const Wrapper = s.div(tw`bg-blackL flex flex-col px-2 pt-2 h-screen`)
const UpperContainer = s.div(tw`bg-blackD flex-auto`)

const RowWrapper = s.div(tw`flex items-center justify-start font-mono xs:text-xs sm:text-base md:text-base`)
const TextWrapper = s.div(tw`items-center flex`)
const NumbersWrapper = s.div(tw``)

const PositionNumber = s.span(tw`w-8 flex justify-center`)
const Text = s.span(tw`text-green`)
const Cursor = s.span(tw`bg-maroon h-5 block`)

export default Hire
