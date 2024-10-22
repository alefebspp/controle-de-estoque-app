import {PropsWithChildren} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

const variantStyles = {
  default: 'bg-primary-light text-white hover:bg-primary-dark',
  secondary: 'bg-secondary-light text-white hover:bg-secondary-dark',
  outline:
    'border border-primary-light bg-background hover:bg-primary-light text-primary-light hover:text-white',
};

type Props = TouchableOpacityProps &
  PropsWithChildren & {
    variant?: keyof typeof variantStyles;
    className?: string;
  };

export default function Button({
  variant = 'default',
  className,
  children,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={`w-full h-14 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ${variantStyles[variant]} ${className}`}
      {...props}>
      {children}
    </TouchableOpacity>
  );
}
