<template>
  <div>
    <!-- Loading State -->
    <div
      v-if="!isMounted"
      class="bg-elevated rounded-lg animate-pulse flex items-center justify-center"
      :style="{ width: `${containerSize}px`, height: `${containerSize}px` }"
    >
      <div class="text-muted">
        Loading...
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!images.length"
      class="bg-elevated rounded-lg border-2 border-dashed border-muted flex items-center justify-center"
      :style="{ width: `${containerSize}px`, height: `${containerSize}px` }"
    >
      <div class="text-muted text-center">
        <p>No images provided</p>
        <p class="text-sm">
          Add images to the images prop
        </p>
      </div>
    </div>

    <!-- Main Sphere Container -->
    <div
      v-else
      ref="containerRef"
      :class="['relative select-none cursor-grab', { 'cursor-grabbing': isDragging }, className]"
      :style="{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        perspective: `${perspective}px`
      }"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
    >
      <div
        class="relative w-full h-full"
        style="z-index: 10"
      >
        <!-- Image Nodes -->
        <div
          v-for="(position, index) in worldPositions"
          v-show="position.isVisible"
          :key="images[index].id"
          class="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
          :style="{
            width: `${baseImageSize * position.scale}px`,
            height: `${baseImageSize * position.scale}px`,
            left: `${containerSize/2 + position.x}px`,
            top: `${containerSize/2 + position.y}px`,
            opacity: position.fadeOpacity,
            transform: `translate(-50%, -50%) scale(${hoveredIndex === index ? Math.min(1.2, 1.2 / position.scale) : 1})`,
            zIndex: position.zIndex
          }"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          @click="selectedImage = images[index]; isModalOpen = true"
        >
          <div class="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white/20">
            <img
              :src="images[index].src"
              :alt="images[index].alt"
              class="w-full h-full object-cover"
              draggable="false"
              :loading="index < 3 ? 'eager' : 'lazy'"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <UModal v-model:open="isModalOpen">
      <template #content>
        <UCard
          v-if="selectedImage"
          class="overflow-hidden"
          :ui="{ header: '!p-0', body: 'p-6' }"
        >
          <template #header>
            <div class="relative aspect-square">
              <img
                :src="selectedImage.src"
                :alt="selectedImage.alt"
                class="w-full h-full object-cover"
              >
              <UButton
                class="absolute top-2 right-2"
                color="neutral"
                variant="solid"
                icon="lucide:x"
                size="sm"
                @click="isModalOpen = false"
              />
            </div>
          </template>

          <template v-if="selectedImage.title || selectedImage.description" #default>
            <h3
              v-if="selectedImage.title"
              class="text-xl font-bold mb-2"
            >
              {{ selectedImage.title }}
            </h3>
            <p
              v-if="selectedImage.description"
              class="text-muted"
            >
              {{ selectedImage.description }}
            </p>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

/**
   * SphereImageGrid - Interactive 3D Image Sphere Component (Vue 3)
   *
   * A Vue 3 component that displays images arranged in a 3D sphere layout.
   * Features drag-to-rotate, momentum physics, auto-rotation, and modal viewing.
   */

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Position3D {
  x: number
  y: number
  z: number
}

export interface SphericalPosition {
  theta: number
  phi: number
  radius: number
}

export interface WorldPosition extends Position3D {
  scale: number
  zIndex: number
  isVisible: boolean
  fadeOpacity: number
  originalIndex: number
}

export interface ImageData {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

interface RotationState {
  x: number
  y: number
  z: number
}

interface VelocityState {
  x: number
  y: number
}

interface MousePosition {
  x: number
  y: number
}

// ==========================================
// PROPS
// ==========================================

interface Props {
  images?: ImageData[]
  containerSize?: number
  sphereRadius?: number
  dragSensitivity?: number
  momentumDecay?: number
  maxRotationSpeed?: number
  baseImageScale?: number
  hoverScale?: number
  perspective?: number
  autoRotate?: boolean
  autoRotateSpeed?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  containerSize: 400,
  sphereRadius: 200,
  dragSensitivity: 0.5,
  momentumDecay: 0.95,
  maxRotationSpeed: 5,
  baseImageScale: 0.12,
  hoverScale: 1.2,
  perspective: 1000,
  autoRotate: false,
  autoRotateSpeed: 0.3,
  className: ''
})

