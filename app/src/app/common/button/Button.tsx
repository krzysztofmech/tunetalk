import { cn } from '@/app/utils/cn';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import Link from 'next/link';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
} from 'react';

const styles = {
  default:
    'enabled:cursor-pointer rounded-md font-bold transtion-colors duration-200 focus:outline-none flex items-center justify-center text-sm gap-2',
  sizes: {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
  },
  variants: {
    filled:
      'bg-white text-main-background enabled:hover:bg-orange enabled:hover:text-white disabled:bg-orange-transparent disabled:text-white-transparent disabled:hover:bg-orange-darker-transparent',
    outlined:
      'ring-1 ring-orange text-orange enabled:hover:bg-orange-ghost disabled:bg-orange-lighter-ghost disabled:ring-orange-transparent disabled:text-white-transparent disabled:hover:bg-orange-darker-ghost',
    ghost:
      'text-orange enabled:hover:bg-orange-ghost enabled:hover:text-orange disabled:text-white-transparent disabled:hover:bg-orange-lighter-ghost',
    linkDefault: 'text-orange hover:underline active:underline focus:underline',
    linkWhite: 'text-white hover:underline active:underline focus:underline',
  },
};

interface ClickButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'click';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  size?: keyof typeof styles.sizes;
  variant?: keyof typeof styles.variants;
  icon?: IconName;
}

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'submit';
  loading?: boolean;
  size?: keyof typeof styles.sizes;
  variant?: keyof typeof styles.variants;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  buttonType: 'link';
  href: string;
  size?: keyof typeof styles.sizes;
  variant?: keyof typeof styles.variants;
  external?: boolean;
}

type ButtonProps = ClickButtonProps | SubmitButtonProps | LinkButtonProps;

export const Button: FC<ButtonProps> = ({
  buttonType = 'click',
  size = 'default',
  variant = 'filled',
  children,
  ...props
}) => {
  const classes = cn(
    styles.default,
    styles.sizes[size],
    styles.variants[variant],
  );

  if (buttonType === 'link') {
    const { href, external, ...rest } = props as LinkButtonProps;

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="nooperner noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
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
        {loading && (
          <DynamicIcon name="loader-circle" className="animate-spin" />
        )}
        {children}
      </button>
    );
  }

  const { disabled, loading, onClick, icon, ...rest } =
    props as ClickButtonProps;

  return (
    <button
      className={cn(classes, icon ? 'p-0 h-10 w-10' : '')}
      type="button"
      disabled={loading || disabled}
      onClick={onClick}
      {...rest}
    >
      {icon ? (
        <>
          {loading ? (
            <DynamicIcon name="loader-circle" className="animate-spin" />
          ) : (
            <DynamicIcon name={icon} size={16} />
          )}
        </>
      ) : (
        <>
          {loading && (
            <DynamicIcon name="loader-circle" className="animate-spin" />
          )}
          {children}
        </>
      )}
    </button>
  );
};
