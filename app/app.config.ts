export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
      tertiary: 'tertiary'
    },

    input: {
      variants: {
        size: {
          xl: {
            base: 'px-3 py-2 text-base gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-5.5',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5.5'
          }
        }
      }
    },

    formField: {
      slots: { error: 'mt-1 text-error' }
    },

    button: {
      slots: {
        // Change border radius to sm for all buttons
        base: [
          'rounded-sm font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
          'transition-colors'
        ]
      },

      variants: {
        size: {
          xl: {
            base: 'px-3 py-2 text-base gap-2',
            leadingIcon: 'size-5.5',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5.5'
          }
        }
      },

      compoundVariants: []
    },

    chip: {
      variants: {
        color: {
          neutral: 'bg-slate-400'
        }
      }
    }
  }
});