// ==========================================
// CONSTANTS
// ==========================================

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }),

  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360
    while (angle < -180) angle += 360
    return angle
  }
}

// ==========================================
// STATE
// ==========================================

const isMounted = ref(false)
const rotation = ref<RotationState>({ x: 15, y: 15, z: 0 })
const velocity = ref<VelocityState>({ x: 0, y: 0 })
const isDragging = ref(false)
const selectedImage = ref<ImageData | null>(null)
const isModalOpen = ref(false)
const imagePositions = ref<SphericalPosition[]>([])
const hoveredIndex = ref<number | null>(null)

const containerRef = ref<HTMLDivElement | null>(null)
const lastMousePos = ref<MousePosition>({ x: 0, y: 0 })
const animationFrame = ref<number | null>(null)

// ==========================================
// COMPUTED
// ==========================================

const actualSphereRadius = computed(() => props.sphereRadius || props.containerSize * 0.5)
const baseImageSize = computed(() => props.containerSize * props.baseImageScale)

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const generateSpherePositions = (): SphericalPosition[] => {
  const positions: SphericalPosition[] = []
  const imageCount = props.images.length

  const goldenRatio = (1 + Math.sqrt(5)) / 2
  const angleIncrement = 2 * Math.PI / goldenRatio

  for (let i = 0; i < imageCount; i++) {
    const t = i / imageCount
    const inclination = Math.acos(1 - 2 * t)
    const azimuth = angleIncrement * i

    let phi = inclination * (180 / Math.PI)
    let theta = (azimuth * (180 / Math.PI)) % 360

    const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35
    if (phi < 90) {
      phi = Math.max(5, phi - poleBonus)
    } else {
      phi = Math.min(175, phi + poleBonus)
    }

    phi = 15 + (phi / 180) * 150

    const randomOffset = (Math.random() - 0.5) * 20
    theta = (theta + randomOffset) % 360
    phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10))

    positions.push({
      theta: theta,
      phi: phi,
      radius: actualSphereRadius.value
    })
  }

  return positions
}

const calculateWorldPositions = (): WorldPosition[] => {
  const positions = imagePositions.value.map((pos, index) => {
    const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta)
    const phiRad = SPHERE_MATH.degreesToRadians(pos.phi)
    const rotXRad = SPHERE_MATH.degreesToRadians(rotation.value.x)
    const rotYRad = SPHERE_MATH.degreesToRadians(rotation.value.y)

    let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad)
    let y = pos.radius * Math.cos(phiRad)
    let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad)

    const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad)
    const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad)
    x = x1
    z = z1

    const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad)
    const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad)
    y = y2
    z = z2

    const worldPos: Position3D = { x, y, z }

    const fadeZoneStart = -10
    const fadeZoneEnd = -30
    const isVisible = worldPos.z > fadeZoneEnd

    let fadeOpacity = 1
    if (worldPos.z <= fadeZoneStart) {
      fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd))
    }

    const isPoleImage = pos.phi < 30 || pos.phi > 150
    const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y)
    const maxDistance = actualSphereRadius.value
    const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1)

    const distancePenalty = isPoleImage ? 0.4 : 0.7
    const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty)

    const depthScale = (worldPos.z + actualSphereRadius.value) / (2 * actualSphereRadius.value)
    const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3)

    return {
      ...worldPos,
      scale,
      zIndex: Math.round(1000 + worldPos.z),
      isVisible,
      fadeOpacity,
      originalIndex: index
    }
  })

  const adjustedPositions = [...positions]

  for (let i = 0; i < adjustedPositions.length; i++) {
    const pos = adjustedPositions[i]
    if (!pos.isVisible) continue

    let adjustedScale = pos.scale
    const imageSize = baseImageSize.value * adjustedScale

    for (let j = 0; j < adjustedPositions.length; j++) {
      if (i === j) continue

      const other = adjustedPositions[j]
      if (!other.isVisible) continue

      const otherSize = baseImageSize.value * other.scale

      const dx = pos.x - other.x
      const dy = pos.y - other.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      const minDistance = (imageSize + otherSize) / 2 + 25

      if (distance < minDistance && distance > 0) {
        const overlap = minDistance - distance
        const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6)
        adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor)
      }
    }

    adjustedPositions[i] = {
      ...pos,
      scale: Math.max(0.25, adjustedScale)
    }
  }

  return adjustedPositions
}

