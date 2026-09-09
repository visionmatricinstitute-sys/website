"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// Shares the active value, its setter, and the ordered list of trigger
// values with every TabsContent, so a horizontal drag/swipe on the content
// area can move to the adjacent tab.
//
// The list of trigger values is built by each TabsTrigger registering
// itself on mount (registerTrigger), not by the parent statically
// inspecting its children's element tree. An earlier version tried
// identifying TabsTrigger elements from the outside — first by function
// reference (child.type === TabsTrigger), then by a static marker
// property on the function — and both silently found nothing: in this
// "use client" module, the exported TabsTrigger a consumer imports isn't
// guaranteed to be the exact same function/object the file's own code
// holds a reference to, so neither reference equality nor a property
// stamped on that reference survives the trip. Registration sidesteps the
// problem entirely — it doesn't care what child.type resolves to.
interface TabsSwipeState {
  value: string
  setValue: (value: string) => void
  order: string[]
  registerTrigger: (value: string) => () => void
}

const TabsSwipeContext = React.createContext<TabsSwipeState | null>(null)

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
  const [order, setOrder] = React.useState<string[]>([])

  const setValue = React.useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [controlledValue, onValueChange],
  )

  const registerTrigger = React.useCallback((triggerValue: string) => {
    setOrder((prev) => (prev.includes(triggerValue) ? prev : [...prev, triggerValue]))
    return () => {
      setOrder((prev) => prev.filter((v) => v !== triggerValue))
    }
  }, [])

  return (
    <TabsSwipeContext.Provider value={value ? { value, setValue, order, registerTrigger } : null}>
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
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const swipe = React.useContext(TabsSwipeContext)
  const registerTrigger = swipe?.registerTrigger

  React.useEffect(() => {
    if (typeof value !== "string" || !registerTrigger) return
    return registerTrigger(value)
  }, [value, registerTrigger])

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
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

  // Plain React event props rather than framer-motion's own gesture
  // recognizer (onPan/drag) — that internal system didn't respond to any
  // input in production (verified directly), consistent with a known rough
  // edge between framer-motion 11.x and React 19. Both pointer and mouse
  // handlers are wired to the same ref (whichever fires first wins, and
  // clearing the ref after handling means a same-gesture duplicate from the
  // other event family is a harmless no-op) — real mice/touchscreens fire
  // PointerEvents, but some environments only ever emit legacy MouseEvents,
  // so relying on pointer events alone silently drops those.
  function start(x: number, y: number) {
    startRef.current = { x, y }
  }

  function end(x: number, y: number) {
    const startPos = startRef.current
    startRef.current = null
    if (!startPos || !swipe) return

    const dx = x - startPos.x
    const dy = y - startPos.y
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
        onPointerDown={(e) => start(e.clientX, e.clientY)}
        onPointerUp={(e) => end(e.clientX, e.clientY)}
        onPointerCancel={() => {
          startRef.current = null
        }}
        onMouseDown={(e) => start(e.clientX, e.clientY)}
        onMouseUp={(e) => end(e.clientX, e.clientY)}
        className="touch-pan-y select-none"
      >
        {children}
      </div>
    </TabsPrimitive.Content>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
