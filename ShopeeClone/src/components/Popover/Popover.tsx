import { motion, AnimatePresence } from 'framer-motion'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingPortal,
  arrow,
  FloatingArrow,
  type Placement
} from '@floating-ui/react'
import { useId, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  initialOpen?: boolean
  placement?: Placement
}
export default function Popover({ children, renderPopover, className, initialOpen, placement = 'bottom' }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)

  const { x, y, refs, strategy, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ],

    whileElementsMounted: autoUpdate
  })

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  const id = useId()
  return (
    <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {renderPopover}
              <FloatingArrow className='fill-white ' strokeWidth={1} height={10} ref={arrowRef} context={context} />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