const worldPositions = computed(() => calculateWorldPositions())

const clampRotationSpeed = (speed: number): number => {
  return Math.max(-props.maxRotationSpeed, Math.min(props.maxRotationSpeed, speed))
}

// ==========================================
// PHYSICS & MOMENTUM
// ==========================================

const updateMomentum = () => {
  if (isDragging.value) return

  const newVelocity = {
    x: velocity.value.x * props.momentumDecay,
    y: velocity.value.y * props.momentumDecay
  }

  if (!props.autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
    velocity.value = { x: 0, y: 0 }
  } else {
    velocity.value = newVelocity
  }

  let newY = rotation.value.y

  if (props.autoRotate) {
    newY += props.autoRotateSpeed
  }

  newY += clampRotationSpeed(velocity.value.y)

  rotation.value = {
    x: SPHERE_MATH.normalizeAngle(rotation.value.x + clampRotationSpeed(velocity.value.x)),
    y: SPHERE_MATH.normalizeAngle(newY),
    z: rotation.value.z
  }
}

// ==========================================
// EVENT HANDLERS
// ==========================================

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true
  velocity.value = { x: 0, y: 0 }
  lastMousePos.value = { x: e.clientX, y: e.clientY }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - lastMousePos.value.x
  const deltaY = e.clientY - lastMousePos.value.y

  const rotationDelta = {
    x: -deltaY * props.dragSensitivity,
    y: deltaX * props.dragSensitivity
  }

  rotation.value = {
    x: SPHERE_MATH.normalizeAngle(rotation.value.x + clampRotationSpeed(rotationDelta.x)),
    y: SPHERE_MATH.normalizeAngle(rotation.value.y + clampRotationSpeed(rotationDelta.y)),
    z: rotation.value.z
  }

  velocity.value = {
    x: clampRotationSpeed(rotationDelta.x),
    y: clampRotationSpeed(rotationDelta.y)
  }

  lastMousePos.value = { x: e.clientX, y: e.clientY }
}

const handleMouseUp = () => {
  isDragging.value = false
}

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  const touch = e.touches[0]
  isDragging.value = true
  velocity.value = { x: 0, y: 0 }
  lastMousePos.value = { x: touch.clientX, y: touch.clientY }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  e.preventDefault()

  const touch = e.touches[0]
  const deltaX = touch.clientX - lastMousePos.value.x
  const deltaY = touch.clientY - lastMousePos.value.y

  const rotationDelta = {
    x: -deltaY * props.dragSensitivity,
    y: deltaX * props.dragSensitivity
  }

  rotation.value = {
    x: SPHERE_MATH.normalizeAngle(rotation.value.x + clampRotationSpeed(rotationDelta.x)),
    y: SPHERE_MATH.normalizeAngle(rotation.value.y + clampRotationSpeed(rotationDelta.y)),
    z: rotation.value.z
  }

  velocity.value = {
    x: clampRotationSpeed(rotationDelta.x),
    y: clampRotationSpeed(rotationDelta.y)
  }

  lastMousePos.value = { x: touch.clientX, y: touch.clientY }
}

const handleTouchEnd = () => {
  isDragging.value = false
}

// ==========================================
// LIFECYCLE
// ==========================================

onMounted(() => {
  isMounted.value = true
  imagePositions.value = generateSpherePositions()

  const animate = () => {
    updateMomentum()
    animationFrame.value = requestAnimationFrame(animate)
  }

  animationFrame.value = requestAnimationFrame(animate)

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})

watch(() => props.images, () => {
  imagePositions.value = generateSpherePositions()
}, { deep: true })
</script>
