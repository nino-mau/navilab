export const useAppToast = () => {
  const toast = useToast();

  type ToastOptions = Parameters<typeof toast.add>[0];
  type Color = NonNullable<ToastOptions['color']>;

  const iconByColor: Record<Color, string> = {
    primary: 'i-lucide-bell',
    neutral: 'i-lucide-bell',
    secondary: 'i-lucide-bell',
    tertiary: 'i-lucide-bell',
    success: 'i-lucide-circle-check',
    info: 'i-lucide-info',
    warning: 'i-lucide-triangle-alert',
    error: 'i-lucide-circle-x'
  };

  const add = (opts: ToastOptions) => {
    const color = (opts.color ?? 'neutral') as Color;
    const icon = opts.icon ?? iconByColor[color];
    return toast.add({ ...opts, color, icon });
  };

  const success = (opts: Omit<ToastOptions, 'color' | 'icon'>) =>
    add({ ...opts, color: 'success', title: 'Success' });
  const error = (opts: Omit<ToastOptions, 'color' | 'icon'>) =>
    add({ ...opts, color: 'error', title: 'Error' });
  const info = (opts: Omit<ToastOptions, 'color' | 'icon'>) =>
    add({ ...opts, color: 'info', title: 'Info' });
  const warning = (opts: Omit<ToastOptions, 'color' | 'icon'>) =>
    add({ ...opts, color: 'warning', title: 'Warning' });

  return { add, success, error, info, warning };
};
