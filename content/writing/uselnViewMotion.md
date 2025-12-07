uselnView

useInView is a tiny (0.6kb) hook that detects when the provided element is within
the viewport. It can be used with any Vue element.

<script setup>
import { useInView } from 'motion-v'

const domRef = ref ()
const isInView = useInView (domRef)
</ script>

<template>
‹div ref="domRef" />
</ template>

Usage

Import useInView from Motion:

import { useInView } from "motion-v"

useInView can track the visibility of any HTML element. Pass a
both useInView and the HTML element. ref object to

<script setup>
import ( useInView } from 'motion-v'

const domRef = ref ()
const isInView = useInView (ref)
</ script>

<template>
<div ref="domRef" />
</ template>

While the element is outside the viewport, useInView willreturn false . When
it moves inside the view, it'll re-render the component and return true.

Effects

useInView is vanilla Vue ref state, so firing functions when isInView changes
is a matter of passing it to a watch .

<script setup>
watch(isInView, (inView) => {
console.log|'Element is in view: ' , inView)
})
</ script>

Options

useInView can accept options to define how the element is tracked within the
viewport.

const isInView = useInView (domRef, { once: true

root

By default, useInView will track the visibility of an element as it enters/leaves the
window viewport. Set root to be the ref of a scrollable parent, and it'll use that
element to be the viewport instead.

<script setup>
import ( useInView } from 'motion-v'
import { computed } from 'vue'

const container = ref ()
const boxRef = ref ()
const isInView = useInView (boxRef, computed ( () = ({ root: container.val
</ script>

<template>
‹div ref="container" style="overflow: scro11">
<div ref="boxRef" />
</div>
</ template>

margin

Default:| "Opx"

A margin to add to the viewport to change the detection area. Use multiple values to
adjust top/right/bottom/left, e.g. "Opx -20px Opx 100px"

const isInView = useInView({
margin: "Opx 100px -50px Opx"

]Note: For browser security reasons, margin
iframes unless root is explicitly defined. won't take affect within cross-origin

once

Default: false

If true, once an element is in view, uselnView will stop observing the element and
always return true.

const isInView = useInView(ref, ( once: true })

initial

Default: false

Set an initial value to return until the element has been measured.

const isInView = useInView(ref, ( initial: true

amount

Default: "some"

example:

<script setup lang="tsx">
/** @jsxImportSource vue */
import { motion } from 'motion-v'
import { CSSProperties, defineComponent } from 'vue'

/**
 * ==============   Components   ================
 */

const Card = defineComponent({
    props: {
        emoji: { type: String, required: true },
        hueA: { type: Number, required: true },
        hueB: { type: Number, required: true },
        i: { type: Number, required: true }
    },
    setup(props) {
        const background = `linear-gradient(306deg, ${hue(props.hueA)}, ${hue(props.hueB)})`
        
        return () => (
            <motion.div
                style={cardContainer}
                initial="offscreen"
                whileInView="onscreen"
                inViewOptions={{ amount: 0.8 }}
            >
                <div style={{ ...splash, background }} />
                <motion.div style={card} variants={cardVariants} class="card">
                    {props.emoji}
                </motion.div>
            </motion.div>
        )
    }
})

/**
 * ==============   Animation   ================
 */

const cardVariants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Data   ================
 */

const food: [string, number, number][] = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
]

/**
 * ==============   Styles   ================
 */

const container = {
    margin: "100px auto",
    maxWidth: '500px',
    paddingBottom: '100px',
    width: "100%",
}

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: '20px',
    marginBottom: '-120px',
}

const splash: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
    fontSize: '164px',
    width: '300px',
    height: '430px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: '20px',
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
}
</script>

<template>
    <div :style="container">
        <Card 
            v-for="([emoji, hueA, hueB], i) in food" 
            :key="emoji"
            :emoji="emoji"
            :hueA="hueA"
            :hueB="hueB"
            :i="i"
        />
    </div>
</template>

<style>
  #sandbox > div{
    width:100%;
  }
</style>
