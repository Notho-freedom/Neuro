"use client";

import { forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ==============================================
// NOTILUS GX FUTURISTIC COMPONENTS
// Gaming/Sci-Fi Design System
// ==============================================

// ========== GEOMETRIC CORNERS PAINTER ==========
interface GeometricCornersProps {
  color?: string;
  size?: number;
  glowIntensity?: number;
  className?: string;
}

export function GeometricCorners({ 
  color = "var(--primary)", 
  size = 20,
  glowIntensity = 0.3,
  className 
}: GeometricCornersProps) {
  const cornerStyle = {
    width: size,
    height: size,
    borderColor: color,
    filter: `drop-shadow(0 0 ${4 * glowIntensity}px ${color})`,
  };

  return (
    <>
      {/* Top Left */}
      <div 
        className={cn("absolute top-0 left-0 border-l-2 border-t-2 pointer-events-none", className)}
        style={cornerStyle}
      />
      <div 
        className="absolute top-0 border-t border-opacity-50 pointer-events-none"
        style={{ left: size, width: 30, borderColor: color, opacity: 0.5 }}
      />
      <div 
        className="absolute left-0 border-l border-opacity-50 pointer-events-none"
        style={{ top: size, height: 30, borderColor: color, opacity: 0.5 }}
      />
      
      {/* Top Right */}
      <div 
        className={cn("absolute top-0 right-0 border-r-2 border-t-2 pointer-events-none", className)}
        style={cornerStyle}
      />
      <div 
        className="absolute top-0 border-t border-opacity-50 pointer-events-none"
        style={{ right: size, width: 30, borderColor: color, opacity: 0.5 }}
      />
      <div 
        className="absolute right-0 border-r border-opacity-50 pointer-events-none"
        style={{ top: size, height: 30, borderColor: color, opacity: 0.5 }}
      />
      
      {/* Bottom Left */}
      <div 
        className={cn("absolute bottom-0 left-0 border-l-2 border-b-2 pointer-events-none", className)}
        style={cornerStyle}
      />
      <div 
        className="absolute bottom-0 border-b border-opacity-50 pointer-events-none"
        style={{ left: size, width: 30, borderColor: color, opacity: 0.5 }}
      />
      <div 
        className="absolute left-0 border-l border-opacity-50 pointer-events-none"
        style={{ bottom: size, height: 30, borderColor: color, opacity: 0.5 }}
      />
      
      {/* Bottom Right */}
      <div 
        className={cn("absolute bottom-0 right-0 border-r-2 border-b-2 pointer-events-none", className)}
        style={cornerStyle}
      />
      <div 
        className="absolute bottom-0 border-b border-opacity-50 pointer-events-none"
        style={{ right: size, width: 30, borderColor: color, opacity: 0.5 }}
      />
      <div 
        className="absolute right-0 border-r border-opacity-50 pointer-events-none"
        style={{ bottom: size, height: 30, borderColor: color, opacity: 0.5 }}
      />
    </>
  );
}

// ========== GX FUTURISTIC CARD ==========
interface GxCardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  title?: string;
  titleIcon?: ReactNode;
  variant?: "default" | "elevated" | "interactive";
  showCorners?: boolean;
  glowOnHover?: boolean;
  children?: ReactNode;
  className?: string;
}

export const GxCard = forwardRef<HTMLDivElement, GxCardProps>(
  ({ 
    title, 
    titleIcon, 
    variant = "default", 
    showCorners = true,
    glowOnHover = false,
    children, 
    className, 
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px]",
          "border-[1.5px] border-[rgba(255,45,85,0.4)]",
          variant === "elevated" && "shadow-[0_0_20px_rgba(255,45,85,0.2)]",
          glowOnHover && "transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,45,85,0.4)]",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        {...(props as MotionProps)}
      >
        {/* Geometric Corners */}
        {showCorners && <GeometricCorners />}

        {/* Title Bar */}
        {title && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,45,85,0.2)]">
            {titleIcon && (
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(255,45,85,0.15)] border border-[rgba(255,45,85,0.4)]">
                {titleIcon}
              </div>
            )}
            <h3 className="font-display text-base font-bold text-white tracking-wide">
              {title}
            </h3>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-5">
          {children}
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-scan-line" />
        </div>
      </motion.div>
    );
  }
);
GxCard.displayName = "GxCard";

