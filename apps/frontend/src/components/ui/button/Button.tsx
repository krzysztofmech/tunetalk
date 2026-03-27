import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ForwardRefExoticComponent,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react';
import { cn } from '@/lib/utils/cn';
import { Link } from '@tanstack/react-router';
import { LoaderCircle, LucideProps } from 'lucide-react';

const styles = {
  default: `enabled:cursor-pointer rounded-md font-bold transition-colors duration-200 
    focus:outline-none flex items-center justify-center text-sm gap-2`,
  variants: {
    primary: `bg-orange text-white ring-1 ring-orange-lighter 
      hover:bg-orange-darker
      active:bg-orange-darkest`,
    danger: `bg-alert-intense text-white ring-1 ring-alert-intense-lighter
      hover:bg-alert-intense-darker
      active:bg-alert-intense-darkest`,
    secondary: `text-white
      hover:bg-white-ghost
      active:bg-white-transparent`,
    icon: `text-white
      hover:text-orange
      active:text-orange-lighter`,
    linkDefault: 'text-white hover:underline focus:underline focus:underline',
    linkOrange: 'text-orange hover:underline focus:underline focus:underline',
    textWithIcon: `text-white
      hover:text-orange
      active:text-orange-lighter`,
    menuItem: `text-white
      hover:text-orange
      active:text-orange-lighter`,
  },
  sizes: {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    link: 'p-0 m-0 bg-transparent',
  },
};

type Variant = keyof typeof styles.variants;
type Size = keyof typeof styles.sizes;

interface ClickButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'click';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  size?: Size;
  variant?: Variant;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

export interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'submit';
  loading?: boolean;
  size?: Size;
  variant?: Variant;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  buttonType: 'link';
  href: string;
  variant: 'linkDefault' | 'linkOrange';
  size?: Size;
  external?: boolean;
}

type ButtonProps = (ClickButtonProps | SubmitButtonProps | LinkButtonProps) & {
  children?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  size = 'default',
  variant = 'primary',
  buttonType,
  children,
  className,
  ...props
}) => {
  const classes = cn(
    styles.default,
    styles.sizes[size],
    styles.variants[variant],
    className,
  );

  if (buttonType === 'link') {
    const { href, external, ...rest } = props as LinkButtonProps;
    const linkClasses = cn(classes, styles.sizes['link']);

    if (external) {
      return (
        <a
          href={href}
          className={linkClasses}
          target="_blank"
          rel="nooperner noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={linkClasses} {...rest}>
        {children}
      </Link>
    );
  }

  if (buttonType === 'submit') {
    const { loading, disabled, ...rest } = props as
      | ClickButtonProps
      | SubmitButtonProps;
    return (
      <button
        className={classes}
        type="submit"
        disabled={loading || disabled}
        {...(rest as SubmitButtonProps)}
      >
        {loading && <LoaderCircle className="animate-spin" />}
        {children}
      </button>
    );
  }

  const { disabled, loading, onClick, Icon, ...rest } =
    props as ClickButtonProps;

  return (
    <button
      className={cn(classes, Icon && !children ? 'h-10 w-10 p-0' : '')}
      type="button"
      disabled={loading || disabled}
      onClick={onClick}
      {...rest}
    >
      {Icon ? (
        <>
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <div
              className={cn(
                'flex w-full items-center',
                !children ? 'justify-center' : 'justify-start',
              )}
            >
              <Icon size={20} />
              {children && <div className="pl-5">{children}</div>}
            </div>
          )}
        </>
      ) : (
        <>
          {loading && <LoaderCircle className="animate-spin" />}
          {children}
        </>
      )}
    </button>
  );
};
