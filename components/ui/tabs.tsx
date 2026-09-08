"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// Shares the active value, its setter, and the ordered list of trigger
// values with every TabsContent, so a horizontal drag/swipe on the content
// area can move to the adjacent tab — the same gesture whether it's a mouse
// drag or a touch swipe, since framer-motion's drag handles both.
interface TabsSwipeState {
  value: string
  setValue: (value: string) => void
  order: string[]
}

const TabsSwipeContext = React.createContext<TabsSwipeState | null>(null)

function collectTriggerValues(children: React.ReactNode): string[] {
  const values: string[] = []
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    const props = child.props as { value?: unknown; children?: React.ReactNode }
    if (child.type === TabsTrigger && typeof props.value === "string") {
      values.push(props.value)
    } else if (props.children) {
      values.push(...collectTriggerValues(props.children))
    }
  })
  return values
}

function Tabs({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const value = controlledValue ?? uncontrolledValue

  const setValue = React.useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [controlledValue, onValueChange],
  )

  const order = React.useMemo(() => collectTriggerValues(children), [children])

  return (
    <TabsSwipeContext.Provider value={value ? { value, setValue, order } : null}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        value={value}
        onValueChange={setValue}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsSwipeContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const SWIPE_THRESHOLD_PX = 60

function TabsContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const swipe = React.useContext(TabsSwipeContext)
  const startRef = React.useRef<{ x: number; y: number } | null>(null)

  // Plain React pointer-event props rather than framer-motion's own gesture
  // recognizer (onPan/drag) — that internal system didn't respond to any
  // pointer input in production (verified directly), consistent with a
  // known rough edge between framer-motion 11.x and React 19. Native
  // onPointerDown/Up go through React's normal, well-tested event path
  // instead — the same mechanism MagneticButton already uses successfully
  // elsewhere on this site.
  function handlePointerDown(event: React.PointerEvent) {
    startRef.current = { x: event.clientX, y: event.clientY }
  }

  function handlePointerUp(event: React.PointerEvent) {
    const start = startRef.current
    startRef.current = null
    if (!start || !swipe) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return
    if (Math.abs(dx) < Math.abs(dy)) return // mostly-vertical scroll, ignore

    const currentIndex = swipe.order.indexOf(swipe.value)
    if (currentIndex === -1) return

    // Swipe left (negative dx) advances to the next tab, swiping right goes
    // back — the natural direction for a horizontally paged view.
    const nextIndex = currentIndex + (dx < 0 ? 1 : -1)
    if (nextIndex < 0 || nextIndex >= swipe.order.length) return

    swipe.setValue(swipe.order[nextIndex])
  }

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          startRef.current = null
        }}
        className="touch-pan-y select-none"
      >
        {children}
      </div>
    </TabsPrimitive.Content>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
