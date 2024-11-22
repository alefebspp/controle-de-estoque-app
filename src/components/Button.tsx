import {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const variantStyles = {
  default: 'bg-primary-light hover:bg-primary-dark',
  secondary: 'bg-secondary-light hover:bg-secondary-dark',
  outline: 'border border-primary-light bg-background hover:bg-primary-light',
  'rounded-secondary': 'bg-secondary-light hover:bg-secondary-dark',
  ghost: 'bg-transparent text-transparent',
};

const sizeStyles = {
  default: 'w-full h-16 px-4 py-2 rounded-md',
  rounded: 'self-start px-4 py-1 rounded-3xl',
  ghost: 'self-start',
};

export const textVariantStyles = {
  default: 'text-white text-lg font-medium',
};

type Props = TouchableOpacityProps &
  PropsWithChildren & {
    variant?: keyof typeof variantStyles;
    size?: keyof typeof sizeStyles;
    className?: string;
    isLoading?: boolean;
  };

export default function Button({
  variant = 'default',
  size = 'default',
  className,
  children,
  isLoading,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      className={`flex items-center justify-center disabled:opacity-80 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}>
      {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : children}
    </TouchableOpacity>
  );
}