// ========== GX FUTURISTIC BUTTON ==========
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface GxButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-r from-primary to-[#FF2D92] text-white shadow-[0_0_20px_rgba(255,45,85,0.4)]",
  secondary: "bg-[rgba(255,45,85,0.2)] text-primary border border-[rgba(255,45,85,0.3)]",
  outline: "bg-transparent text-primary border-[1.5px] border-primary",
  ghost: "bg-transparent text-white/80 hover:text-primary",
  danger: "bg-[#FF453A] text-white border border-[#FF453A]",
};

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function GxButton({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  className,
  ...props
}: GxButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold uppercase tracking-wider transition-all duration-200",
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      {...(props as MotionProps)}
    >
      {loading ? (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="w-4 h-4">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="w-4 h-4">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}

// ========== GX FUTURISTIC INPUT ==========
interface GxInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const GxInput = forwardRef<HTMLInputElement, GxInputProps>(
  ({ label, error, icon, iconPosition = "left", className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-label text-white/80">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-[rgba(255,255,255,0.05)] rounded-lg",
              "border border-[rgba(255,255,255,0.24)]",
              "px-4 py-3.5 text-sm font-sans text-white",
              "placeholder:text-white/40",
              "transition-all duration-200",
              "focus:border-primary focus:shadow-[0_0_10px_rgba(255,45,85,0.3)] focus:outline-none",
              error && "border-destructive focus:border-destructive focus:shadow-[0_0_10px_rgba(255,69,58,0.3)]",
              icon && iconPosition === "left" && "pl-12",
              icon && iconPosition === "right" && "pr-12",
              className
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 transition-colors",
              focused ? "text-primary" : "text-white/50"
            )}>
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-destructive font-sans">{error}</span>
        )}
      </div>
    );
  }
);
GxInput.displayName = "GxInput";

// ========== GX FUTURISTIC BADGE ==========
interface GxBadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  glow?: boolean;
  icon?: ReactNode;
  className?: string;
}

const badgeVariants = {
  default: "bg-[rgba(255,45,85,0.15)] border-[rgba(255,45,85,0.4)] text-primary",
  success: "bg-[rgba(52,199,89,0.15)] border-[rgba(52,199,89,0.4)] text-[#34C759]",
  warning: "bg-[rgba(255,170,0,0.15)] border-[rgba(255,170,0,0.4)] text-[#FFAA00]",
  error: "bg-[rgba(255,59,48,0.15)] border-[rgba(255,59,48,0.4)] text-[#FF3B30]",
  info: "bg-[rgba(0,122,255,0.15)] border-[rgba(0,122,255,0.4)] text-[#007AFF]",
};

export function GxBadge({ 
  children, 
  variant = "default", 
  glow = false, 
  icon,
  className 
}: GxBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans font-semibold",
      badgeVariants[variant],
      glow && "shadow-[0_0_8px_currentColor]",
      className
    )}>
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </span>
  );
}

// ========== GX FUTURISTIC SWITCH ==========
interface GxSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function GxSwitch({ checked, onChange, label, disabled = false }: GxSwitchProps) {
  return (
    <label className={cn(
      "inline-flex items-center gap-3 cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-12 h-[26px] rounded-full transition-all duration-200",
          checked 
            ? "bg-[rgba(255,45,85,0.3)] border-[1.5px] border-primary" 
            : "bg-[rgba(255,255,255,0.1)] border-[1.5px] border-[rgba(255,255,255,0.3)]"
        )}
      >
        <motion.div
          className={cn(
            "absolute top-[2px] w-[18px] h-[18px] rounded-full",
            checked ? "bg-primary shadow-[0_0_6px_rgba(255,45,85,0.5)]" : "bg-white/50"
          )}
          animate={{ left: checked ? 26 : 2 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </button>
      {label && (
        <span className="text-sm font-sans text-white/80">{label}</span>
      )}
    </label>
  );
}

// ========== GX FUTURISTIC PROGRESS ==========
interface GxProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  height?: number;
  className?: string;
}

export function GxProgress({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  height = 2,
  className 
}: GxProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-xs font-sans text-white/80">{label}</span>}
          {showPercentage && <span className="text-xs font-sans font-semibold text-primary">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div 
        className="w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden border-[0.5px] border-[rgba(255,45,85,0.2)]"
        style={{ height }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-[rgba(255,45,85,0.8)] rounded-full shadow-[0_0_4px_rgba(255,45,85,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ========== GX FUTURISTIC DIVIDER ==========
interface GxDividerProps {
  label?: string;
  className?: string;
}

export function GxDivider({ label, className }: GxDividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3 my-4", className)}>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,45,85,0.3)] to-transparent" />
        <span className="text-xs font-sans text-primary/70 px-3">{label}</span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,45,85,0.3)] to-transparent" />
      </div>
    );
  }
  
  return (
    <div className={cn(
      "h-[1px] my-4 bg-gradient-to-r from-transparent via-[rgba(255,45,85,0.3)] to-transparent",
      className
    )} />
  );
}

// ========== GX FUTURISTIC SKELETON ==========
interface GxSkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

export function GxSkeleton({ 
  width = "100%", 
  height = 20, 
  rounded = "4px",
  className 
}: GxSkeletonProps) {
  return (
    <div
      className={cn("animate-skeleton", className)}
      style={{ 
        width, 
        height, 
        borderRadius: rounded,
      }}
    />
  );
}

// ========== GX FUTURISTIC AVATAR ==========
interface GxAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
  className?: string;
}

export function GxAvatar({ 
  src, 
  alt = "", 
  initials, 
  size = 40,
  className 
}: GxAvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full border-2 border-[rgba(255,45,85,0.3)] overflow-hidden",
        !src && "bg-[rgba(255,45,85,0.2)] flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : initials ? (
        <span 
          className="font-sans font-bold text-primary"
          style={{ fontSize: size * 0.35 }}
        >
          {initials}
        </span>
      ) : (
        <svg 
          className="text-primary" 
          style={{ width: size * 0.5, height: size * 0.5 }}
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )}
    </div>
  );
}

// ========== GX FUTURISTIC SPINNER ==========
interface GxSpinnerProps {
  size?: number;
  message?: string;
  className?: string;
}

export function GxSpinner({ size = 40, message, className }: GxSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <motion.div
        className="border-[3px] border-primary/30 border-t-primary rounded-full"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <span className="text-xs font-sans text-white/70">{message}</span>
      )}
    </div>
  );
}

// ========== GX FUTURISTIC ALERT ==========
interface GxAlertProps {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const alertStyles = {
  success: { color: "#22C55E", icon: "M5 13l4 4L19 7" },
  error: { color: "#EF4444", icon: "M6 18L18 6M6 6l12 12" },
  warning: { color: "#F59E0B", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  info: { color: "#3B82F6", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
};

export function GxAlert({ 
  type = "info", 
  title, 
  message, 
  onClose,
  className 
}: GxAlertProps) {
  const { color, icon } = alertStyles[type];
  
  return (
    <motion.div
      className={cn(
        "relative glass-card p-4 flex gap-3",
        className
      )}
      style={{ 
        borderLeftWidth: 4, 
        borderLeftColor: color,
        borderColor: `${color}40`,
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <svg 
        className="w-5 h-5 flex-shrink-0 mt-0.5" 
        fill="none" 
        stroke={color} 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <div className="flex-1">
        {title && (
          <h4 className="text-sm font-sans font-bold text-white mb-1">{title}</h4>
        )}
        <p className="text-xs font-sans text-white/70">{message}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}

// ========== GX FUTURISTIC TABS ==========
interface GxTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function GxTabs({ tabs, activeTab, onChange, className }: GxTabsProps) {
  return (
    <div className={cn("flex border-b border-[rgba(255,45,85,0.2)]", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-sans font-medium transition-all",
            activeTab === tab.id
              ? "text-primary font-bold bg-[rgba(255,45,85,0.1)] border-b-2 border-primary"
              : "text-white/60 hover:text-white/80"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ========== GX FUTURISTIC TOOLTIP ==========
interface GxTooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function GxTooltip({ content, children, position = "top" }: GxTooltipProps) {
  const [show, setShow] = useState(false);
  
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className={cn(
              "absolute z-50 px-3 py-2 text-xs font-sans font-semibold text-white",
              "glass-elevated rounded-lg whitespace-nowrap",
              "shadow-[0_0_8px_rgba(255,45,85,0.2)]",
              positionClasses[position]
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <GeometricCorners size={8} glowIntensity={0.2} />
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========== GX FUTURISTIC CHECKBOX ==========
interface GxCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function GxCheckbox({ checked, onChange, label, disabled = false }: GxCheckboxProps) {
  return (
    <label className={cn(
      "inline-flex items-center gap-3 cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
          checked 
            ? "bg-primary border-primary" 
            : "bg-transparent border-[rgba(255,255,255,0.3)]"
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
      {label && (
        <span className="text-sm font-sans text-white/90">{label}</span>
      )}
    </label>
  );
}

// ========== EXPORT ALL ==========
export type {
  GxCardProps,
  GxButtonProps,
  GxInputProps,
  GxBadgeProps,
  GxSwitchProps,
  GxProgressProps,
  GxDividerProps,
  GxSkeletonProps,
  GxAvatarProps,
  GxSpinnerProps,
  GxAlertProps,
  GxTabsProps,
  GxTooltipProps,
  GxCheckboxProps,
};
